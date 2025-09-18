import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import UserProfile from '../../components/UserProfile';
import useDebounce from '../../Utils/debouncer';
import { userAPI } from '../../service/fetch/api';
import { UserAPI } from '../../types/IFetchType';

function SearchPage() {
  //input에서 가져온 밸류
  const [inputValue, setInputValue] = useState('');
  //검색 결과
  const [searchResults, setSearchResults] = useState<UserAPI.ISearchUserResponse>([]);
  //에러 메세지
  const [error, setError] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  //디바운스
  const keyword = useDebounce(inputValue, 500);

  //서치 api호출
  async function searchUseData(searchKeyword: string) {
    try {
      const res = await userAPI.searchUser(searchKeyword);
      setSearchResults(res);
    } catch (error: any) {
      console.log(error);
      error && setError(error.message);
    }
  }

  //디바운스 값이 변경될때 api통신
  useEffect(() => {
    if (keyword.trim()) {
      searchUseData(keyword);
    }
  }, [keyword, error]);

  return (
    <>
      <Header navStyle="top-search" searchOnChange={handleOnChange} inputValue={inputValue} />
      <main className="flex justify-center">
        <div className="w-[390px] flex flex-col gap-4 mt-5 mx-4">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <UserProfile
                key={user._id}
                username={user.username}
                accountname={user.accountname}
                image={user.image}
                hover={true}
              />
            ))
          ) : inputValue.trim() ? (
            // 검색어는 있지만 결과가 없을 때
            <p className="text-center text-sm text-gray-500">{error}</p>
          ) : (
            // 초기 상태(검색어 입력 전)
            <p className="text-center text-sm text-gray-400">검색어를 입력해주세요.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
