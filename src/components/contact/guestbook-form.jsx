import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

/** 선택 가능한 긍정적인 이모지 목록 */
const EMOJI_OPTIONS = ['😊', '👍', '🎉', '🔥', '💡', '✨', '❤️', '🙌'];

/** 메시지 최대 길이 — DB check 제약과 동일하게 맞춘다 */
const MESSAGE_MAX_LENGTH = 500;

/** 입력 폼 초기값 */
const INITIAL_FORM = {
  authorName: '',
  message: '',
  affiliation: '',
  email: '',
  isEmailPublic: false,
  emoji: EMOJI_OPTIONS[0],
  rating: 0,
  keyword: '',
  sns: '',
};

/** 공통 입력 필드 스타일 — 밤하늘보다 파인 면 + 둥근 모서리 */
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'surface.inset',
    borderRadius: '14px',
    '& fieldset': { borderColor: 'line.soft' },
    '&:hover fieldset': { borderColor: 'line.main' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 2 },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
};

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 입력란. 이름은 비워두면 익명으로 저장된다.
 *
 * Props:
 * @param {function} onSubmit - 폼 데이터를 받아 등록을 수행하는 함수 (성공 시 true 반환) [Required]
 * @param {boolean} isSubmitting - 등록 처리 중 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookForm onSubmit={ submitEntry } isSubmitting={ isSubmitting } />
 */
