import Box from '@mui/material/Box';
import SectionCard from '../ui/section-card.jsx';

/**
 * 기술 스택 태그 — 같은 종류의 정보에는 항상 같은 파스텔을 사용한다.
 * (색만으로 구분하지 않도록 텍스트 레이블을 항상 함께 표기)
 */
const SKILL_TAGS = [
  { name: 'Frontend', color: 'accent.blue' },
  { name: 'Backend', color: 'accent.mint' },
  { name: 'Design', color: 'accent.peach' },
];

/**
 * SkillTreeSection 컴포넌트
 * Home 페이지의 기술 스택 시각화 예정 영역.
 * 다크 배경(#0B0B0B) 위 흰 텍스트 — 대비비 19.7:1
 *
 * Props: 없음
 *
 * Example usage:
 * <SkillTreeSection />
 */
function SkillTreeSection() {
  return (
    <SectionCard
      label="03 / SKILL TREE"
      title="Skill Tree 섹션"
      description="여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다."
      tone="dark"
    >
      <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1.5 } }>
        { SKILL_TAGS.map((tag) => (
          <Box
            key={ tag.name }
            sx={ {
              bgcolor: tag.color,
              color: 'secondary.main',
              borderRadius: '999px',
              px: 2,
              py: 1,
              fontSize: { xs: '0.85rem', md: '0.9rem' },
              fontWeight: 700,
            } }
          >
            { tag.name }
          </Box>
        )) }
      </Box>
    </SectionCard>
  );
}

export default SkillTreeSection;
