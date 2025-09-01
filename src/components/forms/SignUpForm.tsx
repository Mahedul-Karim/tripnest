"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { signUpSchema } from "./formSchemas";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { api } from "@/lib/utils";
import Link from "next/link";
import { register } from "@/lib/actions/user";

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { errors },
    getValues,
    reset,
  } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
      firstName,
      lastName,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      await createUserWithEmailAndPassword(auth, email, password);

      const data = await register({
        firstName,
        lastName,
        email,
      });

      if (!data?.success) {
        throw new Error(data?.error);
      }
    },
    onSuccess: () => {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Account created successfully");
      router.push("/");
    },
    onError: (err: any) => {
      if (err.code === "auth/email-already-in-use") {
        return toast.error("Email already exists");
      }
      toast.error(err.message);
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { firstName, lastName, email, password } = values;
    mutate({ email, password, firstName, lastName });
  }

  return (
    <Card className="max-w-[380px] w-full shadow-none border-none gap-3">
      <CardHeader className="mb-2">
        <CardTitle className="text-2xl text-navy text-center font-semibold">
          Register
        </CardTitle>
        <CardDescription className="text-center">
          Let&apos;s create your account!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      labelBg="bg-white"
                      label={"First Name"}
                      text={getValues("firstName")}
                      error={errors?.firstName?.message || ""}
                      disabled={isPending}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Last Name"}
                      text={getValues("lastName")}
                      error={errors?.lastName?.message || ""}
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Email"}
                      text={getValues("email")}
                      error={errors?.email?.message || ""}
                      type="email"
                      disabled={isPending}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Confirm Password"}
                      text={getValues("confirmPassword")}
                      error={errors?.confirmPassword?.message || ""}
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
          <p className="text-muted text-sm mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login!
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
