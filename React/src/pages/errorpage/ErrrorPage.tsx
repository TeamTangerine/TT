import { useNavigate } from 'react-router-dom';
import ErrorImg from '../../assets/icon/icon-404.png';

function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <main className="h-[100vh] flex flex-col items-center justify-center pb-[20vh]">
      <img className="w-[158px] h-[158px] object-cover" src={ErrorImg} alt="404페이지" />
      <p className="mt-[30px] mb-[20px] text-[14px] text-[#767676]">페이지를 찾을 수 없습니다. :(</p>
      <button
        type="button"
        className="w-[120px] h-[44px] rounded-[44px] text-white font-medium text-[14px] bg-[#F26E22] hover:bg-[#D15F1D]"
        onClick={handleClick}
      >
        이전 페이지
      </button>
    </main>
  );
}

export default ErrorPage;
