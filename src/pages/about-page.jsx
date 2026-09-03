import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import AboutProfile from '../components/about/about-profile.jsx';
import AboutStoryBlock from '../components/about/about-story-block.jsx';
import SectionHeader from '../components/ui/section-header.jsx';
import { ABOUT_BLOCKS } from '../utils/about-content.js';
import { fontFamilies } from '../theme.js';

/**
 * 강점 3가지.
 * "잘합니다" 로 끝내지 않고 이 사이트 안에서 확인할 수 있는 근거를 함께 적는다.
 */
const STRENGTHS = [
  {
    title: '디자인을 시스템으로 다룹니다',
    body: '색을 감으로 고르지 않습니다. 이 사이트의 모든 색은 토큰으로 정의돼 있고, 배경과 글자의 대비비를 계산해 코드 주석에 남겼습니다.',
    proof: '근거 — 이 페이지의 모든 색 · 간격 · 타이포',
    accent: 'accent.lavender',
  },
  {
    title: '만들면 끝까지 굴립니다',
    body: '화면만 만들고 멈추지 않았습니다. 데이터베이스를 붙이고, 배포를 자동화하고, 로딩과 실패 상태까지 처리했습니다.',
    proof: '근거 — Supabase 연동 · GitHub Actions 자동 배포',
    accent: 'accent.mint',
  },
  {
    title: '남는 대화를 만듭니다',
    body: '읽고 끝나는 페이지보다 흔적이 남는 페이지가 좋습니다. 그래서 이 사이트에는 방명록이 있습니다.',
    proof: '근거 — 아래 Contact 의 방명록',
    accent: 'accent.peach',
  },
];

/**
 * AboutPage 컴포넌트
 * Home 의 About 섹션을 확장한 상세 자기소개 페이지.
 * 네 개의 이야기 블록을 모두 보여주고, 강점 3가지를 근거와 함께 정리한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  return (
    <Box
      sx={ {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 4, md: 8 },
      } }
    >
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <SectionHeader label="ABOUT ME" />

        <Typography variant="h1" sx={ { mb: 3, color: 'text.primary', maxWidth: 900 } }>
          화면이 예뻐지는 순간이 재미있어서, 여기까지 왔습니다.
        </Typography>

        <Typography
          variant="body1"
          sx={ { color: 'text.secondary', maxWidth: 640, mb: { xs: 5, md: 8 } } }
        >
          프론트엔드 개발자를 준비하고 있는 손은솔입니다. 아래는 어떻게 시작했고
          무엇을 중요하게 생각하는지에 대한 이야기입니다.
        </Typography>

        <Grid container spacing={ { xs: 3, md: 6 } } sx={ { mb: { xs: 6, md: 10 } } }>
          <Grid size={ { xs: 12, md: 4 } }>
            <AboutProfile />
          </Grid>

          <Grid size={ { xs: 12, md: 8 } }>
            { ABOUT_BLOCKS.map((block, index) => (
              <AboutStoryBlock
                key={ block.index }
                index={ block.index }
                title={ block.title }
                lead={ block.lead }
                paragraphs={ block.paragraphs }
                tags={ block.tags }
                isLast={ index === ABOUT_BLOCKS.length - 1 }
              />
            )) }
          </Grid>
        </Grid>

        <Box
          sx={ {
            pt: { xs: 4, md: 6 },
            borderTop: '1px solid',
            borderColor: 'line.soft',
          } }
        >
          <Typography variant="h2" sx={ { mb: { xs: 3, md: 4 }, color: 'text.primary' } }>
            제가 잘하는 것
          </Typography>

          <Grid container spacing={ { xs: 2, md: 3 } }>
            { STRENGTHS.map((item) => (
              <Grid key={ item.title } size={ { xs: 12, md: 4 } }>
                <Box
                  sx={ {
                    height: '100%',
                    p: { xs: 2.5, md: 3 },
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'line.soft',
                    bgcolor: 'surface.elevated',
                  } }
                >
                  <Box
                    aria-hidden="true"
                    sx={ {
                      width: 36,
                      height: 4,
                      borderRadius: 999,
                      bgcolor: item.accent,
                      mb: 2.5,
                    } }
                  />

                  <Typography variant="h3" sx={ { mb: 1.5, color: 'text.primary' } }>
                    { item.title }
                  </Typography>

                  <Typography variant="body1" sx={ { color: 'text.secondary', mb: 2 } }>
                    { item.body }
                  </Typography>

                  <Box
                    sx={ {
                      color: 'text.muted',
                      fontFamily: fontFamilies.mono,
                      fontSize: '0.72rem',
                      lineHeight: 1.6,
                    } }
                  >
                    { item.proof }
                  </Box>
                </Box>
              </Grid>
            )) }
          </Grid>

          <Box sx={ { mt: { xs: 4, md: 6 }, display: 'flex', flexWrap: 'wrap', gap: 1.5 } }>
            <Button
              component={ RouterLink }
              to="/projects"
              sx={ {
                bgcolor: 'primary.main',
                color: 'brand.onBrand',
                '&:hover': { bgcolor: 'primary.light' },
              } }
            >
              프로젝트 보러 가기
            </Button>

            <Button
              component={ RouterLink }
              to="/"
              sx={ {
                bgcolor: 'transparent',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'line.base',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'brand.onBrand',
                  borderColor: 'primary.main',
                },
              } }
            >
              방명록 남기러 가기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutPage;
