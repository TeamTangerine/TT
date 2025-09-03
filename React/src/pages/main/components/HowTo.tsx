import { IMainType } from '../../../types/IMainType';

function HowTo({ title, age }: IMainType) {
  //prop의 타입을 구조분해할당으로 가져왔습니다. 타입은 IMainType에 명시되어 있습니다.

  //   function Inner(){
  //     return(
  //       <span>이렇게 안에다 다른 컴포넌트를 선언하시면 성능최적화에 문제가 생겨요</span>
  //     )
  //   }
  return (
    <>
      <h2>{title}</h2>
      <p>컴포넌트는 반드시 하나의 컴포넌트안에서 선언해야 합니다.</p>
      <p>props를 받을때는 {age}으로 받아옵니다.</p>
    </>
  );
}

export default HowTo;
