import { useState } from 'react';
import productImgSample from '../../../assets/product-img-example.png';

function Product() {
  const [itemImg, setItemImg] = useState(productImgSample);
  return (
    <li className="w-25 h-34 flex flex-col flex-shrink-0">
      <img src={itemImg} alt="샘플이미지" className="rounded-[8px]" />
      <h3 className="mt-[6px]">애월읍 노지 감귤</h3>
      <p className="mt-1 text-bold text-[12px] text-[#F26E22]">35,000원</p>
    </li>
  );
}
export default Product;
