"use client";

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import LinearProgress from "@/components/common/loader/LinearProgress";
import { toast } from "sonner";
import FloatingInput from "@/components/forms/inputs/FloatingInput";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/lib/firebase";
import { updatePassword } from "firebase/auth";

const PasswordForm = () => {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { getValues } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ password }: { password: any }) => {
      const currentUser = auth.currentUser;

      await updatePassword(currentUser!, password);
    },
    onSuccess: () => toast.success("Password updated successfully"),
    onError: (err: Error) => toast.error(err.message),
  });

  const onSubmit = async (values: any) => {
    const newPassword = values.newPassword;
    const confirmPassword = values.confirmPassword;

    if(!newPassword){
        return toast.warning('New password can not be empty string')
    }

    if (newPassword !== confirmPassword) {
      return toast.warning("New password and confirm password must be same");
    }

    mutate({ password: newPassword });
  };

  return (
    <div className="mt-2">
      {isPending && <LinearProgress />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FloatingInput
                  
                  label={"Current Password"}
                  text={getValues("currentPassword")}
                  type="password"
                  disabled={isPending}
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid sm:grid-cols-2 sm:gap-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FloatingInput
                    
                    label={"New Password"}
                    text={getValues("newPassword")}
                    type="password"
                    disabled={isPending}
                    {...field}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FloatingInput
                    
                    label={"Confirm Password"}
                    text={getValues("confirmPassword")}
                    type="password"
                    disabled={isPending}
                    {...field}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="text-xs xs:text-sm rounded-xl"
              disabled={isPending}
              size={"lg"}
            >
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordForm;
