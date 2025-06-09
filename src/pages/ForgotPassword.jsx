import { useState } from "react";
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
} from "@chakra-ui/react";
import { useAuthStore } from "@/store/authStore";
import { toaster } from "@/components/ui/toaster";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { sendPasswordResetEmail, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    if (!email) {
      return "이메일을 입력해주세요.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "올바른 이메일 형식이 아닙니다.";
    }
    return "";
  };

  // 이메일 입력 변경 처리
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // 에러 메시지 초기화
    if (emailError) {
      setEmailError("");
    }
  };

  // 비밀번호 재설정 이메일 발송
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    try {
      const result = await sendPasswordResetEmail(email);

      if (result.success) {
        // 토스터를 먼저 안전하게 표시
        setTimeout(() => {
          toaster.success({
            title: "📧 이메일 발송 완료",
            description: "비밀번호 재설정 링크를 이메일로 발송했습니다.",
            duration: 4000,
          });
        }, 100);

        // 토스터가 보인 후 상태 변경
        setTimeout(() => {
          setIsSubmitted(true);
        }, 200);
      } else {
        // 에러 토스터도 안전하게 표시
        setTimeout(() => {
          toaster.error({
            title: "❌ 발송 실패",
            description: result.message,
            duration: 4000,
          });
        }, 100);
      }
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error);

      // catch 에러도 안전하게 표시
      setTimeout(() => {
        toaster.error({
          title: "❌ 오류 발생",
          description: "비밀번호 재설정 중 오류가 발생했습니다.",
          duration: 4000,
        });
      }, 100);
    }
  };

  // 이메일 발송 완료 상태
  if (isSubmitted) {
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
          <VStack gap={6} textAlign="center">
            <Box
              w={16}
              h={16}
              bg="green.100"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl">📧</Text>
            </Box>

            <Heading as="h1" size="lg" color="fg">
              이메일을 확인해주세요
            </Heading>

            <VStack gap={3}>
              <Text color="fg" textAlign="center">
                <Text as="span" fontWeight="semibold" color="blue.500">
                  {email}
                </Text>
                으로 비밀번호 재설정 링크를 발송했습니다.
              </Text>

              <Text color="gray.600" fontSize="sm" textAlign="center">
                이메일을 받지 못하셨나요? 스팸 폴더를 확인해보시거나 잠시 후
                다시 시도해주세요.
              </Text>
            </VStack>

            <VStack gap={3} width="100%">
              <Button
                colorScheme="blue"
                size="lg"
                width="full"
                onClick={() => setIsSubmitted(false)}
              >
                다른 이메일로 재발송
              </Button>

              <Link
                color="blue.500"
                onClick={() => navigate("/login")}
                _hover={{ color: "blue.600", textDecoration: "underline" }}
              >
                로그인 페이지로 돌아가기
              </Link>
            </VStack>
          </VStack>
        </Box>
      </Container>
    );
  }

  // 이메일 입력 폼
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
          <VStack gap={2} textAlign="center">
            <Heading as="h1" size="xl" color="fg">
              비밀번호 찾기
            </Heading>
            <Text color="gray.600" fontSize="sm">
              가입하신 이메일 주소를 입력하면 비밀번호 재설정 링크를
              보내드립니다.
            </Text>
          </VStack>

          <Box as="form" onSubmit={handleSubmit} width="100%">
            <VStack gap={4}>
              {/* 이메일 입력 */}
              <Box width="100%">
                <Text mb={2} fontWeight="medium" color="fg">
                  이메일 *
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="example@email.com"
                  borderColor={emailError ? "red.500" : "border"}
                  _hover={{
                    borderColor: emailError ? "red.600" : "border.hover",
                  }}
                  _focus={{
                    borderColor: emailError ? "red.500" : "blue.500",
                    boxShadow: emailError
                      ? "0 0 0 1px var(--chakra-colors-red-500)"
                      : "0 0 0 1px var(--chakra-colors-blue-500)",
                  }}
                  autoComplete="email"
                  autoFocus
                />
                {emailError && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {emailError}
                  </Text>
                )}
              </Box>

              {/* 발송 버튼 */}
              <Button
                mt={4}
                colorScheme="blue"
                size="lg"
                width="full"
                type="submit"
                loading={loading}
                loadingText="발송 중..."
              >
                비밀번호 재설정 이메일 발송
              </Button>
            </VStack>
          </Box>

          {/* 구분선 */}
          <Box width="100%" my={4}>
            <Box height="1px" bg="border" />
          </Box>

          {/* 하단 링크들 */}
          <VStack gap={2}>
            <Text textAlign="center" color="fg" fontSize="sm">
              계정이 기억나셨나요?{" "}
              <Link
                color="blue.500"
                onClick={() => navigate("/login")}
                _hover={{ color: "blue.600", textDecoration: "underline" }}
              >
                로그인하기
              </Link>
            </Text>

            <Text textAlign="center" color="fg" fontSize="sm">
              계정이 없으신가요?{" "}
              <Link
                color="blue.500"
                onClick={() => navigate("/signup")}
                _hover={{ color: "blue.600", textDecoration: "underline" }}
              >
                회원가입하기
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
