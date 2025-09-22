import { useState, useEffect } from 'react';
import productImgSample from '../../assets/product-img-example.png';
import Modal from '../modal/Modal';
import { imageAPI } from '../../service/fetch/api';

/**
 * @param itemImgae - 상품 이미지
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
  const productSample = productImgSample;

  // 가격을 원화 포맷에 맞혀 사용
  const formattedPrice = price.toLocaleString();

  // handleLink 함수를 통해 myProfile인지 yourProfile인지 구별
  function handleLink() {
    if (isOwner === true) {
      setShowModal(true);
    }

    if (isOwner === false) {
      window.open(`${productLink}`, '_blank');
    }
  }

  return (
    <>
      <li className="w-[140px] h-[132px] flex flex-col flex-shrink-0 cursor-pointer" onClick={() => handleLink()}>
        <img
          src={itemImage ? imageAPI.getImage(itemImage) : productSample}
          alt="샘플이미지"
          className="w-[140px] h-[90px] rounded-[8px] object-cover"
        />
        <h3 className="h-[18px] px-[2px] mt-[6px] text-[14px]">{itemName}</h3>
        <p className="h-[14px] px-[2px] mt-1 text-bold text-[12px] text-[#F26E22]">{formattedPrice}원</p>
      </li>
    </>
  );
}
export default Product;
