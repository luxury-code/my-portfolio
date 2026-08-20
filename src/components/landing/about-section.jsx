import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import SectionCard from '../ui/section-card.jsx';

/**
 * AboutSection 컴포넌트
 * Home 페이지의 About Me 요약 섹션. 상세 페이지로 이동하는 버튼을 포함한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  return (
    <SectionCard
      label="02 / ABOUT ME"
      title="About Me 섹션"
      description="여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다."
      tone="subtle"
    >
      <Button
        component={ RouterLink }
        to="/about"
        sx={ {
          bgcolor: 'secondary.main',
          color: 'brand.textInverse',
          '&:hover': { bgcolor: 'brand.surfaceDark' },
        } }
      >
        더 알아보기
      </Button>
    </SectionCard>
  );
}

export default AboutSection;
