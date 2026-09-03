import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import ProjectGrid from '../projects/project-grid.jsx';
import SectionHeader from '../ui/section-header.jsx';
import { useProjects } from '../../hooks/use-projects.js';

/** Home 에서는 대표작만 추린다 — 전체는 /projects 에서 본다 */
const PREVIEW_COUNT = 3;

/**
 * ProjectsSection 컴포넌트
 * Home 페이지의 대표작 미리보기 섹션.
 *
 * 자리표시자 카드를 쓰지 않고 /projects 와 같은 Supabase 원본을 공유한다.
 * (미리보기와 실제 목록이 어긋나던 문제를 없앤다)
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const { projects, isLoading, error } = useProjects();
  const preview = projects.slice(0, PREVIEW_COUNT);
  const hasMore = projects.length > PREVIEW_COUNT;

  return (
    <Box
      component="section"
      aria-labelledby="works-heading"
      sx={ {
        width: '100%',
        borderRadius: { xs: '16px', md: '20px' },
        border: '1px solid',
        borderColor: 'line.soft',
        bgcolor: 'surface.elevated',
        p: { xs: 2.5, md: 5 },
      } }
    >
      <SectionHeader label="03 — WORKS" meta="SELECTED" id="works-heading" />

      <Typography variant="h2" sx={ { mb: 1.5, color: 'text.primary' } }>
        직접 만든 것들
      </Typography>

      <Typography variant="body1" sx={ { color: 'text.secondary', mb: { xs: 3, md: 4 }, maxWidth: 620 } }>
        기획부터 배포까지 혼자 진행한 프로젝트입니다. 카드를 눌러 실제로 돌아가는 서비스와 코드를 확인해 보세요.
      </Typography>

      <ProjectGrid
        projects={ preview }
        isLoading={ isLoading }
        error={ error }
        gridSize={ { xs: 12, sm: 6, md: 4 } }
        skeletonCount={ PREVIEW_COUNT }
      />

      { hasMore ? (
        <Box sx={ { mt: { xs: 3, md: 4 } } }>
          <Button
            component={ RouterLink }
            to="/projects"
            sx={ {
              bgcolor: 'primary.main',
              color: 'brand.onBrand',
              '&:hover': { bgcolor: 'primary.light' },
            } }
          >
            { `프로젝트 ${ projects.length }개 전체 보기` }
          </Button>
        </Box>
      ) : null }
    </Box>
  );
}

export default ProjectsSection;
