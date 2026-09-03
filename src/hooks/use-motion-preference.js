import { useEffect, useState } from 'react';

/** 감시할 미디어 쿼리 — 값이 바뀌면 즉시 반영한다 */
const QUERIES = {
  isReducedMotion: '(prefers-reduced-motion: reduce)',
  isCoarsePointer: '(pointer: coarse)',
  isSmallScreen: '(max-width: 768px)',
};

/**
 * 현재 환경의 미디어 쿼리 상태를 한 번에 읽는다.
 * SSR·초기 렌더에서 window 가 없을 수 있으므로 안전한 기본값을 돌려준다.
 *
 * @returns {object} 각 쿼리의 매치 여부
 */
function readMatches() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return { isReducedMotion: false, isCoarsePointer: false, isSmallScreen: false };
  }

  return {
    isReducedMotion: window.matchMedia(QUERIES.isReducedMotion).matches,
    isCoarsePointer: window.matchMedia(QUERIES.isCoarsePointer).matches,
    isSmallScreen: window.matchMedia(QUERIES.isSmallScreen).matches,
  };
}

/**
 * useMotionPreference 커스텀 훅
 * Hero 의 오로라·별 애니메이션이 지켜야 할 환경 조건을 한곳에서 판단한다.
 *
 * - isReducedMotion : OS 의 "동작 줄이기" 설정 → 애니메이션 전면 정지
 * - isCoarsePointer : 손가락 입력 → 마우스 추종 대신 자동 드리프트
 * - isLowPower      : 저사양 추정 → 별 개수 축소
 * - canTrackPointer : 마우스 인터랙션을 켜도 되는가 (최종 판단)
 *
 * @returns {object} isReducedMotion, isCoarsePointer, isSmallScreen, isLowPower, canTrackPointer
 *
 * Example usage:
 * const { canTrackPointer, isReducedMotion } = useMotionPreference();
 */
export function useMotionPreference() {
  const [matches, setMatches] = useState(readMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const lists = Object.values(QUERIES).map((query) => window.matchMedia(query));

    /**
     * readMatches 는 매번 새 객체를 돌려주므로 그대로 넣으면
     * 값이 같아도 리렌더가 발생한다. 실제로 바뀐 경우에만 갱신한다.
     */
    const handleChange = () => {
      setMatches((prev) => {
        const next = readMatches();
        const isSame = Object.keys(next).every((key) => next[key] === prev[key]);

        return isSame ? prev : next;
      });
    };

    lists.forEach((list) => list.addEventListener('change', handleChange));

    /** 마운트 직후 실제 값으로 한 번 더 맞춘다 */
    handleChange();

    return () => lists.forEach((list) => list.removeEventListener('change', handleChange));
  }, []);

  /**
   * 논리 코어 수로 저사양 기기를 추정한다.
   * hardwareConcurrency 를 제공하지 않는 브라우저는 저사양으로 보지 않는다.
   */
  const cores = typeof navigator === 'undefined' ? undefined : navigator.hardwareConcurrency;
  const isLowPower = typeof cores === 'number' && cores > 0 && cores < 4;

  return {
    ...matches,
    isLowPower,
    canTrackPointer: !matches.isReducedMotion && !matches.isCoarsePointer,
  };
}
