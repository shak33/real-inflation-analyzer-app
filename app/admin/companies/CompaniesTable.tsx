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

import { CompaniesTableCompany } from "@/interfaces/CompaniesTableCompany4";

export const CompaniesTable = () => {
  const companies = useCompanies();

  if (companies.isLoading) {
    return <div>Loading</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.data.map(({id, name, logo}: CompaniesTableCompany) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <Image
                alt={`Logo of ${name}`}
                src={logo}
              />
            </TableCell>
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