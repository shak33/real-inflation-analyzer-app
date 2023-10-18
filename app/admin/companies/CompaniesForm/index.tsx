"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImageUpload } from '@/components/ImageUpload';

import { Company } from '@/interfaces/Company';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long'
  }).max(255, {
    message: 'Name must be at most 255 characters long'
  }),
  logo: z.string(),
})

export const CompaniesForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      logo: '',
    }
  });
  const mutation = useMutation((postData: Company) => {
    return axios.post('/api/admin/companies', postData).then((response) => {
      form.reset();
    });
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  }

  const formStructure = [
    {
      name: 'name',
      label: 'Name',
      type: 'input',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'file',
    },
  ]

  if (mutation.isLoading) {
    return <p>Performing request</p>
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
          {formStructure.map(({name, label, type}, index) => {
            return <FormField
              control={form.control}
              key={`${name}-${index}`}
              name={name as keyof Company}
              render={({ field }) => (
                <FormItem
                  className={type === 'file' ? 'hidden' : ''}
                >
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        })}
        <ImageUpload
          onChange={(value) => {
            form.setValue('logo', value);
          }}
          value={form.watch('logo')}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}