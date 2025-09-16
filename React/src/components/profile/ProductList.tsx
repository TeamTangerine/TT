import Product from './Product';
import { useState } from 'react';
import { productAPI } from '../../service/fetch/api';
import { userAPI } from '../../service/fetch/api';

function ProductList() {
  const [token, setToken] = useState('');
  const [accountName, setAccountName] = useState('');
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // 토큰 발급 함수 -> 추후 useContext로 수정 예정
  async function getTestToken() {
    const email = 'tt1team@example.com'; // 테스트 계정 이메일
    const password = 'test1team_'; // 테스트 계정 비밀번호
    try {
      const res = await userAPI.login(email, password);
      const token = res.token;
      const name = res.accountname;
      console.log(token);
      setToken(token);
      setAccountName(name);

      // productAPI.createProduct('서귀포 감귤 1KG', 50000, 'www.naver.com', '', token);
    } catch (e) {
      console.error('테스트 토큰 발급 실패:');
      return null;
    }
  }

  // 상품 목록 조회 함수
  async function getUserProducts() {
    setLoading(true);
    try {
      const productData = await productAPI.getUserProducts(accountName, token);
      console.log('상품 데이터 :', productData);
      setProducts(productData.product);
    } catch (error) {
      console.log('상품 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={getTestToken}>토큰 받기</button>
      <button onClick={getUserProducts}>get User Products</button>
      <section className={`w-full flex justify-center pl-4 py-5  bg-white ${products.length === 0 ? 'sr-only' : ''}`}>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">판매 중인 상품</h2>
          <ul className="flex gap-[10px] max-w-[374px] overflow-hidden">
            {loading ? (
              <li>로딩 중...</li>
            ) : (
              products.map((product: any) => (
                <Product
                  key={product.id}
                  itemImage={product.itemImage}
                  itemName={product.itemName}
                  price={product.price}
                  productLink={product.link}
                />
              ))
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default ProductList;
