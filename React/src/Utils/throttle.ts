/**
 * 특정 시간 동안 연속 호출을 막아 함수 실행 빈도를 제한하는 스로틀링 함수입니다.
 * @param func - 호출 빈도를 제한한 뒤 실행할 함수
 * @param delay -  밀리초(ms) 단위의 제한 시간(예: 1000ms = 1초)
 * @returns 스로틀링된 함수(func)
 */

function throttle<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let isThrottle = false;

  return (...args: Parameters<T>) => {
    if (!isThrottle) {
      func(...args);
      isThrottle = true;

      setTimeout(() => {
        isThrottle = false;
      }, delay);
    }
  };
}

export default throttle;

// throttle 함수 사용 예시

// 1. 버튼

// 버튼 클릭 시 실행할 함수
// const func = () => {
// };

// const handleThrottle = throttle(func, 1000);
// return <button onClick={handleThrottle}>클릭</button>;

// 2. 무한 스크롤 (게시물이나 댓글)

// infiniteScroll 함수 컴포넌트 사용하여 스로틀링 사용하기
// react > src > utils > infiniteScroll.ts 로 가보세요.
