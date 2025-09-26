import React from 'react';
import { useState, useEffect } from 'react';
import { IFollowToggleButtonType, ButtonSizeType, ButtonColorType } from '../../types/IFollowToggleButtonType';
import { profileAPI } from '../../service/fetch/api';
import throttle from '../../Utils/throttle';

// 버튼 사이즈별 상수 정의
const BUTTON_SIZES = {
  large: `text-[14px] w-[322px] h-[44px] rounded-[44px]`,
  medium: `text-[14px] w-[120px] h-[34px] rounded-[44px]`,
  mediumSmall: `text-[14px] w-[90px] h-[32px] rounded-[32px]`,
  small: `text-[12px] w-[56px] h-[28px] rounded-[26px]`,
} as const;

function getButtonSize(size: ButtonSizeType) {
  return BUTTON_SIZES[size] || BUTTON_SIZES.small;
}

// 버튼 색깔별 상수 정의
const BUTTON_COLORS = {
  normal: 'bg-[#F26E22] text-white active:bg-[#D4541A]',
  disable: 'bg-[#FFC7A7] text-white',
  active: 'bg-[#FFFFFF] text-[#767676] border-[1px] border-[#DBDBDB] active:bg-[#BFBFBF]',
} as const;

function getButtonColor(color: ButtonColorType) {
  return BUTTON_COLORS[color] || BUTTON_COLORS.normal;
}

function FollowToggleButton({ followText, unfollowText, btnSize, userAccount, isFollow }: IFollowToggleButtonType) {
  // 현재 팔로우 상태를 관리
  const [isFollowing, setIsFollowing] = useState(isFollow);

  // 팔로우/언팔로우 핸들러
  async function handleFollowToggle() {
    try {
      if (isFollowing) {
        const res = await profileAPI.unfollow(userAccount);
        setIsFollowing(res.profile.isfollow);
      } else {
        const res = await profileAPI.follow(userAccount);
        setIsFollowing(res.profile.isfollow);
      }
    } catch (error: any) {
      console.error('팔로우 또는 언팔로우를 실패하였습니다.', error.message);
    }
  }

  const handleThrottle = throttle(handleFollowToggle, 1000);

  return (
    <>
      <button
        type="button"
        className={`flex justify-center items-center py-[14px] px-[11px] font-medium ${getButtonSize(btnSize)} ${getButtonColor(isFollowing ? 'active' : 'normal')}`}
        onClick={handleThrottle}
      >
        {isFollowing ? unfollowText : followText}
      </button>
    </>
  );
}

export default FollowToggleButton;
