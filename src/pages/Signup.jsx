import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useDisclosure,
  Container,
  Box,
  Stack,
  Heading,
  HStack,
  Input,
  Button,
  Checkbox,
  Link,
  Dialog,
  Text,
  VStack,
  Group,
  Portal,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuthStore } from "@/store/authStore";
import { useAddressSearch } from "@/utils/addressSearch";
import { validateSignupForm } from "@/utils/validators";
import { toaster } from "@/components/ui/toaster";

const Signup = () => {
  const navigate = useNavigate();
  const {
    isOpen: isVerificationOpen,
    onOpen: onVerificationOpen,
    onClose: onVerificationClose,
  } = useDisclosure();
  const { signUp, user, loading, error } = useAuthStore();
  const { isScriptLoaded, openPostcodeSearch } = useAddressSearch();

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
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 에러 메시지 표시
  useEffect(() => {
    if (error) {
      toaster.error({
        title: "회원가입 오류",
        description: error,
      });
    }
  }, [error]);

  // 로그인 상태일 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("Agreed") ? checked : value,
    }));
    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Checkbox 전용 변경 처리
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
    setVerification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 인증번호 발송 (실제로는 SMS API 연동 필요)
  const sendVerificationCode = async () => {
    if (!verification.name || !verification.phone) {
      toaster.warning({
        title: "정보 미입력",
        description: "이름과 휴대폰 번호를 모두 입력해주세요.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 실제 환경에서는 서버에 SMS 발송 요청
      // 여기서는 임시로 랜덤 코드 생성
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

      // axios를 사용한 SMS 발송 요청 예시
      await axios.post("/api/send-verification-sms", {
        phone: verification.phone,
        code: randomCode,
      });

      setVerification((prev) => ({
        ...prev,
        sentCode: randomCode,
        isCodeSent: true,
      }));

      toaster.success({
        title: "인증번호 발송 완료",
        description: `${verification.phone}로 인증번호가 발송되었습니다.`,
      });
    } catch (error) {
      console.error("인증번호 발송 오류:", error);
      toaster.error({
        title: "인증번호 발송 실패",
        description: "인증번호 발송 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 인증번호 확인
  const verifyCode = () => {
    if (verification.verificationCode === verification.sentCode) {
      setVerification((prev) => ({
        ...prev,
        isVerified: true,
      }));

      toaster.success({
        title: "인증 성공",
        description: "본인 인증이 완료되었습니다.",
      });

      onVerificationClose(); // 다이얼로그 닫기
    } else {
      toaster.error({
        title: "인증 실패",
        description: "인증번호가 일치하지 않습니다. 다시 확인해주세요.",
      });
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
      return;
    }

    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password);

      toaster.success({
        title: "회원가입 성공!",
        description: "환영합니다! 메인 페이지로 이동합니다.",
      });

      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("회원가입 오류:", error);

      toaster.error({
        title: "회원가입 실패",
        description:
          error.message ||
          "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="lg" py={12}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
        <VStack gap={6}>
          <Heading as="h1" size="xl" textAlign="center">
            bFarm 회원가입
          </Heading>

          <Box as="form" onSubmit={handleSubmit} width="100%">
            <VStack gap={4}>
              {/* 이메일 입력 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium">
                  이메일 *
                </Text>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  borderColor={errors.email ? "red.500" : "gray.300"}
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.email}
                  </Text>
                )}
              </Box>

              {/* 비밀번호 입력 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium">
                  비밀번호 *
                </Text>
                <Group attached>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호 (8자 이상)"
                    borderColor={errors.password ? "red.500" : "gray.300"}
                    flex="1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowPassword(!showPassword)}
                    px={3}
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
                <Text mb={2} fontWeight="medium">
                  비밀번호 확인 *
                </Text>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호 확인"
                  borderColor={errors.confirmPassword ? "red.500" : "gray.300"}
                />
                {errors.confirmPassword && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </Box>

              {/* 사용자 이름 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium">
                  사용자 이름 *
                </Text>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="사용자 이름"
                  borderColor={errors.username ? "red.500" : "gray.300"}
                />
                {errors.username && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.username}
                  </Text>
                )}
              </Box>

              {/* 본인인증 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium">
                  본인인증 *
                </Text>
                <Dialog.Root
                  open={isVerificationOpen}
                  onOpenChange={onVerificationClose}
                >
                  <Dialog.Trigger asChild>
                    <Button
                      width="full"
                      colorScheme={verification.isVerified ? "green" : "blue"}
                      disabled={verification.isVerified}
                      onClick={onVerificationOpen}
                    >
                      {verification.isVerified ? "인증완료" : "본인인증하기"}
                    </Button>
                  </Dialog.Trigger>

                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>본인인증</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CloseTrigger />

                        <Dialog.Body>
                          <VStack gap={4}>
                            <Box width="100%">
                              <Text mb={2} fontWeight="medium">
                                이름 *
                              </Text>
                              <Input
                                name="name"
                                value={verification.name}
                                onChange={handleVerificationChange}
                                placeholder="실명을 입력하세요"
                              />
                            </Box>

                            <Box width="100%">
                              <Text mb={2} fontWeight="medium">
                                휴대폰 번호 *
                              </Text>
                              <Input
                                name="phone"
                                value={verification.phone}
                                onChange={handleVerificationChange}
                                placeholder="'-' 없이 입력하세요"
                              />
                            </Box>

                            {verification.isCodeSent && (
                              <Box width="100%">
                                <Text mb={2} fontWeight="medium">
                                  인증번호 *
                                </Text>
                                <HStack>
                                  <Input
                                    name="verificationCode"
                                    value={verification.verificationCode}
                                    onChange={handleVerificationChange}
                                    placeholder="인증번호 6자리"
                                  />
                                  <Button
                                    onClick={verifyCode}
                                    colorScheme="green"
                                  >
                                    확인
                                  </Button>
                                </HStack>
                              </Box>
                            )}
                          </VStack>
                        </Dialog.Body>

                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">취소</Button>
                          </Dialog.ActionTrigger>
                          <Button
                            colorScheme="blue"
                            onClick={sendVerificationCode}
                            loading={isLoading}
                          >
                            {!verification.isCodeSent
                              ? "인증번호 발송"
                              : "재발송"}
                          </Button>
                        </Dialog.Footer>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
                {errors.verification && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.verification}
                  </Text>
                )}
              </Box>

              {/* 주소 입력 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium">
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
                    />
                    <Button
                      colorScheme="blue"
                      onClick={() => openPostcodeSearch(handleAddressComplete)}
                      width="60%"
                      loading={!isScriptLoaded}
                    >
                      주소 검색
                    </Button>
                  </HStack>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    readOnly
                    placeholder="기본 주소"
                    width="100%"
                  />
                  <Input
                    type="text"
                    name="addressDetail"
                    value={formData.addressDetail}
                    onChange={handleChange}
                    placeholder="상세 주소"
                    width="100%"
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
                <Box height="1px" bg="gray.200" />
              </Box>

              {/* 이용약관 동의 */}
              <HStack align="start" width="100%">
                <Checkbox.Root
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onCheckedChange={(details) =>
                    handleCheckboxChange("termsAgreed", details.checked)
                  }
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>
                    <Link
                      color="blue.500"
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      이용약관
                    </Link>
                    에 동의합니다 *
                  </Checkbox.Label>
                </Checkbox.Root>
              </HStack>
              {errors.termsAgreed && (
                <Text color="red.500" fontSize="sm" width="100%">
                  {errors.termsAgreed}
                </Text>
              )}

              {/* 개인정보 처리방침 동의 */}
              <HStack align="start" width="100%">
                <Checkbox.Root
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onCheckedChange={(details) =>
                    handleCheckboxChange("privacyAgreed", details.checked)
                  }
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>
                    <Link
                      color="blue.500"
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      개인정보 처리방침
                    </Link>
                    에 동의합니다 *
                  </Checkbox.Label>
                </Checkbox.Root>
              </HStack>
              {errors.privacyAgreed && (
                <Text color="red.500" fontSize="sm" width="100%">
                  {errors.privacyAgreed}
                </Text>
              )}

              {/* 마케팅 정보 수신 동의 (선택) */}
              <HStack align="start" width="100%">
                <Checkbox.Root
                  name="marketingAgreed"
                  checked={formData.marketingAgreed}
                  onCheckedChange={(details) =>
                    handleCheckboxChange("marketingAgreed", details.checked)
                  }
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>
                    마케팅 정보 수신에 동의합니다 (선택)
                  </Checkbox.Label>
                </Checkbox.Root>
              </HStack>

              {/* 제출 버튼 */}
              <Button
                mt={6}
                colorScheme="green"
                size="lg"
                width="full"
                type="submit"
                loading={isLoading || loading}
              >
                회원가입
              </Button>
            </VStack>
          </Box>

          {/* 로그인 페이지 링크 */}
          <Text textAlign="center">
            이미 계정이 있으신가요?{" "}
            <Link color="blue.500" onClick={() => navigate("/login")}>
              로그인하기
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Signup;
