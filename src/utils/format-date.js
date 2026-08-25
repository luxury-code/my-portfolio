/**
 * ISO 날짜 문자열을 'YYYY. MM. DD. HH:mm' 형태로 변환한다.
 *
 * @param {string} isoString - ISO 8601 형식의 날짜 문자열
 * @returns {string} 사람이 읽기 쉬운 날짜 문자열 (값이 없으면 빈 문자열)
 *
 * Example usage:
 * formatDate('2026-08-25T04:12:00Z'); // '2026. 08. 25. 13:12'
 */
export function formatDate(isoString) {
  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const pad = (value) => String(value).padStart(2, '0');

  return `${ date.getFullYear() }. ${ pad(date.getMonth() + 1) }. ${ pad(date.getDate()) }. ${ pad(date.getHours()) }:${ pad(date.getMinutes()) }`;
}
