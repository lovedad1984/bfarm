import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { Link as RouterLink } from "react-router-dom";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"container.xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>회사 소개</ListHeader>
            <Link as={RouterLink} to="/about">
              회사 소개
            </Link>
            <Link as={RouterLink} to="/locations">
              매장 위치
            </Link>
            <Link as={RouterLink} to="/career">
              채용 정보
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>고객 지원</ListHeader>
            <Link as={RouterLink} to="/support">
              고객센터
            </Link>
            <Link as={RouterLink} to="/faq">
              자주 묻는 질문
            </Link>
            <Link as={RouterLink} to="/returns">
              교환 및 환불
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>쇼핑하기</ListHeader>
            <Link as={RouterLink} to="/products?category=사과">
              사과
            </Link>
            <Link as={RouterLink} to="/products?category=배">
              배
            </Link>
            <Link as={RouterLink} to="/products?category=감귤">
              감귤
            </Link>
            <Link as={RouterLink} to="/products?category=포도">
              포도
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>법적 고지</ListHeader>
            <Link as={RouterLink} to="/privacy">
              개인정보처리방침
            </Link>
            <Link as={RouterLink} to="/terms">
              이용약관
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="green.600"
            as={RouterLink}
            to="/"
          >
            bFarm
          </Text>
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © {year} bFarm. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
