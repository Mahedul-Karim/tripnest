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
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";
import { api } from "@/lib/utils";
import { useCtx } from "@/context/Context";
import LinearProgress from "../common/loader/LinearProgress";

const LoginForm = () => {
  const router = useRouter();

  const { setIsLoggedIn, setUser, setToken } = useCtx();

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
      if (err.code === "auth/wrong-password") {
        return toast.error("Invalid credential");
      }
      toast.error(err.message);
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    mutate({ email, password });
  }

  const { mutate: googleMutate, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      await setPersistence(auth, browserSessionPersistence);
      const { user } = await signInWithPopup(auth, googleProvider);

      const email = user?.providerData?.[0]?.email;
      const displayName = user.providerData[0].displayName;

      const firstName = displayName?.at(0);
      const lastName = displayName?.at(-1);

      const token = await user.getIdToken(true);

      const options = {
        method: "POST",
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await api({ endpoint: "google", options });

      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
      router.push("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const googleSignIn = () => {
    googleMutate();
  };

  return (
    <Card className="max-w-[380px] w-full shadow-none border-none gap-4">
      {isLoading && <LinearProgress />}
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
          onClick={googleSignIn}
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
