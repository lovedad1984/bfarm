import { create } from "zustand";

export const useNavigationStore = create((set, get) => ({
  isNavigating: false,
  fromPath: null,
  toPath: null,

  // 네비게이션 시작
  startNavigation: (fromPath, toPath) => {
    set({
      isNavigating: true,
      fromPath,
      toPath,
    });
  },

  //네비게이션 완료
  completeNavigation: () => {
    set({
      isNavigating: false,
      fromPath: null,
      toPath: null,
    });
  },

  // 네비게이션 상태 리셋
  resetNavigation: () => {
    set({
      isNavigating: false,
      fromPath: null,
      toPath: null,
    });
  },
}));
