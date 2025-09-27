/**
 * api에서 res로 받은 작성 시간을 연월일시분초로 변환하는 함수입니다.
 * @param time 2025-09-18T14:22:44.922Z 형식의 시간을 입력하세요.
 * @returns
 * 2025년 09월 18일
 */
export function convertTime(time: string) {
  const utcDateStr = time;
  const date = new Date(utcDateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const postedAt = `${year}년 ${month}월 ${day}일 `;
  return postedAt;
}

/**
 * api에서 res로 받은 작성 시간과 현재 시간의 차이를 계산하는 함수입니다.
 * @param time 2025-09-18T14:22:44.922Z 형식의 시간을 입력하세요.
 * @returns
 * 60초 미만: 방금 전, 1시간 미만: 분 전, 24시간 미만: 시간 전, 나머지: 2025년 09월 18일
 */
export function elapsedTime(time: string) {
  const writeTime = new Date(time);
  const currentTme = new Date();

  const elapsedSecond = Math.floor((currentTme.getTime() - writeTime.getTime()) / 1000);

  if (elapsedSecond < 60) {
    // 60초 미만
    return '방금 전';
  } else if (elapsedSecond < 3600) {
    // 1시간 미만
    const minutes = Math.floor(elapsedSecond / 60);
    return `${minutes}분 전`;
  } else if (elapsedSecond < 86400) {
    //24시간 미만
    const hours = Math.floor(elapsedSecond / 3600);
    return `${hours}시간 전`;
  } else {
    return `${convertTime(time)}`;
  }
}
