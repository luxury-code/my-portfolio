import Box from '@mui/material/Box';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { fontFamilies } from '../../theme.js';

/**
 * AboutGoalNote 컴포넌트
 * 섹션에 성장 목표(goal)가 있을 때 본문 아래에 붙는 강조 상자.
 * /about 의 아코디언과 Home 의 About 섹션이 함께 쓴다.
 *
 * Props:
 * @param {string} goal - 성장 목표 문구 [Required]
 *
 * Example usage:
 * <AboutGoalNote goal="시니어 프론트엔드 개발자" />
 */
function AboutGoalNote({ goal }) {
  if (!goal) {
    return null;
  }

  return (
    <Box
      sx={ {
        mt: 3,
        p: { xs: 2, md: 2.5 },
        borderRadius: '14px',
        border: '1px solid',
        borderColor: 'line.soft',
        bgcolor: 'surface.subtle',
        display: 'flex',
        alignItems: 'center',
        gap: 1.75,
      } }
    >
      <FlagRoundedIcon sx={ { color: 'primary.main', fontSize: 22, flexShrink: 0 } } />

      <Box sx={ { minWidth: 0 } }>
        <Box
          sx={ {
            color: 'text.muted',
            fontFamily: fontFamilies.mono,
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            mb: 0.5,
          } }
        >
          GOAL 성장 목표
        </Box>
        <Box sx={ { color: 'text.primary', fontWeight: 700, fontSize: '1rem' } }>
          { goal }
        </Box>
      </Box>
    </Box>
  );
}

export default AboutGoalNote;
