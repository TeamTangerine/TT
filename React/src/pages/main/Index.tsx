import HowTo from "./components/HowTo"


function Main (){
 return( 
 <>
  <h1>
      이 페이지는 이해를 돕기위해 작성된 예시 페이지 입니다.  </h1>
      {/* 컴포넌트 안에 컴포넌트를 불러오는 예시입니다. */}
      <HowTo title="사용방법" age={22}/>
      {/*test*/}
 </>
    
)
}
export default Main