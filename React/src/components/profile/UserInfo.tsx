import { useState } from 'react';
import Button from '../Button/Button';
import { ButtonColorType } from '../../types/IButtonType';

import basicProfileImg from '../../assets/basic-profile-img.png';
import iconMessageCircle from '../../assets/icon/icon-message-circle.svg';
import iconShare from '../../assets/icon/icon-share.png';

function UserInfo() {
  const [buttonColor, setButtonColor] = useState<ButtonColorType>('normal');
  function changeColor() {
    if (buttonColor === 'normal') {
      setButtonColor('disable');
      console.log('버튼 색깔이 바뀌었습니다.', buttonColor);
    }

    if (buttonColor === 'disable') {
      setButtonColor('normal');
      console.log('버튼 색깔이 바뀌었습니다.', buttonColor);
    }
  }

  const profileImg = basicProfileImg;
  return (
    <section className="flex flex-col items-center gap-4 pt-[30px] pb-6 bg-white">
      <div className=" flex items-center gap-[45px]">
        <div className="flex flex-col gap-[6px] items-center">
          <span className="text-lg font-bold">2950</span>
          <span className="text-[10px] text-[#767676]">followers</span>
        </div>
        <img src={profileImg} alt="유저 이미지" />
        <div className="flex flex-col gap-[6px] items-center">
          <span className="text-lg font-bold text-[#767676]">128</span>
          <span className="text-[10px] text-[#767676]">followings</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6px">
        <h2 className="font-bold text-[16px]">애월읍 위니브 감귤농장</h2>
        <p className="text-[12px] text-[#767676]">@weniv_Mandarin</p>
      </div>
      <p className="text-[#767676]">애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장</p>
      <div className="mt-1 flex gap-[10px]">
        <button className="flex items-center justify-center w-[34px] h-[34px] rounded-full border-[1px] border-[#DBDBDB]">
          <img src={iconMessageCircle} alt="채팅하기" className="w-5 h-5" />
        </button>
        <Button
          btnTextContent="팔로우"
          btnSize="medium"
          btnColor={buttonColor}
          btnType="button"
          onClick={changeColor}
          activeDisable={false}
        />
        <button
          className="flex items-center justify-center w-[34px] h-[34px] rounded-full border-[1px] border-[#DBDBDB]
        "
        >
          <img src={iconShare} alt="공유하기" className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
export default UserInfo;
