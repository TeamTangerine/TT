import UserProfile from '../../components/UserProfile';
import Header from '../../components/Header';
import Button from '../../components/button/Button';
import basicProfileImage from '../../assets/basic-profile-img.png';

function FollowersList() {
  const profileImg = basicProfileImage;

  return (
    <>
      <Header navStyle="top-follow" />
      <ul className="flex flex-col gap-4 mx-4 mt-6">
        <li className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img className="w-[50px] h-[50px] rounded-full" src={profileImg} alt="프로필 이미지" />
            <div className="flex flex-col gap-[6px]">
              <h3 className="text-[14px] font-medium h-[18px]">애월읍 한라봉 최고 맛집</h3>
              <p className="text-[12px] text-[#767676] h-[15px]">정성을 다해 농사짓는 한라봉</p>
            </div>
          </div>
          <Button btnTextContent="팔로우" btnSize="small" btnColor="normal"></Button>
        </li>
      </ul>
    </>
  );
}
export default FollowersList;
