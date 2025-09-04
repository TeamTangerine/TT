import profileImg from '../../../assets/Ellipse 6.png';
import MoreBtn from '../../../assets/icon/s-icon-more-vertical.png';

function Comment() {
  return (
    <li>
      <img src={profileImg} alt="댓글 작성자 프로필 이미지" />
      <div>
        <div>
          <h3>서귀포시 무슨 농장</h3>
          <p>· 5분 전</p>
        </div>
        <p>게시글 답글 ~~ !! 최고최고</p>
      </div>
      <button>
        <img src={MoreBtn} alt="더보기" />
      </button>
    </li>
  );
}

export default Comment;
