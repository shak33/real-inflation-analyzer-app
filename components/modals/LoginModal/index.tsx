'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { Button } from "@/components/ui/button";
import Modal from "@/components/modals/Modal";
import Heading from "@/components/Heading";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRegisterModal } from '@/hooks/useRegisterModal';
import { useLoginModal } from '@/hooks/useLoginModal';

import { formSchema, formStructure } from './constants';

export const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit  = (data: z.infer<typeof formSchema>) => {
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
        loginModal.closeModal();
      }
    })
  };

  const toggleLoginModal = () => {
    loginModal.closeModal();
    registerModal.openModal();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
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
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit">Continue</Button>
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
            First time using Airbnb?
          </div>
          <div
            className="text-netural-800 cursor-pointer hover:underline"
            onClick={toggleLoginModal}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.closeModal}
      body={bodyContent}
      footer={footerContent}
    />
  )
}