import { ChangeEvent, useState } from 'react';
import Header from '../../components/Header';
import uploadFileImg from '../../assets/upload-file.png';
import profileImg from '../../assets/basic-profile-img.png';
import dogImg from '../../assets/chat-exapmle.png';

function ChatRoom() {
  // 메세지 입력값 관리
  const [message, setMessage] = useState('');
  // 파일 선택 여부 관리
  const [fileSelected, setFileSelected] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFileSelected(!!e.target.files?.length);
  }

  return (
    <div className="h-screen">
      <Header />
      <section className=" flex flex-col gap-[9px] px-4 pb-[81px] h-[calc(100%-48px)] justify-end bg-[#f2f2f2] overflow-y-auto">
        <div className="flex justify-start gap-3">
          <img className="w-[42px] h-[42px] rounded-full" src={profileImg} alt="채팅 상대방 프로필" />
          <div className="flex items-end gap-[6px]">
            <p className="text-[14px] p-3 bg-white border rounded-b-[10px] rounded-tr-[10px] border-[#C4C4C4]">
              옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
              약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
            </p>
            <time className="text-[10px] text-[#767676] ">12:39</time>
          </div>
        </div>
        <div className="flex justify-start gap-3">
          <img className="w-[42px] h-[42px] rounded-full" src={profileImg} alt="채팅 상대방 프로필" />
          <div className="flex items-end gap-[6px]">
            <p className="text-[14px] p-3 bg-white border rounded-b-[10px] rounded-tr-[10px] border-[#C4C4C4]">
              안녕하세요. 감귤 사고싶어요요요요요
            </p>
            <time className="text-[10px] text-[#767676] ">12:41</time>
          </div>
        </div>
        <div className="flex justify-end items-end gap-[6px] mt-[1px]">
          <time className="text-[10px] text-[#767676] ">12:50</time>
          <p className="text-[14px] text-white p-3 bg-[#F26E22] rounded-b-[10px] rounded-tl-[10px]">네 말씀하세요.</p>
        </div>
        <div className="flex justify-end items-end gap-[6px] mt-[1px]">
          <time className="text-[10px] text-[#767676] ">12:51</time>
          <img className="w-60 h-60 rounded-[10px]" src={dogImg} alt="웃고있는 강아지" />
        </div>
      </section>
      <form className="fixed bottom-0 flex items-center justify-center w-full h-[60px] border-t border-t-[#DBDBDB] bg-white">
        <label className="w-9 h-9 rounded-full cursor-pointer" htmlFor="imgSelectBtn">
          <img src={uploadFileImg} alt="채팅에 보낼 이미지 파일 선택" />
          <input id="imgSelectBtn" type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <input
          className="w-[278px] ml-[18px] text-[14px] focus:outline-none  placeholder-[#C4C4C4]"
          type="text"
          placeholder="메세지 입력하기..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={`text-[14px] ${message || fileSelected ? 'text-[#F26E22]' : 'text-[#C4C4C4] font-medium'}`}
          type="button"
        >
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
