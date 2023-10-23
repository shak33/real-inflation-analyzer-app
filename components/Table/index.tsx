import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface CustomTableProps {
  tableHead: string[];
  tableBody: any[];
  onEditClick?: (id: string) => void;
  onRemoveClick?: (id: string) => void;
}

export const CustomTable = ({
  tableHead,
  tableBody,
  onEditClick,
  onRemoveClick,
} : CustomTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHead.map((column: string) => (
            <TableHead 
              key={column}
            >
              {column}
            </TableHead>
          ))}
          {onEditClick || onRemoveClick ?
            <TableHead></TableHead>
          : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableBody.map((row: any) => (
          <TableRow key={row.id}>
            {row.map((value: any) => (
              <TableCell key={value}>
                {value}
              </TableCell>
            ))}
            {onEditClick || onRemoveClick ?
              <TableCell>
                {onEditClick ?
                  <Button
                    onClick={() => onEditClick(row.id)}
                  >
                    Edit
                  </Button>
                : null}
                {onRemoveClick ?
                  <Button
                    onClick={() => onRemoveClick(row.id)}
                  >
                    Remove
                  </Button>
                : null}
              </TableCell>
            : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}