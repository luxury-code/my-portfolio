import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/** 대표 이메일 */
const EMAIL = 'eunsol229@gmail.com';

/**
 * SNS 링크 목록.
 * TODO: 카페 / 인스타그램 / 링크드인 주소를 실제 계정 URL 로 교체할 것.
 */
const SNS_LINKS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/luxury-code', Icon: GitHubIcon },
  { id: 'cafe', label: '카페', href: '#', Icon: LocalCafeRoundedIcon },
  { id: 'instagram', label: 'Instagram', href: '#', Icon: InstagramIcon },
  { id: 'linkedin', label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
];

/**
 * ContactInfo 컴포넌트
 * 이메일(아이콘 + 텍스트)과 동그란 SNS 아이콘 버튼을 함께 보여준다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactInfo />
 */
function ContactInfo() {
  return (
    <Stack spacing={ 2.5 }>
      <Box
        component="a"
        href={ `mailto:${ EMAIL }` }
        sx={ {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.5,
          alignSelf: 'flex-start',
          maxWidth: '100%',
          px: { xs: 2, md: 2.5 },
          py: { xs: 1.25, md: 1.5 },
          bgcolor: 'background.default',
          borderRadius: '999px',
          color: 'text.primary',
          textDecoration: 'none',
          transition: 'background-color 0.18s ease',
          '&:hover': { bgcolor: 'accent.peach' },
        } }
      >
        <MailOutlineRoundedIcon sx={ { fontSize: 22 } } />
        <Box
          component="span"
          sx={ {
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            fontWeight: 700,
            wordBreak: 'break-all',
          } }
        >
          { EMAIL }
        </Box>
      </Box>

      <Box>
        <Typography
          component="p"
          sx={ {
            mb: 1.25,
            color: 'text.secondary',
            fontSize: { xs: '0.82rem', md: '0.85rem' },
            fontWeight: 700,
            letterSpacing: '0.06em',
          } }
        >
          FOLLOW ME
        </Typography>

        <Stack direction="row" spacing={ 1.5 } sx={ { flexWrap: 'wrap', gap: 1.5 } }>
          { SNS_LINKS.map(({ id, label, href, Icon }) => (
            <Tooltip key={ id } title={ label }>
              <IconButton
                component="a"
                href={ href }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ label }
                sx={ {
                  width: 48,
                  height: 48,
                  bgcolor: 'background.default',
                  color: 'text.primary',
                  transition: 'background-color 0.18s ease, transform 0.18s ease',
                  '&:hover': { bgcolor: 'accent.peach', transform: 'translateY(-2px)' },
                } }
              >
                <Icon sx={ { fontSize: 22 } } />
              </IconButton>
            </Tooltip>
          )) }
        </Stack>
      </Box>
    </Stack>
  );
}

export default ContactInfo;
