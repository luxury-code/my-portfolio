import Box from '@mui/material/Box';
import { fontFamilies } from '../../theme.js';

/**
 * SectionHeader 컴포넌트
 * 매거진 페이지 상단의 러닝헤드. 왼쪽에 섹션 번호·이름, 오른쪽에 보조 표기를 둔다.
 * 모든 섹션이 같은 자리에 같은 모양으로 반복되면서 페이지에 리듬을 만든다.
 *
 * Props:
 * @param {string} label - 왼쪽 표기 (예: '01 — ABOUT ME') [Required]
 * @param {string} meta - 오른쪽 표기 [Optional, 기본값: 'SOL / AURORA']
 * @param {string} id - 접근성용 id (aria-labelledby 대상) [Optional]
 *
 * Example usage:
 * <SectionHeader label="01 — ABOUT ME" id="about-heading" />
 */
function SectionHeader({ label, meta = 'SOL / AURORA', id }) {
  return (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        pb: 2.5,
        mb: { xs: 3, md: 4 },
        borderBottom: '1px solid',
        borderColor: 'line.soft',
        color: 'text.muted',
        fontFamily: fontFamilies.mono,
        fontSize: 'clamp(0.7rem, 0.9vw, 0.78rem)',
        letterSpacing: '0.14em',
      } }
    >
      <Box component="span" id={ id }>{ label }</Box>
      <Box component="span" sx={ { textAlign: 'right' } }>{ meta }</Box>
    </Box>
  );
}

export default SectionHeader;
