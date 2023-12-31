"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from 'next-auth/react';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { Button } from "@/components/ui/button";
import Modal from "@/components/modals/Modal";
import Heading from "@/components/Heading";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterUser } from "@/hooks/users/useRegisterUser";

import { formSchema, formStructure } from './constants';

export const RegisterModal = () => {
  const registerUser = useRegisterUser();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (postData: z.infer<typeof formSchema>) => {
    registerUser.mutate({
      postData,
      toggleRegisterModal,
    });
  };

  const toggleRegisterModal = () => {
    registerModal.closeModal();
    loginModal.openModal();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Real Inflation Checker"
        subtitle="Create an account!"
      />
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {formStructure.map(({ name, label, type, description }, index) => {
            return (
              <FormField
                control={form.control}
                key={`${name}-${index}`}
                name={name as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        type={type}
                      />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit">Create an account!</Button>
        </form>
      </Form>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        onClick={() => signIn('google')}
      >
        <FcGoogle size={24} className="mr-3" />  Continue with Google
      </Button>
      <Button
        onClick={() => signIn('github')}
      >
        <AiFillGithub size={24} className="mr-3" /> Continue with Github
      </Button>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div
            className="text-netural-800 cursor-pointer hover:underline"
            onClick={toggleRegisterModal}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={false}
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.closeModal}
      body={bodyContent}
      footer={footerContent}
    />
  )
}