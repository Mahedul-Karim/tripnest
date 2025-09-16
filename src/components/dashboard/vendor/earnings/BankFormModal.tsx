import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FieldValues, useForm } from "react-hook-form";
import { useCtx } from "@/context/Context";
import FloatingInput from "@/components/forms/inputs/FloatingInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBankDetails } from "@/lib/actions/vendor";
import { toast } from "sonner";
import LinearProgress from "@/components/common/loader/LinearProgress";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const BankFormModal: React.FC<Props> = ({ open, setOpen }) => {
  const form = useForm({
    defaultValues: {
      bankName: "",
      bankCountry: "",
      bankSwiftCode: "",
      bankAccountNumber: "",
      bankHolderName: "",
    },
  });

  const { user } = useCtx();

  const {
    formState: { errors },
    getValues,
    reset,
  } = form;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ values }: { values: FieldValues }) => {
      const data = await addBankDetails({
        name: values.bankName,
        country: values.bankCountry,
        swiftCode: values.bankSwiftCode,
        bankAccountNumber: values.bankAccountNumber,
        bankHolderName: values.bankHolderName,
        userId: user?.id as string,
      });

      if (!data.success) throw new Error(data.message);

      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["vendorEarnings"] });
      toast.success("Bank details added successfully");
      setOpen(false);
      reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const onSubmit = (values: FieldValues) => {
    mutate({ values });
  };

  return (
    <>
      {isPending && <LinearProgress />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] showScrollbar overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-navy text-center">
              Add Withdraw Method
            </DialogTitle>
            <DialogDescription className="sr-only">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-1"
            >
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Bank Name"}
                      text={getValues("bankName")}
                      error={errors?.bankName?.message || ""}
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
                name="bankCountry"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Bank Country"}
                      text={getValues("bankCountry")}
                      error={errors?.bankCountry?.message || ""}
                      type="text"
                      {...field}
                      disabled={isPending}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankSwiftCode"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Bank Swift Code"}
                      text={getValues("bankSwiftCode")}
                      error={errors?.bankSwiftCode?.message || ""}
                      type="text"
                      {...field}
                      disabled={isPending}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankAccountNumber"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Bank Account Number"}
                      text={getValues("bankAccountNumber")}
                      error={errors?.bankAccountNumber?.message || ""}
                      type="text"
                      {...field}
                      disabled={isPending}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankHolderName"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FloatingInput
                      labelBg="bg-white"
                      label={"Bank Holder Name"}
                      text={getValues("bankHolderName")}
                      error={errors?.bankHolderName?.message || ""}
                      type="text"
                      {...field}
                      disabled={isPending}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2 mt-[20px] justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button disabled={isPending}>Continue</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BankFormModal;
