import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SectionCard from '../ui/section-card.jsx';

/** 연락처 자리표시자 — 실제 링크는 추후 연결 예정 */
const CONTACT_ITEMS = ['Email', 'GitHub', 'LinkedIn'];

/**
 * ContactSection 컴포넌트
 * Home 페이지 마지막 섹션. 페이지 내 유일한 라임 CTA 를 담당한다.
 * (컬러 가이드: 페이지당 주요 라임 CTA 는 1개)
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  return (
    <SectionCard
      label="05 / CONTACT"
      title="Contact 섹션"
      description="여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다."
      tone="dark"
    >
      <Box sx={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 } }>
        <Button
          sx={ {
            bgcolor: 'primary.main',
            color: 'secondary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          } }
        >
          메시지 보내기
        </Button>

        <Box
          sx={ {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            color: 'brand.textSecondaryOnDark',
            fontSize: { xs: '0.9rem', md: '0.95rem' },
          } }
        >
          { CONTACT_ITEMS.map((item) => (
            <Box key={ item } component="span">
              { item }
            </Box>
          )) }
        </Box>
      </Box>
    </SectionCard>
  );
}

export default ContactSection;
