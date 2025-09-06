import React from 'react';
import { IButtonProps, IBtnTextSize, IBtnWidth, IBtnHeight, IBtnRadius, IBtnColor } from '../../types/IButtonTypes';

/**
 * Button 컴포넌트 사용방법
 *
 * (1)
 * Button을 사용할 페이지에서 IButtonTpyes.ts 파일 내 IBtnTextSize, IBtnWidth, IBtnHeight, IBtnRadius, IBtnColor를 import 한다.
 *
 * (2)
 * props의 각 이름은 IButtonProps 인터페이스와 동일하다.
 * btnText는 필수로 넣어줘야 한다.
 * 나머지 props들은 기본값이 설정되어 있어 선택적으로 넣어줄 수 있다.
 *
 * (3)
 * IBtnTextSize, IBtnWidth, IBtnHeight, IBtnRadius, IBtnColor enum을 사용하여 props를 전달한다.
 *
 */

export default function Button({
  btnText,
  btnTextSize = IBtnTextSize.Large,
  btnWidth = IBtnWidth.Large,
  btnHeight = IBtnHeight.Large,
  btnRadius = IBtnRadius.Large,
  btnColor = IBtnColor.Inactive,
}: IButtonProps) {
  return (
    <>
      <button
        type="button"
        className={`block bg-[#FFC7A7] mx-[34px] py-[14px] font-medium text-white ${btnTextSize} ${btnWidth} ${btnHeight} ${btnRadius} ${btnColor}`}
      >
        {btnText}
      </button>
    </>
  );
}
