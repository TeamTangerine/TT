import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { ButtonColorType } from '../../types/IButtonType';

import basicProfileImg from '../../assets/basic-profile-img.png';
import iconMessageCircle from '../../assets/icon/icon-message-circle.svg';
import iconShare from '../../assets/icon/icon-share.png';

/**
 * @param isMyProfile -페이지별 버튼 동적할당을 위한 타입
 * - MyProfile 페이지인 경우 true
 * - YourProfile 페이지인 경우 false
 */
type UserInfoProps = {
  isMyProfile: boolean;
};

function UserInfo({ isMyProfile }: UserInfoProps) {
  const navigate = useNavigate();
  const [buttonColor, setButtonColor] = useState<ButtonColorType>('normal');
  const [isFollow, setIsFollow] = useState<string>('팔로우');

  // 팔로우 버튼 클릭시 색깔 변화
  function toggleFollow() {
    if (buttonColor === 'normal') {
      setButtonColor('active');
      setIsFollow('언팔로우');
    }

    if (buttonColor === 'active') {
      setButtonColor('normal');
      setIsFollow('팔로우');
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

        {isMyProfile ? (
          // MyProfile인 경우
          <div className="flex flex-row gap-3">
            <Button
              btnTextContent="프로필 수정"
              btnSize="medium"
              btnColor="active"
              btnType="button"
              onClick={() => navigate('/profile-modification')}
              btnFlexBasis="basis-[120px]"
              activeDisable={false}
            />
            <Button
              btnTextContent="상품 등록"
              btnSize="medium"
              btnColor="active"
              btnType="button"
              onClick={() => navigate('/add-product')}
              btnFlexBasis="basis-[100px]"
              activeDisable={false}
            />
          </div>
        ) : (
          // MyProfile이 아닌 경우(YourProfile)
          <Button
            btnTextContent={isFollow}
            btnSize="medium"
            btnColor={buttonColor}
            btnType="button"
            onClick={toggleFollow}
            activeDisable={false}
          />
        )}
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
