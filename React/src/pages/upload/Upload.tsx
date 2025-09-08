import Header from '../../components/Header';
import profileImg from '../../assets/Ellipse 6.png';
import uploadFileImg from '../../assets/upload-file.png';

function Upload() {
  return (
    <>
      <Header />
      <main className="pt-5 px-4 pb-4 h-screen">
        <div className="flex justify-start h-[calc(100%-68px)] gap-[13px]">
          <img className="w-[42px] h-[42px] rounded-full" src={profileImg} alt="프로필" />
          <textarea
            className="text-[14px] mt-3 w-full h-[100%] focus:outline-none placeholder-[#C4C4C4]"
            placeholder="게시글 입력하기..."
          ></textarea>
        </div>
        <button className="fixed bottom-4 right-4">
          <img className="w-[50px] h-[50px] rounded-full" src={uploadFileImg} alt="이미지 추가 버튼" />
        </button>
      </main>
    </>
  );
}

export default Upload;
