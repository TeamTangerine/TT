import profileImg from '../../../assets/Ellipse 6.png';
import MoreBtn from '../../../assets/icon/s-icon-more-vertical.png';

function Comment() {
  return (
    <li className="flex gap-3 items-start w-full justify-between ">
      <img className="w-9 h-9 rounded-full" src={profileImg} alt="댓글 작성자 프로필 이미지" />
      <div className="flex flex-col justify-between flex-1 gap-[15px]">
        <div className="flex justify-between pt-[5px]">
          <div className="flex justify-between items-center gap-[6px]">
            <h3 className="text-[14px] font-medium">서귀포시 무슨 농장</h3>
            <p className="text-[10px] text-[##767676] ">· 5분 전</p>
          </div>
          <button type="button">
            <img className="w-5 h-5" src={MoreBtn} alt="더보기" />
          </button>
        </div>
        <p className="text-[14px] text-[#333333]">게시글 답글 ~~ !! 최고최고</p>
      </div>
    </li>
  );
}

export default Comment;
