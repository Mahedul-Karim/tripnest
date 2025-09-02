import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { STATUS } from "@/lib/data";
import { Button } from "@/components/ui/button";

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

  return (
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
            href={`/tours/${tour?.tourName?.replace(/\s+/, "-")}?id=${tourId}`}
            className="text-sm xs:text-base lg:text-lg font-semibold text-navy"
          >
            {tour?.tourName}
          </Link>
          <p className="text-xs xs:text-sm text-muted">{totalPeople} Persons</p>
          <p className="text-xs xs:text-sm text-muted">
            Tour Starts At: {formatDate(new Date(startDate))}
          </p>
        </div>
        <div className="flex flex-col gap-1 justify-center text-dark-1 text-xs xs:text-sm lg:text-base">
          <p className="flex items-center justify-between sm:justify-normal gap-0 sm:gap-2 text-sm">
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
          <p className="flex items-center justify-between sm:justify-normal gap-0 sm:gap-2 text-sm text-text">
            Booked At:
            <span className="font-medium text-navy">
              {" "}
              {formatDate(new Date(createdAt))}
            </span>
          </p>
          <p className="flex items-center justify-between sm:justify-normal gap-0 sm:gap-2 text-sm text-text">
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
  );
};

export default BookingCard;
