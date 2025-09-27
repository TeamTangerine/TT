import { useEffect, useRef, useState } from 'react';
import modalBarImg from '../../assets/modal-bar.png';
import { createPortal } from 'react-dom';
import ToastChildren from './components/ToastChildren';
import { useNavigate } from 'react-router-dom';
import Modal from './components/Modal';
import { createModalConfigs } from './components/modalConfigs';
import { commentAPI, postAPI } from '../../service/fetch/api';

interface IModalProps {
  showModal: boolean;
  closeModal: () => void;
  toastStyle: 'header' | 'myProfile-post' | 'myProfile-product' | 'my-comment' | 'user-comment' | 'chat' | 'user-post';
  postId?: string;
  productId?: string;
  commentId?: string;
  productLink?: string;
}

/**
 * 토스트 / 모달 컴포넌트
 * 더보기 누를때 나타나는 토스트 팝업 구현
 * @param showModal - showModal을 상위 컴포넌트에서 관리
 * @param closeModal - setShowModal(false)를 콜백으로 받음
 * @param toastStyle - 토스트 팝업의 스타일을 넣어주세요 'header' | 'myProfile-post' | 'myProfile-product' | 'my-comment' | 'user-comment' | 'chat'
 * @returns
 */
function Toast({ showModal, closeModal, toastStyle, postId, productId, commentId, productLink }: IModalProps) {
  //네비게이트
  const navigate = useNavigate();

  const dialogRef = useRef(null);

  //토스트 열렸는지 상태
  const [isOpen, setIsOpen] = useState(false);

  //모달이 열렸는지 상태
  const [openModal, setOpenModal] = useState(false);
  //모달 타입 저장용
  const [modalType, setModalType] = useState('');

  //settimeout을 안하면 바로 올라와서 지연시킴. 렌더링시 Open=true
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(showModal);
    }, 10);
  }, [showModal]);

  //버튼 온클릭 이벤트 핸들러  setOpen(false)로 애니메이션(밑에 duration-300)이 지나고 닫히도록 딜레이함.
  const handleClose = () => {
    setIsOpen(false);
    setOpenModal(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  //모달 설정을 위한 configs
  const modalConfigs = createModalConfigs(navigate, handleClose, postId, productId);

  //토스트 메뉴 종류별로 정리
  const ToastContent = () => {
    switch (toastStyle) {
      case 'header': {
        const setting = () => {
          alert('해당 기능은 개발 중입니다. 조금만 기다려 주세요 😊');
        };
        const logoutModal = () => {
          setModalType('logout');
          setOpenModal(true);
        };

        return (
          <>
            <ToastChildren content="설정 및 개인정보" click={setting} />
            <ToastChildren content="로그아웃" click={logoutModal} />
          </>
        );
      }
      case 'myProfile-post': {
        const deleteMyPost = () => {
          alert('추후 구현 예정인 기능입니다! 기대해주세요~👍🏻♥️');
          // setModalType('deleteMyPost');
          // setOpenModal(true);
        };
        const editMyPost = () => {
          alert('추후 구현 예정인 기능입니다! 기대해주세요~👍🏻♥️');
          // navigate('/upload');
        };
        return (
          <>
            <ToastChildren content="삭제" click={deleteMyPost} />
            <ToastChildren content="수정" click={editMyPost} />
          </>
        );
      }
      case 'myProfile-product': {
        const deleteMyProduct = () => {
          setModalType('deleteMyProduct');
          setOpenModal(true);
        };
        const editMyProduct = () => {
          navigate(`/add-product/${productId}`);
        };
        const linkTo = () => {
          window.open(`${productLink}`, '_blank');
        };
        return (
          <>
            <ToastChildren content="삭제" click={deleteMyProduct} />
            <ToastChildren content="수정" click={editMyProduct} />
            <ToastChildren content="웹사이트에서 상품 보기" click={linkTo} />
          </>
        );
      }
      case 'my-comment': {
        const deleteMyComment = async () => {
          if (confirm('정말로 삭제하시겠습니까?')) {
            if (!postId) {
              alert('게시글 정보를 불러오지 못했습니다.');
              return;
            }
            if (!commentId) {
              alert('댓글 정보를 불러오지 못했습니다.');
              return;
            }

            await commentAPI.deleteComment(postId, commentId);
          }
        };
        return <ToastChildren content="삭제" click={deleteMyComment} />;
      }
      case 'user-comment': {
        const reportComment = async () => {
          if (confirm('정말로 신고하시겠습니까?')) {
            if (!postId) {
              alert('게시글 정보를 불러오지 못했습니다.');
              return;
            }
            if (!commentId) {
              alert('댓글 정보를 불러오지 못했습니다.');
              return;
            }
            await commentAPI.reportComment(postId, commentId);
            alert('성공적으로 신고했습니다!');
            setIsOpen(false);
            return;
          }
        };
        return <ToastChildren content="신고" click={reportComment} />;
      }
      case 'chat': {
        const leaveChat = () => {
          if (confirm('채팅방을 떠나시겠습니까?')) {
            navigate(-1);
          }
        };
        return <ToastChildren content="채팅방 나가기" click={leaveChat} />;
      }
      case 'user-post': {
        const reportPost = async () => {
          if (confirm('해당 게시글을 신고하시겠습니까?')) {
            if (!postId) return;
            await postAPI.reportPost(postId);
            alert('성공적으로 신고했습니다!');
          }
        };
        return <ToastChildren content="신고하기" click={reportPost} />;
      }
      default: {
        return;
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
        className={`fixed bottom-0 z-20 flex flex-col items-center w-full max-w-[390px] rounded-t-[10px] bg-white
    transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button type="button" onClick={handleClose}>
          <img className="w-[50px] h-1 my-4" src={modalBarImg} alt="모달 바" />
        </button>
        <ul className="flex flex-col w-[100%] ">{ToastContent()}</ul>
        <div className="h-9" />
      </dialog>
      {/* 모달타입, 설정 안에 모달타입이 유효한지 */}
      {modalType && modalType in modalConfigs && (
        <Modal
          isOpen={openModal}
          isClose={() => setOpenModal(false)}
          // 이유는 모르겠지만 이렇게 설정해야 타입오류가 안남..
          message={modalConfigs[modalType as keyof typeof modalConfigs].message}
          rightLabel={modalConfigs[modalType as keyof typeof modalConfigs].rightLabel}
          action={modalConfigs[modalType as keyof typeof modalConfigs].action}
        />
      )}
    </>,
    document.body
  );
}

export default Toast;
