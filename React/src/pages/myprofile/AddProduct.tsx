import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import uploadImg from '../../assets/icon/icon-upload.png';
import { imageAPI, postAPI, productAPI } from '../../service/fetch/api';
import { validateProductURL } from '../../Utils/validation';
import { useNavigate } from 'react-router-dom';
function AddProduct(isAddProduct:boolean=false productId: string) {
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
      //가격 콤마빼고 number로 변환
      const numberPrice = Number(String(price).replace(',', ''));
      //상품명 정규식
      const itemRegExp = /^[a-zA-Z가-힣]{2,15}$/;
      //이름 빈 값이면
      if (!itemName) {
        setIsItemError(true);
        return;
      }
      //이름이 정규식에 맞지 않으면
      if (!itemRegExp.test(itemName)) {
        setIsItemError(true);
        return;
      }
      //링크가 정규식에 맞지 않으면
      if (!validateProductURL(link)) {
        setIsLinkError(true);
        return;
      }
      //이미지 업로드해서 url저장
      const res = await imageAPI.uploadFile(image[0]);
      if (!res) {
        throw new Error('이미지 업로드에 실패하였습니다.');
      }
      const fileUrl = res.info.filename;
      //상품 추가시
      if (isAddProduct) {
        await productAPI.createProduct(itemName, numberPrice, link, fileUrl);
        alert('상품 게시 성공!');
        navigate('/my-profile');
      } else {
        //상품 수정이라면
        await productAPI.updateProduct(productId, itemName, numberPrice, link, fileUrl);
        navigate('/my-profile');
      }
    } catch (error) {
      console.error('에러 발생', error);
    }
  }

  //====상품 수정====

  const getProduct = async () => {
    try {
      if (!isAddProduct) {
        const res = await productAPI.getProduct('68ca0ebd9000a777b4e33263');
        setItemName(res.product.itemName);
        setPreviewUrls([imageAPI.getImage(res.product.itemImage)]);
        setPrice(res.product.price.toLocaleString());
        setLink(res.product.link);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //상품 수정으로 들어왔을때, 기존 상품 렌더링
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <form
        className="flex flex-col items-center gap-[30px]"
        onSubmit={(e) => {
          e.preventDefault();
          postProduct();
        }}
      >
        <Header navStyle="top-save" button={image.length === 1 && itemName && price && link ? true : false} />
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
            placeholderText="2~15자 이내여야 합니다"
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
            inputValue={Number(price).toLocaleString()}
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
