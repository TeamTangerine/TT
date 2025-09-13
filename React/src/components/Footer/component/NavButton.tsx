import { Link } from 'react-router-dom';
type NavButtonProps = {
  imgSrc: string;
  name: string;
  address: string;
};

function NavButton({ imgSrc, name, address }: NavButtonProps) {
  return (
    <Link to={address} className="w-[84px] h-[60px] flex flex-col items-center gap-1">
      <img src={imgSrc} alt={name} className="w-6 h-6 mt-3" />
      <span className="text-[10px] text-[#767676]">{name}</span>
    </Link>
  );
}

export default NavButton;
