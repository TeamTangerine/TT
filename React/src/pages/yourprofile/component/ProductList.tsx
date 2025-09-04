import Product from './Product';

function ProductList() {
  return (
    <section className="w-full pl-5 py-4 flex flex-col gap-4 bg-white">
      <h2>판매 중인 상품</h2>
      <ul className="flex gap-[10px] overflow-hidden">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </ul>
    </section>
  );
}

export default ProductList;
