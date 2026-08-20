# my-portfolio

포트폴리오 템플릿 사이트 (React + Vite + MUI + React Router)

## 컬러 팔레트

`컬러 팔레트 디자인 시스템.md` (AI서치랩 실측 팔레트 v1.0) 의 CSS 변수를 적용했습니다.

- CSS 변수 정의: `src/index.css`
- MUI 테마 매핑: `src/theme.js`

주요 색상

| 토큰 | Hex | 역할 |
|---|---|---|
| `--color-primary` | `#DDFF50` | 네온 라임 · 브랜드 시그니처 |
| `--color-secondary` | `#0B0B0B` | 소프트 블랙 · 구조 색상 |
| `--color-accent` | `#CAB8F6` | 라벤더 · 프로젝트 카테고리 A |
| `--color-accent-cyan` | `#7FE0F0` | 시안 · 프로젝트 카테고리 B |

## 페이지 구성

- `/` Home — Hero / About Me / Skill Tree / Projects / Contact 5개 섹션
- `/about` About Me
- `/projects` Projects

## 개발

```bash
npm install
npm run dev
npm run build
```

## 배포

`main` 브랜치 push 시 GitHub Actions 워크플로우(`.github/workflows/deploy.yml`)가
자동으로 빌드 후 GitHub Pages 에 배포합니다.
