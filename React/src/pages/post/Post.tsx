import Header from '../../components/Header';
import Posting from '../../components/Posting';
import Comment from './components/Comment';
import profileImg from '../../assets/Ellipse 6.png';

function Post() {
  return (
    <>
      <Header />
      <Posting />
      <ul>
        <Comment />
      </ul>
      <div>
        <img src={profileImg} alt="내 프로필 이미지" />
        <form>
          <input type="text" placeholder="댓글 입력하기..." />
          <button>게시</button>
        </form>
      </div>
    </>
  );
}

export default Post;
