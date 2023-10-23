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
              <div className="flex justify-end">
                <TableCell>
                  {onEditClick ?
                    <Button
                      className="mr-2"
                      onClick={() => onEditClick(row.id)}
                    >
                      Edit
                    </Button>
                  : null}
                  {onRemoveClick ?
                    <Button
                      variant="destructive"
                      onClick={() => onRemoveClick(row.id)}
                    >
                      Remove
                    </Button>
                  : null}
                </TableCell>
              </div>
            : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}