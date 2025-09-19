import Posting from './Posting';
import postAlbumOff from '../assets/icon/icon-post-album-off.png';
import postAlbumOn from '../assets/icon/icon-post-album-on.png';
import postListOff from '../assets/icon/icon-post-list-off.png';
import postListOn from '../assets/icon/icon-post-list-on.png';
import { useState, useEffect } from 'react';
import { userAPI, postAPI } from '../service/fetch/api';
import { PostAPI } from '../types/IFetchType';

function HomeCardGrid() {
  const [showList, setShowList] = useState(true);
  const [accountName, setAccountName] = useState('');
  const [posts, setPosts] = useState<PostAPI.IPost[]>([]);
  const [loading, setLoading] = useState(false);

  const listBtnOn = postListOn;
  const listBtnOff = postListOff;
  const albumBtnOn = postAlbumOn;
  const albumBtnOff = postAlbumOff;

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
    const res = await userAPI.getMyInfo();
    setAccountName(res.user.accountname);
  }

  // 게시물 목록을 받아오는 함수
  async function getUserPosts() {
    setLoading(true);
    try {
      const postData = await postAPI.getUserPosts(accountName);
      if (!postData) {
        throw new Error(postData);
      }
      // posts에 postData.post 데이터 저장
      setPosts(postData.post);
    } catch (error) {
      console.log('포스트 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <button onClick={getUserPosts}>get User Posts</button>
      <section className={`flex flex-col ${posts.length === 0 ? 'hidden' : ''}`}>
        <div className="flex justify-center bg-white border-b border-b-[#DBDBDB]">
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
        <ul
          className={`${showList ? 'flex flex-col items-center gap-5 pt-5' : 'grid grid-cols-3 gap-2 pt-4'} px-4 bg-white`}
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
                  heartCount={post.heartCount}
                  commentCount={post.commentCount}
                  updatedAt={post.updatedAt}
                />
              );
            })
          )}
        </ul>
      </section>
    </>
  );
}
export default HomeCardGrid;
