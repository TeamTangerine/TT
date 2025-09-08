import Header from '../../components/Header';
import basicProfileImg from '../../assets/basic-profile-img.png';
import ImgBtn from '../../assets/img-button.png';
import TextInput from '../../components/TextInput';

function ProfileModification() {
  return (
    <>
      <Header />
      <div>
        <img src={basicProfileImg} alt="내 프로필 이미지" />
        <button>
          <img src={ImgBtn} alt="프로필 이미지 변경 버튼" />
        </button>
      </div>
      <form>
        <TextInput inputId="userName" labelText="사용자 이름" placeholderText="2~10자 이내여야 합니다." />
        <TextInput
          inputId="accountId"
          labelText="계정 ID"
          placeholderText="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
        />
        <TextInput inputId="userName" labelText="소개" placeholderText="자신과 판매할 상품에 대해 소개해 주세요!" />
      </form>
    </>
  );
}

export default ProfileModification;
