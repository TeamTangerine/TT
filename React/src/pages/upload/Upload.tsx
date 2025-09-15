import Header from '../../components/Header';
import profileImg from '../../assets/Ellipse 6.png';
import uploadFileImg from '../../assets/upload-file.png';
import ImagePreview from './component/ImagePreview';
import React, { useState } from 'react';
import { postAPI, userAPI, imageAPI } from '../../service/fetch/api';

function Upload() {
  //todo
  //1 글이 입력되거나 사진이 업로드되면 '업로드'버튼이 활성화 되어야함./업로드 버튼은 헤더에 있음
  //2 이미지는 라운디드 처리되어 하나일때는 글 밑에 꽉차게, 여러개일때는 가로 스크롤로 구현해야함
  //3 글은 상태로 저장 ✅
  //4 이미지는 업로드 통신으로 url을 내려받아서 여러개일경우 ', '를 사용해서 연결해 전송
  //5 이미지가 한 개일때와 여러 개일때 어떻게 나눠서 처리할 것인가?

  // * 이미지는 먼저 API로 업로드해서 filename을 받아오고, 여러개일 경우 (, )를 이용해 붙여서 post할때 첨부
  // * 비동기함수와 상태 업데이트의 차이점 잘 고려해서 작성

  //글 상태 저장
  const [content, setContent] = useState('');
  // 이미지 파일 저장(이미지 업로드용)
  const [images, setImages] = useState<File[]>([]);
  // 이미지 URL 저장(게시글 업로드용)
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  // 이미지 URL 저장(이미지 미리보기용)
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // 토큰 저장
  const [token, setToken] = useState('');

  /**
   * 게시글을 submit하는 함수
   * @param content -string 게시글 내용
   * @param token -string 토큰
   * @param imageUrlString -string(옵셔널) 이미지 filename
   */
  async function postContent(content: string, token: string) {
    try {
      let fileUrl: string[] = [];
      if (images.length === 1) {
        const res = await imageAPI.uploadFile(images[0]);
        fileUrl = [res.filename];
      } else if (images.length > 1) {
        const resArr = await imageAPI.uploadFiles();
      }
      postAPI.createPost(content, token, ...fileUrl);
    } catch (error) {
      console.log(error, '요청 실패');
    }
  }

  async function getTestToken() {
    const email = 'tt1team@example.com'; // 테스트 계정 이메일
    const password = 'test1team_'; // 테스트 계정 비밀번호
    try {
      const res = await userAPI.login(email, password);
      const token = res.token;
      console.log(token);
      setToken(token);
    } catch (e) {
      console.error('테스트 토큰 발급 실패:');
      return null;
    }
  }

  async function getTestPost() {
    const postId = '68c6c42521acad806a5c80ad';
    try {
      const res = await postAPI.getPost(postId, token);
      console.log(res);
    } catch (error) {
      console.log('포스트를 가져오지 못했음');
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setImages(files);
        const readFileAsDataURL = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        const urls = await Promise.all(files.map(readFileAsDataURL));
        setPreviewUrls(urls);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 파일이 한 개면
  // if (fileArr.length === 1) {
  //   // 단일 파일 페치 요청
  //   const res = await imageAPI.uploadFile(e.target.files[0]);
  //   //URL에 파일 이름 배열로 저장
  //   urls = [res.info.filename];
  //   // 파일이 여러개면
  // }
  // else if (fileArr.length > 1) {
  //   const resArr = await imageAPI.uploadFiles(e.target.files);
  //   url
  // }

  // 업로드 버튼 클릭 시
  const handleUploadClick = (e: React.FormEvent) => {
    postContent(content, token);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUploadClick(e);
        }}
      >
        {/* 헤더*/}
        <Header navStyle="top-upload" button={true} />
        {/* 메인 */}
        <main className="pt-5 px-4 pb-4 h-[calc(100%-48px)]">
          <div className="flex justify-start h-[80vh] gap-[13px]">
            {/* 프로필 이미지 */}
            <img className="w-[42px] h-[42px] rounded-full" src={profileImg} alt="프로필" />
            {/* 게시글 */}
            <div className="flex flex-col gap-4">
              <textarea
                className="text-[14px] mt-3 w-full focus:outline-none placeholder-[#C4C4C4] resize-none"
                placeholder="게시글 입력하기..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.style.height = 'auto';
                  textarea.style.height = textarea.scrollHeight + 'px';
                }}
                style={{ overflow: 'hidden' }}
              ></textarea>
              {/* 업로드 이미지 미리보기*/}
              {images.length > 0 ? <ImagePreview url={previewUrls} gridType="single" /> : <div></div>}
            </div>
          </div>
          {/* 이미지 업로드 버튼 */}
          <button className="fixed bottom-4 right-4 cursor-pointer" onClick={() => getTestPost}>
            <img className="w-[50px] h-[50px] rounded-full" src={uploadFileImg} alt="이미지 추가 버튼" />
          </button>
          <input type="file" id="upload-img" multiple accept="image/*" onChange={handleFileChange} />
        </main>
      </form>
      <button onClick={getTestToken}>토큰메이커</button>
    </>
  );
}

export default Upload;
