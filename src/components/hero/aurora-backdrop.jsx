import Box from '@mui/material/Box';
import { usePointerParallax } from '../../hooks/use-pointer-parallax.js';
import { useMotionPreference } from '../../hooks/use-motion-preference.js';

/**
 * 오로라 3겹 정의.
 * shift 가 클수록 마우스에 크게 반응한다 → 세 겹의 이동량 차이가 시차(깊이감)를 만든다.
 * 각 겹은 서로 다른 주기로 느리게 일렁여 마우스를 움직이지 않아도 살아 있다.
 */
const LAYERS = [
  {
    key: 'core',
    color: 'var(--aurora-core)',
    gradient: '46% 36% at 30% 40%',
    shift: 26,
    animation: 'aurora-drift-a 22s ease-in-out infinite alternate',
    opacity: 0.5,
  },
  {
    key: 'spread',
    color: 'var(--aurora-spread)',
    gradient: '50% 40% at 62% 28%',
    shift: 16,
    animation: 'aurora-drift-b 26s ease-in-out infinite alternate',
    opacity: 0.42,
  },
  {
    key: 'edge',
    color: 'var(--aurora-edge)',
    gradient: '54% 44% at 48% 62%',
    shift: 38,
    animation: 'aurora-drift-c 19s ease-in-out infinite alternate',
    opacity: 0.38,
  },
];

/**
 * AuroraBackdrop 컴포넌트
 * 밤하늘 위에 라임 → 연노랑 → 라벤더로 번지는 오로라를 그린다.
 *
 * 성능 설계:
 * - 3겹 모두 blur 가 걸린 정적 그라디언트이고, 매 프레임 바뀌는 것은 transform 뿐이다.
 *   transform 은 GPU 합성 단계에서 처리되므로 리페인트가 일어나지 않는다.
 * - 마우스 이동(바깥 div)과 자체 일렁임(안쪽 div)을 서로 다른 요소에 나눠
 *   두 transform 이 충돌하지 않게 했다.
 * - 모션 최소화 / 터치 기기에서는 마우스 추종을 끄고 자체 일렁임만 남긴다.
 *
 * Props: 없음 (환경 판단은 useMotionPreference 가 담당)
 *
 * Example usage:
 * <AuroraBackdrop />
 */
function AuroraBackdrop() {
  const { canTrackPointer } = useMotionPreference();
  const parallaxRef = usePointerParallax(canTrackPointer);

  return (
    <Box
      ref={ parallaxRef }
      aria-hidden="true"
      sx={ {
        '--mx': '0',
        '--my': '0',
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        borderRadius: 'inherit',
      } }
    >
      { LAYERS.map((layer) => (
        <Box
          key={ layer.key }
          sx={ {
            position: 'absolute',
            inset: '-35%',
            willChange: 'transform',
            transform:
              `translate3d(calc(var(--mx) * ${ layer.shift }px), calc(var(--my) * ${ layer.shift }px), 0)`,
          } }
        >
          <Box
            sx={ {
              position: 'absolute',
              inset: 0,
              opacity: layer.opacity,
              filter: 'blur(78px)',
              animation: layer.animation,
              background: `radial-gradient(${ layer.gradient }, ${ layer.color } 0%, transparent 68%)`,
            } }
          />
        </Box>
      )) }

      { /** 비네트 — 가장자리를 어둡게 눌러 헤드라인 가독성을 지킨다 */ }
      <Box
        sx={ {
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 90% at 50% 45%, transparent 30%, rgb(11 11 11 / 0.55) 78%, rgb(11 11 11 / 0.8) 100%)',
        } }
      />
    </Box>
  );
}

export default AuroraBackdrop;
