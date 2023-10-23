"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { CustomTable } from "@/components/Table"

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

  if (companies.isLoading) {
    return <div>Loading</div>
  }

  if (removeMutation.isLoading) {
    return <div>Removing company. Please wait...</div>;
  }

  const onRemoveClick = (id: string) => {
    removeMutation.mutate(id);
  }

  const tableHead = [
    "Name",
    "Number of products",
    "Logo",
  ];

  const tableBody = companies.data.map(({id, name, products, logo}: CompaniesTableCompany) => ({
    name,
    products,
    logo: (
      <Image
        alt={`Logo of ${name}`}
        src={logo || ''}
        width={150}
        height={50}
      />
    ),
  }));

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
      onRemoveClick={onRemoveClick}
    />
  )
} 