import { Link, useLocation } from 'react-router-dom';

type NavButtonProps = {
  imgSrc: string;
  name: string;
  address: string;
  activeImgSrc?: string;
};

function NavButton({ imgSrc, name, address, activeImgSrc }: NavButtonProps) {
  //리액트 라우터 돔에서 현재 경로를 가져오는 방법입니다.
  const { pathname } = useLocation();

  // 현재 경로가 어떤지에 따라 액티브를 체크합니다.
  let isActive = false;
  switch (address) {
    case '/my-profile':
      isActive = pathname === '/my-profile';
      break;
    case '/chat-list':
      isActive = pathname === '/chat-list';
      break;
    // 홈과 나머지에서는 홈 버튼이 활성화
    case '/':
      isActive = pathname !== '/my-profile' && pathname !== '/chat-list';
      break;
    default:
      isActive = false;
  }

  return (
    <Link to={address} className="w-[84px] h-[60px] flex flex-col items-center gap-1">
      <img src={isActive ? activeImgSrc : imgSrc} alt={name} className="w-6 h-6 mt-3" />
      <span className={`text-[10px] ${isActive ? 'text-[#000]' : 'text-[#767676]'}`}>{name}</span>
    </Link>
  );
}

export default NavButton;
