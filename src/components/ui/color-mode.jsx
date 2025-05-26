"use client";

import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export function ColorModeProvider(props) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange={false}
      enableSystem={true}
      defaultTheme="light"
      {...props}
    />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return {
      colorMode: "light",
      setColorMode: setTheme,
      toggleColorMode,
    };
  }

  return {
    colorMode: resolvedTheme || "light",
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuSun /> : <LuMoon />;
}

export const ColorModeButton = React.forwardRef(function ColorModeButton(
  props,
  ref
) {
  const { toggleColorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        color="fg"
        _hover={{
          bg: "button.ghost.hover",
        }}
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme light"
      colorPalette="gray"
      colorScheme="light"
      ref={ref}
      {...props}
    />
  );
});

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      colorPalette="gray"
      colorScheme="dark"
      ref={ref}
      {...props}
    />
  );
});
