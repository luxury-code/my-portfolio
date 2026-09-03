import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeader from '../ui/section-header.jsx';
import { SKILLS, CHEF_NOTE } from '../../utils/skill-content.js';
import { fontFamilies } from '../../theme.js';

/**
 * SkillTreeSection 컴포넌트
 * Home 페이지의 기술 스택 섹션.
 *
 * 숙련도를 막대 그래프로 부풀리지 않고 '상/중/하' 등급으로 그대로 적는다.
 * 프로젝트 수를 나란히 두어 등급 주장에 근거를 붙인다.
 * (P3 에서 이 목록이 메뉴판 UI + Supabase 연동으로 확장된다)
 *
 * Props: 없음
 *
 * Example usage:
 * <SkillTreeSection />
 */
function SkillTreeSection() {
  return (
    <Box
      component="section"
      aria-labelledby="skills-heading"
      sx={ {
        width: '100%',
        borderRadius: { xs: '16px', md: '20px' },
        border: '1px solid',
        borderColor: 'line.soft',
        bgcolor: 'surface.subtle',
        p: { xs: 2.5, md: 5 },
      } }
    >
      <SectionHeader label="02 — SKILLS" meta="SOL&apos;S KITCHEN" id="skills-heading" />

      <Typography variant="h2" sx={ { mb: 1.5, color: 'text.primary' } }>
        오늘의 메뉴
      </Typography>

      <Typography variant="body1" sx={ { color: 'text.secondary', mb: { xs: 3, md: 4 }, maxWidth: 620 } }>
        지금 다룰 수 있는 재료와 그 숙련도입니다. 옆의 숫자는 그 기술을 실제로 쓴 프로젝트 수예요.
      </Typography>

      <Box component="ul" sx={ { listStyle: 'none', m: 0, p: 0 } }>
        { SKILLS.map((skill) => (
          <Box
            component="li"
            key={ skill.name }
            sx={ {
              display: 'flex',
              alignItems: 'baseline',
              gap: { xs: 1, md: 2 },
              py: { xs: 1.75, md: 2 },
              borderBottom: '1px solid',
              borderColor: 'line.soft',
              '&:last-of-type': { borderBottom: 'none' },
            } }
          >
            <Box sx={ { minWidth: 0 } }>
              <Box
                sx={ {
                  fontFamily: fontFamilies.display,
                  fontWeight: 700,
                  fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                  color: 'text.primary',
                  lineHeight: 1.3,
                } }
              >
                { skill.name }
              </Box>
              <Box
                sx={ {
                  mt: 0.25,
                  color: 'text.muted',
                  fontSize: 'clamp(0.78rem, 1vw, 0.86rem)',
                } }
              >
                { skill.tagline }
              </Box>
            </Box>

            { /** 메뉴판의 점선 리더 — 이름과 "가격"을 잇는다 */ }
            <Box
              aria-hidden="true"
              sx={ {
                flex: 1,
                minWidth: 16,
                alignSelf: 'center',
                borderBottom: '1px dotted',
                borderColor: 'line.base',
                transform: 'translateY(-2px)',
              } }
            />

            <Box
              sx={ {
                display: 'flex',
                alignItems: 'baseline',
                gap: 1.5,
                flexShrink: 0,
                fontFamily: fontFamilies.mono,
              } }
            >
              <Box
                component="span"
                sx={ {
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  color: 'primary.main',
                } }
              >
                { skill.level }
              </Box>
              <Box
                component="span"
                sx={ { fontSize: '0.78rem', color: 'text.muted' } }
              >
                { `⟨${ skill.projectCount }⟩` }
              </Box>
            </Box>
          </Box>
        )) }
      </Box>

      <Box
        sx={ {
          mt: { xs: 3, md: 4 },
          pt: { xs: 2.5, md: 3 },
          borderTop: '1px solid',
          borderColor: 'line.soft',
        } }
      >
        <Box
          sx={ {
            mb: 1,
            color: 'primary.main',
            fontFamily: fontFamilies.mono,
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
          } }
        >
          CHEF&apos;S NOTE
        </Box>
        <Typography sx={ { color: 'text.secondary', fontSize: 'clamp(0.88rem, 1.1vw, 0.98rem)', maxWidth: 560 } }>
          { CHEF_NOTE }
        </Typography>
      </Box>
    </Box>
  );
}

export default SkillTreeSection;
