import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { fontFamilies } from '../../theme.js';

/**
 * AboutSectionTabs 컴포넌트
 * About Me 페이지의 콘텐츠 섹션을 탭으로 보여준다.
 *
 * 각 섹션의 showInHome 값에 따라 탭 옆에 표식을 붙여,
 * Home 탭에도 노출되는 이야기인지 한눈에 구분할 수 있게 했다.
 * 본문은 빈 줄(\n\n) 기준으로 문단을 나눠 렌더링한다.
 *
 * Props:
 * @param {array} sections - { id, title, content, showInHome, goal?, tags? } 배열 [Required]
 * @param {string} activeId - 현재 선택된 섹션 id [Required]
 * @param {function} onChange - 탭이 바뀔 때 새 id 를 받는 함수 [Required]
 *
 * Example usage:
 * <AboutSectionTabs sections={ sections } activeId={ activeId } onChange={ setActiveId } />
 */
function AboutSectionTabs({ sections, activeId, onChange }) {
  const active = sections.find((section) => section.id === activeId) ?? sections[0];

  if (!active) {
    return null;
  }

  const paragraphs = active.content.split('\n\n').filter(Boolean);

  return (
    <Box
      component="section"
      aria-labelledby="about-sections-heading"
      sx={ {
        borderRadius: { xs: '16px', md: '20px' },
        border: '1px solid',
        borderColor: 'line.soft',
        bgcolor: 'surface.subtle',
        p: { xs: 2.5, md: 4 },
      } }
    >
      <Box
        id="about-sections-heading"
        sx={ {
          color: 'primary.main',
          fontFamily: fontFamilies.mono,
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          mb: 2.5,
        } }
      >
        MY STORY
      </Box>

      <Box
        sx={ {
          borderBottom: '1px solid',
          borderColor: 'line.soft',
          mb: { xs: 3, md: 4 },
        } }
      >
        <Tabs
          value={ active.id }
          onChange={ (_event, value) => onChange(value) }
          variant="scrollable"
          scrollButtons={ false }
          textColor="inherit"
          aria-label="About Me 콘텐츠 섹션"
          sx={ {
            minHeight: 48,
            '& .MuiTabs-indicator': {
              height: 2,
              bgcolor: 'primary.main',
            },
          } }
        >
          { sections.map((section) => (
            <Tab
              key={ section.id }
              value={ section.id }
              disableRipple
              label={
                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
                  <Box component="span">{ section.title }</Box>
                  { section.showInHome ? (
                    <Box
                      component="span"
                      aria-hidden="true"
                      sx={ {
                        width: 6,
                        height: 6,
                        borderRadius: '999px',
                        bgcolor: 'primary.main',
                        flexShrink: 0,
                      } }
                    />
                  ) : null }
                </Box>
              }
              sx={ {
                minHeight: 48,
                px: { xs: 1.5, md: 2 },
                fontWeight: 700,
                fontSize: { xs: '0.88rem', md: '0.95rem' },
                color: 'text.muted',
                '&:hover': { color: 'text.secondary' },
                '&.Mui-selected': { color: 'text.primary' },
              } }
            />
          )) }
        </Tabs>
      </Box>

      <Box role="tabpanel" aria-live="polite">
        <Typography variant="h2" sx={ { mb: 2.5, color: 'text.primary' } }>
          { active.title }
        </Typography>

        { paragraphs.map((paragraph) => (
          <Typography
            key={ paragraph.slice(0, 24) }
            variant="body1"
            sx={ { color: 'text.secondary', mb: 2, '&:last-of-type': { mb: 0 }, maxWidth: 680 } }
          >
            { paragraph }
          </Typography>
        )) }

        { active.goal ? (
          <Box
            sx={ {
              mt: 3,
              p: { xs: 2, md: 2.5 },
              borderRadius: '14px',
              border: '1px solid',
              borderColor: 'line.soft',
              bgcolor: 'surface.elevated',
              display: 'flex',
              alignItems: 'center',
              gap: 1.75,
            } }
          >
            <FlagRoundedIcon sx={ { color: 'primary.main', fontSize: 22, flexShrink: 0 } } />
            <Box sx={ { minWidth: 0 } }>
              <Box
                sx={ {
                  color: 'text.muted',
                  fontFamily: fontFamilies.mono,
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  mb: 0.5,
                } }
              >
                GOAL 성장 목표
              </Box>
              <Box sx={ { color: 'text.primary', fontWeight: 700, fontSize: '1rem' } }>
                { active.goal }
              </Box>
            </Box>
          </Box>
        ) : null }

        { active.tags?.length ? (
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 } }>
            { active.tags.map((tag) => (
              <Chip
                key={ tag }
                label={ tag }
                size="small"
                sx={ {
                  bgcolor: 'accent.lavender',
                  color: 'brand.onBrand',
                  fontFamily: fontFamilies.mono,
                  fontSize: '0.75rem',
                } }
              />
            )) }
          </Box>
        ) : null }
      </Box>
    </Box>
  );
}

export default AboutSectionTabs;
