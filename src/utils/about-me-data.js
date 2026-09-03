/**
 * About Me 탭 페이지 데이터.
 *
 * ⚠️ 프로필 사진에 대하여
 * 예전에 흔히 쓰던 `https://source.unsplash.com/random/...` 랜덤 엔드포인트는
 * Unsplash 가 2024 년에 종료해 현재 503 을 돌려준다. (2026-09-03 확인)
 * 그래서 살아 있는 Unsplash CDN(images.unsplash.com) 이미지 중
 * 일러스트·추상 계열을 골라 두고 그 안에서 무작위로 뽑는 방식으로 대체했다.
 * 모든 ID 는 실제 응답(200)을 확인한 것만 남겼다.
 */

/** Unsplash CDN 이미지 ID — 일러스트·추상 계열 */
const UNSPLASH_PHOTO_IDS = [
  'photo-1547658719-da2b51169166',
  'photo-1550859492-d5da9d8e45f3',
  'photo-1618005182384-a83a8bd57fbe',
  'photo-1620121692029-d088224ddc74',
  'photo-1614851099175-e5b30eb6f696',
  'photo-1635776062127-d379bfcba9f8',
  'photo-1636955840493-f43a02bfa064',
  'photo-1558591710-4b4a1ae0f04d',
  'photo-1604076913837-52ab5629fba9',
];

/** 정사각형으로 잘라 받는다 — 프로필 자리에 그대로 들어간다 */
const PHOTO_SIZE = 480;

/**
 * 목록에서 무작위로 하나를 골라 Unsplash 이미지 URL 을 만든다.
 * 직전에 쓰던 사진은 제외해 "다른 사진 보기" 를 눌렀을 때 같은 게 또 나오지 않게 한다.
 *
 * @param {string} currentUrl - 지금 쓰고 있는 사진 URL [Optional, 기본값: '']
 * @returns {string} Unsplash 이미지 URL
 *
 * Example usage:
 * const photo = pickRandomPhoto(aboutMe.basicInfo.photo);
 */
export function pickRandomPhoto(currentUrl = '') {
  const candidates = UNSPLASH_PHOTO_IDS.filter((id) => !currentUrl.includes(id));
  const pool = candidates.length > 0 ? candidates : UNSPLASH_PHOTO_IDS;
  const id = pool[Math.floor(Math.random() * pool.length)];

  return `https://images.unsplash.com/${ id }?w=${ PHOTO_SIZE }&h=${ PHOTO_SIZE }&fit=crop&auto=format`;
}

/**
 * About Me 원본 데이터.
 * showInHome 은 Home 탭에도 노출할 섹션인지를 나타낸다.
 */
export const aboutMeData = {
  basicInfo: {
    name: '손은솔',
    education: 'SBS아카데미 컴퓨터 학원',
    major: '웹 개발 (웹디자인)',
    experience: '신입',
    photo: pickRandomPhoto(),
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content:
        '나를 간략히 표현하는 웹사이트를 만들고 싶었습니다. 그 문장 하나로 시작했어요.\n\n처음엔 HTML 파일 하나였습니다. 제목을 넣고, 색을 바꾸고, 버튼을 하나 만들어 보는 것부터였습니다. 지금 이 사이트에는 데이터베이스와 배포 파이프라인이 붙어 있습니다. 방명록에 남겨진 글은 Supabase 에 저장되고, main 브랜치에 올리면 GitHub Actions 가 알아서 빌드해 배포합니다.\n\n이 페이지는 그 과정이 그대로 쌓인 결과물입니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content:
        '즐겁게 디자인하기.\n\n화면이 예뻐지는 순간이 재미있어서 계속하게 됐습니다. 색을 고르고, 여백을 재고, 버튼이 눌리는 느낌을 다듬는 일에 시간을 씁니다.\n\n그래서 감으로 고르지 않으려고 합니다. 이 사이트의 색은 모두 토큰으로 정의돼 있고, 배경과 글자의 대비비를 계산해 코드 주석에 적어 뒀습니다. 예쁜 건 취향이지만 읽히는 건 기준이 있는 문제라고 생각하거든요.',
      goal: '시니어 프론트엔드 개발자',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content:
        '일주일에 몇 번은 줌바를 합니다. 몸을 크게 쓰고 나면 막혔던 문제가 다르게 보일 때가 있어요. 앉아만 있으면 아이디어도 같이 굳더라고요.\n\n요즘 가장 궁금한 건 AI 입니다. 이 포트폴리오도 AI 와 함께 만들었습니다. 도구가 코드를 대신 써 주는 시대에 무엇을 더 잘해야 하는지 계속 생각하고 있습니다.',
      tags: ['#줌바', '#AI'],
      showInHome: false,
    },
  ],
};

/**
 * Home 탭에 노출할 섹션만 추린다.
 * (Home 의 About 섹션에서 이 데이터를 쓰게 될 때를 위한 선택자)
 *
 * @param {object} data - aboutMeData 형태의 객체 [Optional, 기본값: aboutMeData]
 * @returns {array} showInHome 이 true 인 섹션 배열
 *
 * Example usage:
 * const homeSections = selectHomeSections();
 */
export function selectHomeSections(data = aboutMeData) {
  return data.sections.filter((section) => section.showInHome);
}

/**
 * 본문을 빈 줄(\n\n) 기준으로 나눠, 첫 문단을 리드문으로 분리한다.
 * 각 섹션의 첫 문단이 그 이야기를 한 문장으로 요약하도록 쓰여 있어
 * 매거진의 리드문 자리에 그대로 쓸 수 있다.
 *
 * @param {string} content - 빈 줄로 문단이 구분된 본문 [Required]
 * @returns {object} lead(첫 문단), paragraphs(나머지 문단 배열)
 *
 * Example usage:
 * const { lead, paragraphs } = splitContent(section.content);
 */
export function splitContent(content = '') {
  const [lead = '', ...rest] = content.split('\n\n').filter(Boolean);

  return { lead, paragraphs: rest };
}

/**
 * 배열 순서를 '01' 형태의 두 자리 번호로 바꾼다.
 *
 * @param {number} index - 0부터 시작하는 배열 인덱스 [Required]
 * @returns {string} 두 자리 번호 문자열
 *
 * Example usage:
 * formatIndex(0); // '01'
 */
export function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}
