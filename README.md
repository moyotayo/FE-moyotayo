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
- Zustand store: `src/store/useSupickStore.ts` (picklist / 학기 / hasStarted).

## 빌드

```bash
npm run build           # expo export --platform web → dist/
```

산출물: `dist/` (정적 HTML + JS 번들 + 자산). 14개 라우트 모두 정적으로 export 됨.

## Cloudflare Pages 배포

두 가지 방법 중 택1.

### A. Git 연동 (권장)

1. Cloudflare 대시보드 → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. GitHub repo `moyotayo/FE-moyotayo` 선택
3. 빌드 설정:
   - **Framework preset**: None (또는 Expo)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: (비워두기, 모노레포면 `moyotayo`)
   - **Node version**: `20` (환경변수 `NODE_VERSION=20`)
4. **Production branch**: `main` (또는 `supick-port`)
5. **Save and Deploy**

이후 push 마다 자동 배포 + PR 마다 preview URL 생성.

### B. Wrangler CLI 수동 배포

처음 1회 (Cloudflare API 토큰 필요):

```bash
npx wrangler login                                          # 브라우저 OAuth
npx wrangler pages project create moyotayo \
  --production-branch=main                                  # 프로젝트 생성
```

배포:

```bash
npm run deploy   # = npm run build && npx wrangler pages deploy ./dist
```

### 설정 파일

| 파일 | 역할 |
|---|---|
| `wrangler.toml` | Wrangler 프로젝트 이름 + 빌드 출력 디렉토리 |
| `public/_headers` | 캐시 정책 (JS/자산 1년 immutable, HTML 0초) + 보안 헤더 |
| `public/_redirects` | 매치 안 되는 경로 → `+not-found.html` (404 응답) |

`public/` 폴더 안의 파일들은 `expo export` 시 자동으로 `dist/` 루트로 복사됩니다.

### 환경 변수

현재 앱은 환경 변수 없음 (모든 데이터가 `src/data/sampleData.ts` 하드코딩). 추후 백엔드 연동 시 Cloudflare Pages 대시보드의 **Settings → Environment variables**에서 추가하고, 코드에서는 `process.env.EXPO_PUBLIC_*` 접두사로 접근.

### 도메인

Cloudflare Pages 기본 도메인: `moyotayo.pages.dev` (프로젝트 이름.pages.dev).
커스텀 도메인: 대시보드 → 프로젝트 → **Custom domains** 에서 추가.
