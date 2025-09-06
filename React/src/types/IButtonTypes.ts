/**
 * @interface IButtonProps 버튼 컴포넌트 props 타입 정의
 * - btnText: 버튼 내부에 들어갈 텍스트
 * - btnTextSize: 버튼 텍스트 크기:
 * - btnWidth: 버튼 가로 길이
 * - btnHeight: 버튼 세로 길이
 * - btnRadius: 버튼 border-radius
 * - btnColor: 버튼 배경색
 */
export interface IButtonProps {
  btnText: string;
  btnTextSize: IBtnTextSize;
  btnWidth: IBtnWidth;
  btnHeight: IBtnHeight;
  btnRadius: IBtnRadius;
  btnColor: IBtnColor;
}

/**
 * @param IBtnTextSize 버튼 텍스트 크기
 * - 사용방법 예시: BtnTextSize.Large
 * - L, M, MS => Large
 * - S => Small
 * - Large: 'text-[14px]'
 * - Small: 'text-[12px]'
 */
export enum IBtnTextSize {
  Large = 'text-[14px]',
  Small = 'text-[12px]',
}

/**
 * @param IBtnWidth 버튼 가로 길이
 * - 사용방법 예시: BtnWidth.Large
 * - Large: 'w-[322px]'
 * - Medium: 'w-[120px]'
 * - MediumSmall: 'w-[90px]'
 * - Small: 'w-[56px]'
 */
export enum IBtnWidth {
  Large = 'w-[322px]',
  Medium = 'w-[120px]',
  MediumSmall = 'w-[90px]',
  Small = 'w-[56px]',
}

/**
 * @param IBtnHeight 버튼 세로 길이
 * - 사용방법 예시: BtnHeight.Large
 * - Large: 'h-[44px]'
 * - Medium: 'h-[34px]'
 * - MediumSmall: 'h-[32px]'
 * - Small: 'h-[28px]'
 */
export enum IBtnHeight {
  Large = 'h-[44px]',
  Medium = 'h-[34px]',
  MediumSmall = 'h-[32px]',
  Small = 'h-[28px]',
}

/**
 * @param IBtnRadius 버튼 border-radius
 * - 사용방법 예시: BtnRadius.Large
 * - Large: 'rounded-[44px]'
 * - Medium: 'rounded-[30px]'
 * - MediumSmall: 'rounded-[32px]'
 * - Small: 'rounded-[26px]'
 */
export enum IBtnRadius {
  Large = 'rounded-[44px]',
  Medium = 'rounded-[30px]',
  MediumSmall = 'rounded-[32px]',
  Small = 'rounded-[26px]',
}

/**
 * @param IBtnColor 버튼 배경색
 * - 사용방법 예시: BtnColor.Active
 * - Active: 'bg-[#F26E22]'
 * - Inactive: 'bg-[#FFC7A7]'
 * - Disabled: 'bg-[#DBDBDB]'
 */
export enum IBtnColor {
  Active = 'bg-[#F26E22]',
  Inactive = 'bg-[#FFC7A7]',
  Disabled = 'bg-[#DBDBDB]',
}
