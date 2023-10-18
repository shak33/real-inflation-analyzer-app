import * as locales from 'react-date-range/dist/locale';
import { Calendar } from 'react-date-range';

import { Company } from '@prisma/client';

import { useCompanies } from '@/hooks/useCompanies';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const RenderProperInput: React.FC<{type: string, field: any}> = ({type, field}) => {
  const companies = useCompanies();

  if (type === 'switch') {
    return <Switch
      className="mt-0"
      checked={field.value}
      onChange={field.onChange}
    />
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