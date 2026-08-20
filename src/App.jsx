import Box from '@mui/material/Box';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/common/nav-bar.jsx';
import HomePage from './pages/home-page.jsx';
import AboutPage from './pages/about-page.jsx';
import ProjectsPage from './pages/projects-page.jsx';

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
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/about" element={ <AboutPage /> } />
          <Route path="/projects" element={ <ProjectsPage /> } />
          <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
