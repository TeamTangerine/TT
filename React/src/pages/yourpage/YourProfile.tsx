import UserInfo from './component/UserInfo';
import ProductList from './component/ProductList';
import PostingGrid from '../../components/PostingGrid';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function YourPage() {
  return (
    <>
      <Header />
      <UserInfo />
      <ProductList />
      <PostingGrid />
      <Footer />
    </>
  );
}

export default YourPage;
