import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * HeroSection 컴포넌트
 * Home 페이지 최상단 히어로 영역.
 * 라임 색면은 데스크톱에서만 전면 배경으로 쓰고, 모바일에서는 뱃지로 축소한다.
 * (컬러 가이드: 모바일 첫 화면에서 라임 면적 50% 초과 금지)
 *
 * Props: 없음
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  return (
    <Box
      component="section"
      className="bg-lime"
      sx={ {
        width: '100%',
        bgcolor: { xs: 'background.default', md: 'primary.main' },
        border: { xs: '2px solid #0B0B0B', md: 'none' },
        borderRadius: { xs: '20px', md: '24px' },
        p: { xs: 3, md: 7 },
      } }
    >
      <Box
        component="span"
        sx={ {
          display: 'inline-block',
          bgcolor: { xs: 'primary.main', md: 'secondary.main' },
          color: { xs: 'secondary.main', md: 'primary.main' },
          borderRadius: '999px',
          px: 1.75,
          py: 0.5,
          fontSize: { xs: '0.72rem', md: '0.78rem' },
          fontWeight: 700,
          letterSpacing: '0.08em',
        } }
      >
        01 / HERO
      </Box>

      <Typography
        variant="h1"
        sx={ {
          mt: 2,
          mb: 2,
          color: 'secondary.main',
          fontSize: { xs: '2rem', md: '3.5rem' },
        } }
      >
        Hero 섹션
      </Typography>

      <Typography
        sx={ {
          color: 'rgb(11 11 11 / 0.75)',
          fontSize: { xs: '1rem', md: '1.2rem' },
          lineHeight: 1.6,
          maxWidth: 640,
        } }
      >
        여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
      </Typography>
    </Box>
  );
}

export default HeroSection;
