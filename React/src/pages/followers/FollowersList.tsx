import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { profileAPI } from '../../service/fetch/api';
import { ProfileAPI } from '../../types/IFetchType';
import Header from '../../components/Header';
import Button from '../../components/button/Button';
import basicProfileImage from '../../assets/basic-profile-img.png';
import { ButtonColorType } from '../../types/IButtonType';

function FollowersList() {
  const profileImg = basicProfileImage;

  const { accountName } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  const [followList, setFollowList] = useState<ProfileAPI.IFollowingListResponse>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function getFollowList() {
    // 타입이 following인 경우 팔로잉 목록을, 타입이 follower인 경우 팔로워 목록을 불러옴

    // 타입체크하는 곳, accountName과 type의 타입을 체크
    if (!accountName || !type) {
      setError('계정명 또는 타입이 없습니다.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setError('');
    try {
      const data =
        type === 'following'
          ? await profileAPI.getFollowingList(accountName)
          : await profileAPI.getFollowerList(accountName);
      setFollowList(data);
      console.log(data.length);
    } catch (error) {
      console.log('팔로우 리스트를 불러오는데 실패했습니다.', error);
      setError('목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(true);
    }
  }

  // 팔로우 함수
  async function follow(userAccount: string) {
    try {
      const res = await profileAPI.follow(userAccount);
      getFollowList();
    } catch (error) {
      console.log(error);
    }
  }

  // 언팔로우 함수
  async function unfollow(userAccount: string) {
    try {
      const res = await profileAPI.unfollow(userAccount);
      getFollowList();
    } catch (error) {
      console.log(error);
    }
  }

  function showFollowerList() {
    return followList.map((user) => {
      return (
        <li key={user._id} className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={user.image === '/Ellipse-1.png' ? profileImg : user.image}
              alt="프로필 이미지"
            />
            <div className="flex flex-col gap-[6px]">
              <h3 className="text-[14px] font-medium h-[18px]">{user.username}</h3>
              <p className="text-[12px] text-[#767676] h-[15px]">{user.intro}</p>
            </div>
          </div>
          <Button
            btnTextContent={user.isfollow ? '취소' : '팔로우'}
            btnSize="small"
            btnColor={user.isfollow ? 'active' : 'normal'}
            onClick={
              user.isfollow
                ? () => {
                    unfollow(user.accountname);
                  }
                : () => {
                    follow(user.accountname);
                  }
            }
          ></Button>
        </li>
      );
    });
  }

  useEffect(() => {
    getFollowList();
  }, []);

  useEffect(() => {
    showFollowerList();
  }, [followList]);

  return (
    <>
      <Header navStyle="top-follow" isfollowing={type === 'following' ? true : false} />
      <ul className="flex flex-col gap-4 mx-4 mt-6">{loading ? showFollowerList() : <p>로딩중 입니다.</p>}</ul>
    </>
  );
}
export default FollowersList;
