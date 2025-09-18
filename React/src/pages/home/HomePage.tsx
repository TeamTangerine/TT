import { useNavigate } from 'react-router-dom';
import Symbol from '../../assets/symbol-logo-gray.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
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
