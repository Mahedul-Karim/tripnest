import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { getPayment, bookTour, deleteBooking } from "@/lib/actions/payment";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import LinearProgress from "@/components/common/loader/LinearProgress";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  userId: string;
  tourId: string;
  onModalClose: (val: boolean) => void;
  amount: number;
  isLoggedIn: boolean;
  startDate: Date;
  endDate: Date;
  totalPeople: number;
  tourCreator: string;
}

const PaymentModal: React.FC<Props> = ({
  open,
  userId,
  tourId,
  onModalClose,
  isLoggedIn,
  startDate,
  endDate,
  totalPeople,
  amount,
  tourCreator,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      return toast.error("Login first to book a tour!");
    }

    if (totalPeople === 0) {
      return toast.error("Amount of guest cannot be empty!");
    }

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);

      const booking = await bookTour(
        startDate,
        endDate,
        totalPeople,
        userId,
        tourId,
        tourCreator
      );

      const { error } = await stripe?.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
        },
      });

      if (error) {
        await deleteBooking(booking.id as string);
        throw new Error("An error occured while processing payment!");
      }

      toast.success("Tour booked successfully!");
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      onModalClose(false);
    }
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Dialog open={open} onOpenChange={onModalClose}>
        <DialogContent className="overflow-y-auto max-h-[479px] showScrollbar">
          <DialogHeader>
            <DialogTitle className="text-lg text-navy font-semibold">
              Make Payment
            </DialogTitle>
            <DialogDescription className="sr-only">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBooking}>
            <PaymentElement />
            <div className="flex items-center gap-2 justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onModalClose(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button disabled={isLoading}>Book Now!</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentModal;
