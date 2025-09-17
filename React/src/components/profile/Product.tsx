import { useState, useEffect } from 'react';
import productImgSample from '../../assets/product-img-example.png';
import Modal from '../modal/Modal';

/**
 * @param itemImgae - 상품 이미지, 없는 경우 샘플이미지
 * @param itemName - 상품 이름
 * @param price - 상품 가격
 * @param productLink - 상품 판매 페이지 링크
 * @param isOwner - myProfile 페이지 여부
 * - true: myProfile 페이지
 * - false: yourProfile 페이지
 * @param setShowModal - myProfile 페이지인 경우, 상위 컴포넌트의 showModal 상태 관리
 */
type ProductProps = {
  itemImage: string;
  itemName: string;
  price: number;
  productLink: string;
  isOwner: boolean;
  setShowModal: (isTrue: boolean) => void;
};

function Product({ itemImage, itemName, price, productLink, isOwner, setShowModal }: ProductProps) {
  // 이미지 랜더링을 위한 기본 url
  const imgUrl = 'https://dev.wenivops.co.kr/services/mandarin/';

  // 가격을 원화 포맷에 맞혀 사용
  const formattedPrice = price.toLocaleString();

  // handleLink 함수를 통해 myProfile인지 yourProfile인지 구별
  function handleLink() {
    if (isOwner === true) {
      console.log('hello');
      setShowModal(true);
    }

    if (isOwner === false) {
      window.open(`${productLink}`, '_blank');
    }
  }

  return (
    <>
      <li className="w-25 h-34 flex flex-col flex-shrink-0" onClick={() => handleLink()}>
        <img src={imgUrl + itemImage} alt="샘플이미지" className="w-[140px] h-[90px] rounded-[8px] object-cover" />
        <h3 className="mt-[6px]">{itemName}</h3>
        <p className="mt-1 text-bold text-[12px] text-[#F26E22]">{formattedPrice}원</p>
      </li>
    </>
  );
}
export default Product;
