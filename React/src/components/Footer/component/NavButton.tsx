type NavButtonProps = {
  imgSrc: string;
  name: string;
};

function NavButton({ imgSrc, name }: NavButtonProps) {
  return (
    <button className="w-[84px] h-[60px] flex flex-col items-center gap-1">
      <img src={imgSrc} alt={name} className="w-6 h-6 mt-3" />
      <span className="text-[10px] text-[#767676]">{name}</span>
    </button>
  );
}

export default NavButton;
