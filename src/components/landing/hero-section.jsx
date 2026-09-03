import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuroraBackdrop from '../hero/aurora-backdrop.jsx';
import StarField from '../hero/star-field.jsx';
import { useMotionPreference } from '../../hooks/use-motion-preference.js';
import { fontFamilies } from '../../theme.js';

/** 헤드라인 — 한 줄씩 차례로 떠오른다 */
const HEADLINE_LINES = [
  '어두운 화면 위에',
  '빛이 어떻게 움직이는지',
  '계속 궁금했습니다.',
];

/** 등장 애니메이션 공통 이징 — 사이트 전체가 이 곡선 하나만 쓴다 */
const EASE = 'cubic-bezier(.16, 1, .3, 1)';

/**
 * 스크롤 진입 없이 최초 1회만 재생되는 등장 애니메이션 스타일을 만든다.
 *
 * @param {number} delay - 시작 지연 시간(초)
 * @returns {object} sx 에 펼쳐 넣을 애니메이션 속성
 */
function riseIn(delay) {
  return {
    opacity: 0,
    animation: `hero-rise 0.7s ${ EASE } ${ delay }s forwards`,
  };
}

/**
 * HeroSection 컴포넌트
 * Home 페이지 최상단 히어로 영역.
 *
 * 레이어 구성 (아래 → 위)
 *   L1 밤하늘 베이스  · surface 색면
 *   L2 오로라         · AuroraBackdrop — 마우스를 따라온다
 *   L3 별            · StarField — 마우스를 피한다
 *   L4 비네트        · AuroraBackdrop 내부
 *   L5 텍스트        · 헤드라인 · 서브라인 · 스크롤 유도
 *
 * (기획: docs/portfolio-plan.md §2)
 *
 * Props: 없음
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  const { canTrackPointer } = useMotionPreference();

  return (
    <Box
      component="section"
      aria-labelledby="hero-headline"
      sx={ {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        isolation: 'isolate',
        borderRadius: { xs: '18px', md: '24px' },
        border: '1px solid',
        borderColor: 'line.soft',
        bgcolor: 'secondary.main',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, md: 7 },
        py: { xs: 7, md: 10 },
        minHeight: { xs: '76vh', md: '84vh' },
        '@supports (height: 100svh)': {
          minHeight: { xs: '76svh', md: '84svh' },
        },
      } }
    >
      <AuroraBackdrop />
      <StarField />

      <Box sx={ { position: 'relative', zIndex: 1 } }>
        <Box
          component="span"
          sx={ {
            display: 'inline-block',
            color: 'primary.main',
            fontFamily: fontFamilies.mono,
            fontSize: 'clamp(0.7rem, 0.9vw, 0.78rem)',
            fontWeight: 700,
            letterSpacing: '0.18em',
            ...riseIn(0.05),
          } }
        >
          00 — HERO
        </Box>

        <Typography
          id="hero-headline"
          variant="h1"
          sx={ {
            mt: 2.5,
            mb: 3,
            color: 'text.primary',
            maxWidth: 980,
            textShadow: '0 2px 24px rgb(11 11 11 / 0.55)',
          } }
        >
          { HEADLINE_LINES.map((line, index) => (
            <Box
              key={ line }
              component="span"
              sx={ { display: 'block', ...riseIn(0.18 + index * 0.14) } }
            >
              { line }
            </Box>
          )) }
        </Typography>

        <Typography
          variant="body1"
          sx={ {
            color: 'text.secondary',
            maxWidth: 560,
            textShadow: '0 1px 16px rgb(11 11 11 / 0.6)',
            ...riseIn(0.68),
          } }
        >
          프론트엔드 개발자 손은솔 — 디자인과 대화로 화면을 만듭니다.
        </Typography>

        <Box
          sx={ {
            mt: { xs: 5, md: 7 },
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.25,
            color: 'text.muted',
            fontFamily: fontFamilies.mono,
            fontSize: 'clamp(0.72rem, 0.95vw, 0.82rem)',
            letterSpacing: '0.08em',
            ...riseIn(0.86),
          } }
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={ { animation: `scroll-hint 2.4s ${ EASE } infinite` } }
          >
            ↓
          </Box>
          { canTrackPointer ? '마우스를 움직여 보세요' : '아래로 스크롤해 보세요' }
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
