import { Star } from "lucide-react";
import React from "react";
const Ratings = ({ rating, size }: { rating: number; size?: string }) => {
  const stars = [];

  for (let i = 1; i < 6; i++) {
    if (i <= rating) {
      stars.push(
        <Star
          className={`fill-yellow-400 stroke-0 ${size ? size : "size-4"}`}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <span className="relative">
          <Star
            className={`fill-gray-300 stroke-0 ${size ? size : "size-4"}`}
          />
          <Star
            className={`fill-yellow-400 stroke-0 absolute top-0 left-0 ${
              size ? size : "size-4"
            }`}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </span>
      );
    } else {
      stars.push(
        <Star className={`fill-gray-300 stroke-0 ${size ? size : "size-4"}`} />
      );
    }
  }

  return (
    <div className="flex items-center">
      {stars.map((el, i) => (
        <span key={i}> {el}</span>
      ))}
    </div>
  );
};

export default Ratings;
