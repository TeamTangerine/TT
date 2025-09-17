import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import UserProfile from '../../components/UserProfile';

function SearchPage() {
  return (
    <>
      <Header navStyle="top-search" />
      <ul className="flex flex-col gap-4 mt-5 mx-4">
        <UserProfile username="애월읍 위니브 감귤농장" accountname="@ weniv_Mandarin" />
        <UserProfile username="애월읍 한라봉 최고 맛집" accountname="@ hanlabong" />
        <UserProfile username="감귤의 품격 - 애월읍" accountname="@ mandarin_king" />
      </ul>
      <Footer />
    </>
  );
}

export default SearchPage;
