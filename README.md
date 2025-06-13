# 🍎 bFarm - B급 과일 온라인 직거래 쇼핑몰

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-11.7.1-orange)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-3.17.0-green)
![Vite](https://img.shields.io/badge/Vite-6.3.5-yellow)

> 신선한 제철 과일을 편리하게 구매할 수 있는 온라인 쇼핑몰 웹 애플리케이션

## 🌟 프로젝트 소개

bFarm은 농장에서 직접 소비자에게 전달하는 B급 과일 온라인 쇼핑몰입니다.
외관상 완벽하지 않지만 맛과 영양은 그대로인 과일들을 합리적인 가격에 만나보세요.

### 🎯 핵심 기능

- ✅ **사용자 인증** - 회원가입, 로그인, 비밀번호 재설정
- ✅ **사용자 프로필** - 개인정보 관리 및 주소 관리
- ✅ **주소 검색** - 다음 우편번호 API 연동
- ✅ **SMS 인증** - 본인인증 서비스
- ✅ **반응형 디자인** - 모바일 친화적 UI/UX
- 🚧 **상품 관리** - 과일 상품 브라우징 및 검색 (개발 예정)
- 🚧 **장바구니** - 상품 담기 및 주문 관리 (개발 예정)
- 🚧 **결제 시스템** - 안전한 온라인 결제 (개발 예정)
- 🚧 **리뷰 시스템** - 상품 후기 및 평점 (개발 예정)

## 🚀 라이브 데모

**배포된 사이트**: [https://bfarm-d1a12.web.app/](https://bfarm-d1a12.web.app/)

## 🛠️ 기술 스택

### Frontend

- **React 19.1.0** - UI 라이브러리
- **React Router DOM 7.6.0** - 클라이언트 사이드 라우팅
- **Chakra UI 3.17.0** - 컴포넌트 라이브러리
- **Zustand 5.0.4** - 상태 관리
- **React Icons 5.5.0** - 아이콘 라이브러리
- **Framer Motion 12.11.0** - 애니메이션
- **Next Themes 0.4.6** - 다크모드 지원

### Backend & Services

- **Firebase Authentication** - 사용자 인증
- **Cloud Firestore** - NoSQL 데이터베이스
- **Firebase Storage** - 파일 저장소
- **Firebase Hosting** - 정적 사이트 호스팅
- **Axios 1.9.0** - HTTP 클라이언트

### Development Tools

- **Vite 6.3.5** - 빌드 도구 및 개발 서버
- **ESLint 9.25.0** - 코드 품질 관리
- **JavaScript (ES6+)** - TypeScript 미사용

## 📁 프로젝트 구조

```
bfarm/
├── public/                    # 정적 파일
├── src/
│   ├── assets/               # 이미지 등 정적 자원
│   │   └── images/
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── ui/              # Chakra UI 커스텀 컴포넌트
│   │   ├── LoadingSpinner.jsx
│   │   ├── NavigationOverlay.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ScrollToTop.jsx
│   ├── hooks/                # 커스텀 훅
│   │   └── useRouterGuard.js
│   ├── layouts/              # 레이아웃 컴포넌트
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── Home.jsx
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   ├── services/             # 외부 서비스 설정
│   │   └── firebase.js
│   ├── store/                # Zustand 상태 관리
│   │   ├── authStore.js
│   │   └── navigationStore.js
│   ├── theme/                # Chakra UI 테마
│   │   └── index.js
│   ├── utils/                # 유틸리티 함수
│   │   ├── addressSearch.js
│   │   ├── smsService.js
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── .github/
│   └── workflows/            # GitHub Actions CI/CD
├── firebase.json             # Firebase 설정
├── vite.config.js           # Vite 설정
└── package.json
```

## 🚀 시작하기

### 필수 요구사항

- **Node.js** 18.x 이상
- **npm** 또는 **yarn**
- **Firebase 프로젝트** (Authentication, Firestore, Hosting 활성화)

### 설치 과정

1. **저장소 클론**

   ```bash
   git clone https://github.com/lovedad1984/bfarm
   cd bfarm
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**

   `.env` 파일을 프로젝트 루트에 생성하고 Firebase 설정을 추가하세요:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   애플리케이션이 `http://localhost:5173`에서 실행됩니다.

### 빌드 및 배포

1. **프로덕션 빌드**

   ```bash
   npm run build
   ```

2. **Firebase 배포**

   ```bash
   firebase deploy
   ```

3. **빌드 미리보기**
   ```bash
   npm run preview
   ```

## 🔧 개발 환경 설정

### 코드 스타일 검사

```bash
npm run lint
```

### Firebase 로컬 에뮬레이터 (선택사항)

```bash
firebase emulators:start
```

## 📱 주요 페이지 및 기능

### 🏠 홈페이지 (`/`)

- 브랜드 소개 및 주요 기능 안내
- 반응형 히어로 섹션

### 👤 사용자 인증

- **회원가입** (`/signup`) - 이메일 인증, 주소 검색, 약관 동의
- **로그인** (`/login`) - 이메일/비밀번호 로그인
- **비밀번호 재설정** (`/forgot-password`) - 이메일 기반 비밀번호 재설정

### 👨‍💼 사용자 프로필 (`/profile`)

- 개인정보 관리
- 주소 정보 수정
- 계정 설정

### 🔒 보안 기능

- **Protected Routes** - 인증된 사용자만 접근 가능한 페이지
- **Router Guard** - 페이지 접근 권한 관리
- **Firebase Authentication** - 안전한 사용자 인증

## 🎨 UI/UX 특징

### 테마 시스템

- **라이트/다크 모드** 지원
- **반응형 디자인** (모바일 우선)
- **Chakra UI 커스텀 테마**

### 애니메이션

- **Framer Motion**을 활용한 부드러운 페이지 전환
- **로딩 스피너** 및 상태 피드백

### 사용자 경험

- **Navigation Overlay** - 모바일 친화적 네비게이션
- **ScrollToTop** - 페이지 변경 시 자동 스크롤 상단 이동
- **Toast 알림** - 사용자 액션에 대한 즉시 피드백

## 🏗️ 상태 관리

### Zustand 스토어

- **authStore.js** - 사용자 인증 상태 관리
- **navigationStore.js** - 네비게이션 상태 관리

```javascript
// 사용 예시
import { useAuthStore } from "./store/authStore";

const { user, login, logout, loading } = useAuthStore();
```

## 🛡️ 보안 고려사항

- **Firebase Security Rules** 적용
- **클라이언트 사이드 유효성 검사**
- **서버 사이드 인증** (Firebase Auth)
- **HTTPS 강제 적용**

## 🔄 향후 개발 계획

### Phase 1: 기본 쇼핑몰 기능

- [ ] 상품 카탈로그 페이지
- [ ] 상품 상세 페이지
- [ ] 장바구니 기능
- [ ] 주문/결제 시스템

### Phase 2: 고급 기능

- [ ] 상품 검색 및 필터링
- [ ] 위시리스트
- [ ] 상품 리뷰 및 평점
- [ ] 주문 추적

### Phase 3: 관리자 기능

- [ ] 관리자 대시보드
- [ ] 상품 관리
- [ ] 주문 관리
- [ ] 사용자 관리

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **프로젝트 링크**: [https://github.com/lovedad1984/bfarm](https://github.com/lovedad1984/bfarm)
- **라이브 데모**: [https://bfarm-d1a12.web.app/](https://bfarm-d1a12.web.app/)

## 🙏 감사의 말

- [Chakra UI](https://chakra-ui.com/) - 아름다운 UI 컴포넌트
- [Firebase](https://firebase.google.com/) - 백엔드 서비스
- [React](https://reactjs.org/) - UI 라이브러리
- [Vite](https://vitejs.dev/) - 빠른 빌드 도구

---

⭐ 이 프로젝트가 유용하다면 스타를 눌러주세요!
