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

function infiniteScroll() {
  //화면 스크롤 값
  const scrollTop = window.scrollY;
  //유저의 화면 크기
  const clientHeight = window.innerHeight;
  //콘텐츠 총 높이
  const scrollHeight = document.documentElement.scrollHeight;

  //값만 비교해서 true/false 리턴
  return scrollTop + clientHeight >= scrollHeight - 50;
}
export default infiniteScroll;

// infiniteScroll 함수 사용 예시

// useEffect(() => {
//   // infiniteScroll가 true 일때(바닥에 도달했을 때)
//    if (infiniteScroll()) {
//      스크롤해서 바닥에 닿은 후 실행할 함수 넣기
//     }

//   // 기존 이벤트 리스너 제거 (혹시 남아있을 수 있는 것들)
//   window.removeEventListener('scroll', handleScroll);

//   // 스크롤 이벤트 리스너 등록
//   window.addEventListener('scroll', handleScroll);

//   // 컴포넌트 언마운트 시 이벤트 리스너 제거
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, [의존성 지정하기]);
