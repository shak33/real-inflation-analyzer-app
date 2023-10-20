import * as z from 'zod';

export const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long'
  }).max(255, {
    message: 'Name must be at most 255 characters long'
  }),
  logo: z.string(),
});

export const formStructure = [
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
];