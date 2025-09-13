import iconHome from '../../assets/icon/icon-home.svg'; // 경로 수정
import iconMessageCircle from '../../assets/icon/icon-message-circle.svg';
import iconEdit from '../../assets/icon/icon-edit.svg';
import iconUser from '../../assets/icon/icon-user.svg';
import NavButton from './component/NavButton';

function Footer() {
  return (
    <nav className="fixed bottom-0 flex justify-center gap-[14px] w-full h-[60px] border-t border-t-[#DBDBDB] bg-white">
      <NavButton imgSrc={iconHome} name="홈" address="/" />
      <NavButton imgSrc={iconMessageCircle} name="채팅" address="/chat-list" />
      <NavButton imgSrc={iconEdit} name="게시물 작성" address="/upload" />
      <NavButton imgSrc={iconUser} name="프로필" address="/my-profile" />
    </nav>
  );
}
export default Footer;
