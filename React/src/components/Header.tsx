import iconSearch from '../assets/icon/icon-search.png';

function Header() {
  return (
    <nav className="flex justify-center w-full h-[48px] border-b border-b-[#DBDBDB] px-[16px] py-[12px]">
      <div className="flex justify-between items-center w-full max-w-[384px]">
        <h1 className="text-lg">감귤마켓 피드</h1>
        <button>
          <img src={iconSearch} alt="검색" />
        </button>
      </div>
    </nav>
  );
}
export default Header;
