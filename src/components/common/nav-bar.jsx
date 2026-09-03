import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { fontFamilies } from '../../theme.js';

/** 네비게이션 탭 정의 — 라우트 경로와 1:1 대응 */
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Works', path: '/projects' },
];

/**
 * NavBar 컴포넌트
 * Home / About / Works 3개 탭을 제공하는 상단 네비게이션.
 * 페이지 전체가 다크(#0B0B0B)가 되었으므로, 배경 블러 + 하단 경계선으로 층위를 구분한다.
 * 워드마크는 라임(#DDFF50) — 밤하늘 대비 17.3:1 (AAA)
 *
 * Props: 없음 (현재 경로는 useLocation 으로 직접 조회)
 *
 * Example usage:
 * <NavBar />
 */
function NavBar() {
  const location = useLocation();
  const currentPath = NAV_ITEMS.some((item) => item.path === location.pathname)
    ? location.pathname
    : false;

  return (
    <AppBar
      position="sticky"
      elevation={ 0 }
      sx={ {
        bgcolor: 'rgb(11 11 11 / 0.72)',
        backdropFilter: 'blur(12px)',
        backgroundImage: 'none',
        borderRadius: 0,
        borderBottom: '1px solid',
        borderColor: 'line.soft',
      } }
    >
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Toolbar
          disableGutters
          sx={ {
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            py: { xs: 1.25, sm: 0 },
          } }
        >
          <Typography
            component={ RouterLink }
            to="/"
            sx={ {
              fontFamily: fontFamilies.mono,
              fontWeight: 700,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              letterSpacing: '0.06em',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { color: 'primary.light' },
            } }
          >
            SOL / AURORA
          </Typography>

          <Box
            sx={ {
              bgcolor: 'surface.subtle',
              border: '1px solid',
              borderColor: 'line.soft',
              borderRadius: '999px',
              px: 0.5,
            } }
          >
            <Tabs
              value={ currentPath }
              textColor="inherit"
              variant="scrollable"
              scrollButtons={ false }
              sx={ {
                minHeight: 44,
                '& .MuiTabs-indicator': { display: 'none' },
              } }
            >
              { NAV_ITEMS.map((item) => (
                <Tab
                  key={ item.path }
                  label={ item.label }
                  value={ item.path }
                  component={ RouterLink }
                  to={ item.path }
                  disableRipple
                  sx={ {
                    minHeight: 44,
                    px: { xs: 1.5, md: 2.5 },
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                    color: 'text.secondary',
                    transition: 'color 0.2s, background-color 0.2s',
                    '&:hover': { color: 'text.primary' },
                    '&.Mui-selected': {
                      color: 'brand.onBrand',
                      bgcolor: 'primary.main',
                    },
                  } }
                />
              )) }
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
