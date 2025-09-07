/**
 * @param {string} BtnTextContent: 버튼에 들어갈 내용을 기입하세요.
 * @param {string} BtnSizeType: 버튼의 사이즈를 결정
 * @param {string} BtnColorType: 버튼의 색깔을 지정하는 타입
 */
export interface IBtnType {
  /**
   * @param {string} BtnTextContent: 버튼에 들어갈 내용을 기입하세요.
   * ex) "다음", "로그인", "팔로우", "언팔로우" 등
   */
  BtnTextContent: string;
  /**
   * @param {string} BtnSizeType: "large", "medium", "mediumSmall", "small" 문자열을 기입하여 버튼의 사이즈를 결정하세요.
   *
   * "large" = 'text-[14px] w-[322px] h-[44px] rounded-[44px]'
   * "medium" = 'text-[14px] w-[120px] h-[34px] rounded-[44px]'
   * "mediumSmall" = 'text-[14px] w-[90px] h-[32px] rounded-[32px]'
   * "small" = 'text-[12px] w-[56px] h-[28px] rounded-[26px]'
   */
  BtnSizeType: string;
  /**
   * @param {string} BtnColorType: "normal", "disable", "active" 문자열을 기입하여 버튼의 색깔을 결정하세요.
   *
   * "normal" : 주황색
   * "disable" : 연주황색
   * "active" : 흰색
   */
  BtnColorType: string;
}
