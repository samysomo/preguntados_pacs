'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import CustomInput from './CustomInput';
import { useRouter } from 'next/navigation';
import { authFormSchema } from '@/lib/utils';
import { apiClient } from '@/lib/api-client';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/constants';
import { useAppStore } from '@/store';
import { Loader2 } from 'lucide-react';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const {userInfo, setUserInfo } = useAppStore();
  if(userInfo) router.push("/");
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === 'sign-up') {
        const { email, password, username } = data;
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password, username },
          { withCredentials: true }
        );
        setUserInfo(response.data.user);
        console.log(response);
        router.push('/');
      }

      if (type === 'sign-in') {
        const { email, password } = data;
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        console.log(response);
        setUserInfo(response.data.user);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto mt-16 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
      <header className="flex flex-col gap-5">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <h1 className="text-4xl font-bold tracking-wide text-[#ff77e9]">
            Preguntados - PACS
          </h1>
        </Link>

        <div className="flex flex-col mb-3">
          <h1 className="text-2xl font-semibold text-white">
            {type === 'sign-in' ? 'Welcome back!' : 'Create an account'}
          </h1>
          <p className="text-lg text-[#c8a2ff]">
            Please enter your details
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {type === 'sign-up' && (
            <CustomInput
              control={form.control}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
          )}

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            className="w-full bg-[#ff77e9] hover:bg-[#fc466b] text-lg"
          >
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>

      <footer className="flex justify-center gap-1 mt-6 text-[#c8a2ff]">
        <p>
          {type === 'sign-in'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </p>
        <Link
          href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
          className="text-[#ff77e9] hover:underline"
        >
          {type === 'sign-in' ? 'Sign up' : 'Sign in'}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
