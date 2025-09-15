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
};

function Product({ itemImage = productImgSample, itemName, price }: ProductProps) {
  const [itemImg, setItemImg] = useState('');

  const formattedPrice = price.toLocaleString('ko-KR');

  useEffect(() => {
    setItemImg(itemImage);
  }, [itemImg]);
  return (
    <li className="w-25 h-34 flex flex-col flex-shrink-0">
      <img src={itemImg} alt="샘플이미지" className="rounded-[8px]" />
      <h3 className="mt-[6px]">{itemName}</h3>
      <p className="mt-1 text-bold text-[12px] text-[#F26E22]">{formattedPrice}원</p>
    </li>
  );
}
export default Product;
