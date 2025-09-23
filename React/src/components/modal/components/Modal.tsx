import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  isClose: () => void;
  message: string;
  rightLabel: string;
  action: () => void;
}
/**
 *
 * @param isOpen -boolean 열렸는지 확인만 관여
 * @param
 * @returns
 */
function Modal({ isOpen, isClose, message, rightLabel, action }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    action();
    isClose();
  };

  return createPortal(
    <>
      {/* 모달 전용 백드롭 (배경) */}
      <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={isClose} />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[252px] h-[110px] rounded-[10px] bg-white border border-[#DBDBDB] z-40 flex flex-col justify-center">
        <div className="h-[64px] flex flex-col justify-center">
          <p className=" text-[16px] text-center font-medium">{message}</p>
        </div>
        <div className="flex">
          <button type="button" onClick={isClose} className="w-[125px] h-[46px] border-t border-r border-[#DBDBDB]">
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-[126px] h-[46px] border-t border-[#DBDBDB] text-[#F26E22]"
          >
            {rightLabel}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
export default Modal;
