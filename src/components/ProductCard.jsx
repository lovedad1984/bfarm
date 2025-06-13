import { Badge, Box, Image } from "@chakra-ui/react";

const ProductCard = ({ product, onAddToCart }) => {
  const formatPrice = (price) => {
    return price.toLocaleString() + "원";
  };
  return (
    <Box
      bg="white"
      borderRadius="12px"
      overflow="hidden"
      boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      }}
      cursor="pointer"
    >
      {/* 상품 이미지 */}
      <Box>
        <Image
          src={product.image}
          alt={product.name}
          w="100%"
          h="200px"
          objectFit="cover"
        />

        {/* 배지 */}
        {product.badge && (
          <Badge
            position="absolute"
            top="8px"
            left="8px"
            bg={product.badge === "MD Pick" ? "red.500" : "green.500"}
            color="white"
            fontSize="xs"
            px="6px"
            py="2px"
            borderRadius="4px"
          >
            {product.badge}
          </Badge>
        )}
        {/* 유기농 배지 */}
        {product.isOrganic && (
          <Badge
            position="absolute"
            top="8px"
            right="8px"
            bg="green.600"
            color="white"
            fontSize="xs"
            px="6px"
            py="2px"
            borderRadius="4px"
          >
            지금제철
          </Badge>
        )}

        {/* 찜하기 버튼 */}
        <Button
          position="absolute"
          top="8px"
          right={product.isOrganic ? "70px" : "8px"}
          bg="white"
          color="gray.600"
          size="sm"
          borderRadius="50%"
          w="32px"
          h="32px"
          minW="32px"
          p="0"
          boxShadow="md"
          _hover={{
            bg: "gray.50",
            color: "red.500",
          }}
        >
          <AiOutlineHeart size="16px" />
        </Button>
      </Box>
      {/* 상품 정보 */}
      <VStack align="stretch" p="16px" spacing="8px">
        <Text fontSize="14px" fontWeight="600" lineHeight="1.4" noOfLines={2}>
          {product.name}
        </Text>

        {/* 가격 정보 */}
        <VStack align="stretch" spacing="4px">
          <HStack spacing="8px">
            <Badge colorScheme="red" fontSize="xs">
              {product.discount}%
            </Badge>
            <Text
              fontSize="12px"
              color="gray.500"
              textDecoration="line-through"
            >
              {formatPrice(product.originalPrice)}
            </Text>
          </HStack>

          <Text fontSize="18px" fontWeight="700" color="gray.900">
            {formatPrice(product.price)}
          </Text>
        </VStack>

        {/* 무료배송 */}
        {product.isFreeShipping && (
          <Text fontSize="12px" color="blue.600" fontWeight="500">
            🚚 무료배송
          </Text>
        )}

        {/* 장바구니 버튼 */}
        <Button
          colorScheme="blue"
          size="sm"
          leftIcon={<BsCart3 />}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
          mt="8px"
        >
          담기
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
