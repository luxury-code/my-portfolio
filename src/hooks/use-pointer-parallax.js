import { useEffect, useRef } from 'react';

/** 목표값에 다가가는 비율 — 작을수록 더 느리게, 더 점성 있게 따라온다 */
const EASING = 0.06;

/** 이 값보다 차이가 작아지면 정지로 간주하고 rAF 를 멈춘다 (배터리 절약) */
const SETTLE_THRESHOLD = 0.0004;

/**
 * usePointerParallax 커스텀 훅
 * 마우스 위치를 -1 ~ 1 로 정규화해 대상 요소의 CSS 변수(--mx, --my)에 계속 써 넣는다.
 * 값을 곧바로 반영하지 않고 매 프레임 lerp 로 다가가기 때문에,
 * 오로라가 마우스를 정확히 따라가지 않고 느리게 끌려오는 느낌이 난다.
 *
 * 상태를 React state 가 아니라 CSS 변수로 흘려보내므로 리렌더가 발생하지 않는다.
 *
 * @param {boolean} isEnabled - 추종을 켤지 여부 (모션 최소화·터치 기기에서는 false) [Required]
 * @returns {object} ref - CSS 변수를 받을 요소에 연결할 ref
 *
 * Example usage:
 * const { canTrackPointer } = useMotionPreference();
 * const parallaxRef = usePointerParallax(canTrackPointer);
 * <Box ref={ parallaxRef } sx={ { '--mx': 0, '--my': 0 } } />
 */
export function usePointerParallax(isEnabled) {
  const ref = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frameId = useRef(0);
  const isRunning = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    /** 추종이 꺼져 있으면 중앙(0, 0)으로 되돌리고 아무 것도 하지 않는다 */
    if (!isEnabled) {
      element.style.setProperty('--mx', '0');
      element.style.setProperty('--my', '0');
      return undefined;
    }

    const step = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      current.current.x += dx * EASING;
      current.current.y += dy * EASING;

      element.style.setProperty('--mx', current.current.x.toFixed(4));
      element.style.setProperty('--my', current.current.y.toFixed(4));

      /** 목표에 충분히 가까워지면 다음 입력이 올 때까지 멈춘다 */
      if (Math.abs(dx) < SETTLE_THRESHOLD && Math.abs(dy) < SETTLE_THRESHOLD) {
        isRunning.current = false;
        return;
      }

      frameId.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (isRunning.current || document.hidden) {
        return;
      }

      isRunning.current = true;
      frameId.current = requestAnimationFrame(step);
    };

    const handlePointerMove = (event) => {
      const rect = element.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      /** 요소 중심을 원점으로 하는 -1 ~ 1 좌표 */
      target.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      target.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      start();
    };

    /** 탭이 백그라운드로 가면 즉시 정지 */
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId.current);
        isRunning.current = false;
      } else {
        start();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(frameId.current);
      isRunning.current = false;
    };
  }, [isEnabled]);

  return ref;
}
