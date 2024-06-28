# 해피문데이 과제

### 사용된 패키지

- Node 버전: v22.3.0

- 패키지 매니저: [PNPM](https://pnpm.io)

- 스타일링: styled-components

- api 통신: axios, react-query

- 상태관리: jotai

### 프로젝트 실행

```sh
1. 노드 버전 확인
node -v    v22.3.0 (v18 이상 사용 권장)

2. 패키지 매니저 및 패키지 설치
# pnpm이 설치되어 있지 않은 경우,
npm install -g pnpm
# 패키지 설치
pnpm install

3. 프로젝트 실행
pnpm dev
# 또는
pnpm build
pnpm start
```

### 주요 폴더 구조

```sh
/src
 ├ /app
 │  ├ Providers.tsx         # react-query, styled-component 구성 연결 파일
 │  ├ /(bottom-navbar)      # 하단 네비게이션이 포함되어 있는 컴포넌트 폴더 (홈, 즐겨찾기)
 │  │  ├ layout.tsx         # 공통 컨테이너가 포함되어 있는 전역 컴포넌트 파일
 │  │  ├ page.tsx           # 홈 컴포넌트 파일
 │  │  └ /bookmark          # 즐겨찾기 컴포넌트 라우팅 폴더
 │  │    └ page.tsx         # 즐겨찾기 컴포넌트 파일
 │  └ /(top-navbar)         # 상단 네비게이션이 포함되어 있는 컴포넌트 폴더 (검색, 상세페이지)
 │     ├ layout.tsx         # 공통 컨테이너가 포함되어 있는 전역 컴포넌트 파일
 │     ├ /collection/[id]   # 소장품 상세페이지 라우팅 폴더
 │     │  └ page.tsx        # 소장품 상세페이지 컴포넌트 파일
 │     └ /search            # 검색 페이지 라우팅 폴더
 │       └ page.tsx         # 검색 페이지 컴포넌트 파일
 │ 
 └ /lib                     # 전역으로 사용되는 함수 및 컴포넌트 폴더
    ├ /axios                # axios 설정 폴더
    ├ /components           # 컴포넌트 폴더
    │  ├ /atom              # 기본 element 요소 컴포넌트 폴더
    │  └ /search            # 검색 페이지에서 사용되는 컴포넌트 폴더
    │
    ├ /services/apis        # api 폴더
    ├ /styles               # styled-component 구성 폴더
    └ /utils                # 공통 함수 폴더

```