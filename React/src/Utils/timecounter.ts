/**
 * api에서 res로 받은 작성시간을 연월일시분초로 변환하는 함수입니다.
 * @param time 2025-09-18T14:22:44.922Z 형식의 시간을 입력하세요.
 * @returns
 * 2025년 09월 18일 14시 22분 44초
 */
export function convertTime(time: string) {
  const utcDateStr = time;
  const date = new Date(utcDateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const postedAt = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  return postedAt;
}
