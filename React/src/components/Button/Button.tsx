import React, { useState } from 'react';
import { IBtnType, ButtonSizeType, ButtonColorType } from '../../types/IButtonType';

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
  active: 'bg-[#DBDBDB] text-[#767676] active:bg-[#BFBFBF]',
} as const;

function getButtonColor(color: ButtonColorType) {
  return BUTTON_COLORS[color] || BUTTON_COLORS.normal;
}

export default function Button({
  btnTextContent,
  btnSize,
  btnColor,
  btnType = 'button',
  btnFlexBasis,
  onClick,
}: IBtnType) {
  return (
    <>
      <button
        type={btnType}
        className={`flex justify-center items-center py-[14px] px-[11px] font-medium ${getButtonSize(btnSize)} ${getButtonColor(btnColor)} ${btnFlexBasis}`}
        onClick={onClick}
      >
        {btnTextContent}
      </button>
    </>
  );
}

type wooriType = {
  name: string;
  age: number;
};

function woori({ name, age }: wooriType) {
  return console.log(name, age);
}

const [item, setItem] = useState();
