// btnSize, btnColor에 사용할 리터럴 타입 별도 지정
export type ButtonSizeType = 'medium' | 'small';
export type ButtonColorType = 'normal' | 'active';

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
  followText: string;
  unfollowText: string;
  btnSize: ButtonSizeType;
  userAccount: string;
  isFollow: boolean;
}
