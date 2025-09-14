import Header from '../../components/Header';
import profileImg from '../../assets/Ellipse 6.png';
import uploadFileImg from '../../assets/upload-file.png';
import React, { useState } from 'react';
import { postAPI, userAPI, imageAPI } from '../../service/fetch/api';

function Upload() {
  //todo
  //1 글이 입력되거나 사진이 업로드되면 '업로드'버튼이 활성화 되어야함./업로드 버튼은 헤더에 있음
  //2 이미지는 라운디드 처리되어 하나일때는 글 밑에 꽉차게, 여러개일때는 가로 스크롤로 구현해야함
  //3 글은 상태로 저장 ✅
  //4 이미지는 업로드 통신으로 url을 내려받아서 여러개일경우 ','를 사용해서 연결해 전송
  //5 이미지가 한 개일때와 여러 개일때 어떻게 나눠서 처리할 것인가?

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [token, setToken] = useState('');
  async function postContent(content: string, token: string) {
    try {
      const res = postAPI.createPost(content, token);
      console.log(res);
    } catch (error) {
      console.log(error.message, '요청 실패');
    }
  }

  async function getTestToken() {
    const email = 'tt1team@example.com'; // 테스트 계정 이메일
    const password = 'test1team_'; // 테스트 계정 비밀번호
    try {
      const res = await userAPI.login(email, password);
      // res.user.token에 토큰이 들어있음
      const token = res.token;
      console.log(token);
      return setToken(token);
    } catch (e) {
      console.error('테스트 토큰 발급 실패:', e.message);
      return null;
    }
  }

  return (
    <>
      <Header />
      <main className="pt-5 px-4 pb-4 h-[calc(100%-48px)]">
        <div className="flex justify-start h-[80vh] gap-[13px]">
          <img className="w-[42px] h-[42px] rounded-full" src={profileImg} alt="프로필" />
          <textarea
            className="text-[14px] mt-3 w-full h-[100%] focus:outline-none placeholder-[#C4C4C4]"
            placeholder="게시글 입력하기..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button onClick={getTestToken}>토큰메이커</button>
        <label className="fixed bottom-4 right-4 cursor-pointer" onClick={() => postContent(content, token)}>
          <img className="w-[50px] h-[50px] rounded-full" src={uploadFileImg} alt="이미지 추가 버튼" />
        </label>
        <input type="file" id="upload-img" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
      </main>
    </>
  );
}

export default Upload;
