import Header from '../../components/Header';
import profileImg from '../../assets/Ellipse 6.png';
import uploadFileImg from '../../assets/upload-file.png';

function Upload() {
  return (
    <>
      <Header />
      <div>
        <img src={profileImg} alt="프로필" />
        <input type="text" placeholder="게시글 입력하기..." />
      </div>
      <button>
        <img src={uploadFileImg} alt="이미지 추가 버튼" />
      </button>
    </>
  );
}

export default Upload;
