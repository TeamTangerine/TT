import Posting from './Posting';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI, postAPI } from '../service/fetch/api';
import { PostAPI } from '../types/IFetchType';
import albumBtnOff from '../assets/icon/icon-post-album-off.png';
import albumBtnOn from '../assets/icon/icon-post-album-on.png';
import listBtnOff from '../assets/icon/icon-post-list-off.png';
import listBtnOn from '../assets/icon/icon-post-list-on.png';

type HomeCardGridprops = {
  isMyProfile: boolean;
};

function HomeCardGrid({ isMyProfile }: HomeCardGridprops) {
  const { postId } = useParams<{ postId: string }>();
  const [accountName, setAccountName] = useState('');
  const [posts, setPosts] = useState<PostAPI.IPost[]>([]);
  const [showList, setShowList] = useState(true);
  const [loading, setLoading] = useState(false);

  // 토글 상태 관리 함수
  function toggleAlbum(value: boolean) {
    if (value === true) {
      setShowList(false);
    }

    if (value === false) {
      setShowList(true);
    }
  }

  // 로그인한 유저 accout를 받는 함수, setAccountName을 통해 상태 설정
  async function getUserInfo() {
    const accountData = await userAPI.getMyInfo();
    setAccountName(accountData.user.accountname);
  }

  // 게시물 목록을 받아오는 함수
  async function getUserPosts() {
    setLoading(true);

    if (isMyProfile) {
      try {
        const postData = await postAPI.getUserPosts(accountName);
        // posts에 postData.post 데이터 저장
        setPosts(postData.post);
      } catch (error: any) {
        console.error('게시물 목록 조회 실패:', error.message);
      } finally {
        setLoading(false);
        return;
      }
    }

    if (!isMyProfile && postId) {
      try {
        const postData = await postAPI.getUserPosts(accountName);
        setPosts(postData.post);
      } catch (error: any) {
        console.error('게시물 목록 조회 실패:', error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (isMyProfile) {
      getUserInfo();
    } else if (postId) {
      setAccountName(postId);
    }
  }, []);

  useEffect(() => {
    getUserPosts();
  }, [accountName, postId]);

  return (
    <div className="h-full bg-white">
      <section className={`flex flex-col ${posts.length === 0 ? 'hidden' : ''}`}>
        <div className="flex justify-center border-b border-b-[#DBDBDB]">
          <div className="min-w-[390px] flex justify-end gap-4 px-4 py-[9px]">
            <button className="w-[26px] h-[26px]">
              <img
                src={showList ? listBtnOn : listBtnOff}
                alt="리스트로 보기"
                onClick={() => {
                  toggleAlbum(false);
                }}
              />
            </button>
            <button className="w-[26px] h-[26px]">
              <img
                src={!showList ? albumBtnOn : albumBtnOff}
                alt="앨범으로 보기"
                onClick={() => {
                  toggleAlbum(true);
                }}
              />
            </button>
          </div>
        </div>
        <div className=" bg-white">
          <ul
            className={`${showList ? 'flex flex-col items-center gap-5 pt-5' : 'grid grid-cols-3 justify-items-center mx-auto max-w-fit gap-2 pt-4'} px-4`}
          >
            {loading ? (
              <li>로딩 중...</li>
            ) : (
              posts.map((post) => {
                return (
                  <Posting
                    key={post.id}
                    showList={showList}
                    userProfileImage={post.author.image}
                    userName={post.author.username}
                    userId={post.author.accountname}
                    userContent={post.content}
                    contentImage={post.image}
                    postId={post.id}
                    heartCount={post.heartCount}
                    hearted={post.hearted}
                    commentCount={post.commentCount}
                    updatedAt={post.updatedAt}
                  />
                );
              })
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default HomeCardGrid;
