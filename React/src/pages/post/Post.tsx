import { useState } from 'react';
import Header from '../../components/Header';
import Posting from '../../components/Posting';
import Comment from './components/Comment';
import profileImg from '../../assets/Ellipse 6.png';

function Post() {
  //todo
  //1. 스타일 및 의미없는 코드 정리
  //2. userProfileImage, userName, userId, userContent 데이터 받아오기 (포스팅)
  //3. 댓글 좋아요 기능 구현
  //4. 댓글 작성하면 게시에 버튼 색 바뀜
  //5. 댓글 목록 렌더링
  //6. 더보기 누르면 토스트로 신고하기 // 자기 댓글이면 삭제하기

  // 메세지 입력값 관리
  const [message, setMessage] = useState('');

  return (
    <>
      <Header navStyle="top-basic" />
      <main>
        <span className="flex justify-center py-5">
          <Posting />
        </span>
        <ul className="flex flex-col items-center gap-4 pt-5 px-4 border-t border-t-[#DBDBDB]">
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
    </>
  );
}

export default Post;
