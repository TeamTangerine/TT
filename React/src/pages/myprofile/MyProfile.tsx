import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import UserInfo from '../../components/profile/UserInfo';
import ProductList from '../../components/profile/ProductList';
import PostingGrid from '../../components/PostingGrid';

function MyProfile() {
  return (
    <>
      <Header navStyle="top-basic" />
      <main className="pb-[60px] flex flex-col gap-[6px] bg-[#f2f2f2]">
        <UserInfo isMyProfile={true} />
        <ProductList isMyProfile={true} />
        <PostingGrid isMyProfile={true} />
      </main>
      <Footer />
    </>
  );
}
export default MyProfile;
