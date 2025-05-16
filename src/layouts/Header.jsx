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
  Portal,
  CloseButton,
  VStack,
  Drawer,
} from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";
import { IoMenu } from "react-icons/io5";
import { redirect, Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const Header = () => {
  const { user, signOut } = useAuthStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const mobileMenuItems = [
    { name: "과일 쇼핑", path: "/products" },
    { name: "소개", path: "/about" },
    { name: "고객센터", path: "/contact" },
  ];
  return (
    <Box
      background="bodyBackground"
      w="100%"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex
        color="bodyTextColor"
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
          {/* 햄버거 메뉴 버튼 */}
          <Drawer.Root
            open={drawerOpen}
            onOpenChange={(e) => setDrawerOpen(e.open)}
            placement="end"
          >
            <Drawer.Trigger asChild>
              <Box
                as="button"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: "rgba(0,0,0,0.05)" }}
                aria-label="Toggle Navigation"
              >
                <IoMenu size="24px" color="red.500" />
              </Box>
            </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>bFarm 메뉴</Drawer.Title>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Header>

                  <Drawer.Body>
                    <VStack spacing={4} align="stretch" mt={2}>
                      {/* 메뉴 항목들 */}
                      {mobileMenuItems.map((item) => (
                        <Link
                          key={item.path}
                          as={RouterLink}
                          to={item.path}
                          onClick={() => setDrawerOpen(false)} // 메뉴 클릭 시 드로어 닫기
                        >
                          <Box
                            p={2}
                            borderRadius="md"
                            _hover={{ bg: "gray.100" }}
                          >
                            {item.name}
                          </Box>
                        </Link>
                      ))}

                      {/* 장바구니와 로그인 상태에 따른 메뉴 */}
                      <Box borderTopWidth="1px" pt={4} mt={2}>
                        {user ? (
                          <>
                            <Link
                              as={RouterLink}
                              to="/cart"
                              onClick={() => setDrawerOpen(false)}
                            >
                              <Box
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: "gray.100" }}
                              >
                                장바구니
                              </Box>
                            </Link>
                            <Box
                              p={2}
                              borderRadius="md"
                              _hover={{ bg: "gray.100" }}
                              onClick={() => {
                                signOut();
                                setDrawerOpen(false);
                              }}
                            >
                              로그아웃
                            </Box>
                          </>
                        ) : (
                          <>
                            <Link
                              as={RouterLink}
                              to="/login"
                              onClick={() => setDrawerOpen(false)}
                            >
                              <Box
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: "gray.100" }}
                              >
                                로그인
                              </Box>
                            </Link>
                            <Link
                              as={RouterLink}
                              to="/signup"
                              onClick={() => setDrawerOpen(false)}
                            >
                              <Box
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: "gray.100" }}
                              >
                                회원가입
                              </Box>
                            </Link>
                          </>
                        )}
                      </Box>
                    </VStack>
                  </Drawer.Body>

                  <Drawer.Footer>
                    <ColorModeButton />
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Flex>

        {/* 로고 */}
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
        >
          <Text
            as={RouterLink}
            to="/"
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontWeight="bold"
            fontSize="xl"
            color="teal"
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
              <Box display={{ base: "none", md: "block" }}>
                <ColorModeButton />
              </Box>

              <Button
                as={RouterLink}
                display={{ base: "none", md: "inline-flex" }}
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
                colorPalette="teal"
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
  );
};

export default Header;
