import Product from './Product';
import { useState, useEffect } from 'react';
import { productAPI } from '../../service/fetch/api';
import { userAPI } from '../../service/fetch/api';
import Modal from '../modal/Modal';
import { ProductAPI } from '../../types/IFetchType';

// onEditProduct
type ProductListProps = {
  isOwner: boolean;
};

function ProductList({ isOwner }: ProductListProps) {
  const [token, setToken] = useState('');
  const [accountName, setAccountName] = useState('');
  const [products, setProducts] = useState<ProductAPI.IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 로그인한 유저 accout를 받는 함수, setAccountName을 통해 상태 설정
  async function getUserInfo() {
    const res = await userAPI.getMyInfo();
    setAccountName(res.user.accountname);
  }

  // 상품 목록 조회 함수(getUserProducts API를 통해 상품 목록 조회)
  async function getUserProducts() {
    setLoading(true);
    try {
      const productData = await productAPI.getUserProducts(accountName);
      // product에 productData.product데이터 저장
      setProducts(productData.product);
      console.log(productData.product);
    } catch (error) {
      console.log('상품 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
    getUserProducts();
  }, []);

  return (
    <>
      <section
        className={`flex flex-col gap-4 justify-center w-full h-[208px] pl-4 py-5 bg-white ${products.length === 0 ? 'hidden' : ''}`}
      >
        <h2 className="font-bold h-[20px]">판매 중인 상품</h2>
        <ul className="flex gap-[10px] overflow-hidden overflow-x-auto">
          {loading ? (
            <li>로딩 중...</li>
          ) : (
            products.map((product) => (
              <Product
                key={product.id}
                itemImage={product.itemImage}
                itemName={product.itemName}
                price={product.price}
                productLink={product.link}
                isOwner={isOwner}
                setShowModal={setShowModal}
              />
            ))
          )}
        </ul>
      </section>
      {showModal && <Modal showModal={showModal} closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default ProductList;
