import { useState, useEffect } from 'react';
import productImgSample from '../../assets/product-img-example.png';

/**
 * @param itemImgae - 상품 이미지, 없는 경우 샘플이미지
 * @param itemName - 상품 이름
 * @param price - 상품 가격
 */
type ProductProps = {
  itemImage: string;
  itemName: string;
  price: number;
  productLink: string;
};

function Product({ itemImage, itemName, price, productLink }: ProductProps) {
  const [itemImg, setItemImg] = useState('');

  const formattedPrice = price.toLocaleString();

  function handleLink() {
    window.open(
      'https://smartstore.naver.com/gyuldamwon/products/6474882238?nl-query=%EA%B0%90%EA%B7%A4&nl-ts-pid=jKDsylqo15wssKKQX8wsssssses-033364&NaPm=ct%3Dmfmflihk%7Cci%3Ddce6fb5f608e4e8ca7e1f7fd5a94aeed52e09bcf%7Ctr%3Dsls%7Csn%3D803618%7Chk%3D1e25d4272f785b2bd112b3ff0e4fc5e53aa0ebe5',
      '_blank'
    );
  }

  return (
    <li className="w-25 h-34 flex flex-col flex-shrink-0" onClick={handleLink}>
      <img src={itemImage} alt="샘플이미지" className="w-[140px] h-[90px] rounded-[8px] object-cover" />
      <h3 className="mt-[6px]">{itemName}</h3>
      <p className="mt-1 text-bold text-[12px] text-[#F26E22]">{formattedPrice}원</p>
    </li>
  );
}
export default Product;
