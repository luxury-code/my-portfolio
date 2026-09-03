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
 * index.css 의 CSS 변수와 1:1 대응한다.
 * 브랜드 색은 고정, 표면·텍스트·경계선은 CSS 변수를 통해 테마에 따라 바뀐다.
 */
export const colorTokens = {
  /** 브랜드 — 테마와 무관하게 고정 */
  primary: '#DDFF50',
  primaryLight: '#ECFF9B',
  primaryDark: '#C3E046',
  accentLavender: '#CAB8F6',
  accentMint: '#7FE0C1',
  accentCyan: '#7FE0F0',
  accentBlue: '#A8C7FF',
  accentPeach: '#FFCBA9',
  accentAmber: '#F0A868',

  /** 오로라 그라디언트 스톱 (P1 Hero) */
  auroraCore: '#DDFF50',
  auroraSpread: '#ECFF9B',
  auroraMid: '#7FE0C1',
  auroraEdge: '#CAB8F6',

  /** 표면·텍스트·경계선 — CSS 변수 참조 (테마 전환 대응) */
  bgBase: 'var(--color-bg-base)',
  surfaceElevated: 'var(--color-surface-elevated)',
  surfaceSubtle: 'var(--color-surface-subtle)',
  surfaceWarm: 'var(--color-surface-warm)',
  surfaceInset: 'var(--color-surface-inset)',

  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  textOnBrand: 'var(--color-text-on-brand)',

  lineSoft: 'var(--color-line-soft)',
  line: 'var(--color-line)',
  lineStrong: 'var(--color-line-strong)',

  radiusCard: 20,
  radiusPill: 999,
};

/**
 * 타이포 스케일 — 전부 clamp() 기반
 * 브레이크포인트에서 크기가 뚝 끊기지 않고 뷰포트에 연속적으로 반응한다.
 * (레퍼런스 nexstudio.tech 에서 채택한 방식)
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
      contrastText: '#0B0B0B',
    },
    secondary: {
      main: '#0B0B0B',
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

    /** 파스텔 계열 — 장식이 아니라 "정보 코드"로 사용 */
    accent: {
      lavender: colorTokens.accentLavender,
      cyan: colorTokens.accentCyan,
      mint: colorTokens.accentMint,
      blue: colorTokens.accentBlue,
      peach: colorTokens.accentPeach,
      amber: colorTokens.accentAmber,
    },

    /** 표면·경계선 확장 토큰 */
    surface: {
      base: colorTokens.bgBase,
      elevated: colorTokens.surfaceElevated,
      subtle: colorTokens.surfaceSubtle,
      warm: colorTokens.surfaceWarm,
      inset: colorTokens.surfaceInset,
    },
    line: {
      soft: colorTokens.lineSoft,
      main: colorTokens.line,
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
    /** 다크 배경에서 Alert 가 밝은 면으로 튀지 않도록 */
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
  },
});

export default theme;
