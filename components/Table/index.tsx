"use client";

import { ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomTableProps {
  tableHead: string[];
  tableBody: any[];
  onEditClick?: (id: string) => void;
  onRemoveClick?: (id: string) => void;
  searchQuery?: string;
  onSearchInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  loadingText: string;
}

export const CustomTable = ({
  tableHead,
  tableBody,
  onEditClick,
  onRemoveClick,
  searchQuery,
  onSearchInputChange,
  isLoading,
  loadingText,
} : CustomTableProps) => {
  const colSpanWidth = tableHead.length + (onEditClick || onRemoveClick ? 1 : 0);

  return (
    <>
      {onSearchInputChange ? (
        <div className="mb-4 flex justify-end w-full">
          {onSearchInputChange ? (
            <div className="mb-4">
              <Input
                placeholder="Search..."
                onChange={onSearchInputChange}
                className="min-w-[300px]"
                value={searchQuery}
              />
            </div>
          ) : null}
        </div>
      ) : null}
      {isLoading ? (
        <div>{loadingText}</div>
      ) : <Table>
        <TableHeader>
          <TableRow>
            {tableHead.map((column: string) => (
              <TableHead 
                key={column}
              >
                {column}
              </TableHead>
            ))}
            {onEditClick || onRemoveClick ? (
              <TableHead></TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableBody.length === 0 ? (
            <TableRow>
              <TableCell
                className="text-center"
                colSpan={colSpanWidth}
              >
                No data found
              </TableCell>
            </TableRow>
          ) : tableBody.map((row: any) =>
            <TableRow key={row.id}>
              {Object.entries(row).map(([key, value]) => key !== "id" ? (
                <TableCell key={`${row.id}-${key}`}>
                  {value as string}
                </TableCell>
              ) : null)}
              {onEditClick || onRemoveClick ?
                <TableCell>
                  <div className="flex justify-end">
                    {onEditClick ? (
                      <Button
                        className="mr-2"
                        onClick={() => onEditClick(row.id)}
                      >
                        Edit
                      </Button>
                    ) : null}
                    {onRemoveClick ? (
                      <Button
                        variant="destructive"
                        onClick={() => onRemoveClick(row.id)}
                      >
                        Remove
                      </Button>
                    ) : null}
                    </div>
                </TableCell>
              : null}
            </TableRow>
          )}
        </TableBody>
      </Table>}
    </>
  )
}