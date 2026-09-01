import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import ProjectCard from './project-card.jsx';

/** 반응형 열 구성 — 데스크톱 4열 / 태블릿 2열 / 모바일 1열 */
const GRID_SIZE = { xs: 12, sm: 6, lg: 3 };

/** 로딩 중 보여줄 스켈레톤 카드 개수 */
const SKELETON_COUNT = 4;

/**
 * 로딩 상태용 스켈레톤 카드.
 * 실제 카드와 같은 형태를 유지해 레이아웃 이동(CLS)을 막는다.
 */
function ProjectCardSkeleton() {
  return (
    <Box
      sx={ {
        height: '100%',
        border: '2px solid',
        borderColor: 'brand.surfaceSubtle',
        borderRadius: { xs: '16px', md: '20px' },
        overflow: 'hidden',
      } }
    >
      <Skeleton variant="rectangular" animation="wave" sx={ { width: '100%', aspectRatio: '16 / 9' } } />
      <Box sx={ { p: { xs: 2, md: 2.5 } } }>
        <Skeleton width="70%" height={ 26 } />
        <Skeleton width="100%" />
        <Skeleton width="85%" />
        <Skeleton width="60%" height={ 28 } sx={ { mt: 1 } } />
        <Skeleton variant="rounded" height={ 40 } sx={ { mt: 2, borderRadius: '999px' } } />
      </Box>
    </Box>
  );
}

/**
 * ProjectGrid 컴포넌트
 * 프로젝트 카드를 반응형 그리드로 배치하고 로딩 · 오류 · 빈 목록 상태를 처리한다.
 *
 * Props:
 * @param {array} projects - 표시할 프로젝트 배열 [Required]
 * @param {boolean} isLoading - 로딩 중 여부 [Optional, 기본값: false]
 * @param {string} error - 오류 메시지 (없으면 빈 문자열) [Optional, 기본값: '']
 *
 * Example usage:
 * <ProjectGrid projects={ projects } isLoading={ isLoading } error={ error } />
 */
function ProjectGrid({ projects, isLoading = false, error = '' }) {
  if (error) {
    return (
      <Alert
        severity="error"
        sx={ { borderRadius: '16px', border: '2px solid', borderColor: 'secondary.main' } }
      >
        { error }
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Grid container spacing={ { xs: 2, md: 3 } }>
        { Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <Grid key={ `skeleton-${ index }` } size={ GRID_SIZE }>
            <ProjectCardSkeleton />
          </Grid>
        )) }
      </Grid>
    );
  }

  if (projects.length === 0) {
    return (
      <Box
        sx={ {
          py: { xs: 6, md: 8 },
          textAlign: 'center',
          color: 'text.secondary',
          bgcolor: 'brand.surfaceSubtle',
          borderRadius: '20px',
          fontSize: { xs: '0.95rem', md: '1rem' },
        } }
      >
        아직 등록된 프로젝트가 없습니다.
      </Box>
    );
  }

  return (
    <Grid container spacing={ { xs: 2, md: 3 } }>
      { projects.map((project) => (
        <Grid key={ project.id } size={ GRID_SIZE }>
          <ProjectCard project={ project } />
        </Grid>
      )) }
    </Grid>
  );
}

export default ProjectGrid;
