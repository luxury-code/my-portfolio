/**
 * 기술 스택.
 *
 * 데이터 모양은 P3 에서 만들 Supabase `portfolio_skills` 테이블과 일부러 동일하게 맞췄다.
 * 그때는 이 배열을 지우고 훅에서 받아오기만 하면 된다.
 *
 * level 은 과장하지 않는다. 지금은 전부 '하' 이고, 그 사실 자체를 그대로 보여주는 것이
 * 이 섹션의 전략이다. (기획: docs/portfolio-plan.md §4-3)
 */
export const SKILLS = [
  {
    name: 'HTML',
    tagline: '구조를 세우는 기본 재료',
    level: '하',
    projectCount: 3,
  },
  {
    name: 'CSS',
    tagline: '화면에 색과 결을 입히는 소스',
    level: '하',
    projectCount: 3,
  },
  {
    name: 'JavaScript',
    tagline: '움직임을 만드는 불',
    level: '하',
    projectCount: 3,
  },
  {
    name: 'React',
    tagline: '재료를 조립하는 방식',
    level: '하',
    projectCount: 3,
  },
  {
    name: 'Node.js',
    tagline: '주방 뒤편의 준비',
    level: '하',
    projectCount: 0,
  },
];

/** 메뉴판 하단에 붙는 정직한 각주 */
export const CHEF_NOTE =
  '아직 전부 ‘하’ 입니다. 이 메뉴판은 제가 올라가는 걸 기록하는 자리예요. 다음에 오시면 등급이 바뀌어 있을 겁니다.';
