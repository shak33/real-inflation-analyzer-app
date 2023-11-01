import * as z from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters long'
  }).max(255, {
    message: 'Username must be at most 255 characters long',
  }),
  password: z.string(),
});

export const formStructure = [
  {
    name: "username",
    label: "Username",
    type: "input",
    description: "",
    placeholder: "John Doe"
  },
  {
    name: "email",
    label: "Email",
    type: "input",
    description: "",
    placeholder: "johndoe@gmail.com"
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    description: "",
  },
  {
    name: "repeatedPassword",
    label: "Repeat password",
    type: "password",
    description: "",
  },
];