import Calendar from "@/components/common/Calendar";
import { useCtx } from "@/context/Context";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import TotalGuest from "./TotalGuest";
import { Button } from "@/components/ui/button";
import LoadStripe from "@/lib/LoadStripe";
import PaymentModal from "./PaymentModal";

interface Props {
  id: string;
  price: number;
  duration: string;
  groupSize: number;
  creatorId: string;
}

const Sidebar: React.FC<Props> = ({
  id,
  price = 0,
  duration,
  groupSize,
  creatorId,
}) => {
  const [startDate, setStartDate] = useState(Date.now());

  const [open, setOpen] = useState(false);

  const [totalPrice, setTotalPrice] = useState(price);

  const [adultGuest, setAdultGuest] = useState(0);
  const [childGuest, setChildGuest] = useState(0);

  const { user, isLoggedIn } = useCtx();

  useEffect(() => {
    const perAdultCost = 50 * adultGuest;
    const perChildCost = 20 * childGuest;

    setTotalPrice(() => price + perAdultCost + perChildCost);
  }, [adultGuest, childGuest]);

  const numberOfDays: number = Number(duration?.match(/\d+/)?.[0]);

  const endDate = startDate + numberOfDays * 24 * 60 * 60 * 1000;

  const handleGuestIncrese = (type: string) => {
    if (adultGuest + childGuest === groupSize) {
      return;
    }

    if (type === "adult") {
      setAdultGuest((prev) => prev + 1);
    } else {
      setChildGuest((prev) => prev + 1);
    }
  };

  const handleGuestDecrese = (type: string) => {
    if (
      (type === "adult" && adultGuest === 0) ||
      (type === "child" && childGuest === 0)
    ) {
      return;
    }

    if (type === "adult") {
      setAdultGuest((prev) => prev - 1);
    } else {
      setChildGuest((prev) => prev - 1);
    }
  };

  return (
    <>
      <section className="bg-white border border-solid border-border rounded-lg h-max px-4 py-8">
        <div className="flex gap-2 items-center text-navy">
          <span className="text-xs">From</span>
          <p className="font-medium text-base xs:text-lg">
            {formatCurrency(price)}
          </p>
        </div>
        <div className="my-4">
          <div className="flex items-center border border-solid border-border rounded-lg px-4 py-3 gap-2">
            <div className="p-2 rounded-lg bg-primary-foreground">
              <CalendarDays className="size-4.5 xs:size-5 text-navy" />
            </div>
            <div className="flex flex-col text-navy">
              <p className="text-xs xs:text-sm">From</p>
              <p className="text-[10px] xs:text-xs whitespace-nowrap text-ellipsis overflow-clip">
                {formatDate(new Date(startDate))}-
                {formatDate(new Date(endDate))}
              </p>
            </div>
          </div>
        </div>
        <div className="my-4">
          <Calendar startDate={startDate} setStartDate={setStartDate} />
        </div>
        <div className="mb-4 flex flex-col gap-3">
          <TotalGuest
            label={"Adult"}
            guestNumber={adultGuest}
            onIncrease={() => handleGuestIncrese("adult")}
            onDecrese={() => handleGuestDecrese("adult")}
          />
          <TotalGuest
            label={"Child"}
            guestNumber={childGuest}
            onIncrease={() => handleGuestIncrese("child")}
            onDecrese={() => handleGuestDecrese("child")}
          />
        </div>
        <div className="border-t border-solid border-border mb-4" />
        <div className="flex items-center justify-between text-navy text-base xs:text-lg mb-4">
          <p>Total</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        {user?.id !== creatorId && (
          <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
            Book Now
          </Button>
        )}
      </section>
      <LoadStripe amount={totalPrice * 100}>
        <PaymentModal
          open={open}
          userId={user?.id as string}
          tourId={id}
          onModalClose={setOpen}
          amount={totalPrice}
          isLoggedIn={isLoggedIn}
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          totalPeople={adultGuest + childGuest}
          tourCreator={creatorId}
        />
      </LoadStripe>
    </>
  );
};

export default Sidebar;
