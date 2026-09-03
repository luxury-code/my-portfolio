import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { fontFamilies } from '../../theme.js';

/** 표에 뿌릴 항목 정의 — basicInfo 의 키와 1:1 대응 */
const INFO_ROWS = [
  { key: 'education', label: 'EDUCATION', text: '학력' },
  { key: 'major', label: 'MAJOR', text: '전공' },
  { key: 'experience', label: 'EXPERIENCE', text: '경력' },
];

/**
 * AboutBasicInfo 컴포넌트
 * About Me 페이지 상단의 기본 정보 카드.
 * 왼쪽에 프로필 사진, 오른쪽에 이름과 학력·전공·경력을 배치한다.
 *
 * 사진은 Unsplash CDN 이미지이며 불러오지 못하면 이니셜 색면으로 대체한다.
 *
 * Props:
 * @param {object} basicInfo - { name, education, major, experience, photo } [Required]
 * @param {function} onRefreshPhoto - 다른 사진으로 바꾸는 함수 [Optional]
 *
 * Example usage:
 * <AboutBasicInfo basicInfo={ aboutMe.basicInfo } onRefreshPhoto={ handleRefreshPhoto } />
 */
function AboutBasicInfo({ basicInfo, onRefreshPhoto }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  /** 사진이 바뀌면 로딩 상태를 다시 잡아야 한다 */
  const handleRefresh = () => {
    setIsLoaded(false);
    setHasError(false);
    onRefreshPhoto?.();
  };

  return (
    <Box
      component="section"
      aria-labelledby="basic-info-heading"
      sx={ {
        borderRadius: { xs: '16px', md: '20px' },
        border: '1px solid',
        borderColor: 'line.soft',
        bgcolor: 'surface.elevated',
        p: { xs: 2.5, md: 4 },
      } }
    >
      { /** MUI v7 Grid 는 alignItems 를 prop 으로 받지 않는다 — sx 로 지정해야 DOM 으로 새지 않는다 */ }
      <Grid container spacing={ { xs: 3, md: 5 } } sx={ { alignItems: 'center' } }>
        <Grid size={ { xs: 12, sm: 4, md: 3 } }>
          <Box
            sx={ {
              position: 'relative',
              width: '100%',
              maxWidth: { xs: 180, sm: '100%' },
              mx: { xs: 'auto', sm: 0 },
              aspectRatio: '1 / 1',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'line.soft',
              bgcolor: 'surface.subtle',
            } }
          >
            { hasError ? (
              <Box
                sx={ {
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fontFamilies.display,
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 6vw, 3rem)',
                  color: 'brand.onBrand',
                  background: `radial-gradient(
                    120% 120% at 30% 25%,
                    var(--aurora-core) 0%,
                    var(--aurora-spread) 45%,
                    var(--aurora-edge) 100%
                  )`,
                } }
              >
                { basicInfo.name.slice(0, 1) }
              </Box>
            ) : (
              <>
                { !isLoaded ? (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={ { position: 'absolute', inset: 0, width: '100%', height: '100%' } }
                  />
                ) : null }

                <Box
                  component="img"
                  src={ basicInfo.photo }
                  alt={ `${ basicInfo.name } 프로필 이미지` }
                  loading="lazy"
                  onLoad={ () => setIsLoaded(true) }
                  onError={ () => setHasError(true) }
                  sx={ {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                  } }
                />
              </>
            ) }
          </Box>

          { onRefreshPhoto ? (
            <Button
              onClick={ handleRefresh }
              startIcon={ <AutorenewRoundedIcon /> }
              sx={ {
                mt: 1.5,
                width: '100%',
                maxWidth: { xs: 180, sm: '100%' },
                mx: { xs: 'auto', sm: 0 },
                display: 'flex',
                minHeight: 40,
                px: 1.5,
                fontSize: '0.8rem',
                bgcolor: 'transparent',
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'line.base',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'brand.onBrand',
                  borderColor: 'primary.main',
                },
              } }
            >
              다른 사진 보기
            </Button>
          ) : null }
        </Grid>

        <Grid size={ { xs: 12, sm: 8, md: 9 } }>
          <Box
            sx={ {
              color: 'primary.main',
              fontFamily: fontFamilies.mono,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              mb: 1,
            } }
          >
            BASIC INFO
          </Box>

          <Typography
            id="basic-info-heading"
            variant="h1"
            sx={ {
              mb: 3,
              color: 'text.primary',
              fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
            } }
          >
            { basicInfo.name }
          </Typography>

          <Box
            component="dl"
            sx={ {
              m: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 2, md: 3 },
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'line.soft',
            } }
          >
            { INFO_ROWS.map((row) => (
              <Box key={ row.key }>
                <Box
                  component="dt"
                  sx={ {
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 1,
                    mb: 0.75,
                    color: 'text.muted',
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                  } }
                >
                  <Box component="span">{ row.label }</Box>
                  <Box component="span" sx={ { letterSpacing: 0 } }>{ row.text }</Box>
                </Box>

                <Box
                  component="dd"
                  sx={ {
                    m: 0,
                    color: 'text.primary',
                    fontSize: 'clamp(0.92rem, 1.2vw, 1.02rem)',
                    lineHeight: 1.5,
                    fontWeight: 700,
                  } }
                >
                  { basicInfo[row.key] }
                </Box>
              </Box>
            )) }
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutBasicInfo;
