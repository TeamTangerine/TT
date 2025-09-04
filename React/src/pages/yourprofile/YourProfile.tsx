import UserInfo from './component/UserInfo';
import ProductList from './component/ProductList';
import PostingGrid from '../../components/PostingGrid';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';

function YourProfile() {
  return (
    <>
      <Header />
      <main className="pb-[60px] flex flex-col gap-[6px] bg-[#f2f2f2]">
        <UserInfo />
        <ProductList />
        <PostingGrid />
      </main>
      <Footer />
    </>
  );
}

export default YourProfile;
