import React, { Suspense } from "react";
import Empty from "../common/Empty";
import GridCard from "../tours/GridCard";

const FeaturedTours = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/api/tours/featured`, {
    cache: "force-cache",
    next: {
      tags: ["featuredTours"],
    },
  });

  const data = await res.json();

  const tours = data?.tours || [];

  return (
    <section className="mt-6">
      {tours.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-4 mt-6">
          <Suspense fallback={<></>}>
            {tours.map((tour: AllToursType) => (
              <GridCard
                key={tour.id}
                id={tour?.id}
                tourName={tour?.tourName}
                location={tour?.location}
                totalRatings={tour?.totalRatings}
                duration={tour?.duration}
                price={tour?.price}
                gallery={tour?.gallery}
                totalReviews={tour?.reviews?.length}
              />
            ))}
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default FeaturedTours;
