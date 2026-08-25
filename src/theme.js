import { createTheme } from '@mui/material/styles';

/**
 * 컬러 토큰
 * 출처: 컬러 팔레트 디자인 시스템.md (index.css 의 CSS 변수와 1:1 대응)
 */
export const colorTokens = {
  primary: '#DDFF50',
  primaryLight: '#ECFF9B',
  primaryDark: '#C3E046',
  secondary: '#0B0B0B',
  bgPrimary: '#FFFFFF',
  bgSecondary: '#0B0B0B',
  surfaceSubtle: '#F4F4F2',
  surfaceWarm: '#FFF4EC',
  surfaceDark: '#191919',
  accentLavender: '#CAB8F6',
  accentCyan: '#7FE0F0',
  accentMint: '#7FE0C1',
  accentBlue: '#A8C7FF',
  accentPeach: '#FFCBA9',
  textPrimary: '#0B0B0B',
  textSubOnLight: '#5A5A5A',
  textInverse: '#FFFFFF',
  textSecondaryOnDark: '#ADADAD',
  textMutedOnDark: '#8A8A8A',
  textBrand: '#627A00',
  borderLight: '#F8F8F7',
  borderDarkStrong: '#1F1F1F',
  radiusCard: 24,
  radiusPill: 999,
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colorTokens.primary,
      light: colorTokens.primaryLight,
      dark: colorTokens.primaryDark,
      contrastText: colorTokens.secondary,
    },
    secondary: {
      main: colorTokens.secondary,
      contrastText: colorTokens.textInverse,
    },
    background: {
      default: colorTokens.bgPrimary,
      paper: colorTokens.bgPrimary,
    },
    text: {
      primary: colorTokens.textPrimary,
      secondary: colorTokens.textSubOnLight,
      disabled: colorTokens.textMutedOnDark,
    },
    /** 파스텔 계열 — 장식이 아니라 "정보 코드"로 사용 */
    accent: {
      lavender: colorTokens.accentLavender,
      cyan: colorTokens.accentCyan,
      mint: colorTokens.accentMint,
      blue: colorTokens.accentBlue,
      peach: colorTokens.accentPeach,
    },
    /** 팔레트 전용 확장 토큰 */
    brand: {
      text: colorTokens.textBrand,
      surfaceSubtle: colorTokens.surfaceSubtle,
      surfaceWarm: colorTokens.surfaceWarm,
      surfaceDark: colorTokens.surfaceDark,
      dark: colorTokens.bgSecondary,
      textInverse: colorTokens.textInverse,
      textSecondaryOnDark: colorTokens.textSecondaryOnDark,
      textMutedOnDark: colorTokens.textMutedOnDark,
      borderLight: colorTokens.borderLight,
      borderDarkStrong: colorTokens.borderDarkStrong,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.3,
    },
    body1: {
      lineHeight: 1.6,
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
    /** 네오브루탈리즘: 그림자 대신 색면으로 층위를 표현 */
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none', boxShadow: 'none' },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: colorTokens.radiusCard,
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
        root: { borderRadius: colorTokens.radiusPill, fontWeight: 700 },
      },
    },
  },
});

export default theme;
