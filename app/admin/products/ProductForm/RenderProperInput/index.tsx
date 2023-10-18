import * as locales from 'react-date-range/dist/locale';
import { Calendar } from 'react-date-range';

import { Company } from '@prisma/client';

import { useCompanies } from '@/hooks/useCompanies';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RenderProperInputProps {
  type: string;
  field: any;
}

export const RenderProperInput: React.FC<RenderProperInputProps> = ({
  type, field
}) => {
  const companies = useCompanies();

  if (type === 'switch') {
    return <div className="flex items-center space-x-2">
      <Switch
        id="price-with-discount"
        className="mt-0"
        checked={field.value}
        onChange={field.onChange}
      />
      <Label htmlFor="price-with-discount"></Label>
    </div>
  } else if (type === 'calendar') {
     return <Calendar
      date={field.value}
      onChange={field.onChange}
      locale={locales['pl']}
    />
  } else if (type === 'select') {
    return <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {companies?.data?.map(({id, name}: Company) => (
          <SelectItem
            key={`company-${id}`}
            value={id}
          >
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  } else {
    return <Input placeholder="" {...field} />
  }
}