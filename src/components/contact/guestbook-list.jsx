import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import GuestbookEntry from './guestbook-entry.jsx';

/**
 * GuestbookList 컴포넌트
 * 방명록 목록을 최신순으로 표시한다. 로딩·빈 목록 상태를 함께 처리한다.
 *
 * Props:
 * @param {array} entries - 방명록 데이터 배열 [Required]
 * @param {boolean} isLoading - 목록 로딩 중 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookList entries={ entries } isLoading={ isLoading } />
 */
function GuestbookList({ entries, isLoading = false }) {
  if (isLoading) {
    return (
      <Box sx={ { display: 'flex', justifyContent: 'center', py: 4 } }>
        <CircularProgress size={ 28 } sx={ { color: 'secondary.main' } } />
      </Box>
    );
  }

  if (entries.length === 0) {
    return (
      <Box
        sx={ {
          bgcolor: 'background.default',
          borderRadius: '20px',
          p: { xs: 3, md: 4 },
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: { xs: '0.9rem', md: '0.95rem' },
        } }
      >
        아직 남겨진 방명록이 없어요. 첫 번째 메시지를 남겨보세요 🙂
      </Box>
    );
  }

  return (
    <Stack component="ul" spacing={ 1.5 } sx={ { m: 0, p: 0 } }>
      { entries.map((entry) => (
        <GuestbookEntry key={ entry.id } entry={ entry } />
      )) }
    </Stack>
  );
}

export default GuestbookList;
