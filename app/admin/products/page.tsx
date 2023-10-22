import { ProductsTable } from "./_components/ProductsTable";
import { ProductForm } from "./_components/ProductForm";

export default function ProductsPage() {
  return (
    <>
      <h1 className="mb-8">Products</h1>
      <ProductForm />
      <ProductsTable />
    </>
  );
}
