import React, { useState } from 'react';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import uploadImg from '../../assets/icon/icon-upload.png';
import { imageAPI, postAPI, productAPI } from '../../service/fetch/api';
import { validateProductURL } from '../../Utils/validation';
import { useNavigate } from 'react-router-dom';
function AddProduct() {
  // 라우팅
  const navigate = useNavigate();
  //인풋에 담기는 이미지 파일
  const [image, setImage] = useState<File[]>([]);
  //이미지 미리보기 URL
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  //상품이름
  const [itemName, setItemName] = useState('');
  //상품이름 에러 메세지
  const [isItemError, setIsItemError] = useState(false);
  //가격
  const [price, setPrice] = useState('');
  //가격 에러 메세지
  const [isPriceError, setPriceError] = useState(false);
  //상품Url
  const [link, setLink] = useState<string>('');
  //상품URL 에러 메세지
  const [isLinkError, setIsLinkError] = useState(false);

  //이미지 파일 관리 함수(인풋)
  //아쉽게도 하나여도 FileList여서 배열로 해야함..
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const files: File[] = Array.from(e.target.files);
        setImage(files);
        const readFileAsDataURL = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        const urls = await Promise.all(files.map(readFileAsDataURL));
        setPreviewUrls(urls);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //상품명 관리
  const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsItemError(false);
    setItemName(e.target.value);
  };
  //가격 관리
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    //toLocaleString때문에 숫자에 콤마가 찍힐때를 정규식으로 방지
    const number = e.target.value.replace(/[^0-9]/g, '');
    setPrice(number);
  };
  //상품url관리
  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLinkError(false);
    setLink(e.target.value);
  };

  // 상품을 업로드 하는 함수
  async function postProduct() {
    try {
      const res = await imageAPI.uploadFile(image[0]);
      if (!res) {
        throw new Error('이미지 업로드에 실패하였습니다.');
      }
      const fileUrl = res.info.filename;
      const numberPrice = Number(String(price).replace(',', ''));
      const itemRegExp = /^[a-zA-Z가-힣]{2,5}$/;
      if (!itemName) {
        setIsItemError(true);
        return;
      }
      if (!itemRegExp.test(itemName)) {
        setIsItemError(true);
        return;
      }
      if (!price) {
        setPriceError(true);
        return;
      }
      if (!validateProductURL(link)) {
        setIsLinkError(true);
        return;
      }
      await productAPI.createProduct(itemName, numberPrice, link, fileUrl);
      alert('상품 게시 성공!');
      navigate('/my-profile');
    } catch (error) {
      console.error('에러 발생', error);
    }
  }

  return (
    <>
      <form
        className="flex flex-col items-center gap-[30px]"
        onSubmit={(e) => {
          e.preventDefault();
          postProduct();
        }}
      >
        <Header navStyle="top-save" button={image && itemName && price && link ? true : false} />
        <div className="flex flex-col gap-[18px]">
          <label htmlFor="img" className="cursor-pointer">
            이미지 등록
            <img
              src={previewUrls[0]}
              alt=""
              className="w-[322px] h-[204px] rounded-[10px] relative bg-[#DBDBDB] object-cover "
            />
            <img src={uploadImg} alt="" className="absolute bottom-3 right-3" />
            <input onChange={handleFileChange} type="file" id="img" name="img" accept="image/*" className="hidden" />
          </label>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <TextInput
            inputId="product-name"
            labelText="product-name"
            inputType="text"
            placeholderText="2~5자 이내여야 합니다"
            errorMessage="2~5자 이내로 작성해 주세요."
            showErrorMessage={isItemError}
            inputValue={itemName}
            onChange={handleProductName}
          />
          <TextInput
            inputId="product-price"
            labelText="product-price"
            inputType="text"
            placeholderText="숫자만 입력 가능합니다."
            errorMessage="숫자만 입력해주세요!"
            inputValue={Number(price).toLocaleString()}
            showErrorMessage={isPriceError}
            onChange={handlePrice}
          />
          <TextInput
            inputId="product-link"
            labelText="product-link"
            inputType="text"
            placeholderText="URL을 입력해 주세요."
            errorMessage="URL만 입력 가능합니다!"
            inputValue={link}
            showErrorMessage={isLinkError}
            onChange={handleLink}
          />
        </div>
      </form>
    </>
  );
}

export default AddProduct;
