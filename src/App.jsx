import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/common/nav-bar.jsx';
import SiteLoader from './components/common/site-loader.jsx';

/**
 * 페이지 단위 코드 스플리팅.
 * 첫 진입 시 Home 만 내려받고, About/Projects 는 이동 시점에 가져온다.
 */
const HomePage = lazy(() => import('./pages/home-page.jsx'));
const AboutPage = lazy(() => import('./pages/about-page.jsx'));
const ProjectsPage = lazy(() => import('./pages/projects-page.jsx'));

/**
 * RouteFallback 컴포넌트
 * 청크를 내려받는 짧은 순간에 보여줄 로딩 표시.
 * 레이아웃 이동(CLS)을 막기 위해 최소 높이를 확보한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <Suspense fallback={ <RouteFallback /> }>
 */
function RouteFallback() {
  return (
    <Box
      sx={ {
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <CircularProgress size={ 28 } sx={ { color: 'primary.main' } } />
    </Box>
  );
}

/**
 * App 컴포넌트
 * 네비게이션 + 라우팅 전체 레이아웃을 담당한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <Box
      sx={ {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      } }
    >
      <SiteLoader />
      <NavBar />

      <Box
        component="main"
        sx={ {
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        } }
      >
        <Suspense fallback={ <RouteFallback /> }>
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/about" element={ <AboutPage /> } />
            <Route path="/projects" element={ <ProjectsPage /> } />
            <Route path="*" element={ <Navigate to="/" replace /> } />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
}

export default App;
