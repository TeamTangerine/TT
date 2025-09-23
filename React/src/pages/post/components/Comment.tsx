import { useState } from 'react';
import profileImg from '../../../assets/Ellipse 6.png';
import MoreBtn from '../../../assets/icon/s-icon-more-vertical.png';
import Modal from '../../../components/modal/Modal';
import { elapsedTime } from '../../../Utils/convertTime';

type CommentProps = {
  userProfileImage: string;
  userName: string;
  content: string;
  createdAt: string;
};

function Comment({ userProfileImage, userName, content, createdAt }: CommentProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="flex gap-3 items-start w-[358px] justify-between ">
        <img
          className="w-9 h-9 rounded-full"
          src={userProfileImage === '/Elipse.png' ? profileImg : userProfileImage}
          alt="댓글 작성자 프로필 이미지"
        />
        <div className="flex flex-col justify-between flex-1 gap-[16px]">
          <div className="flex justify-between pt-[5px]">
            <div className="flex justify-between items-center gap-[6px]">
              <h3 className="text-[14px] font-medium">{userName}</h3>
              <p className="text-[10px] text-[#767676] ">{elapsedTime(createdAt)}</p>
            </div>
            <button type="button">
              <img className="w-5 h-5" onClick={() => setShowModal(true)} src={MoreBtn} alt="더보기" />
            </button>
          </div>
          <p className="text-[14px] text-[#333333]">{content}</p>
        </div>
      </li>
      {/* showModal && <Toast toastStyle='commentId' showModal={showModal} closeModal={() => setShowModal(false)} /> */}
    </>
  );
}

export default Comment;
