import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { fontFamilies } from '../../theme.js';

/** 카운터가 0 → 100 까지 올라가는 데 걸리는 시간 (ms) */
const COUNT_DURATION = 900;

/** 카운터가 끝난 뒤 화면에서 사라지는 데 걸리는 시간 (ms) */
const FADE_DURATION = 420;

/** 같은 세션에서 두 번 기다리게 하지 않기 위한 키 */
const SESSION_KEY = 'sol-intro-seen';

/**
 * 인트로를 건너뛸 상황인지 판단한다.
 * - 이번 세션에 이미 봤다
 * - 모션 최소화를 켜 두었다
 * - 데이터 절약 모드다
 *
 * sessionStorage 접근이 막힌 환경(프라이빗 모드 등)에서도 터지지 않게 감싼다.
 *
 * @returns {boolean} 건너뛸지 여부
 */
function shouldSkipIntro() {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) {
      return true;
    }
  } catch {
    /* sessionStorage 를 못 쓰는 환경 — 인트로는 그대로 보여준다 */
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  return Boolean(navigator.connection?.saveData);
}

/**
 * SiteLoader 컴포넌트
 * 첫 진입에서만 잠깐 보이는 인트로. "빛을 켜는 중" 카운터가 100 에 닿으면 사라진다.
 *
 * 전체 재생 시간을 약 1.3초로 제한하고 세션당 1회만 보여준다.
 * 인트로가 길면 LCP 를 그만큼 늦추기 때문이다.
 *
 * 접근성: 콘텐츠는 뒤에서 이미 렌더링되어 있고 이 레이어는 aria-hidden 이므로,
 * 스크린 리더 사용자는 기다리지 않는다.
 *
 * Props: 없음
 *
 * Example usage:
 * <SiteLoader />
 */
function SiteLoader() {
  const [isMounted, setIsMounted] = useState(() => !shouldSkipIntro());
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      return undefined;
    }

    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* 저장에 실패해도 인트로 동작에는 영향이 없다 */
    }

    const startedAt = performance.now();
    let frameId = 0;
    let fadeTimer = 0;
    let removeTimer = 0;

    const tick = (now) => {
      const ratio = Math.min(1, (now - startedAt) / COUNT_DURATION);

      /** ease-out — 초반에 빠르게 올라갔다가 100 에 부드럽게 안착 */
      setProgress(Math.round((1 - (1 - ratio) ** 3) * 100));

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      fadeTimer = window.setTimeout(() => setIsLeaving(true), 90);
      removeTimer = window.setTimeout(() => setIsMounted(false), 90 + FADE_DURATION);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <Box
      aria-hidden="true"
      sx={ {
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        bgcolor: 'secondary.main',
        opacity: isLeaving ? 0 : 1,
        transition: `opacity ${ FADE_DURATION }ms cubic-bezier(.16, 1, .3, 1)`,
        pointerEvents: isLeaving ? 'none' : 'auto',
      } }
    >
      <Box
        component="span"
        sx={ {
          fontFamily: fontFamilies.display,
          fontWeight: 700,
          fontSize: 'clamp(2rem, 9vw, 3.5rem)',
          letterSpacing: '0.32em',
          textIndent: '0.32em',
          color: 'primary.main',
        } }
      >
        SOL
      </Box>

      <Box sx={ { width: 'min(260px, 62vw)' } }>
        <Box
          sx={ {
            height: 2,
            borderRadius: 999,
            bgcolor: 'line.soft',
            overflow: 'hidden',
          } }
        >
          <Box
            sx={ {
              height: '100%',
              width: `${ progress }%`,
              bgcolor: 'primary.main',
            } }
          />
        </Box>

        <Box
          sx={ {
            mt: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: fontFamilies.mono,
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            color: 'text.muted',
          } }
        >
          <span>빛을 켜는 중</span>
          <span>{ String(progress).padStart(3, '0') }</span>
        </Box>
      </Box>
    </Box>
  );
}

export default SiteLoader;
