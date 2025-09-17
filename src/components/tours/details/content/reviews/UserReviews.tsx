"use client";

import Ratings from "@/components/common/Ratings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface Props {
  review?: {
    comment: string;
    total: number;
    user: {
      firstName: string;
      lastName: string;
      image: {
        public_id: string;
        url: string;
      };
    };
  };
}

const UserReviews: React.FC<Props> = ({ review }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div>
          <Avatar className="size-10 cursor-pointer">
            <AvatarImage src={review?.user?.image?.url} />
            <AvatarFallback>
              {
                //@ts-ignore
                review?.user?.firstName?.at(0)?.toUpperCase() +
                  //@ts-ignore
                  review?.user?.lastName?.at(0)?.toUpperCase()
              }
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <p className="text-navy font-medium">
            {review?.user?.firstName + " " + review?.user?.lastName}
          </p>
          <Ratings rating={review?.total as number} />
        </div>
      </div>
      <p className="text-muted text-sm !leading-[1.9]">{review?.comment}</p>
    </div>
  );
};

export default UserReviews;
