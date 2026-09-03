import { createTheme } from '@mui/material/styles';

/**
 * 폰트 3종 체계
 * - display : 매거진 감성의 명조. h1/h2 헤드라인 전용 (본문에는 절대 쓰지 않는다)
 * - body    : 본문·UI 기본. 한글 가독성 담당
 * - mono    : 라벨·섹션 번호·숫자·숙련도 표기 전용
 */
export const fontFamilies = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
  mono: 'var(--font-mono)',
};

/**
 * 컬러 토큰 (v2 — 다크 베이스)
 *
 * ⚠️ 팔레트 값에는 반드시 실제 색상값(hex · rgb · rgba)만 넣는다.
 *    MUI 내부는 alpha() / lighten() / darken() 로 팔레트 색을 가공하는데,
 *    이 함수들은 CSS 변수 var(--x) 를 파싱하지 못하고 예외를 던진다.
 *    (Button · Chip · Skeleton 등이 렌더될 때 MUI error #9 발생)
 *
 * index.css 의 CSS 변수는 body · 링크 · 포커스링 · 오로라 등
 * 순수 CSS 영역에서만 쓰고, 아래 값과 짝을 맞춰 관리한다.
 */
export const colorTokens = {
  /** 브랜드 */
  primary: '#DDFF50',
  primaryLight: '#ECFF9B',
  primaryDark: '#C3E046',
  accentLavender: '#CAB8F6',
  accentMint: '#7FE0C1',
  accentCyan: '#7FE0F0',
  accentBlue: '#A8C7FF',
  accentPeach: '#FFCBA9',
  accentAmber: '#F0A868',

  /** 오로라 그라디언트 스톱 */
  auroraCore: '#DDFF50',
  auroraSpread: '#ECFF9B',
  auroraMid: '#7FE0C1',
  auroraEdge: '#CAB8F6',

  /** 표면 — index.css 의 --color-bg-base / --color-surface-* 와 동일 */
  bgBase: '#0B0B0B',
  surfaceElevated: '#131313',
  surfaceSubtle: '#191919',
  surfaceWarm: '#1A1613',
  surfaceInset: '#0E0E0E',

  /** 텍스트 — index.css 의 --color-text-* 와 동일 */
  textPrimary: '#F8F8F7',
  textSecondary: '#ADADAD',
  textMuted: '#8A8A8A',
  textOnBrand: '#0B0B0B',

  /** 경계선 — rgba() 는 alpha() 가 파싱할 수 있어 안전하다 */
  lineSoft: 'rgba(248, 248, 247, 0.12)',
  lineBase: 'rgba(248, 248, 247, 0.2)',
  lineStrong: 'rgba(248, 248, 247, 0.32)',

  radiusCard: 20,
  radiusPill: 999,
};

/**
 * 타이포 스케일 — 전부 clamp() 기반
 * 브레이크포인트에서 크기가 뚝 끊기지 않고 뷰포트에 연속적으로 반응한다.
 */
export const typeScale = {
  h1: 'clamp(2.4rem, 7vw, 5rem)',
  h2: 'clamp(1.75rem, 4.5vw, 3rem)',
  h3: 'clamp(1.15rem, 2.2vw, 1.5rem)',
  h4: 'clamp(1.05rem, 1.7vw, 1.25rem)',
  body: 'clamp(0.95rem, 1.15vw, 1.05rem)',
  small: 'clamp(0.82rem, 1vw, 0.9rem)',
  label: 'clamp(0.7rem, 0.9vw, 0.78rem)',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colorTokens.primary,
      light: colorTokens.primaryLight,
      dark: colorTokens.primaryDark,
      contrastText: colorTokens.textOnBrand,
    },
    secondary: {
      main: colorTokens.bgBase,
      contrastText: colorTokens.primary,
    },
    background: {
      default: colorTokens.bgBase,
      paper: colorTokens.surfaceElevated,
    },
    text: {
      primary: colorTokens.textPrimary,
      secondary: colorTokens.textSecondary,
      disabled: colorTokens.textMuted,
      /** 가장 낮은 위계의 보조 문구 — 대비 5.1:1 (AA) */
      muted: colorTokens.textMuted,
    },
    divider: colorTokens.lineSoft,

    /**
     * ⚠️ 아래 확장 팔레트에는 'main' 키를 두지 않는다.
     *    MUI 는 main 을 가진 팔레트 항목을 색상 팔레트로 간주해
     *    Button · Chip 등에서 순회하며 alpha() 로 가공하려 한다.
     *    (line.main 이 있었을 때 실제로 MUI error #9 가 발생했다)
     */

    /** 파스텔 계열 — 장식이 아니라 "정보 코드"로 사용 */
    accent: {
      lavender: colorTokens.accentLavender,
      cyan: colorTokens.accentCyan,
      mint: colorTokens.accentMint,
      blue: colorTokens.accentBlue,
      peach: colorTokens.accentPeach,
      amber: colorTokens.accentAmber,
    },

    /** 표면 — 밤하늘에서 얼마나 떠 있는가 */
    surface: {
      base: colorTokens.bgBase,
      elevated: colorTokens.surfaceElevated,
      subtle: colorTokens.surfaceSubtle,
      warm: colorTokens.surfaceWarm,
      inset: colorTokens.surfaceInset,
    },

    /** 경계선 */
    line: {
      soft: colorTokens.lineSoft,
      base: colorTokens.lineBase,
      strong: colorTokens.lineStrong,
    },

    brand: {
      onBrand: colorTokens.textOnBrand,
      aurora: {
        core: colorTokens.auroraCore,
        spread: colorTokens.auroraSpread,
        mid: colorTokens.auroraMid,
        edge: colorTokens.auroraEdge,
      },
    },
  },

  typography: {
    fontFamily: fontFamilies.body,

    /** h1·h2 만 명조(display). h3 이하는 본문 폰트로 두어 매거진 대비를 유지한다 */
    h1: {
      fontFamily: fontFamilies.display,
      fontWeight: 700,
      fontSize: typeScale.h1,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: fontFamilies.display,
      fontWeight: 700,
      fontSize: typeScale.h2,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: typeScale.h3,
      lineHeight: 1.35,
    },
    h4: {
      fontWeight: 700,
      fontSize: typeScale.h4,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: typeScale.body,
      lineHeight: 1.65,
    },
    body2: {
      fontSize: typeScale.small,
      lineHeight: 1.6,
    },
    /** 섹션 번호·라벨 전용 모노 변형 */
    overline: {
      fontFamily: fontFamilies.mono,
      fontSize: typeScale.label,
      fontWeight: 700,
      letterSpacing: '0.1em',
      lineHeight: 1.4,
      textTransform: 'uppercase',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: colorTokens.radiusCard,
  },
  spacing: 8,

  components: {
    /** 네오브루탈리즘: 흐린 그림자 대신 색면과 경계선으로 층위를 표현 */
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: colorTokens.radiusCard,
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: colorTokens.radiusPill,
          paddingInline: 24,
          minHeight: 44,
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: colorTokens.radiusPill,
          fontWeight: 700,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
  },
});

export default theme;
