import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fontFamilies } from '../../theme.js';

/** 프로필 아래에 붙는 짧은 메타 정보 */
const META = [
  { label: 'ROLE', value: 'Frontend Developer' },
  { label: 'STACK', value: 'React · Vite · MUI · Supabase' },
  { label: 'STATUS', value: '신입 · 구직 중' },
];

/**
 * AboutProfile 컴포넌트
 * About 섹션 좌측에 고정(sticky)되는 프로필 블록.
 * 오른쪽 스토리가 스크롤되는 동안 "누구의 이야기인지"를 계속 붙잡아 둔다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutProfile />
 */
function AboutProfile() {
  return (
    <Box
      sx={ {
        position: { xs: 'static', md: 'sticky' },
        top: { md: 104 },
      } }
    >
      { /** 오로라를 축소한 원형 마크 — Hero 의 컨셉을 그대로 가져온다 */ }
      <Box
        aria-hidden="true"
        sx={ {
          width: { xs: 84, md: 116 },
          height: { xs: 84, md: 116 },
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fontFamilies.display,
          fontWeight: 700,
          fontSize: { xs: '1.9rem', md: '2.5rem' },
          color: 'brand.onBrand',
          background: `radial-gradient(
            120% 120% at 30% 25%,
            var(--aurora-core) 0%,
            var(--aurora-spread) 42%,
            var(--aurora-mid) 72%,
            var(--aurora-edge) 100%
          )`,
        } }
      >
        S
      </Box>

      <Typography
        variant="h3"
        component="p"
        sx={ { mt: 2.5, mb: 0.5, color: 'text.primary' } }
      >
        손은솔
      </Typography>

      <Typography
        sx={ {
          color: 'primary.main',
          fontFamily: fontFamilies.mono,
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
        } }
      >
        SOL / AURORA
      </Typography>

      <Box
        component="dl"
        sx={ {
          m: 0,
          mt: 3,
          pt: 3,
          borderTop: '1px solid',
          borderColor: 'line.soft',
          display: 'grid',
          gap: 2,
        } }
      >
        { META.map((item) => (
          <Box key={ item.label }>
            <Box
              component="dt"
              sx={ {
                color: 'text.muted',
                fontFamily: fontFamilies.mono,
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                mb: 0.5,
              } }
            >
              { item.label }
            </Box>
            <Box
              component="dd"
              sx={ { m: 0, color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.5 } }
            >
              { item.value }
            </Box>
          </Box>
        )) }
      </Box>
    </Box>
  );
}

export default AboutProfile;
