import { Box, Spinner, VStack, Text } from "@chakra-ui/react";

const LoadingSpinner = ({
  fullScreen = false,
  message = "로딩 중...",
  size = "xl",
}) => {
  const content = (
    <VStack gap={4}>
      <Spinner size={size} color="green.500" thickness="4px" speed="0.65s" />
      <Text color="fg.muted" fontSize="md">
        {message}
      </Text>
    </VStack>
  );

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="bg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={9999}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" py={20}>
      {content}
    </Box>
  );
};

export default LoadingSpinner;
