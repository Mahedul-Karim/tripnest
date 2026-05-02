import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBankDetails, requestForWithdraw } from "@/lib/actions/vendor";
import { toast } from "sonner";
import { useCtx } from "@/context/Context";
import LinearProgress from "@/components/common/loader/LinearProgress";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bankDetails: any;
  availableBalance: number;
  open: boolean;
}

const WithdrawModal: React.FC<Props> = ({
  setOpen,
  open,
  bankDetails,
  availableBalance,
}) => {
  const { user } = useCtx();

  const [bankData, setBankData] = useState(bankDetails);

  const [amount, setAmount] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const data = await removeBankDetails(bankDetails.id);

      if (!data.success) throw new Error(data.message);

      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["vendorEarnings"],
      });
    },
    onError: (err: Error) => {
      setBankData(bankData);
      toast.error(err.message);
    },
  });

  const { mutate: withdraw, isPending } = useMutation({
    mutationFn: async () => {
      const userId = user?.id;

      const res = await requestForWithdraw(
        userId as string,
        bankDetails?.bankAcccountNumber,
        +amount
      );

      if (!res.success) {
        throw new Error(res.message);
      }

      return res;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["vendorEarnings"],
      });
      toast.success(data.message);
      setOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleBankDetailsDelete = () => {
    setBankData(null);
    toast.success("Bank data deleted successfully");
    mutate();
  };

  const handleWithdraw = async () => {
    if (+amount > availableBalance) {
      toast.error("Withdraw amount can not be larger than available balance");
      return;
    }
    withdraw();
  };

  useEffect(() => {
    setBankData(bankDetails);
  }, [bankDetails]);

  return (
    <>
      {isPending && <LinearProgress />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl text-navy text-center">
              Available Withdraw Method
            </DialogTitle>
            <DialogDescription className="sr-only">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          {!bankData ? (
            <p className="text-muted">You have not added any withdraw method</p>
          ) : (
            <>
              {" "}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-sm text-text sm:text-base">
                  <p className="text-muted">
                    Account Number:{" "}
                    <span className="font-medium text-navy">
                      {bankDetails?.bankAcccountNumber}
                    </span>
                  </p>
                  <p className="text-muted">
                    Bank Name:{" "}
                    <span className="font-medium text-navy">
                      {bankDetails?.name}
                    </span>
                  </p>
                  <p className="text-muted">
                    Available balance:{" "}
                    <span className="font-medium text-navy">
                      ${availableBalance}
                    </span>
                  </p>
                </div>
                <Button
                  size="icon"
                  variant={"ghost"}
                  onClick={handleBankDetailsDelete}
                >
                  <Trash className="text-lg" />
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Input
                  type="number"
                  className=""
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isPending}
                />
                <Button
                  className=""
                  onClick={handleWithdraw}
                  disabled={isPending}
                >
                  Withdraw
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawModal;
