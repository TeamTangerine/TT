import Header from '../../components/Header';
function AddProduct() {
  return (
    <>
      <Header />
      <form action="submit">
        <label htmlFor="img">이미지 등록 </label>
        <input type="file" id="img" name="img" accept="image/*" />
        <label htmlFor="productName">상품명</label>
        <input type="text" id="productName" name="productName" />
        <label htmlFor="price">가격</label>
        <input type="number" id="productName" name="productName" />
        <label htmlFor="sellerLink">판매 링크</label>
        <input type="text" id="sellerLink" name="sellerLink" />
      </form>
    </>
  );
}

export default AddProduct;