function GuestbookForm({ onSubmit, isSubmitting = false }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isTouched, setIsTouched] = useState(false);

  const isMessageEmpty = form.message.trim().length === 0;

  /** 텍스트 입력 값을 폼 상태에 반영한다 */
  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  /** 이모지 선택 — 선택 해제 시에는 기존 값을 유지한다 */
  const handleEmojiChange = (_event, value) => {
    if (value !== null) {
      setForm((prev) => ({ ...prev, emoji: value }));
    }
  };

  /** 별점 선택 — 선택 해제 시 0(미평가)으로 되돌린다 */
  const handleRatingChange = (_event, value) => {
    setForm((prev) => ({ ...prev, rating: value ?? 0 }));
  };

  /** 이메일 공개 여부 토글 */
  const handleEmailPublicChange = (event) => {
    setForm((prev) => ({ ...prev, isEmailPublic: event.target.checked }));
  };

  /** 폼 제출 — 내용이 비어 있으면 등록하지 않는다 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsTouched(true);

    if (isMessageEmpty) {
      return;
    }

    const isSuccess = await onSubmit(form);

    if (isSuccess) {
      setForm(INITIAL_FORM);
      setIsTouched(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={ handleSubmit }
      sx={ {
        bgcolor: 'surface.elevated',
        border: '1px solid',
        borderColor: 'line.soft',
        borderRadius: '16px',
        p: { xs: 2, md: 3 },
      } }
    >
      <Stack spacing={ 2.5 }>
        <Grid container spacing={ 2 }>
          <Grid size={ { xs: 12, md: 6 } }>
            <TextField
              fullWidth
              label="이름"
              placeholder="비워두면 익명으로 표시돼요"
              value={ form.authorName }
              onChange={ handleChange('authorName') }
              slotProps={ { htmlInput: { maxLength: 30 } } }
              sx={ fieldSx }
            />
          </Grid>

          <Grid size={ { xs: 12, md: 6 } }>
            <TextField
              fullWidth
              label="소속 / 직업 (선택)"
              placeholder="예: 프론트엔드 개발자"
              value={ form.affiliation }
              onChange={ handleChange('affiliation') }
              slotProps={ { htmlInput: { maxLength: 40 } } }
              sx={ fieldSx }
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          multiline
          minRows={ 3 }
          label="내용"
          placeholder="따뜻한 한마디를 남겨주세요"
          value={ form.message }
          onChange={ handleChange('message') }
          error={ isTouched && isMessageEmpty }
          helperText={
            isTouched && isMessageEmpty
              ? '내용을 입력해 주세요'
              : `${ form.message.length } / ${ MESSAGE_MAX_LENGTH }`
          }
          slotProps={ { htmlInput: { maxLength: MESSAGE_MAX_LENGTH } } }
          sx={ fieldSx }
        />

        <Grid container spacing={ 2 }>
          <Grid size={ { xs: 12, md: 6 } }>
            <TextField
              fullWidth
              label="한마디 키워드 (선택)"
              placeholder="예: 감각적인"
              value={ form.keyword }
              onChange={ handleChange('keyword') }
              slotProps={ { htmlInput: { maxLength: 20 } } }
              sx={ fieldSx }
            />
          </Grid>

          <Grid size={ { xs: 12, md: 6 } }>
            <TextField
              fullWidth
              label="SNS 계정 (선택)"
              placeholder="예: @instagram_id"
              value={ form.sns }
              onChange={ handleChange('sns') }
              slotProps={ { htmlInput: { maxLength: 60 } } }
              sx={ fieldSx }
            />
          </Grid>
        </Grid>

        <Box>
          <TextField
            fullWidth
            type="email"
            label="이메일 (선택)"
            placeholder="비공개로 저장돼요"
            value={ form.email }
            onChange={ handleChange('email') }
            slotProps={ { htmlInput: { maxLength: 100 } } }
            sx={ fieldSx }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={ form.isEmailPublic }
                onChange={ handleEmailPublicChange }
                disabled={ form.email.trim().length === 0 }
                sx={ { color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } } }
              />
            }
            label="이메일을 방명록에 공개할래요"
            sx={ {
              mt: 0.5,
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                color: 'text.secondary',
              },
            } }
          />
        </Box>

        <Grid container spacing={ 2 }>
          <Grid size={ { xs: 12, md: 7 } }>
            <Typography
              component="p"
              sx={ {
                mb: 1,
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 700,
              } }
            >
              오늘의 기분 이모지
            </Typography>

            <ToggleButtonGroup
              exclusive
              value={ form.emoji }
              onChange={ handleEmojiChange }
              aria-label="이모지 선택"
              sx={ {
                flexWrap: 'wrap',
                gap: 1,
                '& .MuiToggleButtonGroup-grouped': {
                  border: '1px solid',
                  borderColor: 'line.soft',
                  color: 'text.primary',
                  borderRadius: '999px !important',
                  minWidth: 44,
                  minHeight: 44,
                  fontSize: '1.15rem',
                  '&.Mui-selected': {
                    bgcolor: 'accent.peach',
                    '&:hover': { bgcolor: 'accent.peach' },
                  },
                },
              } }
            >
              { EMOJI_OPTIONS.map((emoji) => (
                <ToggleButton key={ emoji } value={ emoji } aria-label={ emoji }>
                  { emoji }
                </ToggleButton>
              )) }
            </ToggleButtonGroup>
          </Grid>

          <Grid size={ { xs: 12, md: 5 } }>
            <Box
              sx={ {
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1.5,
                minHeight: 44,
              } }
            >
              <Typography
                component="p"
                sx={ {
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                } }
              >
                별점 평가 (선택)
              </Typography>

              <Rating
                value={ form.rating }
                onChange={ handleRatingChange }
                aria-label="별점 평가"
                sx={ {
                  fontSize: '1.6rem',
                  '& .MuiRating-iconFilled': { color: 'accent.amber' },
                  '& .MuiRating-iconHover': { color: 'accent.amber' },
                } }
              />

              <Box
                component="span"
                sx={ { color: 'text.secondary', fontSize: '0.8rem', whiteSpace: 'nowrap' } }
              >
                { form.rating > 0 ? `${ form.rating } / 5` : '미평가' }
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
          <Button
            type="submit"
            disabled={ isSubmitting }
            sx={ {
              bgcolor: 'primary.main',
              color: 'brand.onBrand',
              '&:hover': { bgcolor: 'primary.light' },
              '&.Mui-disabled': { bgcolor: 'surface.subtle', color: 'text.muted' },
            } }
          >
            { isSubmitting ? '남기는 중...' : '방명록 남기기' }
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default GuestbookForm;
