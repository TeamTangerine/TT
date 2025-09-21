import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  isClose: () => void;
}

function Modal({ isOpen, isClose }: ModalProps) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('TOKEN_KEY');
    alert('로그아웃 완료');
    navigate('/login');
  };
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <dialog className="fixed bottom-1/2 flex flex-col justify-end w-[252px] h-[110px] rounded-[10px] bg-white border border-[#DBDBDB] z-50">
      <p className="mb-[22px] text-[16px] text-center">로그아웃 하시겠어요?</p>
      <div className="flex">
        <button type="button" onClick={isClose} className="w-[125px] h-[46px] border-t border-r border-[#DBDBDB]">
          취소
        </button>
        <button type="button" onClick={logout} className="w-[126px] h-[46px] border-t border-[#DBDBDB] text-[#F26E22]">
          로그아웃
        </button>
      </div>
    </dialog>,
    document.body
  );
}
export default Modal;
