"use client";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import * as locales from 'react-date-range/dist/locale';
import { Calendar } from 'react-date-range';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Product } from '@/interfaces/Product';

const formSchema = z.object({
  shortName: z.string().min(3, {
    message: 'Name must be at least 3 characters long'
  }).max(255, {
    message: 'Name must be at most 255 characters long'
  }),
  name: z.string(),
  price: z.number().min(0, {
    message: 'Price must be at least 0'
  }),
  priceWithDiscount: z.boolean().default(false),
  barcode: z.string(),
  date: z.date(),
});

export const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      shortName: '',
      price: 0,
      priceWithDiscount: false,
      barcode: '',
      date: new Date(),
    }
  });
  const mutation = useMutation((postData: Product) => {
    return axios.post('/api/admin/products', postData);
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  }

  const formStructure = [
    {
      name: 'shortName',
      label: 'Short name',
      type: 'input',
      description: '',
    },
    {
      name: 'name',
      label: 'Name',
      type: 'input',
      description: '',
    },
    {
      name: 'barcode',
      label: 'Barcode',
      type: 'input',
      description: '',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'input',
      description: '',
    },
    {
      name: 'priceWithDiscount',
      label: 'Price with discount',
      type: 'switch',
      description: '',
    },
    {
      name: 'date',
      label: 'Date',
      type: 'calendar',
      description: 'Choose date when product was purchased',
    }
  ];

  if (mutation.isSuccess) {
    form.reset();
  }

  if (mutation.isLoading) {
    return <div>Performing request</div>
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {formStructure.map(({name, label, type, description}, index) => {
          if (type === 'switch') {
            return <FormField
              control={form.control}
              key={`${name}-${index}`}
              name={name as keyof Product}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Switch
                      className="mt-0"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          }

          if (type === 'calendar') {
            return <FormField
            control={form.control}
            key={`${name}-${index}`}
            name={name as keyof Product}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Calendar
                    date={field.value}
                    onChange={field.onChange}
                    locale={locales['pl']}
                  />
                </FormControl>
                <FormDescription>
                  {description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          }

          return <FormField
            control={form.control}
            key={`${name}-${index}`}
            name={name as keyof Product}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  {description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
} 