import { useEffect, useRef, useState } from 'react';
import modalBarImg from '../../assets/modal-bar.png';
import { createPortal } from 'react-dom';
interface IModalProps {
  closeModal: () => void;
}
/**
 * 모달 컴포넌트
 * @param closeModal - setShowModal(false)를 콜백으로 받음
 * @returns
 */
function Modal({ closeModal }: IModalProps) {
  const dialogRef = useRef(null);

  //모달 열렸는지 상태
  const [isOpen, setIsOpen] = useState(false);
  //settimeout을 안하면 바로 올라와서 지연시킴. 렌더링시 Open=true
  useEffect(() => {
    setTimeout(() => {
      dialogRef.current.showModal();
      setIsOpen(true);
    }, 10);
  }, []);
  //버튼 온클릭 이벤트 핸들러  setOpen(false)로 애니메이션(밑에 duration-300)이 지나고 닫히도록 딜레이함.
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };
  return createPortal(
    <dialog
      ref={dialogRef}
      open={isOpen}
      className={`fixed bottom-0 flex flex-col items-center w-full max-w-[390px] rounded-t-[10px] bg-white shadow-inner
    transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <button type="button" onClick={handleClose}>
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
