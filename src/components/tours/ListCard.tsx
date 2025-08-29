"use client";

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useCtx } from "@/context/Context";
import Image from "next/image";
import { Button } from "../ui/button";
import { Clock, Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import HighlightText from "../common/HighlightText";
import Ratings from "../common/Ratings";
import { formatCurrency } from "@/lib/utils";

type Props = {
  id: string;
  tourName: string;
  location: string;
  gallery: {
    url: string;
  }[];
  duration: string;
  price: number;
  totalRatings: number;
  overview: string;
};

const ListCard: React.FC<Props> = ({
  id,
  tourName,
  gallery,
  price,
  totalRatings,
  duration,
  location,
  overview,
}) => {
  const search = useSearchParams().get("search") || "";

  const { user, isLoggedIn, setUser } = useCtx();

  const isInWishlist = user?.wishlist?.find((tour) => tour.tourId === id);

  return (
    <Card className="bg-foreground shadow-none border-border rounded-md overflow-hidden py-4">
      <CardContent className="px-4 grid sm:grid-cols-[200px_1fr_0.4fr] gap-4 sm:gap-0">
        <div className="relative">
          <Image
            src={gallery?.[0]?.url}
            alt=""
            width={421}
            height={301}
            className="rounded-[12px] object-cover aspect-[16/14] w-full"
          />
          <div className="bg-white rounded-full size-6 xs:size-8 flex items-center justify-center absolute top-[12px] xs:top-[15px] right-[15px] border border-solid border-border">
            <Button
              className="bg-foreground rounded-full border border-border hover:bg-foreground cursor-pointer size-7 xs:size-9"
              size={"icon"}
            >
              <Heart
                className={`${
                  isInWishlist
                    ? "stroke-primary fill-primary"
                    : "stroke-text fill-transparent"
                }`}
              />
            </Button>
          </div>
        </div>
        <div className="flex flex-col px-2 xs:px-4 justify-center sm:border-r border-solid border-border">
          <Badge
            variant="outline"
            className="text-muted border-none px-0 font-normal capitalize"
          >
            <MapPin /> {location}
          </Badge>
          <Link
            href={`/tours/${tourName?.replace(/\s+/, "-")}?id=${id}`}
            className="text-sm sm:text-base text-navy font-medium leading-[1.6] line-clamp-2"
          >
            <HighlightText fullText={tourName} textToHighlight={search} />
          </Link>
          <div className="my-1 flex items-center gap-1">
            <Ratings rating={totalRatings} size="size-3.5 xs:size-4" />
            <p className="text-[12px] text-center text-muted">
              ({totalRatings})
            </p>
          </div>
          <p className="text-[10px] xs:text-[12px] sm:text-[13px] mt-1 line-clamp-2 text-dark-0 font-medium leading-[1.4]">
            <span className="bg-gradient-to-r from-[#000] from-0% to-[#000] bg-no-repeat bg-[0_100%] bg-[length:0_1px] transition-all duration-500 group-hover:bg-[length:100%_1px] py-[2px]">
              {overview}
            </span>
          </p>
        </div>
        <div className="flex sm:flex-col justify-between sm:items-center px-2 xs:px-4">
          <div className="flex items-center gap-1 text-muted">
            <Clock className="size-4 sm:size-4.5" />
            <span className="text-center text-[10px] sm:text-[12px]">
              {duration}
            </span>
          </div>
          <div className="flex items-center text-navy">
            <span className="text-[10px] sm:text-xs">From</span>
            <p className="font-medium ml-[5px] text-[12px] sm:text-[15px]">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCard;
