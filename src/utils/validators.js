// 이메일 유효성 검사
export const validateEmail = (email) => {
  if (!email) return "이메일을 입력해주세요";
  if (!/\S+@\S+\.\S+/.test(email)) return "올바른 이메일 형식이 아닙니다";
  return "";
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  if (!password) return "비밀번호를 입력해주세요";
  if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다";
  return "";
};

// 비밀번호 확인 검사
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다";
  return "";
};

// 필수 입력값 검사
export const validateRequired = (value, fieldName) => {
  if (!value) return `${fieldName}을(를) 입력해주세요`;
  return "";
};

// 모든 필드 유효성 검사
export const validateSignupForm = (formData, verification) => {
  const errors = {};

  // 이메일 검사
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  // 비밀번호 검사
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  // 비밀번호 확인 검사
  const confirmPasswordError = validateConfirmPassword(
    formData.password,
    formData.confirmPassword
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  // 사용자 이름 검사
  const usernameError = validateRequired(formData.username, "사용자 이름");
  if (usernameError) errors.username = usernameError;

  // 주소 검사
  const addressError = validateRequired(formData.address, "주소");
  if (addressError) errors.address = addressError;

  // 본인인증 검사
  if (!verification.isVerified) {
    errors.verification = "본인인증이 필요합니다";
  }

  // 필수 약관 동의 검사
  if (!formData.termsAgreed) {
    errors.termsAgreed = "이용약관에 동의해주세요";
  }

  if (!formData.privacyAgreed) {
    errors.privacyAgreed = "개인정보 처리방침에 동의해주세요";
  }

  return errors;
};
