import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AboutGoalNote from './about-goal-note.jsx';
import { fontFamilies } from '../../theme.js';

/**
 * AboutStoryBlock 컴포넌트
 * Home About 섹션의 이야기 한 토막. 번호 · 소제목 · 큰 인용구 · 본문으로 이뤄진다.
 * 인용구는 명조(display)로 크게 잡아 매거진의 리드문 역할을 한다.
 *
 * Props:
 * @param {string} index - 블록 번호 ('01' 형태) [Required]
 * @param {string} title - 소제목 [Required]
 * @param {string} lead - 큰 인용구 (한 문장) [Required]
 * @param {array} paragraphs - 본문 문단 문자열 배열 [Optional, 기본값: []]
 * @param {array} tags - 하단에 붙일 해시태그 배열 [Optional, 기본값: []]
 * @param {string} goal - 성장 목표 (있으면 강조 상자로 표시) [Optional]
 * @param {boolean} isLast - 마지막 블록이면 하단 구분선을 그리지 않는다 [Optional, 기본값: false]
 *
 * Example usage:
 * <AboutStoryBlock index="01" title="나의 개발 스토리" lead="..." paragraphs={ ['...'] } />
 */
function AboutStoryBlock({
  index,
  title,
  lead,
  paragraphs = [],
  tags = [],
  goal,
  isLast = false,
}) {
  return (
    <Box
      component="article"
      sx={ {
        pb: { xs: 4, md: 5 },
        mb: { xs: 4, md: 5 },
        borderBottom: isLast ? 'none' : '1px solid',
        borderColor: 'line.soft',
        '&:last-of-type': { pb: 0, mb: 0, borderBottom: 'none' },
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2,
          color: 'text.muted',
          fontFamily: fontFamilies.mono,
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
        } }
      >
        <Box component="span" sx={ { color: 'primary.main' } }>{ index }</Box>
        <Box
          component="span"
          aria-hidden="true"
          sx={ { flex: '0 0 24px', height: '1px', bgcolor: 'line.base' } }
        />
        <Box component="span">{ title }</Box>
      </Box>

      <Typography
        component="p"
        sx={ {
          fontFamily: fontFamilies.display,
          fontWeight: 700,
          fontSize: 'clamp(1.35rem, 3.2vw, 2.1rem)',
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          color: 'text.primary',
          mb: paragraphs.length > 0 ? 2.5 : 0,
        } }
      >
        { lead }
      </Typography>

      { paragraphs.map((paragraph) => (
        <Typography
          key={ paragraph.slice(0, 24) }
          variant="body1"
          sx={ { color: 'text.secondary', mb: 1.5, '&:last-of-type': { mb: 0 }, maxWidth: 620 } }
        >
          { paragraph }
        </Typography>
      )) }

      <AboutGoalNote goal={ goal } />

      { tags.length > 0 ? (
        <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2.5 } }>
          { tags.map((tag) => (
            <Box
              key={ tag }
              component="span"
              sx={ {
                px: 1.5,
                py: 0.5,
                borderRadius: '999px',
                border: '1px solid',
                borderColor: 'line.base',
                color: 'text.secondary',
                fontFamily: fontFamilies.mono,
                fontSize: '0.75rem',
              } }
            >
              { tag }
            </Box>
          )) }
        </Box>
      ) : null }
    </Box>
  );
}

export default AboutStoryBlock;
