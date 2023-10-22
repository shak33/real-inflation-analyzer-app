"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useCompanies } from "@/hooks/useCompanies";

import { CompaniesTableCompany } from "@/interfaces/CompaniesTableCompany";

export const CompaniesTable = () => {
  const queryClient = useQueryClient();
  const companies = useCompanies();

  const removeMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/admin/companies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });

  const onRemoveClick = (id: string) => {
    removeMutation.mutate(id);
  }

  if (companies.isLoading) {
    return <div>Loading</div>
  }

  if (removeMutation.isLoading) {
    return <div>Performing request. Please wait...</div>;
  }

  return (
    <Table
      data-testid="companies-table"
    >
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Number of products</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.data.map(({id, name, products, logo}: CompaniesTableCompany) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{products}</TableCell>
            <TableCell>
              <Image
                alt={`Logo of ${name}`}
                src={logo || ''}
                width={150}
                height={50}
              />
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Button
                  className="mr-2"
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