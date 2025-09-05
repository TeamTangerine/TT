import modalBarImg from '../../assets/modal-bar.png';

function Modal() {
  return (
    <>
      <img src={modalBarImg} alt="모달 바" />
      <ul>
        {/* li는 기능 작업 시 props를 받아와서 조건부 렌더링으로 switch문으로 처리하기 (switch문 => li를 컴포넌트로 안 만들어도 됨) */}
        <li></li>
      </ul>
    </>
  );
}

export default Modal;
