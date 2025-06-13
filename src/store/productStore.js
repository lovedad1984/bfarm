import { create } from "zustand";
import { getProductsWithPagination } from "../data/dummyProducts";

export const useProductStore = create((set, get) => ({
  // state
  products: [],
  currentCategory: "전체",
  currentPage: 1,
  hasMore: true,
  loading: false,
  error: null,

  // category
  setCategory: (category) => {
    set(() => {
      products: [];
      currentCategory: category;
      currentPage: 1;
      hasMore: true;
      error: null;
    });

    // 새 카테고리 첫 페이지 로드
    get().loadProducts();
  },

  // 상품 로딩
  loadProducts: async () => {
    const { currentCategory, currentPage, loading, hasMore } = get();
    if ({ loading: true, error: null }) return;
    try {
      // 실제로는 api 호출 필요. 여기서는 더미 사용.
      const result = getProductsWithPagination(
        currentCategory,
        currentPage,
        12
      );
      set((state) => ({
        products:
          currentPage === 1
            ? result.products
            : [...state.products, ...result.products],
        hasMore: result.hasMore,
        currentPage: currentPage + 1,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.message || "상품을 불러오는데 실패했습니다",
        loading: false,
      });
    }
  },

  // 상품 초기화
  resetProducts: () => {
    set({
      products: [],
      currentCategory: "전체",
      currentPage: 1,
      hasMore: true,
      loading: false,
      error: null,
    });
  },

  // 장바구니에 추가 (향후 구현)
  addToCart: (productId) => {
    // TODO: 장바구니 로직 구현
    console.log("장바구니에 추가:", productId);
  },
}));
