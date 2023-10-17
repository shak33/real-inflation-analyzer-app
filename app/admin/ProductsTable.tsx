import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useProducts } from "@/hooks/useProducts";

import { ProductsTableProduct } from "@/interfaces/ProductsTableProduct";

export const ProductsTable = () => {
  const products = useProducts();
  
  if (products.isLoading) {
    return <div>Loading</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Short name</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Barcode</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Price with discount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.data.map((product: ProductsTableProduct) => (
          <TableRow key={product.id}>
            <TableCell>{product.shortName}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.barcode}</TableCell>
            <TableCell>{product.priceHistory.at(-1)?.price}</TableCell>
            <TableCell>{product.priceWithDiscount}</TableCell>
            <TableCell className="flex justify-around">
              <Button>
                Edit
              </Button>
              <Button variant="destructive">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 