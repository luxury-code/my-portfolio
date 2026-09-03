import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AboutGoalNote from './about-goal-note.jsx';
import { splitContent, formatIndex } from '../../utils/about-me-data.js';
import { fontFamilies } from '../../theme.js';

/**
 * AboutSectionAccordion 컴포넌트
 * About Me 페이지의 콘텐츠 섹션을 아코디언으로 보여준다.
 *
 * 한 번에 하나만 열리는 방식이 아니라 각 항목을 따로 여닫는다.
 * 포트폴리오를 훑는 사람이 원하는 이야기를 골라 한꺼번에 펼쳐 읽을 수 있어야 하기 때문이다.
 * 접혀 있을 때도 첫 문단이 요약으로 보여, 열지 않고도 무슨 이야기인지 알 수 있다.
 *
 * showInHome 인 섹션은 제목 옆에 라임 점을 붙여 Home 에도 실리는 이야기임을 표시한다.
 *
 * Props:
 * @param {array} sections - { id, title, content, showInHome, goal?, tags? } 배열 [Required]
 * @param {array} defaultExpandedIds - 처음부터 펼쳐 둘 섹션 id 배열 [Optional, 기본값: 첫 번째 섹션]
 *
 * Example usage:
 * <AboutSectionAccordion sections={ aboutMe.sections } />
 */
function AboutSectionAccordion({ sections, defaultExpandedIds }) {
  const [expandedIds, setExpandedIds] = useState(
    () => new Set(defaultExpandedIds ?? (sections[0] ? [sections[0].id] : [])),
  );

  /** 해당 섹션만 열고 닫는다 — 다른 섹션 상태에는 영향을 주지 않는다 */
  const handleToggle = (id) => (_event, isExpanded) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);

      if (isExpanded) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  };

  return (
    <Stack spacing={ 1.5 }>
      { sections.map((section, index) => {
        const { lead, paragraphs } = splitContent(section.content);
        const isExpanded = expandedIds.has(section.id);

        return (
          <Accordion
            key={ section.id }
            disableGutters
            elevation={ 0 }
            expanded={ isExpanded }
            onChange={ handleToggle(section.id) }
            sx={ {
              bgcolor: 'surface.elevated',
              border: '1px solid',
              borderColor: isExpanded ? 'line.base' : 'line.soft',
              borderRadius: '14px !important',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
              /** MUI 가 항목 사이에 넣는 기본 구분선을 없앤다 */
              '&::before': { display: 'none' },
            } }
          >
            <AccordionSummary
              expandIcon={ <ExpandMoreRoundedIcon sx={ { color: 'text.muted' } } /> }
              aria-controls={ `${ section.id }-content` }
              id={ `${ section.id }-header` }
              sx={ {
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 },
                minHeight: 64,
                '& .MuiAccordionSummary-content': { my: 1.5 },
                '&:hover': { bgcolor: 'surface.subtle' },
              } }
            >
              <Box sx={ { minWidth: 0, pr: 1 } }>
                <Box
                  sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    mb: 0.75,
                    color: 'text.muted',
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                  } }
                >
                  <Box component="span" sx={ { color: 'primary.main' } }>
                    { formatIndex(index) }
                  </Box>

                  { section.showInHome ? (
                    <>
                      <Box
                        component="span"
                        aria-hidden="true"
                        sx={ {
                          width: 5,
                          height: 5,
                          borderRadius: '999px',
                          bgcolor: 'primary.main',
                          flexShrink: 0,
                        } }
                      />
                      <Box component="span">HOME</Box>
                    </>
                  ) : null }
                </Box>

                <Typography
                  component="h3"
                  sx={ {
                    fontFamily: fontFamilies.display,
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)',
                    lineHeight: 1.35,
                    color: 'text.primary',
                  } }
                >
                  { section.title }
                </Typography>

                { /** 접혀 있을 때만 첫 문단을 요약으로 보여 준다 */ }
                { !isExpanded && lead ? (
                  <Typography
                    sx={ {
                      mt: 0.75,
                      color: 'text.muted',
                      fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    } }
                  >
                    { lead }
                  </Typography>
                ) : null }
              </Box>
            </AccordionSummary>

            <AccordionDetails
              id={ `${ section.id }-content` }
              sx={ {
                px: { xs: 2, md: 3 },
                pt: 0,
                pb: { xs: 2.5, md: 3.5 },
                borderTop: '1px solid',
                borderColor: 'line.soft',
              } }
            >
              <Typography
                component="p"
                sx={ {
                  mt: 2.5,
                  mb: paragraphs.length > 0 ? 2 : 0,
                  fontFamily: fontFamilies.display,
                  fontWeight: 700,
                  fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                  lineHeight: 1.5,
                  color: 'text.primary',
                  maxWidth: 680,
                } }
              >
                { lead }
              </Typography>

              { paragraphs.map((paragraph) => (
                <Typography
                  key={ paragraph.slice(0, 24) }
                  variant="body1"
                  sx={ {
                    color: 'text.secondary',
                    mb: 1.75,
                    '&:last-of-type': { mb: 0 },
                    maxWidth: 680,
                  } }
                >
                  { paragraph }
                </Typography>
              )) }

              <AboutGoalNote goal={ section.goal } />

              { section.tags?.length ? (
                <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 } }>
                  { section.tags.map((tag) => (
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
            </AccordionDetails>
          </Accordion>
        );
      }) }
    </Stack>
  );
}

export default AboutSectionAccordion;
