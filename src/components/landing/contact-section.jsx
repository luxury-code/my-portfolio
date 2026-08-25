import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import SectionCard from '../ui/section-card.jsx';
import ContactInfo from '../contact/contact-info.jsx';
import GuestbookForm from '../contact/guestbook-form.jsx';
import GuestbookList from '../contact/guestbook-list.jsx';
import { useGuestbook } from '../../hooks/use-guestbook.js';

/**
 * ContactSection 컴포넌트
 * Home 페이지 마지막 섹션. 위쪽에 연락처 · SNS, 아래쪽에 방명록을 배치한다.
 * 페이지 내 유일한 라임 CTA(방명록 남기기 버튼)를 담당한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const { entries, isLoading, isSubmitting, error, submitEntry } = useGuestbook();
  const [isToastOpen, setIsToastOpen] = useState(false);

  /** 방명록 등록 후 성공 안내 토스트를 띄운다 */
  const handleSubmit = async (form) => {
    const isSuccess = await submitEntry(form);

    if (isSuccess) {
      setIsToastOpen(true);
    }

    return isSuccess;
  };

  return (
    <SectionCard
      label="05 / CONTACT"
      title="Contact"
      description="편하게 연락 주세요. 아래 방명록에 따뜻한 한마디를 남겨주셔도 좋아요."
      tone="warm"
    >
      <Stack spacing={ { xs: 3, md: 4 } }>
        <ContactInfo />

        <Divider sx={ { borderColor: 'rgb(11 11 11 / 0.08)' } } />

        <Box>
          <Typography
            variant="h3"
            sx={ {
              mb: 0.5,
              fontSize: { xs: '1.15rem', md: '1.35rem' },
              color: 'text.primary',
            } }
          >
            방명록
          </Typography>

          <Typography
            sx={ {
              mb: 2.5,
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', md: '0.95rem' },
            } }
          >
            이름을 비워두면 익명으로 남겨집니다. 이메일은 공개를 선택하지 않으면 비공개로 저장돼요.
          </Typography>

          <Stack spacing={ { xs: 2.5, md: 3 } }>
            <GuestbookForm onSubmit={ handleSubmit } isSubmitting={ isSubmitting } />

            { error ? (
              <Alert severity="error" sx={ { borderRadius: '16px' } }>
                { error }
              </Alert>
            ) : null }

            <GuestbookList entries={ entries } isLoading={ isLoading } />
          </Stack>
        </Box>
      </Stack>

      <Snackbar
        open={ isToastOpen }
        autoHideDuration={ 3000 }
        onClose={ () => setIsToastOpen(false) }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
      >
        <Alert severity="success" sx={ { borderRadius: '16px' } }>
          방명록이 등록되었습니다. 감사합니다!
        </Alert>
      </Snackbar>
    </SectionCard>
  );
}

export default ContactSection;
