// 이메일 유효성 검사
export const validateEmail = (email) => {
  if (!email) return "이메일을 입력해주세요";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다";
  return "";
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  if (!password) return "비밀번호를 입력해주세요";
  if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다";
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return "비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다";
  }
  return "";
};

// 비밀번호 확인 검사
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "비밀번호 확인을 입력해주세요";
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다";
  return "";
};

// 사용자 이름 유효성 검사
export const validateUsername = (username) => {
  if (!username) return "사용자 이름을 입력해주세요";
  if (username.length < 2) return "사용자 이름은 2자 이상이어야 합니다";
  if (username.length > 20) return "사용자 이름은 20자 이하여야 합니다";
  if (!/^[가-힣a-zA-Z0-9_]+$/.test(username)) {
    return "사용자 이름은 한글, 영문, 숫자, 언더스코어만 사용 가능합니다";
  }
  return "";
};

// 주소 유효성 검사
export const validateAddress = (address) => {
  if (!address) return "주소를 입력해주세요";
  return "";
};

// 휴대폰 번호 유효성 검사
export const validatePhoneNumber = (phone) => {
  if (!phone) return "휴대폰 번호를 입력해주세요";
  const phoneRegex = /^01[0-9]{8,9}$/;
  if (!phoneRegex.test(phone.replace(/-/g, ""))) {
    return "올바른 휴대폰 번호 형식이 아닙니다";
  }
  return "";
};

// 이름 유효성 검사
export const validateName = (name) => {
  if (!name) return "이름을 입력해주세요";
  if (name.length < 2) return "이름은 2자 이상이어야 합니다";
  if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
    return "이름은 한글, 영문만 사용 가능합니다";
  }
  return "";
};

// 인증번호 유효성 검사
export const validateVerificationCode = (code) => {
  if (!code) return "인증번호를 입력해주세요";
  if (!/^\d{6}$/.test(code)) return "인증번호는 6자리 숫자여야 합니다";
  return "";
};

// 필수 입력값 검사
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && !value.trim())) {
    return `${fieldName}을(를) 입력해주세요`;
  }
  return "";
};

// 회원가입 폼 전체 유효성 검사
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
  const usernameError = validateUsername(formData.username);
  if (usernameError) errors.username = usernameError;

  // 주소 검사
  const addressError = validateAddress(formData.address);
  if (addressError) errors.address = addressError;

  // 본인인증 검사 (선택사항이므로 주석 처리)
  // if (!verification.isVerified) {
  //   errors.verification = "본인인증이 필요합니다";
  // }

  // 필수 약관 동의 검사
  if (!formData.termsAgreed) {
    errors.termsAgreed = "이용약관에 동의해주세요";
  }

  if (!formData.privacyAgreed) {
    errors.privacyAgreed = "개인정보 처리방침에 동의해주세요";
  }

  return errors;
};

// 로그인 폼 유효성 검사
export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validateRequired(formData.password, "비밀번호");
  if (passwordError) errors.password = passwordError;

  return errors;
};
