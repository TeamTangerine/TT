// API 명세서 기반의 명확한 타입
import { UserProfileProps } from '../types/IUserProfileProps';
import defaultImage from '../assets/Ellipse-1.png';
/**
 *
 * @param image:string 이미지 URL
 * @param username:string 계정 이름
 * @param accountname:string 계정 ID
 * @param actionButton:React.ReactNode 팔로우/언팔로우 버튼 (옵셔널입니다. 버튼컴포넌트를 넣어주세요.)
 * @returns
 */
function UserProfile({ image, username, accountname, actionButton }: UserProfileProps) {
  return (
    <article className="flex justify-between">
      <div className="flex gap-3">
        <img src={image || defaultImage} alt={`${username}의 프로필 사진`} className="w-[42px] h-[42px] rounded-full" />
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-sm font-medium">{username}</h2>
          <p className="text-[12px] text-[#767676]">@{accountname}</p>
        </div>
      </div>
      {/* 버튼은 상위 컴포넌트에서 프롭스로 처리해주세요! */}
      {actionButton}
    </article>
  );
}
export default UserProfile;
