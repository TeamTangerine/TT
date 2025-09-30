import Header from '../../components/Header';
import basicProfileImg from '../../assets/basic-profile-img.png';
import ImgBtn from '../../assets/upload-file.png';
import TextInput from '../../components/TextInput';
import { imageAPI, userAPI } from '../../service/fetch/api';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useUserNameValidation } from './component/useUserNameValidation';

function ProfileModification() {
  //라우팅
  const navigate = useNavigate();

  //유저 이름 Init
  const [userNameInit, setUserNameInit] = useState('');

  //새로 제작한 커스텀 훅 유저 이름.
  const { userName, isNameValid, handleInputName } = useUserNameValidation(userNameInit);

  //유저 어카운트 네임 상태관리
  const [userAcountName, setUserAcountName] = useState('');
  const [isAccountNameValid, setIsAccountNameValid] = useState(false);
  //유저 인트로 관리
  const [userIntro, setUserIntro] = useState('');
  //유저 이미지 관리(url) - 실제 업로드용
  const [userImageUrl, setUserImageUrl] = useState('');

  //이미지 파일 관리
  const [image, setImage] = useState<File[]>([]);
  //이미지 미리보기 url - base64용
  const [previewUrl, setPreviewUrl] = useState('');

  //프로필 가져오기
  const getMyInfo = async () => {
    const res = await userAPI.getMyInfo();
    setUserNameInit(res.user.username);
    setUserAcountName(res.user.accountname);
    setUserIntro(res.user.intro);
    setUserImageUrl(res.user.image);
  };
  //첫 렌더시 실행
  useEffect(() => {
    getMyInfo();
  }, []);

  //이미지 파일 관리 함수(인풋)
  // 파일 리더라는 자바스크립트 인터페이스를 사용(이미지를 로컬에서 보여주기 위해 사용)
  // 이미지를 base64로 인코딩해서 문자열로 만들어줌
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setImage(files);
        const readFileAsDataURL = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        const urls = await Promise.all(files.map(readFileAsDataURL));
        setPreviewUrl(urls[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //프로필 업데이트
  const updateInfo = async () => {
    try {
      let finalImageUrl = userImageUrl;

      // 새 이미지가 선택된 경우만 업로드
      if (image.length > 0) {
        const resImg = await imageAPI.uploadFile(image[0]);
        finalImageUrl = resImg.info.filename;
      }

      // //유저 이름 검사
      // if (!validateUserName(userName)) {
      //   setIsNameValid(true);
      //   alert('올바르지 않은 이름 형식입니다.');
      //   return;
      // }

      //계정명 검사
      // 현재 계정명과 다를 때만 검증
      if (userAcountName !== userAcountName) {
        const resAcountName = await userAPI.validateAccountName(userAcountName);
        if (resAcountName.message === '이미 가입된 계정ID 입니다.') {
          setIsAccountNameValid(true);
          alert('이미 가입된 계정ID 입니다.');
          return;
        }
      }

      // 새로 업로드된 파일명 또는 기존 이미지 URL 사용
      await userAPI.updateProfile(userName, userAcountName, userIntro, finalImageUrl);

      // 성공 후 상태 업데이트
      alert('프로필을 성공적으로 수정했습니다!');
      navigate('/my-profile');
    } catch (error) {
      console.log('에러 발생', error);
    }
  };

  //인풋 핸들러

  const handleInputAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAcountName(e.target.value);
  };
  const handleInputIntro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserIntro(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateInfo();
      }}
    >
      <Header navStyle="top-save" button={userName && userAcountName && userIntro ? true : false} />
      <main>
        <div className="my-[30px] flex flex-col items-center relative">
          <img
            className="w-[110px] h-[110px] rounded-full object-cover"
            //프리뷰(파일에 업로드)가 있으면 프리뷰, 없으면 기존 유저 이미지, 없으면 basicProfile
            src={previewUrl ? previewUrl : userImageUrl ? imageAPI.getImage(userImageUrl) : basicProfileImg}
            alt="내 프로필 이미지"
          />
          <label htmlFor="uploadImg" className="absolute bottom-0 translate-x-[37px] cursor-pointer">
            <img className="w-9 h-9 rounded-full " src={ImgBtn} alt="프로필 이미지 변경 버튼" />
          </label>
          <input type="file" className="hidden" id="uploadImg" onChange={handleFileChange} />
        </div>
        <div className="flex flex-col items-center gap-[16px] px-[34px]">
          <TextInput
            inputId="userName"
            labelText="사용자 이름"
            inputValue={userName}
            errorMessage="2-10자 이내여야 합니다."
            showErrorMessage={!isNameValid}
            onChange={handleInputName}
            placeholderText="2~10자 이내여야 합니다."
          />
          <TextInput
            inputId="accountId"
            labelText="계정 ID"
            inputValue={userAcountName}
            errorMessage="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            showErrorMessage={isAccountNameValid}
            onChange={handleInputAccount}
            placeholderText="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          />
          <TextInput
            inputId="userIntro"
            labelText="소개"
            inputValue={userIntro}
            onChange={handleInputIntro}
            placeholderText="자신과 판매할 상품에 대해 소개해 주세요!"
          />
        </div>
      </main>
    </form>
  );
}

export default ProfileModification;
