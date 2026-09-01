import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProjectGrid from '../components/projects/project-grid.jsx';
import { useProjects } from '../hooks/use-projects.js';

/**
 * ProjectsPage 컴포넌트
 * Supabase 에 등록된 프로젝트를 카드 그리드(데스크톱 4열 / 태블릿 2열 / 모바일 1열)로 보여준다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  const { projects, isLoading, error } = useProjects();

  return (
    <Box
      sx={ {
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 4, md: 8 },
      } }
    >
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Box sx={ { mb: { xs: 3, md: 5 } } }>
          <Box
            component="span"
            sx={ {
              display: 'inline-block',
              bgcolor: 'accent.cyan',
              color: 'secondary.main',
              borderRadius: '999px',
              px: 1.75,
              py: 0.5,
              fontSize: { xs: '0.72rem', md: '0.78rem' },
              fontWeight: 700,
              letterSpacing: '0.08em',
            } }
          >
            PROJECTS
          </Box>

          <Typography
            variant="h1"
            sx={ {
              mt: 2,
              mb: 1.5,
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '3rem' },
            } }
          >
            만들어 온 것들
          </Typography>

          <Typography
            sx={ {
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              maxWidth: 640,
            } }
          >
            기획부터 배포까지 직접 진행한 프로젝트입니다. 카드를 눌러 실제 서비스와 저장소를 확인해 보세요.
          </Typography>
        </Box>

        <ProjectGrid projects={ projects } isLoading={ isLoading } error={ error } />
      </Container>
    </Box>
  );
}

export default ProjectsPage;
