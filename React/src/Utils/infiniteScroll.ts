import { useEffect } from 'react';
import throttle from './throttle';

/**
 *  페이지 바닥에 도달했을 때 스로틀링으로 제어 된 함수가 실행되어 무한 스크롤이 가능한 함수입니다.
 * @param func - 스크롤해서 바닥에 닿은 후 실행할 함수
 * @param delay -  밀리초(ms) 단위의 제한 시간(예: 1000ms = 1초)
 * @returns 스로틀링된 함수(func)
 * scrollTop - 현재 스크롤이 위에서부터 얼마나 내려왔는지를 나타내는 값(px 단위)
 * scrollHeight - 문서 전체 높이
 * clientHeight - 현재 화면에 보이는 영역(뷰포트)의 높이
 * 사용자가 스크롤을 내려서 화면 바닥이 전체 문서의 바닥과 50px 이내로 가까워졌을 때 함수 실행
 */

function infiniteScroll(func: () => void, delay: number) {
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        func();
      }
    }, delay);

    window.addEventListener('scroll', handleScroll);
    // useEffect 내부에서 이벤트를 등록할 때는 이벤트 중복 및 메모리 누수 방지를 위해 클린업 함수 사용함
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}

export default infiniteScroll;

// infiniteScroll 함수 사용 예시

// 스크롤해서 바닥에 닿은 후 실행할 함수
//  const func = () => {
//      // 새로운 게시글이나 댓글 추가
//      // setComments(prev => [... prev, 10개의 게시글이나 댓글 추가 로직])
//   };

//   infiniteScroll(func, 3000);
