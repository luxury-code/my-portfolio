import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

/**
 * 기술 스택 뱃지 색상 순환표.
 * 파스텔은 장식이 아니라 "스택 구분 정보 코드" 로 사용한다.
 */
const BADGE_COLORS = [
  'accent.lavender',
  'accent.cyan',
  'accent.mint',
  'accent.blue',
  'accent.peach',
  'accent.amber',
];

/**
 * TechStackList 컴포넌트
 * 프로젝트의 기술 스택을 뱃지(Chip) 형태로 나열한다.
 *
 * Props:
 * @param {array} techStack - 기술 스택 문자열 배열 [Optional, 기본값: []]
 *
 * Example usage:
 * <TechStackList techStack={ ['React 19', 'Supabase'] } />
 */
function TechStackList({ techStack = [] }) {
  if (techStack.length === 0) {
    return null;
  }

  return (
    <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.75 } }>
      { techStack.map((tech, index) => (
        <Chip
          key={ tech }
          label={ tech }
          size="small"
          sx={ {
            bgcolor: BADGE_COLORS[index % BADGE_COLORS.length],
            color: 'brand.onBrand',
            fontSize: { xs: '0.68rem', md: '0.72rem' },
            height: 24,
            '& .MuiChip-label': { px: 1.25 },
          } }
        />
      )) }
    </Box>
  );
}

export default TechStackList;
