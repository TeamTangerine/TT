import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import UserInfo from '../../components/profile/UserInfo';
import ProductList from '../../components/profile/ProductList';
import PostingGrid from '../../components/PostingGrid';

function MyProfile() {
  return (
    <>
      <Header />
      <main className="pb-[60px] flex flex-col gap-[6px] bg-[#f2f2f2]">
        <UserInfo isMyProfile={true} />
        {/* 버튼을 피그마 디자인에 맞게 동적 할당하는 로직 추가 필요합니다! */}
        <ProductList isOwner={true} />
        <PostingGrid />
      </main>
      <Footer />
    </>
  );
}
export default MyProfile;
