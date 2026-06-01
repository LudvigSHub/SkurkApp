import "./ProductGrid.css";
import ProductCard from "../cards/ProductCard";

function ProductGrid({ products }) {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} meal={product} />
      ))}
    </section>
  );
}
export default ProductGrid;