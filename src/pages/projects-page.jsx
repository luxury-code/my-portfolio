import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SectionCard from '../components/ui/section-card.jsx';

/**
 * ProjectsPage 컴포넌트
 * 포트폴리오 작품 목록이 들어갈 Projects 페이지.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  return (
    <Box
      sx={ {
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      } }
    >
      <Container maxWidth="md" sx={ { px: { xs: 2, md: 3 } } }>
        <SectionCard
          label="PROJECTS"
          title="Projects 페이지"
          description="Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다."
          tone="light"
        />
      </Container>
    </Box>
  );
}

export default ProjectsPage;
