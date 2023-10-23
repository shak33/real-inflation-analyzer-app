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
          {onEditClick || onRemoveClick ? (
            <TableHead></TableHead>
          ) : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableBody.map((row: any) => (
          <TableRow key={row.id}>
            {Object.entries(row).map(([key, value]) => (
              <TableCell key={`${row.id}-${key}`}>
                {value as string}
              </TableCell>
            ))}
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
        ))}
      </TableBody>
    </Table>
  )
}