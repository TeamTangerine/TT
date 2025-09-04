import Header from '../../components/Header';
import basicProfileImg from '../../assets/basic-profile-img.png';

function ProfileModification() {
  return (
    <>
      <Header></Header>
      <div>
        <img src={basicProfileImg} alt="사용자 프로필 이미지" />
        {/* 버튼 이미지는 배경 이미지로 넣기 */}
        <button></button>
      </div>
      <form>
        <label htmlFor="userName">사용자 이름</label>
        <input id="userName" type="text" placeholder="2~10자 이내여야 합니다." />
        <label htmlFor="accountId">계정 ID</label>
        <input id="accountId" type="text" placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다." />
        <label htmlFor="introduce">소개</label>
        <input id="introduce" type="text" placeholder="자신과 판매할 상품에 대해 소개해 주세요!" />
      </form>
    </>
  );
}

export default ProfileModification;
