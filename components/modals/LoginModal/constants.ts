import * as z from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const formStructure = [
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    description: '',
    placeholder: '',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    description: '',
    placeholder: '',
  },
];