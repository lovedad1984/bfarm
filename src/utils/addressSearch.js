// utils/addressSearch.js
import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";

export const useAddressSearch = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const loadPostcodeScript = () => {
      if (window.daum && window.daum.Postcode) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Daum Postcode script");
        toaster.error({
          title: "주소 API 로드 실패",
          description:
            "주소 검색 기능을 사용할 수 없습니다. 페이지를 새로고침 해주세요.",
        });
      };
      document.head.appendChild(script);
    };

    loadPostcodeScript();
  }, []);

  const openPostcodeSearch = (callback) => {
    if (!isScriptLoaded) {
      toaster.info({
        title: "주소 API 로딩 중",
        description: "주소 검색 API를 로드하는 중입니다. 잠시만 기다려주세요.",
      });
      return;
    }

    new window.daum.Postcode({
      width: "100%",
      height: "100%",
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
        }

        // 콜백 함수 호출
        callback({
          zipCode: data.zonecode,
          address: addr + (extraAddr ? extraAddr : ""),
        });

        // 커서를 상세주소 필드로 이동한다.
        setTimeout(() => {
          document.querySelector('input[name="addressDetail"]')?.focus();
        }, 100);
      },
      theme: {
        bgColor: "#5897FB", // 배경색
        searchBgColor: "#FFFFFF", // 검색창 배경색
        contentBgColor: "#FFFFFF", // 본문 배경색
        pageBgColor: "#FAFAFA", // 페이지 배경색
        textColor: "#333333", // 기본 글자색
        queryTextColor: "#222222", // 검색창 글자색
        postcodeTextColor: "#FA4256", // 우편번호 글자색
        emphTextColor: "#008BD3", // 강조 글자색
        outlineColor: "#E0E0E0", // 테두리
      },
    }).open();
  };

  return {
    isScriptLoaded,
    openPostcodeSearch,
  };
};
