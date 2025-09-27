import Symbol from '../../assets/symbol-logo-gray.png';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../service/fetch/api';
import { useLayoutEffect, useState } from 'react';
import Posting from '../../components/Posting';
import { PostAPI } from '../../types/IFetchType';
import { getFeed } from '../../service/splash/getFeed';
import Splash from '../Splash/Splash';

function HomePage() {
  // 스플래쉬 체크 상태 추가 - 세션 스토리지에 저장된 값을 이용.
  const [isFirst, setIsFirst] = useState(() => {
    return !sessionStorage.getItem('FIRST_VISIT');
  });
  // api 함수 동작중인지 판별
  const [loading, setLoading] = useState(false);
  // api로 받아온 게시글 목록
  const [posts, setPosts] = useState<PostAPI.IPost[]>([]);
  // 라우팅
  const navigate = useNavigate();

  // 스플래쉬
  async function showSplash() {
    try {
      const result = await userAPI.checkToken();
      if (!result.isValid) {
        navigate('/login');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      console.error('토큰 검사 중 에러 발생', error.message);
      navigate('/login');
    }
  }

  // 팔로잉 게시글 목록(피드) 불러오는 api 함수
  async function getFollowingsFeed() {
    setLoading(true);
    try {
      const res = await getFeed();
      setPosts(res.posts);
    } catch (error: any) {
      setPosts([]);
      console.error(`팔로잉 게시글 목록 불러오기 실패: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  // 처음 렌더링 되고 나서 팔로잉 게시글 목록(피드) api 호출
  // 화면 깜빡임 현상이 심해서 useLayoutEffect 사용
  useLayoutEffect(() => {
    if (isFirst) {
      sessionStorage.setItem('FIRST_VISIT', 'false');
      const timer = setTimeout(() => {
        showSplash();
        setIsFirst(false);
      }, 1850);

      return () => {
        clearTimeout(timer);
      };
    } else {
      getFollowingsFeed();
    }
  }, [isFirst]);

  return (
    <>
      {isFirst ? (
        <Splash />
      ) : (
        <>
          {loading && <>로딩중...</>}

          {!loading && (
            <div>
              <Header navStyle="top-main" />

              {posts.length > 0 && (
                <div className="pb-[60px]">
                  <ul className="flex flex-col items-center gap-5 pt-5 px-4">
                    {posts.map((post) => (
                      <Posting
                        isMyProfile={false}
                        // 포스팅 컴포넌트에 대한 key
                        key={post.id}
                        // 각 게시글의 고유 id
                        postId={post.id}
                        // 각 게시글 모든 내용(navigate의 state 값으로 넘기기 위한 props)
                        hearted={post.hearted}
                        post={post}
                        hearted={post.hearted}
                        userProfileImage={post.author.image}
                        userName={post.author.username}
                        userId={post.author.accountname}
                        userContent={post.content}
                        contentImage={post.image}
                        heartCount={post.heartCount}
                        commentCount={post.commentCount}
                        updatedAt={post.updatedAt}
                      />
                    ))}
                  </ul>
                </div>
              )}
              {posts.length === 0 && (
                <div className="mt-[220px] flex flex-col items-center gap-[20px] pb-[60px]">
                  <img src={Symbol} alt="로고" />
                  <p className="text-[#767676]">유저를 검색해 팔로우 해보세요!</p>
                  <button
                    onClick={() => navigate('/search-page')}
                    type="button"
                    className="w-[120px] h-[44px] bg-[#f26e22] text-sm text-white rounded-full"
                  >
                    검색하기
                  </button>
                </div>
              )}
              <Footer />
            </div>
          )}
        </>
      )}
    </>
  );
}
export default HomePage;
