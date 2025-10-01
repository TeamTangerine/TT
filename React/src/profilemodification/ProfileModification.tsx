import Header from '../components/Header';
import basicProfileImg from '../../assets/basic-profile-img.png';
import ImgBtn from '../../assets/upload-file.png';
import TextInput from '../components/TextInput';
import { imageAPI, userAPI } from '../service/fetch/api';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useUserNameValidation } from './hooks/useUserNameValidation';
import { useUserAccountNameValidation } from './hooks/useUserAccountValidation';
import useImageInput from './hooks/useImageInput';

function ProfileModification() {
  //라우팅
  const navigate = useNavigate();

  //유저 이름 Init
  const [userNameInit, setUserNameInit] = useState('');

  //새로 제작한 커스텀 훅 유저 이름.
  const { userName, isNameValid, handleInputName } = useUserNameValidation(userNameInit);

  //유저 어카운트 네임 상태관리
  const [accountnameInit, setAccountNameInit] = useState('');

  //새로 제작한 커스텀 훅 유저 어카운트
  const { accountName, isAccountNameValid, handleAccountName } = useUserAccountNameValidation(accountnameInit);

  //새로 제작한 커스텀 훅 이미지
  const { image, previewUrl, handleFileChange } = useImageInput();

  //유저 인트로 관리
  const [userIntro, setUserIntro] = useState('');
  //유저 이미지 관리(url) - 실제 업로드용
  const [userImageUrl, setUserImageUrl] = useState('');

  //프로필 가져오기
  const getMyInfo = async () => {
    const res = await userAPI.getMyInfo();
    setUserNameInit(res.user.username);
    setAccountNameInit(res.user.accountname);
    setUserIntro(res.user.intro);
    setUserImageUrl(res.user.image);
  };
  //첫 렌더시 실행
  useEffect(() => {
    getMyInfo();
  }, []);

  //프로필 업데이트
  const updateInfo = async () => {
    try {
      let finalImageUrl = userImageUrl;

      // 새 이미지가 선택된 경우만 업로드
      if (image.length > 0) {
        const resImg = await imageAPI.uploadFile(image[0]);
        finalImageUrl = resImg.info.filename;
      }

      // 새로 업로드된 파일명 또는 기존 이미지 URL 사용
      await userAPI.updateProfile(userName, accountName, userIntro, finalImageUrl);

      // 성공 후 상태 업데이트
      alert('프로필을 성공적으로 수정했습니다!');
      navigate('/my-profile');
    } catch (error) {
      console.log('에러 발생', error);
    }
  };

  //인풋 핸들러

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
      <Header navStyle="top-save" button={userName && accountName && userIntro ? true : false} />
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
            inputValue={accountName}
            errorMessage="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            showErrorMessage={isAccountNameValid}
            onChange={handleAccountName}
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
