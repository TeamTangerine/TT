import Product from './Product';
import { useState } from 'react';
import { productAPI } from '../../service/fetch/api';

function ProductList() {
  const [token, setToken] = useState('');
  const [accountName, setAccountName] = useState('');
  const [products, setProducts] = useState<any>('');
  const [loading, setLoading] = useState(false);

  // 상품 목록 조회 함수
  async function getUserProducts() {
    setLoading(true);
    try {
      const productData = await productAPI.getUserProducts(accountName, token);
      console.log('상품 데이터');
      setProducts(productData.product);
    } catch (error) {
      console.log('상품 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full flex justify-center pl-4 py-5  bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">판매 중인 상품</h2>
        <ul className="flex gap-[10px] max-w-[374px] overflow-hidden">
          {loading ? (
            <li>로딩 중...</li>
          ) : (
            products.map((product: any) => {
              <Product itemImage={product.itemImage} itemName={product.itemName} price={product.price} />;
            })
          )}

          {/* <Product itemName="" price={50000} /> */}
        </ul>
      </div>
    </section>
  );
}

export default ProductList;
