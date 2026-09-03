import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useMotionPreference } from '../../hooks/use-motion-preference.js';

/** 별 개수 — 기기 성능에 따라 단계적으로 줄인다 */
const STAR_COUNT = { desktop: 140, lowPower: 70, mobile: 40 };

/** 마우스가 별을 밀어내는 반경(px)과 최대 밀림 거리(px) */
const REPEL_RADIUS = 140;
const REPEL_STRENGTH = 18;

/** 밀려난 별이 제자리로 돌아오는 감쇠 계수 (1 에 가까울수록 느리게 복귀) */
const SPRING_DAMPING = 0.92;

/** 전체 별이 흐르는 속도 (px/frame) */
const DRIFT_SPEED = 0.02;

/** 레티나에서 캔버스 픽셀이 4배로 늘어나는 것을 막는다 */
const MAX_DPR = 2;

/** 별 하나를 무작위로 만든다 */
function createStar(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.4 + Math.random() * 1.2,
    baseAlpha: 0.25 + Math.random() * 0.55,
    twinkleSpeed: 0.0006 + Math.random() * 0.0016,
    twinklePhase: Math.random() * Math.PI * 2,
    offsetX: 0,
    offsetY: 0,
  };
}

/**
 * StarField 컴포넌트
 * 밤하늘의 별을 canvas 로 그린다.
 * 오로라가 마우스를 "따라오는" 반면 별은 마우스를 "피한다" — 두 레이어가
 * 반대로 움직이면서 깊이감이 생긴다.
 *
 * 성능 가드레일 (기획: docs/portfolio-plan.md §2-4):
 * - 터치 기기 40개 / 저사양 70개 / 데스크톱 140개
 * - devicePixelRatio 는 2 로 상한
 * - 탭이 백그라운드로 가면(document.hidden) rAF 중단
 * - Hero 가 화면 밖으로 나가면 IntersectionObserver 로 rAF 중단
 * - prefers-reduced-motion 이면 rAF 없이 한 번만 그린다
 *
 * Props: 없음 (환경 판단은 useMotionPreference 가 담당)
 *
 * Example usage:
 * <StarField />
 */
function StarField() {
  const canvasRef = useRef(null);
  const { isReducedMotion, isCoarsePointer, isLowPower, canTrackPointer } = useMotionPreference();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return undefined;
    }

    let count = STAR_COUNT.desktop;

    if (isCoarsePointer) {
      count = STAR_COUNT.mobile;
    } else if (isLowPower) {
      count = STAR_COUNT.lowPower;
    }

    let stars = [];
    let width = 0;
    let height = 0;
    let rect = canvas.getBoundingClientRect();
    let frameId = 0;
    let isVisible = true;

    const pointer = { x: -9999, y: -9999, isActive: false };

    /** 캔버스를 컨테이너 크기에 맞추고 별을 다시 배치한다 */
    const resize = () => {
      rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: count }, () => createStar(width, height));
    };

    /** 한 프레임을 그린다 */
    const draw = (time) => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        /** 좌 → 우로 아주 느리게 흐르고, 오른쪽 끝에 닿으면 왼쪽에서 다시 나온다 */
        if (!isReducedMotion) {
          star.x += DRIFT_SPEED;

          if (star.x > width + 2) {
            star.x = -2;
          }
        }

        /** 마우스 반경 안에 들어오면 반대 방향으로 밀린다 */
        if (pointer.isActive) {
          const dx = star.x + star.offsetX - pointer.x;
          const dy = star.y + star.offsetY - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < REPEL_RADIUS && distance > 0.01) {
            const push = (1 - distance / REPEL_RADIUS) * REPEL_STRENGTH;

            star.offsetX += (dx / distance) * push * 0.12;
            star.offsetY += (dy / distance) * push * 0.12;
          }
        }

        /** 스프링 복귀 — 손을 떼면 원래 자리로 돌아온다 */
        star.offsetX *= SPRING_DAMPING;
        star.offsetY *= SPRING_DAMPING;

        const twinkle = isReducedMotion
          ? star.baseAlpha
          : star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.22;

        context.globalAlpha = Math.max(0.05, Math.min(1, twinkle));
        context.fillStyle = '#F8F8F7';
        context.beginPath();
        context.arc(star.x + star.offsetX, star.y + star.offsetY, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const loop = (time) => {
      draw(time);
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frameId || document.hidden || !isVisible || isReducedMotion) {
        return;
      }

      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.isActive = true;
    };

    const handlePointerLeave = () => {
      pointer.isActive = false;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const handleScroll = () => {
      rect = canvas.getBoundingClientRect();
    };

    resize();

    /** 모션 최소화 설정이면 애니메이션 없이 한 장만 그린다 */
    if (isReducedMotion) {
      draw(0);
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();

      if (isReducedMotion) {
        draw(0);
      }
    });

    resizeObserver.observe(canvas);

    /** Hero 가 화면 밖으로 나가면 그리기를 멈춘다 */
    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries.some((entry) => entry.isIntersecting);

      if (isVisible) {
        start();
      } else {
        stop();
      }
    });

    intersectionObserver.observe(canvas);

    if (canTrackPointer) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isReducedMotion, isCoarsePointer, isLowPower, canTrackPointer]);

  return (
    <Box
      ref={ canvasRef }
      component="canvas"
      aria-hidden="true"
      sx={ {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        borderRadius: 'inherit',
      } }
    />
  );
}

export default StarField;
