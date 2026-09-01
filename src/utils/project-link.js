/** image.thum.io 실시간 썸네일 API 엔드포인트 */
const THUMBNAIL_API = 'https://image.thum.io/get/';

/**
 * 프로젝트 썸네일 URL 을 구한다.
 * DB 의 thumbnail_url 을 우선 사용하고, 비어 있으면 detail_url 로 실시간 생성한다.
 * (별도 이미지 스토리지를 두지 않고 API 로만 썸네일을 제공한다)
 *
 * @param {object} project - { thumbnail_url, detail_url } 을 가진 프로젝트 객체
 * @returns {string} 썸네일 이미지 URL (만들 수 없으면 빈 문자열)
 *
 * Example usage:
 * getThumbnailUrl({ detail_url: 'https://example.com' });
 */
export function getThumbnailUrl(project) {
  if (project?.thumbnail_url) {
    return project.thumbnail_url;
  }

  if (project?.detail_url) {
    return `${ THUMBNAIL_API }${ project.detail_url }`;
  }

  return '';
}

/**
 * ISO 날짜 문자열을 'YYYY. MM.' 형태의 작업 시점 표기로 변환한다.
 *
 * @param {string} isoString - ISO 8601 형식의 날짜 문자열
 * @returns {string} 'YYYY. MM.' 형태 문자열 (값이 없으면 빈 문자열)
 *
 * Example usage:
 * formatWorkPeriod('2026-08-25T04:12:00Z'); // '2026. 08.'
 */
export function formatWorkPeriod(isoString) {
  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return `${ date.getFullYear() }. ${ String(date.getMonth() + 1).padStart(2, '0') }.`;
}
