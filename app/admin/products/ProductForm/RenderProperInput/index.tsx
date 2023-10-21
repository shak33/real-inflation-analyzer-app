import * as locales from "react-date-range/dist/locale";
import { Calendar } from "react-date-range";

import { Company } from "@prisma/client";

import { useCompanies } from "@/hooks/useCompanies";
import { useReceiptFromDate } from "@/hooks/useReceiptByDate";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RenderProperInputProps {
  field: any;
  form: any;
  name: string;
  type: string;
}

export const RenderProperInput: React.FC<RenderProperInputProps> = ({
  field,
  form,
  name,
  type,
}) => {
  const companies = useCompanies();
  const { updatedReceipts } = useReceiptFromDate();

  const onDateChange = (field: any, date: Date) => {
    field.onChange(date);
    updatedReceipts(date);
  };

  if (type === "switch") {
    return (
      <div className="flex items-center space-x-2">
        <Switch
          id="price-with-discount"
          className="mt-0"
          checked={field.value}
          onCheckedChange={field.onChange}
        />
        <Label htmlFor="price-with-discount"></Label>
      </div>
    );
  } else if (type === "calendar") {
    return (
      <Calendar
        date={field.value}
        onChange={(date) => onDateChange(field, date)}
        locale={locales["pl"]}
      />
    );
  } else if (type === "select") {
    return (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {companies?.data?.map(({ id, name }: Company) => (
            <SelectItem key={`company-${id}`} value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  } else if (type === "number") {
    return (
      <Input
        placeholder=""
        {...field}
        {...form.register(name, { valueAsNumber: true })}
      />
    );
  } else {
    return <Input placeholder="" {...field} />;
  }
};
