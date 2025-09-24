import Ratings from "@/components/common/Ratings";
import { Button } from "@/components/ui/button";
import { useCtx } from "@/context/Context";
import { useWishlist } from "@/hooks/useWishlist";
import { Heart, MapPin } from "lucide-react";
import React from "react";

interface Props {
  id: string;
  name: string;
  totalRatings: number;
  location: string;
  totalReviews: number;
}

const Heading: React.FC<Props> = ({
  id,
  name,
  totalRatings,
  location,
  totalReviews,
}) => {
  const { user, isLoggedIn, setUser } = useCtx();

  const addToWishlist = useWishlist();

  const isInWishlist = user?.wishlist?.find((tour) => tour.tourId === id);

  return (
    <div className="mt-6">
      <h2 className="text-2xl xs:text-3xl sm:text-4xl text-navy font-bold !leading-[1.2]">
        {name}
      </h2>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Ratings rating={totalRatings} />
          <p className="text-xs xs:text-sm text-center text-navy">
            {totalRatings}({totalReviews})
          </p>
          <div className="flex items-center capitalize gap-1 text-xs xs:text-sm text-navy">
            <MapPin className="size-4" />
            {location}
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Button
            className="bg-transparent hover:bg-transparent cursor-pointer size-3.5 xs:size-4"
            size={"icon"}
            onClick={() =>
              addToWishlist({ user, isLoggedIn, setUser, tourId: id })
            }
          >
            <Heart
              className={`${
                isInWishlist
                  ? "stroke-primary fill-primary"
                  : "stroke-muted fill-transparent"
              } size-4 xs:size-4.5`}
            />
          </Button>
          <span className="text-sm hidden xs:inline-block"> Wishlist</span>
        </div>
      </div>
    </div>
  );
};

export default Heading;
