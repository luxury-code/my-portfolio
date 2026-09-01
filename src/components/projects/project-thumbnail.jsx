import { useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

/**
 * ProjectThumbnail 컴포넌트
 * image.thum.io API 로 생성한 썸네일을 16:9 비율로 보여준다.
 * 로딩 중에는 Skeleton, 실패 시에는 프로젝트 이니셜 색면으로 대체한다.
 *
 * Props:
 * @param {string} src - 썸네일 이미지 URL [Optional]
 * @param {string} title - 대체 텍스트로 사용할 프로젝트 제목 [Required]
 *
 * Example usage:
 * <ProjectThumbnail src="https://image.thum.io/get/https://example.com" title="예시" />
 */
function ProjectThumbnail({ src, title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  return (
    <Box
      sx={ {
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        bgcolor: 'brand.surfaceSubtle',
        borderBottom: '2px solid',
        borderColor: 'secondary.main',
      } }
    >
      { showFallback ? (
        <Box
          sx={ {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            color: 'secondary.main',
            fontSize: { xs: '1.75rem', md: '2rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
          } }
        >
          { title?.slice(0, 2) ?? 'P' }
        </Box>
      ) : (
        <>
          { !isLoaded && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={ { position: 'absolute', inset: 0, width: '100%', height: '100%' } }
            />
          ) }

          <Box
            component="img"
            src={ src }
            alt={ `${ title } 썸네일` }
            loading="lazy"
            onLoad={ () => setIsLoaded(true) }
            onError={ () => setHasError(true) }
            sx={ {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease, transform 0.35s ease',
            } }
          />
        </>
      ) }
    </Box>
  );
}

export default ProjectThumbnail;
