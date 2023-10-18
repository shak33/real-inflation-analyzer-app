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
          <TableHead>Company</TableHead>
          <TableHead>Barcode</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Price with discount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.data.map(({id, shortName, name, company, barcode, date, priceHistory, priceWithDiscount}: ProductsTableProduct) => (
          <TableRow key={id}>
            <TableCell>{shortName}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{company?.name}</TableCell>
            <TableCell>{barcode}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{priceHistory.at(-1)?.price}</TableCell>
            <TableCell>{priceWithDiscount}</TableCell>
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