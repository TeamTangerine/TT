import React from 'react';
import { IBtnType } from '../../types/IButtonType';

export default function Button({ BtnTextContent, BtnSizeType, BtnColorType }: IBtnType) {
  function ButtonSize(size: string) {
    // 버튼 사이즈별 상수 정의
    const LARGE = 'text-[14px] w-[322px] h-[44px] rounded-[44px]';
    const MEDIUM = 'text-[14px] w-[120px] h-[34px] rounded-[44px]';
    const MEDIUMSMALL = 'text-[14px] w-[90px] h-[32px] rounded-[32px]';
    const SMALL = 'text-[12px] w-[56px] h-[28px] rounded-[26px]';

    switch (size) {
      case 'large':
        return LARGE;
      case 'medium':
        return MEDIUM;
      case 'mediumSmall':
        return MEDIUMSMALL;
      default:
        return SMALL;
    }
  }

  function ButtonColor(color: string) {
    // 버튼 색깔별 상수 정의
    const NORMAL = 'bg-[#F26E22] text-white';
    const DISABLE = 'bg-[#FFC7A7] text-white';
    const ACTIVE = 'bg-[#DBDBDB] text-[#767676]';

    switch (color) {
      case 'disable':
        return DISABLE;
      case 'active':
        return ACTIVE;
      default:
        return NORMAL;
    }
  }

  return (
    <>
      <button
        type="button"
        className={`flex justify-center items-center mx-[34px] py-[14px] font-medium ${ButtonSize(BtnSizeType)} ${ButtonColor(BtnColorType)}`}
      >
        {BtnTextContent}
      </button>
    </>
  );
}
