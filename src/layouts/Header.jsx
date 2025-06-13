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
      bg="bg"
      w="100%"
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottomWidth="1px"
      borderBottomColor="border"
    >
      <Flex
        color="fg"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
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
                color="fg"
                _hover={{ bg: "button.ghost.hover" }}
                borderRadius="md"
                aria-label="Toggle Navigation"
              >
                <IoMenu size="24px" />
              </Box>
            </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content bg="card.bg" color="fg" borderColor="border">
                  <Drawer.Header
                    borderBottomWidth="1px"
                    borderBottomColor="border"
                  >
                    <Drawer.Title color="fg">bFarm 메뉴</Drawer.Title>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton
                        size="sm"
                        color="fg"
                        _hover={{ bg: "button.ghost.hover" }}
                      />
                    </Drawer.CloseTrigger>
                  </Drawer.Header>

                  <Drawer.Body>
                    <VStack gap={4} align="stretch" mt={2}>
                      {/* 메뉴 항목들 */}
                      {mobileMenuItems.map((item) => (
                        <Link
                          key={item.path}
                          as={RouterLink}
                          to={item.path}
                          onClick={() => setDrawerOpen(false)}
                          color="fg"
                          _hover={{ textDecoration: "none" }}
                        >
                          <Box
                            p={3}
                            borderRadius="md"
                            _hover={{
                              bg: "button.ghost.hover",
                            }}
                            transition="background-color 0.2s"
                          >
                            {item.name}
                          </Box>
                        </Link>
                      ))}

                      {/* 장바구니와 로그인 상태에 따른 메뉴 */}
                      <Box
                        borderTopWidth="1px"
                        borderTopColor="border"
                        pt={4}
                        mt={2}
                      >
                        {user ? (
                          <>
                            <Link
                              as={RouterLink}
                              to="/cart"
                              onClick={() => setDrawerOpen(false)}
                              color="fg"
                              _hover={{ textDecoration: "none" }}
                            >
                              <Box
                                p={3}
                                borderRadius="md"
                                _hover={{
                                  bg: "button.ghost.hover",
                                }}
                                transition="background-color 0.2s"
                              >
                                장바구니
                              </Box>
                            </Link>
                            <Box
                              p={3}
                              borderRadius="md"
                              _hover={{
                                bg: "button.ghost.hover",
                              }}
                              transition="background-color 0.2s"
                              cursor="pointer"
                              color="fg"
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
                              color="fg"
                              _hover={{ textDecoration: "none" }}
                            >
                              <Box
                                p={3}
                                borderRadius="md"
                                _hover={{
                                  bg: "button.ghost.hover",
                                }}
                                transition="background-color 0.2s"
                              >
                                로그인
                              </Box>
                            </Link>
                            <Link
                              as={RouterLink}
                              to="/signup"
                              onClick={() => setDrawerOpen(false)}
                              color="fg"
                              _hover={{ textDecoration: "none" }}
                            >
                              <Box
                                p={3}
                                borderRadius="md"
                                _hover={{
                                  bg: "button.ghost.hover",
                                }}
                                transition="background-color 0.2s"
                              >
                                회원가입
                              </Box>
                            </Link>
                          </>
                        )}
                      </Box>
                    </VStack>
                  </Drawer.Body>

                  <Drawer.Footer
                    borderTopWidth="1px"
                    borderTopColor="border"
                    pt={4}
                  >
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
            color="positiveButtonBackground"
            _hover={{
              color: "positiveButtonHoverBackground",
              textDecoration: "none",
            }}
            transition="color 0.2s"
          >
            bFarm
          </Text>

          {/* 데스크탑 메뉴 */}
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Stack direction={"row"} gap={4}>
              <Box>
                <Link
                  as={RouterLink}
                  to="/products"
                  p={2}
                  color="fg"
                  borderRadius="md"
                  _hover={{
                    bg: "gray.100",
                    _dark: { bg: "whiteAlpha.200" },
                    textDecoration: "none",
                  }}
                  transition="background-color 0.2s"
                >
                  과일 쇼핑
                </Link>
              </Box>
              <Box>
                <Link
                  as={RouterLink}
                  to="/about"
                  p={2}
                  color="fg"
                  borderRadius="md"
                  _hover={{
                    bg: "gray.100",
                    _dark: { bg: "whiteAlpha.200" },
                    textDecoration: "none",
                  }}
                  transition="background-color 0.2s"
                >
                  소개
                </Link>
              </Box>
              <Box>
                <Link
                  as={RouterLink}
                  to="/contact"
                  p={2}
                  color="fg"
                  borderRadius="md"
                  _hover={{
                    bg: "gray.100",
                    _dark: { bg: "whiteAlpha.200" },
                    textDecoration: "none",
                  }}
                  transition="background-color 0.2s"
                >
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
          gap={2}
        >
          {user ? (
            <>
              <Box display={{ base: "none", md: "block" }}>
                <ColorModeButton />
              </Box>
              <Button
                as={RouterLink}
                to="/cart"
                variant="ghost"
                color="fg"
                _hover={{
                  bg: "button.ghost.hover",
                }}
              >
                장바구니
              </Button>
              <Button
                onClick={signOut}
                bg="cancelButtonBackgroundGray"
                color="cancelButtonTextGray"
                _hover={{
                  bg: "cancelButtonHoverBackgroundGray",
                }}
              >
                로그아웃
              </Button>
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
                variant={"ghost"}
                to={"/login"}
                color="fg"
                _hover={{
                  bg: "button.ghost.hover",
                  textDecoration: "none",
                }}
              >
                로그인
              </Button>
              <Button
                as={RouterLink}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                bg="positiveButtonBackground"
                color="positiveButtonText"
                to={"/signup"}
                _hover={{
                  bg: "positiveButtonHoverBackground",
                  textDecoration: "none",
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
