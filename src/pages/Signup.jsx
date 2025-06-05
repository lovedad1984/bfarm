import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  CloseButton,
  Heading,
  HStack,
  VStack,
  Input,
  Button,
  Text,
  Link,
  Portal,
  Group,
  Checkbox,
  Dialog,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { useAuthStore } from "@/store/authStore";
import { useAddressSearch } from "@/utils/addressSearch";
import { validateSignupForm } from "@/utils/validators";
import { smsService } from "@/utils/smsService";
import { toaster } from "@/components/ui/toaster";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, user, loading, error, clearError } = useAuthStore();
  const { isScriptLoaded, openPostcodeSearch } = useAddressSearch();

  // Dialog 상태 관리
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  // 회원가입 폼 상태
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    address: "",
    addressDetail: "",
    zipCode: "",
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
  });

  // 본인확인 관련 상태
  const [verification, setVerification] = useState({
    name: "",
    phone: "",
    verificationCode: "",
    sentCode: "",
    isVerified: false,
    isCodeSent: false,
    sendingCode: false,
    verifyingCode: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 에러 메시지 표시
  useEffect(() => {
    if (error) {
      toaster.error({
        title: "회원가입 오류",
        description: error,
      });
      clearError();
    }
  }, [error, clearError]);

  // 로그인 상태일 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Checkbox 변경 처리
  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 본인 확인 입력값 처리
  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // 휴대폰 번호 자동 포맷팅
    if (name === "phone") {
      processedValue = value.replace(/\D/g, "").slice(0, 11);
    }
    // 인증번호는 숫자만 허용
    else if (name === "verificationCode") {
      processedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setVerification((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  // 인증번호 발송
  const sendVerificationCode = async () => {
    if (!verification.name.trim()) {
      toaster.warning({
        title: "정보 미입력",
        description: "이름을 입력해주세요.",
      });
      return;
    }

    if (!smsService.isValidPhoneNumber(verification.phone)) {
      toaster.warning({
        title: "유효하지 않은 번호",
        description: "올바른 휴대폰 번호를 입력해주세요.",
      });
      return;
    }

    setVerification((prev) => ({ ...prev, sendingCode: true }));

    try {
      const result = await smsService.sendVerificationCode(
        verification.phone,
        verification.name
      );

      if (result.success) {
        setVerification((prev) => ({
          ...prev,
          sentCode: result.testCode || "", // 개발 환경에서만 설정
          isCodeSent: true,
        }));

        toaster.success({
          title: "인증번호 발송 완료",
          description: result.message,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("인증번호 발송 오류:", error);
      toaster.error({
        title: "인증번호 발송 실패",
        description: error.message,
      });
    } finally {
      setVerification((prev) => ({ ...prev, sendingCode: false }));
    }
  };

  // 인증번호 확인
  const verifyCode = async () => {
    if (!verification.verificationCode) {
      toaster.warning({
        title: "인증번호 미입력",
        description: "인증번호를 입력해주세요.",
      });
      return;
    }

    setVerification((prev) => ({ ...prev, verifyingCode: true }));

    try {
      const result = await smsService.verifyCode(
        verification.phone,
        verification.verificationCode,
        verification.sentCode
      );

      if (result.success) {
        setVerification((prev) => ({
          ...prev,
          isVerified: true,
        }));

        toaster.success({
          title: "인증 성공",
          description: "본인 인증이 완료되었습니다.",
        });

        setIsVerificationOpen(false);
      } else {
        toaster.error({
          title: "인증 실패",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("인증번호 검증 오류:", error);
      toaster.error({
        title: "인증 실패",
        description: "인증번호 검증 중 오류가 발생했습니다.",
      });
    } finally {
      setVerification((prev) => ({ ...prev, verifyingCode: false }));
    }
  };

  // 주소 검색 결과 처리
  const handleAddressComplete = (data) => {
    setFormData((prev) => ({
      ...prev,
      zipCode: data.zipCode,
      address: data.address,
    }));

    // 에러 메시지 초기화
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: "" }));
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const validationErrors = validateSignupForm(formData, verification);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // 첫 번째 에러 필드로 스크롤
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }

      return;
    }

    setIsSubmitting(true);

    try {
      // 사용자 정보 객체 구성
      const userData = {
        username: formData.username,
        address: formData.address,
        addressDetail: formData.addressDetail,
        zipCode: formData.zipCode,
        isVerified: verification.isVerified,
        marketingAgreed: formData.marketingAgreed,
      };

      await signUp(formData.email, formData.password, userData);

      toaster.success({
        title: "회원가입 성공!",
        description: "환영합니다! 잠시 후 메인 페이지로 이동합니다.",
      });

      // 약간의 지연 후 페이지 이동
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("회원가입 오류:", error);
      // 에러는 이미 store와 useEffect에서 처리됨
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="lg" py={12}>
      <Box
        bg="card.bg"
        color="fg"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        border="1px"
        borderColor="border"
      >
        <VStack gap={6}>
          <Heading as="h1" size="xl" textAlign="center" color="fg">
            bFarm 회원가입
          </Heading>

          <Box as="form" onSubmit={handleSubmit} width="100%">
            <VStack gap={4}>
              {/* 이메일 입력 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium" color="fg">
                  이메일 *
                </Text>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  borderColor={errors.email ? "red.500" : "border"}
                  _hover={{
                    borderColor: errors.email ? "red.600" : "border.hover",
                  }}
                  _focus={{
                    borderColor: errors.email ? "red.500" : "blue.500",
                    boxShadow: errors.email
                      ? "0 0 0 1px var(--chakra-colors-red-500)"
                      : "0 0 0 1px var(--chakra-colors-blue-500)",
                  }}
                  autoComplete="email"
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.email}
                  </Text>
                )}
              </Box>

              {/* 비밀번호 입력 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium" color="fg">
                  비밀번호 *
                </Text>
                <Group attached width="100%">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="영문 대소문자, 숫자 포함 8자 이상"
                    borderColor={errors.password ? "red.500" : "border"}
                    _hover={{
                      borderColor: errors.password ? "red.600" : "border.hover",
                    }}
                    _focus={{
                      borderColor: errors.password ? "red.500" : "blue.500",
                      boxShadow: errors.password
                        ? "0 0 0 1px var(--chakra-colors-red-500)"
                        : "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    flex="1"
                    autoComplete="new-password"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowPassword(!showPassword)}
                    px={3}
                    minW="auto"
                    bg="button.outline.bg"
                    borderColor="button.outline.border"
                    color="fg"
                    _hover={{
                      bg: "button.ghost.hover",
                      borderColor: "button.outline.border",
                    }}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </Group>
                {errors.password && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.password}
                  </Text>
                )}
              </Box>

              {/* 비밀번호 확인 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium" color="fg">
                  비밀번호 확인 *
                </Text>
                <Group attached width="100%">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호 재입력"
                    borderColor={errors.confirmPassword ? "red.500" : "border"}
                    _hover={{
                      borderColor: errors.confirmPassword
                        ? "red.600"
                        : "border.hover",
                    }}
                    _focus={{
                      borderColor: errors.confirmPassword
                        ? "red.500"
                        : "blue.500",
                      boxShadow: errors.confirmPassword
                        ? "0 0 0 1px var(--chakra-colors-red-500)"
                        : "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    flex="1"
                    autoComplete="new-password"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    px={3}
                    minW="auto"
                    bg="button.outline.bg"
                    borderColor="button.outline.border"
                    color="fg"
                    _hover={{
                      bg: "button.ghost.hover",
                      borderColor: "button.outline.border",
                    }}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </Group>
                {errors.confirmPassword && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </Box>

              {/* 사용자 이름 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium" color="fg">
                  사용자 이름 *
                </Text>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="한글, 영문, 숫자 2-20자"
                  borderColor={errors.username ? "red.500" : "border"}
                  _hover={{
                    borderColor: errors.username ? "red.600" : "border.hover",
                  }}
                  _focus={{
                    borderColor: errors.username ? "red.500" : "blue.500",
                    boxShadow: errors.username
                      ? "0 0 0 1px var(--chakra-colors-red-500)"
                      : "0 0 0 1px var(--chakra-colors-blue-500)",
                  }}
                  autoComplete="username"
                />
                {errors.username && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.username}
                  </Text>
                )}
              </Box>

              {/* 본인인증 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium" color="fg">
                  본인인증 (선택사항)
                </Text>
                <Button
                  width="full"
                  colorScheme={verification.isVerified ? "green" : "blue"}
                  disabled={verification.isVerified}
                  onClick={() => setIsVerificationOpen(true)}
                  leftIcon={verification.isVerified ? <FiCheck /> : undefined}
                >
                  {verification.isVerified ? "인증완료" : "본인인증하기 (선택)"}
                </Button>
                {errors.verification && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.verification}
                  </Text>
                )}
              </Box>

              {/* 주소 입력 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium" color="fg">
                  주소 *
                </Text>
                <VStack gap={2}>
                  <HStack width="100%">
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      readOnly
                      placeholder="우편번호"
                      width="40%"
                      bg="bg.muted"
                      borderColor="border"
                      autoComplete="postal-code"
                    />
                    <Button
                      colorScheme="blue"
                      onClick={() => openPostcodeSearch(handleAddressComplete)}
                      width="60%"
                      loading={!isScriptLoaded}
                      loadingText="API 로딩중..."
                    >
                      주소 검색
                    </Button>
                  </HStack>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    readOnly
                    placeholder="기본 주소 (주소 검색 버튼을 클릭하세요)"
                    width="100%"
                    bg="bg.muted"
                    borderColor={errors.address ? "red.500" : "border"}
                    autoComplete="address-line1"
                  />
                  <Input
                    type="text"
                    name="addressDetail"
                    value={formData.addressDetail}
                    onChange={handleChange}
                    placeholder="상세 주소 (동, 호수 등)"
                    width="100%"
                    borderColor={errors.address ? "red.500" : "border"}
                    _hover={{ borderColor: "border.hover" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    autoComplete="address-line2"
                  />
                </VStack>
                {errors.address && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.address}
                  </Text>
                )}
              </Box>

              {/* 구분선 */}
              <Box width="100%" my={4}>
                <Box height="1px" bg="border" />
              </Box>

              {/* 이용약관 동의 */}
              <VStack gap={3} width="100%" align="start">
                <Checkbox.Root
                  checked={formData.termsAgreed}
                  onCheckedChange={(details) =>
                    handleCheckboxChange("termsAgreed", details.checked)
                  }
                >
                  <Checkbox.HiddenInput name="termsAgreed" />
                  <Checkbox.Control
                    bg="checkbox.bg"
                    borderColor="checkbox.border"
                    _checked={{
                      bg: "checkbox.checked.bg",
                      borderColor: "checkbox.checked.border",
                      color: "white",
                    }}
                    _hover={{
                      borderColor: formData.privacyAgreed
                        ? "checkbox.checked.border"
                        : "checkbox.border",
                    }}
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label color="fg">
                    <Link
                      color="blue.500"
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      _hover={{
                        color: "blue.600",
                        textDecoration: "underline",
                      }}
                    >
                      이용약관
                    </Link>
                    에 동의합니다 *
                  </Checkbox.Label>
                </Checkbox.Root>
                {errors.termsAgreed && (
                  <Text color="red.500" fontSize="sm" pl={6}>
                    {errors.termsAgreed}
                  </Text>
                )}

                {/* 개인정보 처리방침 동의 */}
                <Checkbox.Root
                  checked={formData.privacyAgreed}
                  onCheckedChange={(details) =>
                    handleCheckboxChange("privacyAgreed", details.checked)
                  }
                >
                  <Checkbox.HiddenInput name="privacyAgreed" />
                  <Checkbox.Control
                    bg="checkbox.bg"
                    borderColor="checkbox.border"
                    _checked={{
                      bg: "checkbox.checked.bg",
                      borderColor: "checkbox.checked.border",
                      color: "white",
                    }}
                    _hover={{
                      borderColor: formData.privacyAgreed
                        ? "checkbox.checked.border"
                        : "checkbox.border",
                    }}
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label color="fg">
                    <Link
                      color="blue.500"
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      _hover={{
                        color: "blue.600",
                        textDecoration: "underline",
                      }}
                    >
                      개인정보 처리방침
                    </Link>
                    에 동의합니다 *
                  </Checkbox.Label>
                </Checkbox.Root>
                {errors.privacyAgreed && (
                  <Text color="red.500" fontSize="sm" pl={6}>
                    {errors.privacyAgreed}
                  </Text>
                )}

                {/* 마케팅 정보 수신 동의 (선택) */}
                <Checkbox.Root
                  checked={formData.marketingAgreed}
                  onCheckedChange={(details) =>
                    handleCheckboxChange("marketingAgreed", details.checked)
                  }
                >
                  <Checkbox.HiddenInput name="marketingAgreed" />
                  <Checkbox.Control
                    bg="checkbox.bg"
                    borderColor="checkbox.border"
                    _checked={{
                      bg: "checkbox.checked.bg",
                      borderColor: "checkbox.checked.border",
                      color: "white",
                    }}
                    _hover={{
                      borderColor: formData.privacyAgreed
                        ? "checkbox.checked.border"
                        : "checkbox.border",
                    }}
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label color="fg">
                    마케팅 정보 수신에 동의합니다 (선택)
                  </Checkbox.Label>
                </Checkbox.Root>
              </VStack>

              {/* 제출 버튼 */}
              <Button
                mt={6}
                colorScheme="green"
                size="lg"
                width="full"
                type="submit"
                loading={isSubmitting || loading}
                loadingText="회원가입 중..."
              >
                회원가입
              </Button>
            </VStack>
          </Box>

          {/* 로그인 페이지 링크 */}
          <Text textAlign="center" color="fg">
            이미 계정이 있으신가요?{" "}
            <Link
              color="blue.500"
              onClick={() => navigate("/login")}
              _hover={{ color: "blue.600", textDecoration: "underline" }}
            >
              로그인하기
            </Link>
          </Text>
        </VStack>
      </Box>

      {/* 본인 인증 다이얼로그 */}
      <Dialog.Root
        open={isVerificationOpen}
        onOpenChange={(e) => setIsVerificationOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner p={4}>
            <Dialog.Content
              bg="card.bg"
              color="fg"
              borderColor="border"
              borderRadius="lg"
              maxW="md"
              w="full"
            >
              <Dialog.Header borderBottomWidth="1px" borderBottomColor="border">
                <Dialog.Title color="fg">본인인증</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    color="fg"
                    _hover={{ bg: "bg.muted" }}
                  />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body py={6}>
                <VStack gap={4}>
                  <Box width="100%">
                    <Text mb={2} fontWeight="medium" color="fg">
                      이름 *
                    </Text>
                    <Input
                      name="name"
                      value={verification.name}
                      onChange={handleVerificationChange}
                      placeholder="실명을 입력하세요"
                      borderColor="border"
                      _hover={{ borderColor: "border.hover" }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                      }}
                      autoComplete="name"
                    />
                  </Box>

                  <Box width="100%">
                    <Text mb={2} fontWeight="medium" color="fg">
                      휴대폰 번호 *
                    </Text>
                    <Input
                      name="phone"
                      value={verification.phone}
                      onChange={handleVerificationChange}
                      placeholder="01012345678 (숫자만 입력)"
                      borderColor="border"
                      _hover={{ borderColor: "border.hover" }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                      }}
                      autoComplete="tell"
                    />
                  </Box>

                  {verification.isCodeSent && (
                    <Box width="100%">
                      <Text mb={2} fontWeight="medium" color="fg">
                        인증번호 *
                      </Text>
                      <HStack>
                        <Input
                          name="verificationCode"
                          value={verification.verificationCode}
                          onChange={handleVerificationChange}
                          placeholder="인증번호 6자리"
                          borderColor="border"
                          _hover={{ borderColor: "border.hover" }}
                          _focus={{
                            borderColor: "blue.500",
                            boxShadow:
                              "0 0 0 1px var(--chakra-colors-blue-500)",
                          }}
                          maxLength={6}
                        />
                        <Button
                          onClick={verifyCode}
                          colorScheme="green"
                          loading={verification.verifyingCode}
                          loadingText="확인중..."
                          disabled={
                            !verification.verificationCode ||
                            verification.verificationCode.length !== 6
                          }
                        >
                          확인
                        </Button>
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </Dialog.Body>

              <Dialog.Footer
                borderTopWidth="1px"
                borderTopColor="border"
                pt={4}
              >
                <HStack justifyContent="flex-end" width="100%">
                  <Button
                    variant="outline"
                    borderColor="border"
                    color="fg"
                    _hover={{ bg: "bg.muted" }}
                    onClick={() => setIsVerificationOpen(false)}
                  >
                    취소
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={sendVerificationCode}
                    loading={verification.sendingCode}
                    loadingText="발송중..."
                    disabled={!verification.name.trim() || !verification.phone}
                  >
                    {!verification.isCodeSent ? "인증번호 발송" : "재발송"}
                  </Button>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  );
};

export default Signup;
