type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  bio?: string | null;
  role: string;
  image?: {
    url: string;
    public_id:string;
  };
  wishlist: Array<any>;
  writtenReviews: Array<any>;
};

type AllToursType = {
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
  reviews: Array<any>;
};

interface BookedTours {
  id: string;
  userId: string;
  tourId: string;
  status: string;
  startDate: Date;
  endDate: Date;
  totalPeople: number;
  tourCreator: string;
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
}