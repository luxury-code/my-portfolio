import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SectionCard from '../components/ui/section-card.jsx';

/**
 * AboutPage 컴포넌트
 * 상세 자기소개가 들어갈 About Me 페이지.
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
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      } }
    >
      <Container maxWidth="md" sx={ { px: { xs: 2, md: 3 } } }>
        <SectionCard
          label="ABOUT ME"
          title="About Me 페이지"
          description="About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다."
          tone="subtle"
        />
      </Container>
    </Box>
  );
}

export default AboutPage;
