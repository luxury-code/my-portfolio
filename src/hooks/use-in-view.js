import { useEffect, useRef, useState } from 'react';

/**
 * useInView 커스텀 훅
 * 대상 요소가 뷰포트에 가까워지면 true 로 바뀐 뒤 그대로 유지된다(1회성).
 * 화면 아래쪽 무거운 섹션의 코드·데이터 로딩을 미루는 용도로 쓴다.
 *
 * IntersectionObserver 를 지원하지 않는 환경에서는 즉시 true 를 반환해
 * 콘텐츠가 영영 보이지 않는 상황을 만들지 않는다.
 *
 * @param {string} rootMargin - 미리 감지할 여유 거리 [Optional, 기본값: '300px']
 * @returns {object} ref(감시할 요소에 연결), isInView(진입 여부)
 *
 * Example usage:
 * const { ref, isInView } = useInView();
 * <div ref={ ref }>{ isInView ? <Heavy /> : <Placeholder /> }</div>
 */
export function useInView(rootMargin = '300px') {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      return undefined;
    }

    const target = ref.current;

    if (!target || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isInView, rootMargin]);

  return { ref, isInView };
}
