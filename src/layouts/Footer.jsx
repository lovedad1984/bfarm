import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2} color="fg">
      {children}
    </Text>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box bg="bg" color="fg" borderTopWidth="1px" borderTopColor="border">
      <Container as={Stack} maxW="1024px" mx="auto" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={8}>
          <Stack align={"flex-start"}>
            <ListHeader>회사 소개</ListHeader>
            <Link
              as={RouterLink}
              to="/about"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              회사 소개
            </Link>
            <Link
              as={RouterLink}
              to="/locations"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              매장 위치
            </Link>
            <Link
              as={RouterLink}
              to="/career"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              채용 정보
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>고객 지원</ListHeader>
            <Link
              as={RouterLink}
              to="/support"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              고객센터
            </Link>
            <Link
              as={RouterLink}
              to="/faq"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              자주 묻는 질문
            </Link>
            <Link
              as={RouterLink}
              to="/returns"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              교환 및 환불
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>쇼핑하기</ListHeader>
            <Link
              as={RouterLink}
              to="/products?category=사과"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              사과
            </Link>
            <Link
              as={RouterLink}
              to="/products?category=배"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              배
            </Link>
            <Link
              as={RouterLink}
              to="/products?category=감귤"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              감귤
            </Link>
            <Link
              as={RouterLink}
              to="/products?category=포도"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              포도
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>법적 고지</ListHeader>
            <Link
              as={RouterLink}
              to="/privacy"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
              개인정보처리방침
            </Link>
            <Link
              as={RouterLink}
              to="/terms"
              color="fg"
              _hover={{
                color: "positiveButtonBackground",
                textDecoration: "none",
              }}
              transition="color 0.2s"
            >
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
            borderColor: "border",
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: "border",
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="positiveButtonBackground"
            as={RouterLink}
            to="/"
            _hover={{
              color: "positiveButtonHoverBackground",
              textDecoration: "none",
            }}
            transition="color 0.2s"
          >
            bFarm
          </Text>
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"} color="fg">
          © {year} bFarm. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
