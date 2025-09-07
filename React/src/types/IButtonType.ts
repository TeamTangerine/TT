// btnSize, btnColor에 사용할 타입 별도 지정
export type ButtonSizeType = 'large' | 'medium' | 'mediumSmall' | 'small';
export type ButtonColorType = 'normal' | 'disable' | 'active';

/**
 * @param {string} btnTextContent: 버튼에 들어갈 내용을 기입하세요.
 * @param {ButtonSizeType} btnSize: 버튼의 사이즈를 결정
 * - large
 * - medium
 * - mediumSmall
 * - small
 * @param {ButtonColorType} btnColor: 버튼의 색깔을 지정하는 타입
 * - normal
 * - disable
 * - active
 * @param {} onClick: 버튼 클릭시 사용할 콜백함수
 */
export interface IBtnType {
  /**
   * @param {string} BtnTextContent: 버튼에 들어갈 내용을 기입하세요.
   * ex) "다음", "로그인", "팔로우", "언팔로우" 등
   */
  btnTextContent: string;
  /**
   * @param {ButtonSizeType} BtnSize: "large", "medium", "mediumSmall", "small" 문자열을 기입하여 버튼의 사이즈를 결정하세요.
   *
   * - "large" = 'text-[14px] w-[322px] h-[44px] rounded-[44px]'
   * - "medium" = 'text-[14px] w-[120px] h-[34px] rounded-[44px]'
   * - "mediumSmall" = 'text-[14px] w-[90px] h-[32px] rounded-[32px]'
   * - "small" = 'text-[12px] w-[56px] h-[28px] rounded-[26px]'
   */
  btnSize: ButtonSizeType;
  /**
   * @param {ButtonColorType} BtnColor: "normal", "disable", "active" 문자열을 기입하여 버튼의 색깔을 결정하세요.
   *
   * - "normal" : 주황색
   * - "disable" : 연주황색
   * - "active" : 흰색
   */
  btnColor: ButtonColorType;
  /**
   * @param {function} onClick: 버튼 클릭 시 실행할 함수를 전달하세요. (선택사항)
   *
   * @example
   * // 기본 사용법
   * onClick={() => console.log('버튼 클릭됨')}
   *
   * // 함수 전달
   * onClick={handleButtonClick}
   *
   * // 매개변수가 필요한 경우
   * onClick={() => handleSubmit(formData)}
   */

  onClick?: () => void;
}
