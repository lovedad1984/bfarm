// Home.jsx
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  HStack,
  Icon,
  Link,
  AspectRatio, // 이미지 비율 유지에 유용
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  FaAppleAlt,
  FaLeaf,
  FaShoppingBag,
  FaChevronRight,
  FaGift,
} from "react-icons/fa";
import bgImage from "@images/home_bg2.jpg";

// 임시 상품 데이터 (실제로는 API로부터 받아옵니다)
const mockProducts = [
  {
    id: 1,
    imageUrl: "https://placehold.co/200x200",
    name: "[못난이] 알뜰 사과 3kg",
    originalPrice: "15,000원",
    discountPrice: "9,900원",
    discountRate: "34%",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/200x200",
    name: "[친환경] 신선 채소 꾸러미",
    originalPrice: "22,000원",
    discountPrice: "18,500원",
    discountRate: "16%",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/200x200",
    name: "오늘 수확! 제철 과일 랜덤박스",
    originalPrice: "30,000원",
    discountPrice: "25,000원",
    discountRate: "17%",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/200x200",
    name: "깜짝 특가! 유기농 블루베리 500g",
    originalPrice: "18,000원",
    discountPrice: "12,000원",
    discountRate: "33%",
  },
  {
    id: 5,
    imageUrl: "https://placehold.co/200x200",
    name: "깜짝 특가! 유기농 레드베리 500g",
    originalPrice: "18,000원",
    discountPrice: "12,000원",
    discountRate: "33%",
  },
];

// 재사용 가능한 상품 카드 컴포넌트
const ProductCard = ({ product }) => {
  const cardBg = useColorModeValue("white", "gray.700"); // 카드 배경색 (라이트/다크)
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      boxShadow="sm"
      minW="180px"
      maxW="180px"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <AspectRatio ratio={1}>
        <Image src={product.imageUrl} alt={product.name} objectFit="cover" />
      </AspectRatio>
      <Box p={4}>
        <Heading as="h3" size="sm" mb={1} noOfLines={2} lineClamp={1}>
          {product.name}
        </Heading>
        {product.discountRate && (
          <Text fontSize="sm" color="red.500" fontWeight="bold">
            {product.discountRate}
          </Text>
        )}
        <HStack spacing={2} alignItems="baseline">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue("orangePrimary", "orangeDark")}
          >
            {product.discountPrice}
          </Text>
          {product.originalPrice && (
            <Text as="s" fontSize="sm" color={textColor}>
              {product.originalPrice}
            </Text>
          )}
        </HStack>
        {/* 추가 정보 (예: 평점, 리뷰 수 등) */}
      </Box>
    </Box>
  );
};

