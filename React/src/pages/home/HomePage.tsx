import Symbol from '../../assets/symbol-logo-gray.png';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  // api로 받아온 게시글 목록
  const [posts, setPosts] = useState<PostAPI.IPost[]>([]);
  // api로 받아온 현재 로그인한 사용자의 팔로잉 유무
  const [following, setFollowing] = useState(false);
  const navigate = useNavigate();

  // 팔로잉 게시글 목록(피드) 불러오는 api 함수
  async function getFollowingsFeed() {
    try {
      const res = await postAPI.getFeed();
      setPosts(res.posts);
    } catch (error: any) {
      throw new Error(`팔로잉 게시글 목록 불러오기 실패: ${error.message}`);
    }
  }

  // 현재 로그인한 사용자의 팔로잉 정보를 불러오는 api 함수
  async function getMyFollowing() {
    try {
      const res = await userAPI.getMyInfo();

      if (res.user.followingCount > 0) {
        setFollowing(true);
      }
    } catch (error: any) {
      throw new Error(`팔로잉 수 불러오기 실패: ${error.message}`);
    }
  }
  return (
    <div>
      <Header navStyle="top-main" />
      <div className="mt-[220px] flex flex-col items-center gap-[20px]">
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
      <Footer />
    </div>
  );
}
export default HomePage;
