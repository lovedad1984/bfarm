import React from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import { useRouterGuard } from "@/hooks/useRouterGuard";

const NotFound = () => {
  const { safeNavigate, canNavigate } = useRouterGuard();

  return (
    <Container maxW="md" py={20}>
      <VStack gap={6} textAlign="center">
        <Box>
          <Heading size="4xl" color="red.500" fontWeight="bold" mb={4}>
            404
          </Heading>
          <Heading size="lg" color="fg" mb={2}>
            페이지를 찾을 수 없습니다
          </Heading>
          <Text color="fg.muted" fontSize="lg">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </Text>
        </Box>

        <Button
          leftIcon={<FiHome />}
          colorScheme="green"
          size="lg"
          onClick={() => safeNavigate("/")}
          disabled={!canNavigate}
        >
          홈으로 돌아가기
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFound;
