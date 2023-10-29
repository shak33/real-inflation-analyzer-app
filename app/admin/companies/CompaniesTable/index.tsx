"use client";

import { useCallback, useMemo } from "react";

import Image from "next/image";

import { CustomTable } from "@/components/Table";

import { useGetCompanies } from "@/hooks/companies/useGetCompanies";
import { useRemoveCompany } from "@/hooks/companies/useRemoveCompany";

import { CompaniesTableCompany } from "@/interfaces/CompaniesTableCompany";

export const CompaniesTable = () => {
  const companies = useGetCompanies();
  const removeCompany = useRemoveCompany();

  const onRemoveClick = useCallback((id: string) => {
    removeCompany.mutate(id);
  },[removeCompany]);

  const tableHead = ["Name", "Number of products", "Logo"];

  const tableBody = useMemo(() => {
    return (
      companies?.data?.map(
        ({ name, products, logo }: CompaniesTableCompany) => ({
          name,
          products,
          logo: (
            <Image
              alt={`Logo of ${name}`}
              src={logo || ""}
              width={150}
              height={50}
            />
          ),
        }),
      ) || []
    );
  }, [companies.data]);

  if (removeCompany.isLoading) {
    return <div>Removing company, please wait...</div>;
  }

  if (companies.isLoading) {
    return <div>Loading companies, please wait...</div>;
  }

  if (companies.isError) {
    return;
  }

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
      onRemoveClick={onRemoveClick}
    />
  );
};
