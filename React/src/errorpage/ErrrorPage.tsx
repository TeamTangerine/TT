import ErrorImg from '../assets/icon/icon-404.png';
import Button from '../components/button/Button';

function ErrorPage() {
  return (
    <main className="flex flex-col items-center">
      <img className="w-[158px] h-[158px]" src={ErrorImg} alt="404페이지" />
      <p className="mt-[30px] mb-[20px] text-[14px] text-[#767676]">페이지를 찾을 수 없습니다. :(</p>
      <Button btnTextContent="이전 페이지" btnSize="medium" btnColor="normal" />
    </main>
  );
}

export default ErrorPage;
