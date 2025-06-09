import { create } from "zustand";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toaster } from "@/components/ui/toaster";

export const useAuthStore = create((set, get) => ({
  user: null, // 현재 로그인된 사용자 정보
  userProfile: null, // Firestore에서 가져온 사용자 프로필 정보
  loading: true, // 인증 관련 작업 진행 중인지 여부
  error: null, // 인증 과정에서 발생한 에러 메시지

  // 회원가입 함수 - Firestore에 추가 정보 저장 포함
  signUp: async (email, password, userData) => {
    try {
      set({ loading: true, error: null });

      // Firebase Authentication으로 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore에 사용자 추가 정보 저장
      const userProfileData = {
        uid: user.uid,
        email: user.email,
        username: userData.username,
        address: userData.address,
        addressDetail: userData.addressDetail || "",
        zipCode: userData.zipCode,
        isVerified: userData.isVerified || false,
        marketingAgreed: userData.marketingAgreed || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, "users", user.uid), userProfileData);
        console.log("Firestore 프로필 저장 성공");
        // 회원가입 성공 토스터 Signup.jsx 에서 제어
      } catch (firestoreError) {
        console.error("Firestore 저장 실패:", firestoreError);
        // Firestore 실패해도 회원가입은 성공으로 처리
        // (나중에 프로필은 업데이트 가능)
        throw new Error(
          "회원가입은 완료되었지만 프로필 저장에 실패했습니다. 나중에 프로필을 업데이트해주세요."
        );
      }

      console.log("회원가입 완전 성공:", user.email);
    } catch (error) {
      console.error("회원가입 오류:", error);
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // 로그인 함수
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // 로그아웃 함수
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await firebaseSignOut(auth);
      set({ userProfile: null }); // 사용자 프로필 정보 초기화

      toaster.success({
        title: "로그아웃 완료",
        description: "안전하게 로그아웃되었습니다.",
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // 비밀번호 재설정 이메일 발송
  sendPasswordResetEmail: async (email) => {
    try {
      set({ loading: true, error: null });

      await sendPasswordResetEmail(auth, email, {
        // 한국어 설정 (선택사항)
        url: window.location.origin + "/login", // 비밀번호 재설정 후 돌아갈 URL
        handleCodeInApp: false, // 이메일에서 직접 처리
      });

      console.log("비밀번호 재설정 이메일 발송 성공:", email);
      return {
        success: true,
        message: "비밀번호 재설정 이메일을 발송했습니다.",
      };
    } catch (error) {
      console.error("비밀번호 재설정 이메일 발송 오류:", error);

      let errorMessage = "비밀번호 재설정 이메일 발송에 실패했습니다.";

      // Firebase 에러 코드에 따른 한국어 메시지
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "등록되지 않은 이메일입니다.";
          break;
        case "auth/invalid-email":
          errorMessage = "올바르지 않은 이메일 형식입니다.";
          break;
        case "auth/too-many-requests":
          errorMessage = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
          break;
        default:
          errorMessage = error.message;
      }

      set({ error: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  // 사용자 프로필 정보 가져오기
  fetchUserProfile: async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const profileData = userDoc.data();
        set({ userProfile: profileData });
        return profileData;
      }
      return null;
    } catch (error) {
      console.error("사용자 프로필 가져오기 오류:", error);
      set({ error: error.message });
      return null;
    }
  },

  // 사용자 프로필 업데이트
  updateUserProfile: async (uid, updateData) => {
    try {
      set({ loading: true, error: null });

      const updatedData = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", uid), updatedData, { merge: true });

      // 로컬 상태 업데이트
      set((state) => ({
        userProfile: { ...state.userProfile, ...updatedData },
      }));

      return true;
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      set({ error: error.message });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // 인증 상태 초기화 및 감지
  initialize: () => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // 로그인된 경우 Firestore에서 추가 프로필 정보 가져오기
          const { fetchUserProfile } = get();
          await fetchUserProfile(user.uid);
        } else {
          // 로그아웃된 경우 프로필 정보 초기화
          set({ userProfile: null });
        }
        set({ user, loading: false });
      },
      (error) => {
        console.error("인증 상태 감지 오류:", error);
        set({ error: error.message, loading: false });
      }
    );

    return unsubscribe;
  },

  // 에러 메시지 초기화
  clearError: () => set({ error: null }),
}));
