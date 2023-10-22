"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
  const queryClient = useQueryClient();
  const products = useProducts({});
  const router = useRouter();

  const removeMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onEditClick = (id: string) => {
    router.push(`/admin/products/${id}`);
  }

  const onRemoveClick = (id: string) => {
    removeMutation.mutate(id);
  };
  
  if (products.isLoading) {
    return <div>Loading</div>
  }

  if (removeMutation.isLoading) {
    return <div>Performing request. Please wait...</div>;
  }

  return (
    <Table
      data-testid="products-table"
    >
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
            <TableCell>{priceHistory.at(-1)?.price} PLN</TableCell>
            <TableCell>{priceWithDiscount}</TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Button
                  className="mr-2"
                  onClick={() => onEditClick(id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onRemoveClick(id)}
                >
                  Remove
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 