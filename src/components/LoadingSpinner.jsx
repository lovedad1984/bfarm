import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const LoadingSpinner = ({ message = "로딩 중..." }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg.canvas"
      zIndex="9999"
    >
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text color="fg" fontSize="lg" fontWeight="medium">
          {message}
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner;
