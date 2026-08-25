import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { formatDate } from '../../utils/format-date.js';

/**
 * GuestbookEntry 컴포넌트
 * 방명록 한 건을 카드 형태로 표시한다.
 *
 * Props:
 * @param {object} entry - 방명록 데이터 { author_name, message, affiliation, public_email, emoji, created_at } [Required]
 *
 * Example usage:
 * <GuestbookEntry entry={ entry } />
 */
function GuestbookEntry({ entry }) {
  const displayName = entry.author_name?.trim() || '익명';

  return (
    <Box
      component="li"
      sx={ {
        listStyle: 'none',
        bgcolor: 'background.default',
        borderRadius: '20px',
        p: { xs: 2, md: 2.5 },
        display: 'flex',
        gap: { xs: 1.5, md: 2 },
      } }
    >
      <Box
        aria-hidden="true"
        sx={ {
          flexShrink: 0,
          width: { xs: 40, md: 44 },
          height: { xs: 40, md: 44 },
          borderRadius: '999px',
          bgcolor: 'accent.peach',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: { xs: '1.15rem', md: '1.25rem' },
        } }
      >
        { entry.emoji }
      </Box>

      <Box sx={ { minWidth: 0, flexGrow: 1 } }>
        <Stack
          direction="row"
          sx={ { flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 0.75 } }
        >
          <Box
            component="span"
            sx={ { fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 700 } }
          >
            { displayName }
          </Box>

          { entry.affiliation ? (
            <Chip
              size="small"
              label={ entry.affiliation }
              sx={ {
                bgcolor: 'brand.surfaceSubtle',
                color: 'text.secondary',
                fontSize: '0.75rem',
              } }
            />
          ) : null }

          <Box
            component="span"
            sx={ {
              ml: 'auto',
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', md: '0.8rem' },
              whiteSpace: 'nowrap',
            } }
          >
            { formatDate(entry.created_at) }
          </Box>
        </Stack>

        <Box
          sx={ {
            color: 'text.primary',
            fontSize: { xs: '0.92rem', md: '1rem' },
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          } }
        >
          { entry.message }
        </Box>

        { entry.public_email ? (
          <Box
            component="a"
            href={ `mailto:${ entry.public_email }` }
            sx={ {
              display: 'inline-block',
              mt: 1,
              color: 'text.secondary',
              fontSize: '0.8rem',
              wordBreak: 'break-all',
            } }
          >
            { entry.public_email }
          </Box>
        ) : null }
      </Box>
    </Box>
  );
}

export default GuestbookEntry;
