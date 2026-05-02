"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import FloatingInput from "@/components/forms/inputs/FloatingInput";
import FloatingTextarea from "@/components/forms/inputs/FloatingTextarea";
import VendorButton from "../VendorButton";
import { useCtx } from "@/context/Context";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateUserDetails } from "@/lib/actions/user";

interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
}

const InfoForm = () => {
  const { user, setUser } = useCtx();

  const form = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.bio || "",
    },
  });

  const {
    formState: { isDirty },
    getValues,
  } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ values }: { values: UserInfo }) => {
      const data = await updateUserDetails(values);

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      setUser(data.user as any);
      toast.success("Profile updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const onSubmit = async (values: UserInfo) => {
    if (!isDirty) {
      return toast.warning(
        "Details must be edited before submitting the form!",
      );
    }

    mutate({ values });
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <div className="grid sm:grid-cols-2 sm:gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FloatingInput
                    label={"First Name"}
                    text={getValues("firstName")}
                    {...field}
                    type="text"
                    disabled={isPending}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FloatingInput
                    label={"Last Name"}
                    text={getValues("lastName")}
                    type="text"
                    {...field}
                    disabled={isPending}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FloatingInput
                    label={"Email"}
                    text={getValues("email")}
                    type="email"
                    {...field}
                    disabled
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FloatingInput
                    label={"Phone Number"}
                    text={getValues("phoneNumber")}
                    type="number"
                    {...field}
                    disabled={isPending}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FloatingTextarea
                  label={"Bio"}
                  text={getValues("bio")}
                  disabled={isPending}
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 mt-8">
            <Button
              type="submit"
              className="text-xs xs:text-sm flex items-center gap-2"
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin" />} Submit
            </Button>
            <VendorButton className="block md:hidden" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InfoForm;
