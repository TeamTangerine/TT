/**
 * 특정 시간 동안 연속 호출을 막아 함수 실행 빈도를 제한하는 스로틀링 함수입니다.
 * @param func - 호출 빈도를 제한할 원본 함수
 * @param delay -  밀리초(ms) 단위의 제한 시간(예: 1000ms = 1초)
 */

function throttle<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let isThrottle = false;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!isThrottle) {
      func.apply(this, args);
      isThrottle = true;

      setTimeout(() => {
        isThrottle = false;
      }, delay);
    }
  };
}

export default throttle;

// throttle 함수 사용 예시

// <form onsubmit={throttledMyHandler}>
//   <button>클릭</button>
// </form>

// const throttledMyHandler = throttle(myHandler, 1000);

// function myHandler() {
//   // 버튼 클릭 시 해당 로직
// }
