import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router-dom';

/** 네비게이션 탭 정의 — 라우트 경로와 1:1 대응 */
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

/**
 * NavBar 컴포넌트
 * Home / About Me / Projects 3개 탭을 제공하는 상단 네비게이션.
 * 다크 배경(#0B0B0B) 위에 라임(#DDFF50) 강조 — 대비비 17.3:1 (AAA)
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
        bgcolor: 'brand.dark',
        borderRadius: 0,
        borderBottom: '1px solid',
        borderColor: 'brand.borderDarkStrong',
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
            py: { xs: 1.5, sm: 0 },
          } }
        >
          <Typography
            component={ RouterLink }
            to="/"
            sx={ {
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'primary.main',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              '&:hover': { color: 'primary.light' },
            } }
          >
            MY PORTFOLIO
          </Typography>

          <Box
            sx={ {
              bgcolor: 'brand.surfaceDark',
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
                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                    color: 'brand.textSecondaryOnDark',
                    '&.Mui-selected': {
                      color: 'secondary.main',
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
