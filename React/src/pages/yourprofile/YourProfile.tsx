import UserInfo from '../../components/profile/UserInfo';
import ProductList from '../../components/profile/ProductList';
import PostingGrid from '../../components/PostingGrid';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';

function YourProfile() {
  return (
    <>
      <Header />
      <main className="pb-[60px] flex flex-col gap-[6px] bg-[#f2f2f2]">
        <UserInfo isMyProfile={false} />
        <ProductList isOwner={false} />
        <PostingGrid />
      </main>
      <Footer />
    </>
  );
}

export default YourProfile;
