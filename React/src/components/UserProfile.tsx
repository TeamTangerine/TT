// API 명세서 기반의 명확한 타입
import { IUserProfileProps } from '../types/IUserProfileProps';
import defaultImage from '../assets/Ellipse-1.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 *
 * @param image:string 이미지 URL
 * @param username:string 계정 이름
 * @param accountname:string 계정 ID
 * @param actionButton:React.ReactNode 팔로우/언팔로우 버튼 (옵셔널입니다. 버튼컴포넌트를 넣어주세요.)
 * @returns
 */
function UserProfile({ image, username, accountname, actionButton, hover }: IUserProfileProps) {
  const navigate = useNavigate();

  return (
    <article
      className={
        hover
          ? `flex justify-between hover:px-2 hover:py-2  hover:scale-110 hover:shadow-xl duration-300 transition-all ease-in-out `
          : `flex justify-between`
      }
      onClick={() => {
        navigate(`/your-profile/${accountname}`);
      }}
    >
      <div className="flex gap-3 ">
        <img src={image || defaultImage} alt={`${username}의 프로필 사진`} className="w-[42px] h-[42px] rounded-full" />
        <div className="flex flex-col gap-[6px]">
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
