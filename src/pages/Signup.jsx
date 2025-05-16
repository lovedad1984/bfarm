import React, { useEffect, useState } from "react";

import { useDisclosure, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Toaster, toaster } from "@/components/ui/toaster";
const Signup = () => {
  const navigate = useNavigate();
  //   const toast = useToast();

  const {
    isOpen: isVerificationOpen,
    onOpen: onVerificationOpen,
    onClose: onVerificationClose,
  } = useDisclosure();
  const { signUp, user, loading, error } = useAuthStore;

  // 스크립트 로딩 상태
  const [isPostcodeScriptLoaded, setIsPostcodeScriptLoaded] = useState(false);

  // 회원가입 폼
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    address: "",
    addressDetail: "",
    zipCode: "",
    phone: "",
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
  });

  // 본인확인 관련
  const [verification, setVerification] = useState({
    name: "",
    verificationCode: "",
    sentCode: "",
    isVerified: false,
    isCodeSent: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 에러 메시지 표시
  //   useEffect(() => {
  //     if (error) {
  //       toast({
  //         title: "회원가입 오류",
  //         description: error,
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     }
  //   }, [error, toast]);
  // 로그인 상태일 경우 메인 페이지로 이동
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // 다음 주소 API 스크립트 로드
  useEffect(() => {
    const loadPostcodeScript = () => {
      if (window.daum && window.daum.Postcode) {
        setIsPostcodeScriptLoaded(true);
        return;
      }
    };
  });

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toaster.create({
            description: "toast test",
            type: "info",
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};

export default Signup;
