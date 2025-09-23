import React, { useState, useReducer } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { STATUS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import StarRating from "./review/StarRating";
import FloatingTextarea from "@/components/forms/inputs/FloatingTextarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCtx } from "@/context/Context";
import { writeReview } from "@/lib/actions/review";
import { toast } from "sonner";
import LinearProgress from "@/components/common/loader/LinearProgress";

interface Props {
  bookingId: string;
  tourId: string;
  status: string;
  startDate: Date;
  endDate: Date;
  totalPeople: number;
  createdAt: Date;
  isReviewd: boolean;
  tour: {
    tourName: string;
    price: number;
    gallery: {
      public_id: string;
      url: string;
    }[];
  };
  creatorId: string;
  bookings: BookedTours[];
  setData: (val: BookedTours[]) => void;
}

const initialState = {
  location: 1,
  amenities: 1,
  food: 1,
  room: 1,
  price: 1,
  tourOperator: 1,
  comment: "",
};

type State = typeof initialState;
type Action =
  | { type: "SET_FIELD"; field: keyof State; value: string | number }
  | { type: "RESET" };

const reviewReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return initialState;

    default:
      return state;
  }
};

const BookingCard: React.FC<Props> = ({
  tourId,
  status,
  startDate,
  endDate,
  totalPeople,
  createdAt,
  tour,
  isReviewd,
  creatorId,
  bookingId,
  bookings,
  setData,
}) => {
  const [open, setOpen] = useState(false);

  const { user } = useCtx();

  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(reviewReducer, initialState);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await writeReview({
        ...state,
        tourId,
        creatorId,
        bookingId,
        userId: user!.id,
      });

      if (!res.success) throw new Error(res.message);

      return res;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["userBookedTours"],
      });
      toast.success(data.message);
      dispatch({ type: "RESET" });
      setOpen(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const submitReview = () => {
    mutate();
  };

  const handleChange = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_FIELD", field: "comment", value: e.target.value }),
  };

  return (
    <>
      {isPending && <LinearProgress />}
      <Card className="border-none py-4 shadow-none">
        <CardContent className="px-3 grid sm:grid-cols-[0.5fr_1fr_0.7fr] gap-3">
          <div className="">
            <Image
              src={tour?.gallery?.[0].url}
              alt=""
              width={821}
              height={0}
              className="object-cover aspect-video sm:aspect-auto sm:h-full rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <Link
              href={`/tours/${tour?.tourName?.replace(
                /\s+/,
                "-"
              )}?id=${tourId}`}
              className="text-sm xs:text-base lg:text-lg font-semibold text-navy"
            >
              {tour?.tourName}
            </Link>
            <p className="text-xs xs:text-sm text-muted">
              {totalPeople} Persons
            </p>
            <p className="text-xs xs:text-sm text-muted">
              Tour Starts At: {formatDate(new Date(startDate))}
            </p>
          </div>
          <div className="flex flex-col gap-1 justify-center text-dark-1 text-xs xs:text-sm lg:text-base">
            <p className="flex items-center justify-between sm:justify-normal gap-0 sm:gap-2 text-sm text-muted">
              Status:
              <Badge
                style={{
                  backgroundColor: STATUS[status]?.bg,
                  color: STATUS[status]?.text,
                }}
                className="rounded-full uppercase"
              >
                {status}
              </Badge>
            </p>
            <p className="flex items-center justify-between sm:justify-normal gap-0 sm:gap-2 text-sm text-muted">
              Booked At:
              <span className="font-medium text-navy">
                {" "}
                {formatDate(new Date(createdAt))}
              </span>
            </p>
            <p className="flex items-center justify-between sm:justify-normal gap-0 sm:gap-2 text-sm text-muted">
              Total Price:{" "}
              <span className="font-medium md:text-base text-navy">
                {formatCurrency(tour?.price)}
              </span>
            </p>
            {status === "completed" && !isReviewd && (
              <div className="flex items-center justify-end mt-2 sm:justify-normal">
                <Button onClick={setOpen.bind(null, true)} size={"sm"}>
                  Review!
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[60vh] overflow-auto showScrollbar">
          <DialogHeader>
            <DialogTitle className="text-navy text-xl">
              Leave a Review!
            </DialogTitle>
            <DialogDescription className="sr-only">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <div className="grid xs:grid-cols-2 gap-y-3 xs:gap-y-6">
              <StarRating
                label="Location"
                value={state?.location}
                setValue={(val) =>
                  dispatch({ type: "SET_FIELD", field: "location", value: val })
                }
              />
              <StarRating
                label="Amenities"
                value={state?.amenities}
                setValue={(val) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "amenities",
                    value: val,
                  })
                }
              />
              <StarRating
                label="Food"
                value={state?.food}
                setValue={(val) =>
                  dispatch({ type: "SET_FIELD", field: "food", value: val })
                }
              />
              <StarRating
                label="Room"
                value={state?.room}
                setValue={(val) =>
                  dispatch({ type: "SET_FIELD", field: "room", value: val })
                }
              />
              <StarRating
                label="Price"
                value={state?.price}
                setValue={(val) =>
                  dispatch({ type: "SET_FIELD", field: "price", value: val })
                }
              />
              <StarRating
                label="Tour Operator"
                value={state?.tourOperator}
                setValue={(val) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "tourOperator",
                    value: val,
                  })
                }
              />
            </div>
            <div className="mt-4">
              <FloatingTextarea
                label="Review"
                text={state?.comment}
                disabled={isPending}
                {...handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isPending} onClick={submitReview}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingCard;
