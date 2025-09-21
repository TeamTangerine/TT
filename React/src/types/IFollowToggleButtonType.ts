// btnSize, btnColor에 사용할 리터럴 타입 별도 지정
export type ButtonSizeType = 'large' | 'medium' | 'mediumSmall' | 'small';
export type ButtonColorType = 'normal' | 'disable' | 'active';

/**
 * @param followText - (string) 팔로우 할 경우 텍스트
 * @param unfollowText - (string) 언팔로우 할 경우 텍스트
 * @param btnSize - 버튼의 사이즈를 결정
 * - large
 * - medium
 * - mediumSmall
 * - small
 * @param userAccount - (string) API 통신할때 사용할 useraccount를 받아옵니다.
 * @param isFollow - (boolean) 팔로우 여부를 확인하는 prop입니다.
 */

export interface IFollowToggleButtonType {
  /**
   * @param followText - 팔로우 할 경우 텍스트
   */
  followText: string;

  /**
   * @param unfollowText - 언팔로우 할 경우 텍스트
   */
  unfollowText: string;

  /**
   * @param btnSize - "large", "medium", "mediumSmall", "small" 문자열을 기입하여 버튼의 사이즈를 결정하세요.
   *
   * - "large" : 'text-[14px] w-[322px] h-[44px] rounded-[44px]'
   * - "medium" : 'text-[14px] w-[120px] h-[34px] rounded-[44px]'
   * - "mediumSmall" : 'text-[14px] w-[90px] h-[32px] rounded-[32px]'
   * - "small" : 'text-[12px] w-[56px] h-[28px] rounded-[26px]'
   */
  btnSize: ButtonSizeType;

  /**
   * @param userAccount - 사용할 userAccount를 받는 prop
   */
  userAccount: string;

  /**
   * @param isFollow - 현재 팔로우 상태를 받는 prop
   * true : 팔로우 중입니다.
   * false : 언팔로우 중입니다.
   */
  isFollow: boolean;
}
