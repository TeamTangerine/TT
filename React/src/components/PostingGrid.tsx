import Posting from './Posting';
import postAlbumOff from '../assets/icon/icon-post-album-off.png';
import postAlbumOn from '../assets/icon/icon-post-album-on.png';
import postListOff from '../assets/icon/icon-post-list-off.png';
import postListOn from '../assets/icon/icon-post-list-on.png';
import { useState } from 'react';
import { userAPI, postAPI } from '../service/fetch/api';
import { PostAPI } from '../types/IFetchType';

function HomeCardGrid() {
  const [showAlbum, setShowAlbum] = useState(true);
  const [token, setToken] = useState('');
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
      setShowAlbum(false);
    }

    if (value === false) {
      setShowAlbum(true);
    }
  }

  // 토큰 발급 함수 -> 추후 useContext로 수정 예정
  async function getTestToken() {
    const email = 'tt1team@example.com'; // 테스트 계정 이메일
    const password = 'test1team_'; // 테스트 계정 비밀번호
    try {
      const res = await userAPI.login(email, password);
      const token = res.token;
      const name = res.accountname;
      setToken(token);
      setAccountName(name);
    } catch (e) {
      console.error('테스트 토큰 발급 실패:');
      return null;
    }
  }

  // 게시물 목록을 받아오는 함수
  async function getUserPosts() {
    if (!accountName || !token) {
      console.log('토큰이나 계정명이 없습니다.');
      return;
    }

    setLoading(true);

    try {
      const postData = await postAPI.getUserPosts(accountName, token);
      // posts에 postData.post 데이터 저장
      setPosts(postData.post);
    } catch (error) {
      console.log('포스트 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={getTestToken}>get Token</button>
      <button onClick={getUserPosts}>get User Posts</button>
      <section className={`flex flex-col ${posts.length === 0 ? 'sr-only' : ''}`}>
        <div className="flex justify-center bg-white border-b border-b-[#DBDBDB]">
          <div className="min-w-[390px] flex justify-end gap-4 px-4 py-[9px]">
            <button className="w-[26px] h-[26px]">
              <img
                src={showAlbum ? listBtnOn : listBtnOff}
                alt="리스트로 보기"
                onClick={() => {
                  toggleAlbum(false);
                }}
              />
            </button>
            <button className="w-[26px] h-[26px]">
              <img
                src={!showAlbum ? albumBtnOn : albumBtnOff}
                alt="앨범으로 보기"
                onClick={() => {
                  toggleAlbum(true);
                }}
              />
            </button>
          </div>
        </div>
        <ul
          className={`${showAlbum ? 'flex flex-col items-center gap-6' : 'grid grid-cols-3 gap-x-[6px] gap-y-[6px] min-h-[144px]'} pt-6  px-4 bg-white`}
        >
          {loading ? (
            <li>로딩 중...</li>
          ) : (
            posts.map((post) => {
              return (
                <Posting
                  key={post.id}
                  showAlbum={showAlbum}
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
