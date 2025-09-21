import { useEffect, useRef, useState } from 'react';
import modalBarImg from '../../assets/modal-bar.png';
import { createPortal } from 'react-dom';
import ToastChildren from './components/ToastChildren';
interface IModalProps {
  showModal: boolean;
  closeModal: () => void;
  toastStyle: 'header' | 'myProfile-post' | 'myProfile-product' | 'my-comment' | 'user-comment' | 'chat';
}

// 리팩토링 todo
/**
 * 1. 각 상황별로 모달 형태 정리
 * 2. 상황별 prop 이벤트 정리
 * 3. 내 게시글 수정인지 남의 게시글인지 구분하는 로직 필요
 * 4. 재사용성 고려(같은 기능 묶기)
 * 5. 모달 함수들 래핑
 */

/**
 * 모달 컴포넌트
 * @param showModal - showModal을 상위 컴포넌트에서 관리
 * @param closeModal - setShowModal(false)를 콜백으로 받음
 * @returns
 */
function Modal({ showModal, closeModal, toastStyle }: IModalProps) {
  const dialogRef = useRef(null);

  //모달 열렸는지 상태
  const [isOpen, setIsOpen] = useState(false);

  //settimeout을 안하면 바로 올라와서 지연시킴. 렌더링시 Open=true
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(showModal);
    }, 10);
  }, []);
  //버튼 온클릭 이벤트 핸들러  setOpen(false)로 애니메이션(밑에 duration-300)이 지나고 닫히도록 딜레이함.
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  // 케이스 1 헤더에서 더보기
  //  - 설정 및 개인정보
  //  - 로그아웃 => 로그인페이지로 이동

  // 케이스 2 내 프로필에서 포트스 더보기
  //  - 삭제
  //  - 수정

  // 케이스 3 내 프로필에서 상품 누르기
  // - 삭제
  // - 수정
  // - 웹사이트에서 상품 보기

  // 케이스 4 포스트 상세 보기 (댓글)
  // - 내 댓글이면 삭제
  // - 남의 댓글이면 신고

  // 케이스 5 채팅방 헤더일때
  // - 채팅방 나가기

  const ToastContent = () => {
    switch (toastStyle) {
      case 'header': {
        return (
          <>
            <ToastChildren content="설정 및 개인정보" />
            <ToastChildren content="로그아웃" />
          </>
        );
      }
      case 'myProfile-post': {
        return (
          <>
            <ToastChildren content="삭제" />;
            <ToastChildren content="수정" />;
          </>
        );
      }
      case 'myProfile-product': {
        return (
          <>
            <ToastChildren content="삭제" />
            <ToastChildren content="수정" />
            <ToastChildren content="웹사이트에서 상품 보기" />
          </>
        );
      }
      case 'my-comment': {
        return <ToastChildren content="삭제" />;
      }
      case 'user-comment': {
        return <ToastChildren content="신고" />;
      }
      case 'chat': {
        return <ToastChildren content="채팅방 나가기" />;
      }
      default: {
        return <ToastChildren content="로그아웃" />;
      }
    }
  };

  return createPortal(
    <>
      {/* 백드롭(배경어둡게)용 div */}
      <div
        className={`fixed inset-0 z-10 duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'bg-opacity-0'}`}
        onClick={handleClose}
      />
      <dialog
        ref={dialogRef}
        open={isOpen}
        className={`fixed bottom-0 z-20 flex flex-col items-center w-full max-w-[390px] rounded-t-[10px] bg-white shadow-inner
    transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button type="button" onClick={handleClose}>
          <img className="w-[50px] h-1 my-4" src={modalBarImg} alt="모달 바" />
        </button>
        <ul className="flex flex-col w-[100%] ">{ToastContent()}</ul>
        <div className="h-9" />
      </dialog>
    </>,
    document.body
  );
}

export default Modal;
