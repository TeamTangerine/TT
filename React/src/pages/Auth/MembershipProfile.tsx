import React from 'react';
import basicProfileImg from '../../assets/basic-profile-img.png';
import ImgBtn from '../../assets/upload-file.png';
import TextInput from '../../components/TextInput';
import Button from '../../components/button/Button';

function MembershipProfile() {
  return (
    <>
      <header>
        <h1 className="text-[24px] font-medium">프로필 설정</h1>
        <p className="text-[14px] text-[#767676]">나중에 언제든지 변경할 수 있습니다.</p>
      </header>
      <main>
        <div className="my-[30px] flex flex-col items-center relative">
          <img className="w-[110px] h-[110px] rounded-full " src={basicProfileImg} alt="내 프로필 이미지" />
          <button className="absolute bottom-0 translate-x-[37px]">
            <img className="w-9 h-9 rounded-full " src={ImgBtn} alt="프로필 이미지 변경 버튼" />
          </button>
        </div>
        <form className="flex flex-col items-center gap-[16px] px-[34px]">
          <TextInput inputId="userName" labelText="사용자 이름" placeholderText="2~10자 이내여야 합니다." />
          <TextInput
            inputId="accountId"
            labelText="계정 ID"
            placeholderText="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          />
          <TextInput inputId="userName" labelText="소개" placeholderText="자신과 판매할 상품에 대해 소개해 주세요!" />
          <div className="mt-[14px]">
            <Button btnTextContent="감귤마켓 시작하기" btnSize="large" btnColor="disable" btnType="submit" />
          </div>
        </form>
      </main>
    </>
  );
}

export default MembershipProfile;
