import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fontFamilies } from '../../theme.js';

/** 대표 이메일 */
const EMAIL = 'eunsol229@gmail.com';

/**
 * SNS 링크 목록.
 *
 * href 가 비어 있는 항목은 렌더링하지 않는다.
 * 눌러도 아무 일이 없는 링크를 두는 것보다, 아직 없는 채로 두는 편이 낫다.
 * 계정이 생기면 아래 href 에 주소만 채우면 그대로 노출된다.
 */
const SNS_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/luxury-code',
    Icon: GitHubIcon,
  },
  { id: 'instagram', label: 'Instagram', href: '', Icon: InstagramIcon },
  { id: 'linkedin', label: 'LinkedIn', href: '', Icon: LinkedInIcon },
];

/**
 * ContactInfo 컴포넌트
 * 이메일(아이콘 + 텍스트)과 SNS 아이콘 버튼, 그리고 응답 약속을 함께 보여준다.
 * 주소만 적어 두는 것보다 "언제까지 답하는지" 를 밝히는 편이 연락 문턱을 낮춘다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactInfo />
 */
function ContactInfo() {
  const visibleLinks = SNS_LINKS.filter((link) => link.href);

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
          bgcolor: 'surface.elevated',
          border: '1px solid',
          borderColor: 'line.soft',
          borderRadius: '999px',
          color: 'text.primary',
          textDecoration: 'none',
          transition: 'background-color 0.18s ease, color 0.18s ease',
          '&:hover': { bgcolor: 'primary.main', color: 'brand.onBrand' },
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

      <Typography
        component="p"
        sx={ { color: 'text.muted', fontSize: '0.85rem', lineHeight: 1.6 } }
      >
        보내주신 메일은 늦어도 <Box component="span" sx={ { color: 'primary.main', fontWeight: 700 } }>24시간 안에</Box> 답장드립니다.
        가볍게 인사만 남기셔도 좋아요.
      </Typography>

      { visibleLinks.length > 0 ? (
        <Box>
          <Typography
            component="p"
            sx={ {
              mb: 1.25,
              color: 'text.muted',
              fontFamily: fontFamilies.mono,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
            } }
          >
            FOLLOW ME
          </Typography>

          <Stack direction="row" spacing={ 1.5 } sx={ { flexWrap: 'wrap', gap: 1.5 } }>
            { visibleLinks.map(({ id, label, href, Icon }) => (
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
                    bgcolor: 'surface.elevated',
                    border: '1px solid',
                    borderColor: 'line.soft',
                    color: 'text.primary',
                    transition:
                      'background-color 0.18s ease, color 0.18s ease, transform 0.18s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'brand.onBrand',
                      transform: 'translateY(-2px)',
                    },
                  } }
                >
                  <Icon sx={ { fontSize: 22 } } />
                </IconButton>
              </Tooltip>
            )) }
          </Stack>
        </Box>
      ) : null }
    </Stack>
  );
}

export default ContactInfo;
