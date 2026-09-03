import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import HeroSection from '../components/landing/hero-section.jsx';
import AboutSection from '../components/landing/about-section.jsx';
import SkillTreeSection from '../components/landing/skill-tree-section.jsx';
import { useInView } from '../hooks/use-in-view.js';

/**
 * Works · Contact 는 Supabase 클라이언트(gzip 약 53KB)를 끌고 오는 두 섹션이다.
 * 둘 다 첫 화면 아래에 있으므로, 스크롤이 근처에 닿을 때 내려받아
 * 초기 로딩에서 제외한다.
 */
const ProjectsSection = lazy(() => import('../components/landing/projects-section.jsx'));
const ContactSection = lazy(() => import('../components/landing/contact-section.jsx'));

/** 로드되기 전 자리를 지켜 레이아웃 이동(CLS)을 막는다 */
const WORKS_MIN_HEIGHT = { xs: 520, md: 560 };
const CONTACT_MIN_HEIGHT = { xs: 420, md: 520 };

/**
 * HomePage 컴포넌트
 * Hero / About / Skills / Works / Contact 5개 섹션으로 구성된 메인 페이지.
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  const { ref: worksRef, isInView: isWorksInView } = useInView();
  const { ref: contactRef, isInView: isContactInView } = useInView();

  return (
    <Box
      sx={ {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 3, md: 6 },
      } }
    >
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Stack spacing={ { xs: 2, md: 3 } }>
          <HeroSection />
          <AboutSection />
          <SkillTreeSection />

          <Box ref={ worksRef } sx={ { minHeight: WORKS_MIN_HEIGHT } }>
            { isWorksInView ? (
              <Suspense fallback={ null }>
                <ProjectsSection />
              </Suspense>
            ) : null }
          </Box>

          <Box ref={ contactRef } sx={ { minHeight: CONTACT_MIN_HEIGHT } }>
            { isContactInView ? (
              <Suspense fallback={ null }>
                <ContactSection />
              </Suspense>
            ) : null }
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
