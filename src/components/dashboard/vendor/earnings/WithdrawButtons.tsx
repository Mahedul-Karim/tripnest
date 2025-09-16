import { Button } from "@/components/ui/button";
import { CirclePlus, BadgeDollarSign } from "lucide-react";
import React, { useState } from "react";
import WithdrawModal from "./WithdrawModal";
import BankFormModal from "./BankFormModal";

interface Props {
  bankDetails: { [key: string]: string } | null;
  availableBalance: number;
}

const WithdrawButtons: React.FC<Props> = ({
  bankDetails,
  availableBalance,
}) => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <BadgeDollarSign /> Withdraw
      </Button>
      {!bankDetails && (
        <Button
          variant={"outline"}
          className="border-primary text-primary hover:text-primary"
          onClick={() => setOpenForm(true)}
        >
          <CirclePlus /> Add Withdraw Method
        </Button>
      )}
      <WithdrawModal
        open={open}
        setOpen={setOpen}
        bankDetails={bankDetails}
        availableBalance={availableBalance}
      />
      <BankFormModal open={openForm} setOpen={setOpenForm} />
    </>
  );
};

export default WithdrawButtons;
