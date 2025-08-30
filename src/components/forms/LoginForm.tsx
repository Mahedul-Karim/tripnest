"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FloatingInput from "./inputs/FloatingInput";
import { useRouter } from "next/navigation";
import { loginSchema } from "./formSchemas";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@gmail.com(admin)/test2@gmail.com",
      password: "test1234",
    },
  });

  const {
    formState: { errors },
    getValues,
  } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    },
    onSuccess: () => {
      toast.success("Successfully logged in");
      router.push("/");
    },
    onError: (err: any) => {
      if (err.code ===  "auth/wrong-password") {
        return toast.error("Invalid credential");
      }
      toast.error(err.message);
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    mutate({ email, password });
  }

  return (
    <Card className="max-w-[380px] w-full shadow-none border-none gap-4">
      <CardHeader>
        <CardTitle className="text-2xl text-navy text-center font-semibold">
          Log In
        </CardTitle>
        <CardDescription className="text-center">
          We&apos;re glad to see you again!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Email Address"}
                      text={getValues("email")}
                      error={errors?.email?.message || ""}
                      disabled={isPending}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Password"}
                      text={getValues("password")}
                      error={errors?.password?.message || ""}
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-xl h-10"
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin" />} Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="block">
        <div className="grid grid-cols-[1fr_20px_1fr] mb-4 gap-4 place-items-center">
          <div className="border-t border-solid border-border w-full" />
          <p className="flex items-center justify-center uppercase text-xs text-muted">
            OR
          </p>
          <div className="border-t border-solid border-border w-full" />
        </div>
        <Button
          variant={"outline"}
          className="w-full hover:bg-transparent bg-transparent  text-muted hover:text-muted gap-2 rounded-xl border-border"
        >
          {" "}
          <Image
            src="/assets/google.svg"
            alt=""
            width={20}
            height={20}
            className="grayscale"
          />{" "}
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
