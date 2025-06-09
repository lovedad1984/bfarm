import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  Link,
  Group,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuthStore } from "@/store/authStore";
import { validateLoginForm } from "@/utils/validators";
import { toaster } from "@/components/ui/toaster";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading, error, clearError } = useAuthStore();

  // 로그인 폼 상태
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);

  // authStore에서 에러 토스터도 처리하므로 제거

  // 로그인 성공 후 리다이렉트 처리
  useEffect(() => {
    if (user) {
      // setTimeout(() => {
      navigate("/", { replace: true });
      // }, 1500); // 토스터를 충분히 본 후 이동
    }
  }, [user, navigate]);

  // 에러 메시지 자동 제거 (5초 후)
  useEffect(() => {
    if (loginMessage && loginMessage.type === "error") {
      const timer = setTimeout(() => {
        setLoginMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginMessage]);

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

    // 로그인 메시지 초기화 (사용자가 다시 입력하면)
    if (loginMessage) {
      setLoginMessage(null);
    }
  };

  // 로그인 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const validationErrors = validateLoginForm(formData);
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
      setLoginMessage(null); // 이전 메시지 초기화

      await signIn(formData.email, formData.password);

      // 성공 토스터 표시
      setTimeout(() => {
        toaster.success({
          title: "🎉 로그인 성공!",
          description: "환영합니다!",
          duration: 4000,
        });
      }, 100);

      // 페이지 내에 성공 메시지 표시
      setLoginMessage({
        type: "success",
        title: "로그인 성공!",
        description: "환영합니다!",
      });
    } catch (error) {
      // Firebase 에러 코드에 따른 한국어 메시지
      let errorMessage = "로그인에 실패했습니다.";
      if (error?.code) {
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "등록되지 않은 이메일입니다.";
            break;
          case "auth/wrong-password":
            errorMessage = "비밀번호가 올바르지 않습니다.";
            break;
          case "auth/invalid-email":
            errorMessage = "올바르지 않은 이메일 형식입니다.";
            break;
          case "auth/too-many-requests":
            errorMessage = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
            break;
          case "auth/invalid-credential":
            errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
            break;
          default:
            errorMessage = error.message;
        }
      }

      // 에러 토스터 표시
      setTimeout(() => {
        toaster.error({
          title: "❌ 로그인 실패",
          description: errorMessage,
          duration: 4000,
        });
      }, 100);

      // 페이지 내에 에러 메시지 표시
      setLoginMessage({
        type: "error",
        title: "로그인 실패",
        description: errorMessage,
      });
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
            bFarm 로그인
          </Heading>

          {/* 로그인 메시지 표시 */}
          {loginMessage && (
            <Box
              p={4}
              borderRadius="md"
              bg={loginMessage.type === "success" ? "green.50" : "red.50"}
              borderColor={
                loginMessage.type === "success" ? "green.200" : "red.200"
              }
              borderWidth="1px"
              width="100%"
            >
              <Text
                fontWeight="semibold"
                color={
                  loginMessage.type === "success" ? "green.800" : "red.800"
                }
                mb={1}
              >
                {loginMessage.title}
              </Text>
              <Text
                fontSize="sm"
                color={
                  loginMessage.type === "success" ? "green.700" : "red.700"
                }
              >
                {loginMessage.description}
              </Text>
            </Box>
          )}

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
                    placeholder="비밀번호를 입력하세요"
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
                    autoComplete="current-password"
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

              {/* 비밀번호 찾기 링크 */}
              <Box textAlign="center" width="100%" mt={2}>
                <Link
                  color="blue.500"
                  fontSize="sm"
                  onClick={() => navigate("/forgot-password")}
                  _hover={{ color: "blue.600", textDecoration: "underline" }}
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </Box>

              {/* 로그인 버튼 */}
              <Button
                mt={6}
                colorScheme="blue"
                size="lg"
                width="full"
                type="submit"
                loading={isSubmitting || loading}
                loadingText="로그인 중..."
              >
                로그인
              </Button>
            </VStack>
          </Box>

          {/* 구분선 */}
          <Box width="100%" my={4}>
            <Box height="1px" bg="border" />
          </Box>

          {/* 회원가입 페이지 링크 */}
          <Text textAlign="center" color="fg">
            아직 계정이 없으신가요?{" "}
            <Link
              color="blue.500"
              onClick={() => navigate("/signup")}
              _hover={{ color: "blue.600", textDecoration: "underline" }}
            >
              회원가입하기
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
