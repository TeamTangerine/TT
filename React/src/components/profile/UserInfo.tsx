import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FollowToggleButton from '../button/FollowToggleButton';
import Button from '../button/Button';
import { userAPI, profileAPI } from '../../service/fetch/api';
import { UserAPI } from '../../types/IFetchType';

import profileImg from '../../assets/basic-profile-img.png';
import iconMessageCircle from '../../assets/icon/icon-message-circle.svg';
import iconShare from '../../assets/icon/icon-share.png';

/**
 * @param isMyProfile -페이지별 버튼 동적할당을 위한 타입
 * - MyProfile 페이지인 경우 true
 * - YourProfile 페이지인 경우 false
 */
type UserInfoProps = {
  isMyProfile: boolean;
};

function UserInfo({ isMyProfile }: UserInfoProps) {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [accountName, setAccountName] = useState('');
  const [profileData, setProfileData] = useState<UserAPI.IUserProfile>({} as UserAPI.IUserProfile);
  const [loading, setLoading] = useState(false);

  // 유저의 프로필 정보를 갖고 오는 함수
  async function getUserProfile() {
    setLoading(true);

    if (isMyProfile) {
      try {
        const myData = await userAPI.getMyInfo();
        setAccountName(myData.user.accountname);
        const profileData = await profileAPI.getProfile(accountName);
        setProfileData(profileData.profile);
      } catch (error: any) {
        console.error('프로필 정보 조회 실패:', error.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!isMyProfile && postId) {
      try {
        setAccountName(postId);
        console.log(accountName);
        const res = await profileAPI.getProfile(accountName);
        setProfileData(res.profile);
      } catch (error: any) {
        console.error('프로필 정보 조회 실패:', error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  // 현재 url을 복사하는 함수
  async function copyCurrentUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL이 복사되었습니다!');
    } catch (error) {
      console.error('복사 실패:', error);
    }
  }

  // 사용자 ID를 팔로워 리스트 페이지에 URL 파라미터로 넘기는 함수
  function handleFollowingClick() {
    navigate(`/followers-list/${accountName}?type=following`);
  }

  function handleFollowerClick() {
    navigate(`/followers-list/${accountName}?type=follower`);
  }

  useEffect(() => {
    getUserProfile();
  }, [accountName]);

  return (
    <section className="flex flex-col items-center gap-4 pt-[30px] pb-6 bg-white">
      <div className=" flex items-center gap-[45px]">
        <div className="flex flex-col gap-[6px] items-center">
          <span className="text-lg font-bold" onClick={handleFollowerClick}>
            {profileData.followerCount}
          </span>
          <span className="text-[10px] text-[#767676]">followers</span>
        </div>
        <img
          src={!profileData.image || profileData.image === '/Ellipse.png' ? profileImg : profileData.image}
          alt="유저 이미지"
          className="w-[110px] h-[110px] border-[#dbdbdb] border-[1px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[6px] items-center">
          <span className="text-lg font-bold text-[#767676]" onClick={handleFollowingClick}>
            {profileData.followingCount}
          </span>
          <span className="text-[10px] text-[#767676]">followings</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6px">
        <h2 className="font-bold text-[16px]">{profileData.username}</h2>
        <p className="text-[12px] text-[#767676]">{profileData.accountname}</p>
      </div>
      <p className="text-[#767676]">{profileData.intro}</p>
      <div className="mt-1 flex gap-[10px]">
        {isMyProfile ? (
          // MyProfile인 경우
          <div className="flex flex-row gap-3">
            <Button
              btnTextContent="프로필 수정"
              btnSize="medium"
              btnColor="active"
              btnType="button"
              onClick={() => navigate('/profile-modification')}
              btnFlexBasis="basis-[120px]"
              activeDisable={false}
            />
            <Button
              btnTextContent="상품 등록"
              btnSize="medium"
              btnColor="active"
              btnType="button"
              onClick={() => navigate('/add-product')}
              btnFlexBasis="basis-[100px]"
              activeDisable={false}
            />
          </div>
        ) : (
          // MyProfile이 아닌 경우(YourProfile)
          <>
            <button className="flex items-center justify-center w-[34px] h-[34px] rounded-full border-[1px] border-[#DBDBDB]">
              <img src={iconMessageCircle} alt="채팅하기" className="w-5 h-5" onClick={() => navigate('/chat-list')} />
            </button>
            <FollowToggleButton
              followText="팔로우"
              unfollowText="언팔로우"
              btnSize="medium"
              userAccount={profileData.accountname}
              isFollow={profileData.isfollow}
            />
            <button
              className="flex items-center justify-center w-[34px] h-[34px] rounded-full border-[1px] border-[#DBDBDB]
        "
              onClick={copyCurrentUrl}
            >
              <img src={iconShare} alt="공유하기" className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
export default UserInfo;
