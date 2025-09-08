export interface UserProfileProps {
  // 컴포넌트에서 사용하는 속성
  image: string;
  username: string;
  accountname: string;

  // 옵셔널 속성
  _id?: string;
  isfollow?: boolean;
  following?: string[];
  follower?: string[];
  followerCount?: number;
  followingCount?: number;

  //팔로우 버튼을 위한 속성
  actionButton?: React.ReactNode;
}
