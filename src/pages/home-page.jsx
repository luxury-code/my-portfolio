import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import HeroSection from '../components/landing/hero-section.jsx';
import AboutSection from '../components/landing/about-section.jsx';
import SkillTreeSection from '../components/landing/skill-tree-section.jsx';
import ProjectsSection from '../components/landing/projects-section.jsx';
import ContactSection from '../components/landing/contact-section.jsx';

/**
 * HomePage 컴포넌트
 * Hero / About Me / Skill Tree / Projects / Contact 5개 섹션으로 구성된 메인 페이지.
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  return (
    <Box
      sx={ {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 2, md: 4 },
      } }
    >
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Stack spacing={ { xs: 2, md: 3 } }>
          <HeroSection />
          <AboutSection />
          <SkillTreeSection />
          <ProjectsSection />
          <ContactSection />
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
