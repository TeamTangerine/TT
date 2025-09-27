import Product from './Product';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../../service/fetch/api';
import { userAPI } from '../../service/fetch/api';
import Toast from '../modal/Toast';
import { ProductAPI } from '../../types/IFetchType';

/**
 * @param isMyProfile -페이지별 버튼 동적할당을 위한 타입
 * - MyProfile 페이지인 경우 true
 * - YourProfile 페이지인 경우 false
 */
type ProductListProps = {
  isMyProfile: boolean;
  userAccount?: string;
};

function ProductList({ isMyProfile, userAccount }: ProductListProps) {
  const [products, setProducts] = useState<ProductAPI.IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedLink, setSelectedLink] = useState('');

  // 상품 목록 조회 함수(getUserProducts API를 통해 상품 목록 조회)
  async function getUserProducts() {
    setLoading(true);

    // 마이프로필 페이지인 경우
    if (isMyProfile) {
      try {
        const myData = await userAPI.getMyInfo();
        const productData = await productAPI.getUserProducts(myData.user.accountname);
        setProducts(productData.product);
      } catch (error: any) {
        console.error('상품 목록 조회 실패:', error.message);
      } finally {
        setLoading(false);
        return;
      }
    }

    // 유어프로필 페이지인 경우
    if (!isMyProfile && userAccount) {
      try {
        const productData = await productAPI.getUserProducts(userAccount);
        setProducts(productData.product);
      } catch (error: any) {
        console.error('상품 목록 조회 실패:', error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function openModal(itemid: string, itemLink: string) {
    setSelectedItem(itemid);
    setSelectedLink(itemLink);
    setShowModal(true);
  }

  useEffect(() => {
    getUserProducts();
  }, []);

  return (
    <>
      <section
        className={`flex gap-4 justify-center w-full h-[208px] pl-4 py-5 bg-white ${products.length === 0 ? 'hidden' : ''}`}
      >
        <div className="flex flex-col w-[390px] md:w-[648px] gap-4">
          <h2 className="font-bold h-[20px]">판매 중인 상품</h2>
          <ul className="flex gap-[10px] overflow-hidden overflow-x-auto scrollbar-hide">
            {products.map((product) => (
              <li key={product.id}>
                <Product
                  itemImage={product.itemImage}
                  itemName={product.itemName}
                  price={product.price}
                  productLink={product.link}
                  isMyProfile={isMyProfile}
                  click={() => openModal(product.id, product.link)}
                />
              </li>
            ))}
          </ul>
          {loading && <p>로딩 중...</p>}
        </div>
      </section>
      {showModal && isMyProfile && (
        <Toast
          toastStyle="myProfile-product"
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          productId={selectedItem}
          productLink={selectedLink}
        />
      )}
    </>
  );
}

export default ProductList;
