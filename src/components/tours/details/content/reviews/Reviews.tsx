import React from "react";
import Title from "../Title";
import RatingStats from "./RatingStats";
import {
  CircleStar,
  LayoutGrid,
  MapPin,
  Utensils,
  DollarSign,
  BedSingle,
  Headphones,
} from "lucide-react";
import UserReviews from "./UserReviews";

interface Props {
  reviews: {
    total: number;
    comment: string;
    user: {
      firstName: string;
      lastName: string;
      image: {
        public_id: string;
        url: string;
      };
    };
  }[];
  totalRatings: number;
  overall: {
    location: number | null;
    amenities: number | null;
    food: number | null;
    price: number | null;
    rooms: number | null;
    tourSupport: number | null;
  };
}

const Reviews: React.FC<Props> = ({ reviews = [], totalRatings, overall }) => {
  const { location, amenities, food, price, rooms, tourSupport } = overall;

  const reviewLength = reviews?.length;

  return (
    <div>
      <Title>Reviews</Title>
      <div className="mt-4 flex flex-col gap-2 overflow-clip rounded-lg">
        <RatingStats
          isOverall
          Icon={CircleStar}
          label="Overall Rating"
          rating={totalRatings}
          length={reviewLength}
        />
        <div className="grid grid-cols-2 gap-2">
          <RatingStats
            Icon={MapPin}
            label="Location"
            rating={location || 0}
            length={reviewLength}
          />
          <RatingStats
            Icon={LayoutGrid}
            label="Amenities"
            rating={amenities || 0}
            length={reviewLength}
          />
          <RatingStats
            Icon={Utensils}
            label="Food"
            rating={food || 0}
            length={reviewLength}
          />
          <RatingStats
            Icon={DollarSign}
            label="Price"
            rating={price || 0}
            length={reviewLength}
          />
          <RatingStats
            Icon={BedSingle}
            label="Rooms"
            rating={rooms || 0}
            length={reviewLength}
          />
          <RatingStats
            Icon={Headphones}
            label="Tour Support"
            rating={tourSupport || 0}
            length={reviewLength}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-6">
        {reviews?.length > 0 &&
          reviews?.map((rev, i) => <UserReviews key={i} review={rev} />)}
      </div>
    </div>
  );
};

export default Reviews;
