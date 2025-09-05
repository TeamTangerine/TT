import Product from './Product';

function ProductList() {
  return (
    <section className="w-full flex justify-center pl-5 py-4  bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">판매 중인 상품</h2>
        <ul className="flex gap-[10px] max-w-[384px] overflow-hidden">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </ul>
      </div>
    </section>
  );
}

export default ProductList;
