# 🍊감귤마켓 서비스 프로젝트
*감미로운 일상, 귤 향 가득한 소통, 감귤 마켓!*

## 배포 주소  https://gamguul.netlify.app/
💡 접속하시면 배포된 서비스를 바로 이용해보실 수 있습니다.   
 ### 테스트 계정   

**id :** `tt1team@example.com`   
**pw :**  `test1team_`

## 서비스 소개

감귤마켓은 농장의 따뜻한 이야기와 상품을 공유할 수 있는 **소셜 커머스 플랫폼**입니다.   

감귤 농부들이 자신만의 스토어에서 직접 기른 감귤을 소개하고, 동시에 농장의 일상을 **SNS**처럼 **자유롭게 공유할 수 있는 공간**을 제공합니다.   

농장의 진짜 이야기가 시작되는 곳, **감귤마켓**에서 만나보세요!🍊
<p align="center">
<img src="https://github.com/user-attachments/assets/7036e90e-592b-41e4-9de7-cf1f6f8f1102" alt="유저 프로필" width="220" height="442" />
<img src="https://github.com/user-attachments/assets/30292b06-d8a1-4ae2-a13d-f4d13dcdfd52" alt="로그인 페이지" width="300" height="605" />
</p>

## 서비스 핵심 기능

|상품 홍보 & 판매|일상 공유|검색 & 발견|
|---|---|---|
|상품 사진, 가격, 판매 링크까지 간편하게 **등록** 가능|상품 등록 없이도 **글과 사진을 자유롭게 공유** 가능|새로운 농장과 사용자들을 쉽게 찾고 연결될 수 있는 **검색 기능** 제공|
|<img width="260" height="460" alt="product modification" src="https://github.com/user-attachments/assets/ce7de804-0d5c-40ab-b7a1-38ade66500f6" />|<img width="260" height="460" alt="Upload" src="https://github.com/user-attachments/assets/dcd818a2-d602-404e-9d4f-8894b312bea8" />|<img width="400" height="174" alt="search" src="https://github.com/user-attachments/assets/1b4aba5c-4e1f-4245-bfbe-432074f59aab" /> <br/> <img width="400" height="192" alt="searchValue" src="https://github.com/user-attachments/assets/217d9d40-50fc-4f77-9716-3b79f198cae0" />|

|소설네트워킹|소설네트워킹|소설네트워킹|
|---|---|---|
|관심있는 농장과 사용자를 **팔로우**하여 소식 받기|팔로우한 사용자들의 게시물만 **모아서** 확인 가능|좋아요, 댓글, 공유 기능으로 활발한 **커뮤니케이션**|
|<img width="380" height="565" alt="your profile" src="https://github.com/user-attachments/assets/089a56bb-79c9-4690-98ca-8e35bf13f605" />|<img width="380" height="565" alt="Home" src="https://github.com/user-attachments/assets/ff961dd5-6b90-445b-9785-6b5d2ae44624" />|<img width="380" height="565" alt="PostComment" src="https://github.com/user-attachments/assets/78070917-7711-45be-a184-dcac9f8580c4" />|
  
## 기술 스택
- **FE**   
    <img alt="Static Badge" src="https://img.shields.io/badge/HTML5-red" > <img alt="Static Badge" src="https://img.shields.io/badge/React-%5E19.1.1-skyblue%20">
     <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-^5.9.2-blue"> <img alt="Static Badge" src="https://img.shields.io/badge/TailwindCSS-^3.3.3-deepskyblue"> <img alt="Static Badge" src="https://img.shields.io/badge/Vite-^7.1.4-darkmagenta">   

- **협업 툴**   
    <img alt="Static Badge" src="https://img.shields.io/badge/Github%20Projects-black"> <img alt="Static Badge" src="https://img.shields.io/badge/Notion-tan%20"> <img alt="Static Badge" src="https://img.shields.io/badge/Discord-dodgerblue"> <img alt="Static Badge" src="https://img.shields.io/badge/Figma-orchid%20">

