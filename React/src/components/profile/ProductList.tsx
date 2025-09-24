import Product from './Product';
import { useState, useEffect } from 'react';
import { productAPI } from '../../service/fetch/api';
import { userAPI } from '../../service/fetch/api';
import Modal from '../modal/Toast';
import { ProductAPI } from '../../types/IFetchType';

// onEditProduct
type ProductListProps = {
  isOwner: boolean;
};

function ProductList({ isOwner }: ProductListProps) {
  const [accountName, setAccountName] = useState('');
  const [products, setProducts] = useState<ProductAPI.IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 로그인한 유저 accout를 받는 함수
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
    } catch (error) {
      console.log('상품 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getUserProducts();
  }, [accountName]);

  return (
    <>
      <section
        className={`flex gap-4 justify-center w-full h-[208px] pl-4 py-5 bg-white ${products.length === 0 ? 'hidden' : ''}`}
      >
        <div className="flex flex-col w-[390px] md:w-[648px] gap-4">
          <h2 className="font-bold h-[20px]">판매 중인 상품</h2>
          <ul className="flex gap-[10px] overflow-hidden overflow-x-auto scrollbar-width: none">
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
        </div>
      </section>
      {showModal && <Modal showModal={showModal} closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default ProductList;
