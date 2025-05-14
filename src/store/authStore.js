import { create } from "zustand";

import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = create((set) => ({
  user: null, // 현재 로그인된 사용자 정보(초기에는 null)
  loading: true, // 인증 관련 작업 진행 중인지 여부 (초기에는 true, 앱 시작 시 인증 상태 확인)
  error: null, // 인증 과정에서 발생한 에러 메시지

  signUp: async (email, password) => {
    try {
      // 로딩 상태 시작, 이전 에러 초기화
      set({ loading: true, error: null });
      // 이메일과 비밀번호로 새 사용자 생성
      await createUserWithEmailAndPassword(auth, email, password);
      // 성공 시 user 상태는 onAuthStateChanged 콜백에서 업데이트 됩니다.
    } catch (error) {
      // 에러 발생 시 에러 메시지 저장
      set({ error: error.message });
    } finally {
      // 작업 완료 후 로딩 상태 종료
      set({ loading: false });
    }
  },
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await firebaseSignOut(auth);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  // 인증 상태 초기화 및 감지 액션
  initialize: () => {
    // onAuthStateChanged는 Firebase 인증 상태의 변경을 감지하는 리스너를 등록합니다.
    // 사용자가 로그인하거나 로그아웃할 때마다 콜백 함수가 호출됩니다.
    const unsubscribe = onAuthStateChanged(
      auth, // Firebase auth 객체
      (user) => {
        // 인증 상태 변경 시 호출되는 콜백
        // user 객체가 있으면 로그인된 상태, null이면 로그아웃된 상태
        set({ user, loading: false });
      },
      (error) => {
        // 에러 발생 시 호출되는 콜백
        set({ error: error.message, loading: false });
      }
    );
    // onAuthStateChanged는 구독 해제 함수를 반환합니다.
    // 이 함수를 호출하면 리스너가 제거되어 메모리 누수를 방지할 수 있습니다.
    // 컴포넌트가 언마운트될 때 이 함수를 호출하는 것이 좋습니다.
    return unsubscribe;
  },
}));
