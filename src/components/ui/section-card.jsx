import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

/**
 * 톤별 색상 프리셋
 * 컬러 팔레트 디자인 시스템의 "배경-텍스트 조합 매트릭스" 에 있는 안전 조합만 사용한다.
 */
const TONE_PRESETS = {
  lime: {
    bg: 'primary.main',
    title: 'secondary.main',
    body: 'rgb(11 11 11 / 0.75)',
    labelBg: 'secondary.main',
    labelText: 'primary.main',
    border: 'none',
  },
  subtle: {
    bg: 'brand.surfaceSubtle',
    title: 'text.primary',
    body: 'text.secondary',
    labelBg: 'accent.lavender',
    labelText: 'secondary.main',
    border: 'none',
  },
  light: {
    bg: 'background.default',
    title: 'text.primary',
    body: 'text.secondary',
    labelBg: 'accent.cyan',
    labelText: 'secondary.main',
    border: '2px solid #0B0B0B',
  },
  dark: {
    bg: 'brand.dark',
    title: 'brand.textInverse',
    body: 'brand.textMutedOnDark',
    labelBg: 'primary.main',
    labelText: 'secondary.main',
    border: 'none',
  },
};

/**
 * SectionCard 컴포넌트
 * 포트폴리오의 각 섹션을 감싸는 공통 카드.
 * 네오브루탈리즘 형태 언어(큰 라운드 · 그림자 없음 · 넓은 여백)를 적용한다.
 *
 * Props:
 * @param {string} label - 섹션을 식별하는 짧은 태그 텍스트 [Required]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션 설명 문구 [Required]
 * @param {string} tone - 색상 톤 ('lime' | 'subtle' | 'light' | 'dark') [Optional, 기본값: 'light']
 * @param {node} children - 카드 하단에 추가로 렌더링할 요소 [Optional]
 *
 * Example usage:
 * <SectionCard label="01 / HERO" title="Hero" description="설명" tone="lime" />
 */
function SectionCard({ label, title, description, tone = 'light', children }) {
  const preset = TONE_PRESETS[tone] ?? TONE_PRESETS.light;

  return (
    <Card
      component="section"
      sx={ {
        width: '100%',
        bgcolor: preset.bg,
        border: preset.border,
        borderRadius: { xs: '20px', md: '24px' },
        boxShadow: 'none',
        p: { xs: 2.5, md: 4 },
      } }
    >
      <Box
        component="span"
        sx={ {
          display: 'inline-block',
          bgcolor: preset.labelBg,
          color: preset.labelText,
          borderRadius: '999px',
          px: 1.75,
          py: 0.5,
          fontSize: { xs: '0.72rem', md: '0.78rem' },
          fontWeight: 700,
          letterSpacing: '0.08em',
        } }
      >
        { label }
      </Box>

      <Typography
        variant="h2"
        sx={ {
          mt: 2,
          mb: 1.5,
          color: preset.title,
          fontSize: { xs: '1.5rem', md: '2rem' },
        } }
      >
        { title }
      </Typography>

      <Typography
        sx={ {
          color: preset.body,
          fontSize: { xs: '0.95rem', md: '1.05rem' },
          lineHeight: 1.6,
        } }
      >
        { description }
      </Typography>

      { children ? <Box sx={ { mt: 3 } }>{ children }</Box> : null }
    </Card>
  );
}

export default SectionCard;
