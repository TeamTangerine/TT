import modalBarImg from '../../assets/modal-bar.png';

function Modal() {
  return (
    <dialog className="fixed bottom-0 flex flex-col items-center w-full min-h-[92px] rounded-t-[10px] bg-white">
      <img className="w-[50px] h-1 my-4" src={modalBarImg} alt="모달 바" />
      <ul className="flex flex-col w-[100%] ">
        {/* li는 기능 작업 시 props를 받아와서 조건부 렌더링으로 switch문으로 처리하기 (switch문 => li를 컴포넌트로 안 만들어도 됨) */}
        <li className=" ml-[26px] h-[46px] ">
          <p className="text-[14px] text-left my-[14px] h-[18px]">신고하기</p>
        </li>
      </ul>
    </dialog>
  );
}

export default Modal;
