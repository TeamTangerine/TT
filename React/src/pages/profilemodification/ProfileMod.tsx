import Header from '../../components/Header';

function ProfileMod() {
  return (
    <>
      <Header />
      <img src="" alt="" />
      <form action="submit">
        <label htmlFor="userName">사용자 이름</label>
        <input type="text" name="userName" id="userName" placeholder="2-10자 이내여야 합니다." />
        <label htmlFor="userId">계정 ID</label>
        <input type="text" name="userId" id="userId" placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다." />
        <label htmlFor="intro">소개</label>
        <input type="text" name="intro" id="intro" placeholder="자신과 판매할 상품에 대해 소개해 주세요!" />
      </form>
    </>
  );
}

export default ProfileMod;
