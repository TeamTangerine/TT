import { useState } from 'react';
import modalBarImg from '../../assets/modal-bar.png';
import { createPortal } from 'react-dom';
interface IModalProps {
  closeModal: () => void;
}
function Modal({ closeModal }: IModalProps) {
  return createPortal(
    <dialog className="fixed bottom-0 flex flex-col items-center w-full max-w-[390px] rounded-t-[10px] bg-white shadow-inner">
      <button type="button" onClick={closeModal}>
        <img className="w-[50px] h-1 my-4" src={modalBarImg} alt="모달 바" />
      </button>
      <ul className="flex flex-col w-[100%] ">
        {/* li는 기능 작업 시 props를 받아와서 조건부 렌더링으로 switch문으로 처리하기 (switch문 => li를 컴포넌트로 안 만들어도 됨) */}
        <li className=" ml-[26px] h-[46px] ">
          <p className="text-[14px] text-left my-[14px] h-[18px]">설정 및 개인정보</p>
        </li>
        <li className=" ml-[26px] h-[46px] ">
          <p className="text-[14px] text-left my-[14px] h-[18px]">로그아웃</p>
        </li>
        <li>
          <div className="h-[10vh]"></div>
        </li>
      </ul>
    </dialog>,
    document.body
  );
}

export default Modal;
