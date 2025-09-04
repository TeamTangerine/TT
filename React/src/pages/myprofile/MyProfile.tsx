import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserInfo from '../yourprofile/component/UserInfo';
import ProductList from '../yourprofile/component/ProductList';
import PostingGrid from '../../components/PostingGrid';

function MyProfile() {
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
export default MyProfile;
