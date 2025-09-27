import { useState } from 'react';
import profileImg from '../../../assets/Ellipse 6.png';
import MoreBtn from '../../../assets/icon/s-icon-more-vertical.png';
import Toast from '../../../components/modal/Toast';
import { elapsedTime } from '../../../utils/convertTime';
import { imageAPI } from '../../../service/fetch/api';

type CommentProps = {
  userProfileImage: string;
  userName: string;
  content: string;
  createdAt: string;
  commentId: string;
  postId: string;
};

function Comment({ userProfileImage, userName, content, createdAt, commentId, postId }: CommentProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="flex gap-3 items-start w-[358px] justify-between ">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src={userProfileImage === '/Elipse.png' ? profileImg : imageAPI.getImage(userProfileImage)}
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
      {showModal && (
        <Toast
          toastStyle="user-comment"
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          commentId={commentId}
          postId={postId}
        />
      )}
    </>
  );
}

export default Comment;
