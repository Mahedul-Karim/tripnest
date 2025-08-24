"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
  overview?: string;
  totalReviews: number;
};

const GridCard: React.FC<Props> = ({
  id,
  tourName,
  gallery,
  price,
  totalRatings,
  duration,
  location,
  totalReviews,
}) => {
  const search = useSearchParams().get("search") || "";

  const { user, isLoggedIn, setUser } = useCtx();

  const isInWishlist = user?.wishlist?.find((tour) => tour.tourId === id);

  return (
    <Card className="justify-between rounded-md bg-foreground shadow-none border-border group overflow-hidden pt-0 pb-[10px] h-full gap-[10px]">
      <CardHeader className="px-0 relative">
        <div>
          <Image
            src={gallery?.[0]?.url}
            alt=""
            width={421}
            height={301}
            className="object-cover w-full aspect-[16/10]"
          />
        </div>
        <div className="absolute bottom-[-10px] right-[10px] xs:right-[15px]">
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
      </CardHeader>
      <CardContent className="px-[8px] xs:px-[10px] sm:px-5 relative flex flex-col">
        <div className="hidden xs:block">
          <Badge
            variant="outline"
            className="text-muted border-none px-0 font-normal capitalize"
          >
            <MapPin /> {location}
          </Badge>
        </div>
        <Link
          href={`/tours/${tourName?.replace(/\s+/, "-")}?id=${id}`}
          className="text-sm sm:text-base text-navy font-medium leading-[1.6] line-clamp-2"
        >
          <span className="bg-gradient-to-r from-navy from-0% to-navy bg-no-repeat bg-[0_calc(100%_-_1px)] bg-[length:0_1px] transition-all duration-500 group-hover:bg-[length:100%_1px] py-[3px]">
            <HighlightText fullText={tourName} textToHighlight={search} />
          </span>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <Ratings rating={totalRatings} size="size-3.5 xs:size-4" />
          <p className="text-[12px] text-center text-muted">
            {totalRatings}({totalReviews})
          </p>
        </div>
        <div className="mt-1 xs:mt-2 border-t border-solid border-border" />
      </CardContent>
      <CardFooter className="px-[8px] xs:px-[10px] sm:px-5 items-center xs:justify-between justify-end">
        <div className="hidden xs:flex items-center gap-1 text-navy">
          <Clock className="size-4 sm:size-4.5" />
          <span className="text-center text-[12px]">
            {duration}
          </span>
        </div>
        <div className="flex items-center text-navy">
          <span className="text-[10px] sm:text-xs">From</span>
          <p className="font-medium ml-[5px] text-[14px] sm:text-[15px]">
            {formatCurrency(price)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GridCard;
