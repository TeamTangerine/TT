import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import profileImg from '../../assets/basic-profile-img.png';
import { Link } from 'react-router-dom';

function ChatList() {
  return (
    <>
      <Header navStyle="top-basic" />
      <ul className="flex flex-col gap-5 pt-6 px-[16px]">
        <li className="flex gap-3 items-end w-full justify-between">
          <Link to="/chat-room">
            <div className="relative">
              <span className="w-3 h-3 bg-[#F26E22] rounded-full absolute top-0"></span>
              <img src={profileImg} alt="채팅 상대방 프로필 이미지" className="w-[42px] h-[42px] rounded-full" />
            </div>
            <div className="flex flex-col gap-1 flex-1 ">
              <h2 className="text-sm font-medium">애월읍 위니브 감귤농장</h2>
              <p className="text-[12px] text-[#767676] mb-[3px]">이번에 정정 언제하맨마씸?</p>
            </div>
            <time className="text-[10px] text-[#DBDBDB] ml-[1px]">2020.10.25</time>
          </Link>
        </li>
        <li className="flex gap-3 items-end w-full justify-between">
          <Link to="/chat-room">
            <div className="relative">
              <span className="w-3 h-3 bg-[#F26E22] rounded-full absolute top-0"></span>
              <img src={profileImg} alt="채팅 상대방 프로필 이미지" className="w-[42px] h-[42px] rounded-full" />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h2 className="text-sm font-medium">제주감귤마을</h2>
              <p className="text-[12px] text-[#767676] mb-[3px] truncate">
                깊은 어둠의 존재감, 롤스로이스 뉴 블랙 배지...
              </p>
            </div>
            <time className="text-[10px] text-[#DBDBDB] ml-[1px]">2020.10.25</time>
          </Link>
        </li>
        <li className="flex gap-3 items-end w-full justify-between">
          <Link to="/chat-room">
            <img src={profileImg} alt="채팅 상대방 프로필 이미지" className="w-[42px] h-[42px] rounded-full" />
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h2 className="text-sm font-medium">누구네 농장 친환경 한라봉</h2>
              <p className="text-[12px] text-[#767676] mb-[3px] truncate">
                내 차는 내가 평가한다. 오픈 이벤트에 참여 하...
              </p>
            </div>
            <time className="text-[10px] text-[#DBDBDB] ml-[1px]">2020.10.25</time>
          </Link>
        </li>
      </ul>
      <Footer />
    </>
  );
}

export default ChatList;
