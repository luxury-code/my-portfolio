import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import SectionCard from '../ui/section-card.jsx';

/**
 * 대표작 썸네일 자리표시자.
 * 파스텔은 장식이 아니라 "카테고리 정보 코드" 로 사용한다.
 * (라벤더 = 카테고리 A, 시안 = 카테고리 B)
 */
const PROJECT_THUMBS = [
  { id: 'project-01', title: 'Project 01', category: '카테고리 A', color: 'accent.lavender' },
  { id: 'project-02', title: 'Project 02', category: '카테고리 B', color: 'accent.cyan' },
  { id: 'project-03', title: 'Project 03', category: '카테고리 A', color: 'accent.lavender' },
];

/**
 * ProjectsSection 컴포넌트
 * Home 페이지의 대표작 미리보기 섹션. 목록 페이지로 이동하는 버튼을 포함한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  return (
    <SectionCard
      label="04 / PROJECTS"
      title="Projects 섹션"
      description="여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다."
      tone="light"
    >
      <Grid container spacing={ 2 }>
        { PROJECT_THUMBS.map((thumb) => (
          <Grid key={ thumb.id } size={ { xs: 12, sm: 4 } }>
            <Box
              sx={ {
                bgcolor: thumb.color,
                borderRadius: '20px',
                p: { xs: 2.5, md: 3 },
                minHeight: { xs: 120, md: 150 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: 0.5,
              } }
            >
              <Box
                sx={ {
                  color: 'rgb(11 11 11 / 0.65)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                } }
              >
                { thumb.category }
              </Box>
              <Box
                sx={ {
                  color: 'secondary.main',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  fontWeight: 700,
                } }
              >
                { thumb.title }
              </Box>
            </Box>
          </Grid>
        )) }
      </Grid>

      <Box sx={ { mt: 3 } }>
        <Button
          component={ RouterLink }
          to="/projects"
          sx={ {
            bgcolor: 'secondary.main',
            color: 'brand.textInverse',
            '&:hover': { bgcolor: 'brand.surfaceDark' },
          } }
        >
          더 보기
        </Button>
      </Box>
    </SectionCard>
  );
}

export default ProjectsSection;
