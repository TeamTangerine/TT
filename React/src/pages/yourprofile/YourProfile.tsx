import UserInfo from '../../components/profile/UserInfo';
import ProductList from '../../components/profile/ProductList';
import PostingGrid from '../../components/PostingGrid';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';

function YourProfile() {
  const { accountname } = useParams<string>();
  return (
    <>
      <Header navStyle="top-basic" />
      <main className="pb-[60px] flex flex-col gap-[6px] bg-[#f2f2f2]">
        <UserInfo isMyProfile={false} userAccountName={accountname} />
        <ProductList isMyProfile={false} userAccount={accountname} />
        <PostingGrid isMyProfile={false} userAccount={accountname} />
      </main>
      <Footer />
    </>
  );
}

export default YourProfile;
