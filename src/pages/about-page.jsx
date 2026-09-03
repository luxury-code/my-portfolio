import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import AboutBasicInfo from '../components/about/about-basic-info.jsx';
import AboutSectionAccordion from '../components/about/about-section-accordion.jsx';
import SectionHeader from '../components/ui/section-header.jsx';
import { aboutMeData, pickRandomPhoto } from '../utils/about-me-data.js';
import { fontFamilies } from '../theme.js';

/**
 * AboutPage 컴포넌트
 * About Me 탭(/about)의 페이지.
 *
 * 상단에 기본 정보 카드, 아래에 이야기 3편을 아코디언으로 배치한다.
 * 데이터는 useState 로 들고 있으며, 프로필 사진 교체가 실제로 상태를 갱신한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  const [aboutMe, setAboutMe] = useState(aboutMeData);

  /** 프로필 사진을 다른 Unsplash 이미지로 교체한다 */
  const handleRefreshPhoto = () => {
    setAboutMe((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        photo: pickRandomPhoto(prev.basicInfo.photo),
      },
    }));
  };

  const homeSectionCount = aboutMe.sections.filter((section) => section.showInHome).length;

  return (
    <Box
      sx={ {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 4, md: 8 },
      } }
    >
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <SectionHeader label="ABOUT ME" meta="SOL / AURORA" />

        <Stack spacing={ { xs: 2, md: 3 } }>
          <AboutBasicInfo
            basicInfo={ aboutMe.basicInfo }
            onRefreshPhoto={ handleRefreshPhoto }
          />

          <Box
            component="section"
            aria-labelledby="about-sections-heading"
            sx={ {
              borderRadius: { xs: '16px', md: '20px' },
              border: '1px solid',
              borderColor: 'line.soft',
              bgcolor: 'surface.subtle',
              p: { xs: 2, md: 4 },
            } }
          >
            <Box
              id="about-sections-heading"
              sx={ {
                color: 'primary.main',
                fontFamily: fontFamilies.mono,
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                mb: 2.5,
              } }
            >
              MY STORY
            </Box>

            <AboutSectionAccordion sections={ aboutMe.sections } />
          </Box>
        </Stack>

        { /** 제목 옆 점 표식이 무엇을 뜻하는지 알려 준다 */ }
        <Box
          sx={ {
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.muted',
            fontFamily: fontFamilies.mono,
            fontSize: '0.72rem',
            letterSpacing: '0.06em',
          } }
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={ { width: 6, height: 6, borderRadius: '999px', bgcolor: 'primary.main' } }
          />
          <Box component="span">
            { `Home 탭에도 보이는 이야기 ${ homeSectionCount }편` }
          </Box>
        </Box>

        <Box
          sx={ {
            mt: { xs: 5, md: 8 },
            pt: { xs: 4, md: 5 },
            borderTop: '1px solid',
            borderColor: 'line.soft',
          } }
        >
          <Typography variant="h2" sx={ { mb: 1.5, color: 'text.primary' } }>
            더 궁금하시다면
          </Typography>

          <Typography variant="body1" sx={ { color: 'text.secondary', mb: 3, maxWidth: 560 } }>
            직접 만든 것들을 보시거나, 방명록에 한마디 남겨주세요.
          </Typography>

          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1.5 } }>
            <Button
              component={ RouterLink }
              to="/projects"
              sx={ {
                bgcolor: 'primary.main',
                color: 'brand.onBrand',
                '&:hover': { bgcolor: 'primary.light' },
              } }
            >
              프로젝트 보러 가기
            </Button>

            <Button
              component={ RouterLink }
              to="/"
              sx={ {
                bgcolor: 'transparent',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'line.base',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'brand.onBrand',
                  borderColor: 'primary.main',
                },
              } }
            >
              방명록 남기러 가기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutPage;
