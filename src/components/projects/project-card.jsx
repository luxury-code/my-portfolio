import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ProjectThumbnail from './project-thumbnail.jsx';
import TechStackList from './tech-stack-list.jsx';
import { formatWorkPeriod, getThumbnailUrl } from '../../utils/project-link.js';

/** 클릭 피드백(로딩 표시) 유지 시간 (ms) */
const CLICK_FEEDBACK_MS = 1200;

/**
 * ProjectCard 컴포넌트
 * 썸네일 · 제목 · 한 줄 설명 · 기술 스택 뱃지 · 작업 날짜와
 * 배포 사이트 / GitHub 저장소 두 개의 이동 버튼으로 구성된 프로젝트 카드.
 * 호버 시 확대 + 오프셋 그림자, 클릭 시 로딩 표시, 모바일에서는 눌림 피드백을 제공한다.
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 { title, description, tech_stack, detail_url, github_url, thumbnail_url, created_at } [Required]
 *
 * Example usage:
 * <ProjectCard project={ project } />
 */
function ProjectCard({ project }) {
  const [openingKey, setOpeningKey] = useState('');
  const timerRef = useRef(null);

  /** 언마운트 시 남은 타이머 정리 */
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const thumbnailUrl = getThumbnailUrl(project);
  const workPeriod = formatWorkPeriod(project.created_at);
  const hasSiteLink = Boolean(project.detail_url);
  const hasRepoLink = Boolean(project.github_url);

  /**
   * 새 탭으로 링크를 열고 해당 버튼에만 잠시 로딩 상태를 보여준다.
   *
   * @param {string} key - 버튼 구분 키 ('site' | 'repo')
   * @param {string} url - 열어야 할 URL
   */
  const handleOpen = (key, url) => {
    if (!url || openingKey) {
      return;
    }

    setOpeningKey(key);
    window.open(url, '_blank', 'noopener,noreferrer');

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpeningKey(''), CLICK_FEEDBACK_MS);
  };

  return (
    <Card
      sx={ {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '2px solid',
        borderColor: 'secondary.main',
        borderRadius: { xs: '16px', md: '20px' },
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        /** 호버 효과는 포인터 장치에서만 — 모바일에서는 눌림 피드백으로 대체 */
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-6px) scale(1.02)',
            boxShadow: '8px 8px 0 #0B0B0B',
          },
          '&:hover img': { transform: 'scale(1.06)' },
        },
        '&:active': { transform: 'scale(0.985)' },
      } }
    >
      { openingKey && (
        <LinearProgress
          sx={ {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            height: 4,
            bgcolor: 'brand.surfaceSubtle',
            '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' },
          } }
        />
      ) }

      <ProjectThumbnail src={ thumbnailUrl } title={ project.title } />

      <Box
        sx={ {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
          p: { xs: 2, md: 2.5 },
        } }
      >
        <Typography
          variant="h3"
          sx={ {
            color: 'text.primary',
            fontSize: { xs: '1.05rem', md: '1.1rem' },
            lineHeight: 1.35,
          } }
        >
          { project.title }
        </Typography>

        <Typography
          sx={ {
            color: 'text.secondary',
            fontSize: { xs: '0.85rem', md: '0.88rem' },
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } }
        >
          { project.description }
        </Typography>

        <TechStackList techStack={ project.tech_stack } />

        <Box sx={ { flexGrow: 1 } } />

        { workPeriod && (
          <Box
            sx={ {
              color: 'text.secondary',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
            } }
          >
            { workPeriod }
          </Box>
        ) }

        <Box sx={ { display: 'flex', gap: 1, mt: 0.5 } }>
          { hasSiteLink && (
            <Button
              fullWidth
              onClick={ () => handleOpen('site', project.detail_url) }
              startIcon={
                openingKey === 'site'
                  ? <CircularProgress size={ 16 } sx={ { color: 'inherit' } } />
                  : <LaunchIcon />
              }
              sx={ {
                minHeight: 40,
                px: 1.5,
                fontSize: '0.82rem',
                bgcolor: 'secondary.main',
                color: 'brand.textInverse',
                '&:hover': { bgcolor: 'brand.surfaceDark' },
              } }
            >
              사이트
            </Button>
          ) }

          { hasRepoLink && (
            <Button
              fullWidth
              onClick={ () => handleOpen('repo', project.github_url) }
              startIcon={
                openingKey === 'repo'
                  ? <CircularProgress size={ 16 } sx={ { color: 'inherit' } } />
                  : <GitHubIcon />
              }
              sx={ {
                minHeight: 40,
                px: 1.5,
                fontSize: '0.82rem',
                bgcolor: 'background.paper',
                color: 'secondary.main',
                border: '2px solid',
                borderColor: 'secondary.main',
                '&:hover': { bgcolor: 'primary.main' },
              } }
            >
              GitHub
            </Button>
          ) }
        </Box>
      </Box>
    </Card>
  );
}

export default ProjectCard;
