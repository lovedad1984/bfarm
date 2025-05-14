import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Stack,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, signOut } = useAuthStore();

  return (
    <>
      <Box background="tomato" w="100%" position="sticky" top={0} zIndex={1000}>
        <Flex
          bg="tomato"
          color="white"
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          align={"center"}
          maxW="container.xl"
          mx="auto"
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  // <CloseIcon w={3} h={3} />
                  <IoClose />
                ) : (
                  // <HamburgerIcon w={5} h={5} />
                  <IoMenu />
                  // <div>icon</div>
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          {/* 로고 */}
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              as={RouterLink}
              to="/"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontWeight="bold"
              fontSize="xl"
              color="green.600"
            >
              bFarm
            </Text>

            {/* 데스크탑 메뉴 */}
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <Stack direction={"row"} spacing={4}>
                <Box>
                  <Link as={RouterLink} to="/products" p={2}>
                    과일 쇼핑
                  </Link>
                </Box>
                <Box>
                  <Link as={RouterLink} to="/about" p={2}>
                    소개
                  </Link>
                </Box>
                <Box>
                  <Link as={RouterLink} to="/contact" p={2}>
                    고객센터
                  </Link>
                </Box>
              </Stack>
            </Flex>
          </Flex>

          {/* 우측 메뉴 */}
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {user ? (
              <>
                <Button as={RouterLink} to="/cart" variant="ghost">
                  장바구니
                </Button>
                <Button onClick={signOut}>로그아웃</Button>
              </>
            ) : (
              <>
                <Button
                  as={RouterLink}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  to={"/login"}
                >
                  로그인
                </Button>
                <Button
                  as={RouterLink}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"green.500"}
                  to={"/signup"}
                  _hover={{
                    bg: "green.400",
                  }}
                >
                  회원가입
                </Button>
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
