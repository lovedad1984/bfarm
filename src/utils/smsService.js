import axios from "axios";

class SMSService {
  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    this.smsEnabled = import.meta.env.VITE_SMS_API_ENABLED === "true";
  }

  // 인증번호 발송
  async sendVerificationCode(phoneNumber, name) {
    try {
      // 개발 환경이거나 SMS API가 비활성화된 경우 테스트 모드
      if (this.isDevelopment || !this.smsEnabled) {
        return this.sendTestVerificationCode(phoneNumber, name);
      }

      // 프로덕션 환경에서 실제 SMS API 호출
      const response = await axios.post(
        `${this.apiUrl}/api/send-verification-sms`,
        {
          phone: phoneNumber,
          name: name,
        },
        {
          timeout: 10000, // 10초 타임아웃
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return {
          success: true,
          message: "인증번호가 발송되었습니다.",
          // 실제 환경에서는 보안상 코드를 반환하지 않음
        };
      } else {
        throw new Error(
          response.data.message || "인증번호 발송에 실패했습니다."
        );
      }
    } catch (error) {
      console.error("SMS 발송 오류:", error);

      if (error.code === "ECONNABORTED") {
        throw new Error("요청 시간이 초과되었습니다. 다시 시도해주세요.");
      } else if (error.response) {
        throw new Error(
          error.response.data?.message || "서버 오류가 발생했습니다."
        );
      } else if (error.request) {
        throw new Error("네트워크 연결을 확인해주세요.");
      } else {
        throw new Error(
          error.message || "인증번호 발송 중 오류가 발생했습니다."
        );
      }
    }
  }

  // 테스트 모드용 인증번호 발송 (개발 환경)
  async sendTestVerificationCode(phoneNumber, name) {
    // 개발 환경에서는 시뮬레이션
    const delay = Math.random() * 2000 + 1000; // 1-3초 랜덤 지연

    return new Promise((resolve) => {
      setTimeout(() => {
        const testCode = this.generateTestCode();
        console.log(
          `[테스트 모드] ${name}님 (${phoneNumber})에게 인증번호 발송: ${testCode}`
        );

        resolve({
          success: true,
          message: `테스트 인증번호가 생성되었습니다: ${testCode}`,
          testCode: testCode, // 개발 환경에서만 반환
        });
      }, delay);
    });
  }

  // 테스트용 인증번호 생성
  generateTestCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 인증번호 검증 (실제 환경에서는 서버에서 처리)
  async verifyCode(phoneNumber, code, sentCode) {
    try {
      // 개발 환경이거나 SMS API가 비활성화된 경우 테스트 모드
      if (this.isDevelopment || !this.smsEnabled) {
        return this.verifyTestCode(code, sentCode);
      }

      // 프로덕션 환경에서 실제 API 호출
      const response = await axios.post(
        `${this.apiUrl}/api/verify-sms-code`,
        {
          phone: phoneNumber,
          code: code,
        },
        {
          timeout: 5000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: response.data.success,
        message: response.data.message || "인증이 완료되었습니다.",
      };
    } catch (error) {
      console.error("인증번호 검증 오류:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "인증번호 검증 중 오류가 발생했습니다.",
      };
    }
  }

  // 테스트 모드용 인증번호 검증
  verifyTestCode(inputCode, correctCode) {
    const isValid = inputCode === correctCode;

    return {
      success: isValid,
      message: isValid
        ? "인증이 완료되었습니다."
        : "인증번호가 일치하지 않습니다.",
    };
  }

  // 휴대폰 번호 포맷팅
  formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    return phoneNumber;
  }

  // 휴대폰 번호 유효성 검사
  isValidPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, "");
    return /^01[0-9]{8,9}$/.test(cleaned);
  }
}

// 싱글톤 인스턴스 생성
export const smsService = new SMSService();
export default smsService;