## 프로젝트의 목표
- [API명세](https://oreumi.notion.site/API-25eebaa8982b8001819bece8f093932d)와 피그마에 제공되는 디자인 완벽하게 구현
- Git & GitHub 기반 팀 협업 경험쌓기
- React, TypeScript 기술 경험 고도화

## 프로젝트 구조
```
📦src
 ┣ 📂assets // 이미지, 아이콘 등
 ┣ 📂components // 공통 UI 컴포넌트
 ┣ 📂pages // 각 페이지 별 tsx 파일
 ┣ 📂plugins // eslint 추가
 ┣ 📂service
 ┃ ┣ 📂fetch // api 호출 함수, fetch 함수, api 주소 모듈화
 ┣ 📂types // 공통 타입 선언
 ┣ 📂Utils // 공통 함수
```

## 프로젝트 시작하기
```
git clone "https://github.com/TeamTangerine/TT.git"
cd react
npm i
npm run dev
```

<details>
<summary>
   <h2>개발 컨벤션</h2> (클릭해보세요!)
   <p>💡 개발 컨벤션은 <a href="https://google.github.io/styleguide/">Google Style Guides</a>를 기반으로 필요하다고 생각되는 부분을 가져와 개량했습니다.</p>
</summary>
<div markdown="1">

### 1. 일반 규칙(Prettier 설정 반영)

- 들여쓰기: 2칸 공백 (tabWidth: 2)
- 세미콜론(;) 항상 사용 (semi: true)
- 문자열: 작은따옴표(') 사용, JSX에서는 큰따옴표(") (singleQuote: true)
- 최대 줄 길이: 120자 (printWidth: 120)
- 객체나 배열의 마지막 요소 뒤에는 ES5 호환 방식으로 쉼표 사용 (trailingComma: "es5")
- 변수명: camelCase 사용
- 상수: 대문자 + 언더스코어(UPPER_SNAKE_CASE) 사용
- 모든 파일 끝에 빈 줄 추가

### 2. Typescript 관련

- 명시적 타입 선언 지향 (any 타입 지양)
- 인터페이스 이름은 대문자 I로 시작 (예: IUserProps)
- 타입 이름은 파스칼케이스 사용 (예: UserType)
- 재사용 가능한 타입은 별도 파일로 분리

### 3. 컴포넌트 관련

- 함수 선언문으로 통일 (function 키워드 사용) - README.md에 명시됨
- 컴포넌트 파일명은 파스칼케이스 (예: UserProfile.tsx)
- props 타입은 인터페이스로 정의
- props는 구조분해할당으로 사용
- 큰 컴포넌트는 논리적 단위로 분리
- 컴포넌트 안에 컴포넌트 선언하지 않기
- 부모 컴포넌트가 렌더링될 때마다 내부 컴포넌트 함수가 완전히 새로 생성됩니다
- 이 함수들은 사용은 되지만, 매번 새로운 메모리 공간을 차지합니다

### 4. 커밋 타입

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅, 세미콜론 누락 등
- refactor: 코드 리팩토링
- test: 테스트 코드 추가/수정
- chore: 빌드 프로세스, 패키지 매니저 설정 등

### 5. 브랜치 전략

- main: 배포 가능한 상태의 코드
- develop: 개발 중인 코드의 통합 브랜치
- feature/기능명: 새로운 기능 개발
- fix/버그명: 버그 수정

### 6. PR 규칙

- 제목은 커밋 메시지와 동일한 형식
- 본문에 변경사항 요약 및 스크린샷 포함
- 리뷰어 최소 1명 지정
- 관련 이슈 연결


</div>
</details>

## 개발 기간 
- **2025년 9월 4일 ~ 2025년 9월 26일**

## <a href="https://www.notion.so/oreumi/261ebaa8982b807e95e9d53d9bb86755" target='_blank'>더 상세한 노션 보기</a> 
