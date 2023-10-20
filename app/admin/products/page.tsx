import { ProductsTable } from "./ProductsTable";
import { ProductForm } from "./ProductForm";

export default function ProductsPage() {
  return (
    <>
      <h1 className="mb-8">Products</h1>
      <ProductForm />
      <ProductsTable />
    </>
  );
}