const Home = () => {
  // 시맨틱 토큰 사용 예시 (theme/index.js에 정의된 값)

  return (
    <Box bg="bg" color="fg" pb={10}>
      {/* 전체 배경 및 글자색 적용 */}
      {/* 1. 메인 배너 (Hero Section) - 간단한 단일 배너 */}
      <Box
        as="section"
        w="100%"
        h={{ base: "300px", md: "450px", lg: "600px" }} // 반응형 높이
        bgImage={`url(${bgImage})`}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white" // 배너 텍스트는 보통 흰색
        mb={10}
      >
        <VStack
          spacing={4}
          textAlign="center"
          bg="rgba(0,0,0,0.4)"
          p={8}
          borderRadius="md"
        >
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl", lg: "3xl" }}
            textShadow="1px 1px 3px rgba(0,0,0,0.7)"
          >
            가치를 더하는 알뜰 소비! test
          </Heading>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            maxW="600px"
            textShadow="1px 1px 2px rgba(0,0,0,0.7)"
          >
            조금은 못생겼지만 맛과 영양은 그대로인 농산물을 만나보세요.
          </Text>
        </VStack>
      </Box>
      {/* 2. 빠른 카테고리 이동 */}
      <Box as="section" px={{ base: 4, md: 8 }} mb={10}>
        <HStack
          spacing={{ base: 1, md: 4 }}
          justify="space-around"
          w="100%"
          pb={2}
        >
          {[
            { icon: FaAppleAlt, label: "못난이 과일", color: "red.500" },
            { icon: FaLeaf, label: "친환경 채소", color: "green.500" },
            { icon: FaShoppingBag, label: "단독 특가", color: "blue.500" },
            { icon: FaGift, label: "선물 세트", color: "purple.500" },
          ].map((item) => (
            <Link key={item.label} _hover={{ textDecoration: "none" }}>
              <VStack
                spacing={1}
                align="center"
                p={{ base: 2, md: 3 }}
                borderRadius="md"
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                minW={{ base: "60px", md: "80px" }}
                maxW="120px" // 최대 너비 제한
                flex="1" // 균등하게 공간 분배
              >
                <Icon
                  as={item.icon}
                  w={{ base: 6, md: 8 }}
                  h={{ base: 6, md: 8 }}
                  color={item.color}
                />
                <Text
                  fontSize={{ base: "2xs", md: "xs" }}
                  fontWeight="medium"
                  whiteSpace="nowrap"
                  color="fg"
                >
                  {item.label}
                </Text>
              </VStack>
            </Link>
          ))}
        </HStack>
      </Box>
      {/* 3. 상품 추천 섹션 (예: "오늘의딜") */}
      <Box as="section" maxW="1024px" mx="auto" px={{ base: 4, md: 8 }} mb={10}>
        <Flex mb={4} alignItems="center">
          <Heading as="h2" size="lg" color="text.subtitle">
            오늘의딜 ⏰
          </Heading>
          <Spacer />
          <Link
            color="fg"
            fontWeight="medium"
            _hover={{ color: useColorModeValue("orangePrimary", "orangeDark") }}
          >
            더보기 <Icon as={FaChevronRight} boxSize={3} />
          </Link>
        </Flex>
        {/* 웹: 5개만 보이는 그리드, 모바일: 가로 스크롤 */}
        <Box>
          {/* 웹에서만 보이는 그리드 (5개) */}
          <SimpleGrid
            columns={5}
            spacing={4}
            display={{ base: "none", lg: "grid" }}
          >
            {mockProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>

          {/* 모바일에서만 보이는 가로 스크롤 */}
          <HStack
            spacing={4}
            overflowX="auto"
            pb={6}
            display={{ base: "flex", lg: "none" }}
            sx={{
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: useColorModeValue("gray.300", "gray.600"),
                borderRadius: "8px",
              },
            }}
          >
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </HStack>
        </Box>
      </Box>
      {/* 4. 또 다른 상품 섹션 (예: "MD 추천") */}
      <Box as="section" maxW="1024px" mx="auto" px={{ base: 4, md: 8 }} mb={10}>
        <Flex mb={4} alignItems="center">
          <Heading as="h2" size="lg" color="text.subtitle">
            MD 추천! 놓치지 마세요 🌟
          </Heading>
          <Spacer />
          <Link
            color="fg"
            fontWeight="medium"
            _hover={{ color: useColorModeValue("orangePrimary", "orangeDark") }}
          >
            더보기 <Icon as={FaChevronRight} boxSize={3} />
          </Link>
        </Flex>
        <Box>
          {/* 웹에서만 보이는 그리드 (5개) */}
          <SimpleGrid
            columns={5}
            spacing={4}
            display={{ base: "none", lg: "grid" }}
          >
            {mockProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>

          {/* 모바일에서만 보이는 가로 스크롤 */}
          <HStack
            spacing={4}
            overflowX="auto"
            pb={6}
            display={{ base: "flex", lg: "none" }}
            sx={{
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: useColorModeValue("gray.300", "gray.600"),
                borderRadius: "8px",
              },
            }}
          >
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </HStack>
        </Box>
      </Box>
      {/* 5. 스토리/콘텐츠 섹션 */}
      <Box
        as="section"
        px={{ base: 4, md: 8 }}
        mb={10}
        bg={useColorModeValue("green.50", "gray.700")} // 섹션 배경색 다르게
        py={10}
      >
        <VStack spacing={3} textAlign="center" mb={6} maxW="1024px" mx="auto">
          <Heading as="h2" size="xl" color="text.subtitle">
            bFarm 이야기
          </Heading>
          <Text color="text.normal" maxW="container.md">
            우리는 버려지는 농산물에 새 가치를 부여하고, 지속 가능한 소비를
            만들어갑니다.
          </Text>
        </VStack>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={6}
          gap={4}
          maxW="1024px"
          mx="auto"
        >
          {[
            {
              title: "못난이 농산물이란?",
              content: "모양은 조금 달라도 맛과 영양은 그대로!",
              imageUrl: "https://placehold.co/400x300",
            },
            {
              title: "생산자와의 상생",
              content: "정성껏 키운 농산물이 제값을 받을 수 있도록.",
              imageUrl: "https://placehold.co/400x300",
            },
            {
              title: "환경을 생각하는 포장",
              content: "친환경 포장재를 사용하여 지구를 지켜요.",
              imageUrl: "https://placehold.co/400x300",
            },
          ].map((story) => (
            <Box
              key={story.title}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              bg={useColorModeValue("white", "gray.800")}
              boxShadow="sm"
            >
              <AspectRatio ratio={16 / 9} mb={3}>
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  borderRadius="md"
                  objectFit="cover"
                />
              </AspectRatio>
              <Heading as="h3" size="md" mb={2}>
                {story.title}
              </Heading>
              <Text fontSize="sm" color="text.normal">
                {story.content}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      {/* 추가적으로 고객 후기, 이벤트 배너 등 다양한 섹션을 구성 */}
    </Box>
  );
};

export default Home;
