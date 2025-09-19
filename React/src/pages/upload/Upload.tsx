import Header from '../../components/Header';
import profileImg from '../../assets/Ellipse 6.png';
import uploadFileImg from '../../assets/upload-file.png';
import ImagePreview from './component/ImagePreview';
import React, { useEffect, useState } from 'react';
import { postAPI, userAPI, imageAPI } from '../../service/fetch/api';
import { useNavigate } from 'react-router-dom';

function Upload() {
  // 토큰이 없을시 로그인으로 이동하기 위한 네비게이트
  const navigate = useNavigate();
  // 유저 프로필 이미지 상태 관리
  const [userImg, setUserImg] = useState('');
  //글 상태 저장
  const [content, setContent] = useState('');
  // 이미지 파일 저장(이미지 업로드용)
  const [images, setImages] = useState<File[]>([]);
  // 이미지 URL 저장(이미지 미리보기용)
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // 토큰 저장
  const [token, setToken] = useState('');

  async function getUserInfo() {
    const res = await userAPI.getMyInfo();
    const image = res.user.image;
    setUserImg(image);
    console.log(userImg);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  //이미지 파일 관리 함수(인풋)
  // 파일 리더라는 자바스크립트 인터페이스를 사용(이미지를 로컬에서 보여주기 위해 사용)
  // 이미지를 base64로 인코딩해서 문자열로 만들어줌
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        //이미지 최대 3개 까지 만드는 로직
        if (images.length + files.length > 3) {
          alert('이미지는 3개까지 업로드 가능합니다.');
          return;
        }
        setImages((prev) => [...prev, ...files]);
        const readFileAsDataURL = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        const urls = await Promise.all(files.map(readFileAsDataURL));
        setPreviewUrls((prev) => [...prev, ...urls]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 이미지 삭제용 함수 (배열에서 인덱스 찾아서 필터)
  const handleRemoveImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * 게시글을 submit하는 함수
   * @param content -string 게시글 내용
   * @param imageUrlString -string(옵셔널) 이미지 filename
   */
  async function postContent(content: string) {
    try {
      let fileUrl: string[] = [];
      if (images.length === 1) {
        const res = await imageAPI.uploadFile(images[0]);
        console.log('파일구조', res);
        fileUrl = [res.info.filename];
      } else if (images.length > 1) {
        const resArr = await imageAPI.uploadFiles(Array.from(images));
        fileUrl = resArr.info.map((v) => v.filename);
      }
      await postAPI.createPost(content, fileUrl.join(','));
      alert('업로드 성공!');
      navigate('/my-profile');
    } catch (error) {
      console.error(error, '업로드 실패');
      alert('업로드에 실패하였습니다. 다시 시도해 주세요.');
    }
  }

  //업로드하려고 onSubmit에 담는 함수
  const handleUpload = () => {
    postContent(content);
  };

  return (
    <>
      {/* 헤더*/}
      <Header navStyle="top-upload" button={content ? true : false} formTarget="upload" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpload();
        }}
        className="flex flex-col items-center"
        id="upload"
      >
        {/* 메인 */}
        <main className="pt-5 px-4 pb-4 max-w-[390px] box-border">
          <div className="flex justify-start h-[80vh] gap-[13px] w-full">
            {/* 프로필 이미지 */}
            <img
              className="w-[42px] h-[42px] rounded-full"
              src={userImg && userImg === '/Ellipse.png' ? profileImg : userImg}
              alt="프로필"
            />
            {/* 게시글 */}
            <div className="flex flex-col gap-4 overflow-hidden">
              <textarea
                className="text-[14px] mt-3 w-[304px] focus:outline-none placeholder-[#C4C4C4] resize-none"
                placeholder="게시글 입력하기..."
                value={content}
                // 게시글 높이를 스크립트로 조정하는 함수
                onChange={(e) => {
                  setContent(e.target.value);
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.style.height = 'auto';
                  textarea.style.height = textarea.scrollHeight + 'px';
                }}
                style={{ overflow: 'hidden' }}
              ></textarea>
              {/* 업로드 이미지 미리보기*/}
              {previewUrls.length === 1 ? (
                <ImagePreview url={previewUrls} gridType="single" onRemove={handleRemoveImage} />
              ) : previewUrls.length > 1 ? (
                <ImagePreview url={previewUrls} gridType="multiple" onRemove={handleRemoveImage} />
              ) : null}
            </div>
          </div>
          {/* 이미지 업로드 버튼 */}
          <div className="flex justify-end ">
            <label htmlFor="upload-img" className="cursor-pointer">
              <img className="w-[50px] h-[50px] rounded-full" src={uploadFileImg} alt="이미지 추가 버튼" />
            </label>
          </div>
          <input type="file" id="upload-img" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
        </main>
      </form>
    </>
  );
}

export default Upload;
