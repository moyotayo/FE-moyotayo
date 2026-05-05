# moyotayo FE

2026 바이브해커톤 — moyotayo 프론트엔드 (React Native).

## Stack

- [Expo](https://expo.dev) (SDK 54) + TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction) — 파일 기반 라우팅
- [Zustand](https://github.com/pmndrs/zustand) — 클라이언트 상태관리
- [TanStack Query](https://tanstack.com/query) — 서버 상태/데이터 fetching
- `@react-navigation/native-stack` (Expo Router 위에 stack 직접 구성 시)

## 시작하기

```bash
npm install
npx expo start
```

콘솔에 표시되는 옵션 중 하나를 선택해서 앱을 실행하세요:

- Expo Go (iOS/Android)
- Android 에뮬레이터 / iOS 시뮬레이터
- Web (`w`)

## 디렉토리 구조

```
app/                # Expo Router 화면 (파일 기반 라우팅)
src/lib/            # 공용 유틸 (queryClient 등)
src/store/          # Zustand store
components/         # 재사용 가능한 UI 컴포넌트
hooks/              # 커스텀 훅
constants/          # 색상/스타일 상수
assets/             # 이미지·폰트 등 정적 리소스
```

## 부트스트랩 메모

- `app/_layout.tsx` 가 `QueryClientProvider`로 전체 앱을 감쌉니다.
- TanStack Query 기본 설정: `staleTime: 30s`, `retry: 1`, `refetchOnWindowFocus: false` — 필요에 따라 `src/lib/queryClient.ts` 에서 조정.
- Zustand 예시 store(`src/store/useAppStore.ts`)는 placeholder입니다. 실제 도메인 store로 교체하세요.
