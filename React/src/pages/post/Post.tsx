import { useState } from 'react';
import Header from '../../components/Header';
import Posting from '../../components/Posting';
import Comment from './components/Comment';
import profileImg from '../../assets/Ellipse 6.png';

function Post() {
  // 유저 프로필 이미지 상태 관리
  const [userImg, setUserImg] = useState('');
  // 메세지 입력값 관리
  const [message, setMessage] = useState('');
  useEffect(() => {
    getUserInfo();
  }, []);

  // 현재 로그인 중인 유저의 프로필 이미지 가져오는 api
  async function getUserInfo() {
    try {
      const res = await userAPI.getMyInfo();
      const image = res.user.image;
      setUserImg(image);
      console.log(userImg);
    } catch (error) {
      console.error('현재 로그인 중인 유저의 프로필 이미지 불러오기 실패', error);
    }
  }
  return (
    <>
      <Header navStyle="top-basic" />
      <main>
        <span className="flex justify-center py-5">
          <Posting />
        </span>
        <ul className="flex flex-col gap-4 pt-5 px-4 border-t border-t-[#DBDBDB]">
          <Comment />
          <Comment />
        </ul>
      </main>
      <div className="fixed bottom-0 flex items-center justify-center w-full h-[60px] border-t border-t-[#DBDBDB] bg-white">
        <img className="w-9 h-9 rounded-full" src={profileImg} alt="내 프로필 이미지" />
        <form>
          <input
            className="w-[278px] ml-[18px] text-[14px] focus:outline-none  placeholder-[#C4C4C4]"
            type="text"
            placeholder="댓글 입력하기..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={`text-[14px] ${message ? 'text-[#F26E22]' : 'text-[#C4C4C4] font-medium'}`} type="submit">
            게시
          </button>
        </form>
      </div>
            <img className="w-9 h-9 rounded-full" src={userImg ? userImg : profileImg} alt="내 프로필 이미지" />
    </>
  );
}

export default Post;
