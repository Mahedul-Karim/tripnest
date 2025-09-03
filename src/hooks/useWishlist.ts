import { addTourToWishlist, removeFromWishlist } from "@/lib/actions/user";
import React from "react";
import { toast } from "sonner";

export const useWishlist = () => {
  const handleAddWishlist = async ({
    user,
    isLoggedIn,
    setUser,
    tourId,
  }: {
    [key: string]: any;
  }) => {
    if (!isLoggedIn) {
      return toast.warning("Login first to add to wishlist");
    }

    const copiedUser = { ...user };

    try {
      if (user?.wishlist?.find((tour: any) => tour.tourId === tourId)) {
        const filteredWishlist = user?.wishlist?.filter(
          (tour: any) => tour.tourId !== tourId
        );

        copiedUser.wishlist = [...filteredWishlist];
        setUser(copiedUser);
        toast.success("Tour was removed wishlist!");
        const res = await removeFromWishlist({ userId: user.id, tourId });

        if (!res.success) {
          throw new Error(res.message);
        }
      } else {
        const wishlist = [...user?.wishlist];

        wishlist.push({ tourId });

        copiedUser.wishlist = [...wishlist];
        setUser(copiedUser);
        toast.success("Tour was added to wishlist!");
        const res = await addTourToWishlist({ userId: user.id, tourId });

        if (!res.success) {
          throw new Error(res.message);
        }
      }
    } catch (err: any) {
      setUser(user);
      toast.error(err.message);
    }
  };

  return handleAddWishlist;
};
