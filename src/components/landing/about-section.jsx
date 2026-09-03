import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import AboutProfile from '../about/about-profile.jsx';
import AboutStoryBlock from '../about/about-story-block.jsx';
import { HOME_ABOUT_BLOCKS } from '../../utils/about-content.js';
import SectionHeader from '../ui/section-header.jsx';

/**
 * AboutSection 컴포넌트
 * Home 페이지의 About 섹션. 매거진형 2단 구성으로,
 * 왼쪽 프로필은 고정되고 오른쪽 이야기만 스크롤된다.
 * 네 번째 블록('가는 방향')은 상세 페이지로 넘겨 클릭 동기를 남긴다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  return (
    <Box
      component="section"
      aria-labelledby="about-heading"
      sx={ {
        width: '100%',
        borderRadius: { xs: '16px', md: '20px' },
        border: '1px solid',
        borderColor: 'line.soft',
        bgcolor: 'surface.elevated',
        p: { xs: 2.5, md: 5 },
      } }
    >
      <SectionHeader label="01 — ABOUT ME" id="about-heading" />

      <Grid container spacing={ { xs: 3, md: 6 } }>
        <Grid size={ { xs: 12, md: 4 } }>
          <AboutProfile />
        </Grid>

        <Grid size={ { xs: 12, md: 8 } }>
          { HOME_ABOUT_BLOCKS.map((block) => (
            <AboutStoryBlock
              key={ block.index }
              index={ block.index }
              title={ block.title }
              lead={ block.lead }
              paragraphs={ block.paragraphs }
              tags={ block.tags }
            />
          )) }

          <Box sx={ { mt: { xs: 4, md: 5 } } }>
            <Button
              component={ RouterLink }
              to="/about"
              sx={ {
                bgcolor: 'primary.main',
                color: 'brand.onBrand',
                '&:hover': { bgcolor: 'primary.light' },
              } }
            >
              더 알아보기
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutSection;
