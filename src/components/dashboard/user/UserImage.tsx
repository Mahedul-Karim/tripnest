"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCtx } from "@/context/Context";
import { toast } from "sonner";
import { Check, Loader, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { uploadUserImage } from "@/lib/actions/user";

type Props = React.HTMLAttributes<HTMLDivElement>;

const UserImage: React.FC<Props> = ({ className }) => {
  const { user, setUser } = useCtx();

  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    user?.image?.url
  );

  useEffect(() => {
    if (user?.image?.url) {
      setImage(user.image.url);
    }
  }, [user?.image?.url]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImage(fileReader.result);
    };

    fileReader.readAsDataURL(e.target.files?.[0] as File);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const data = await uploadUserImage(
        image as string,
        user?.email!,
        user?.image?.public_id!
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data: any) => {
      setUser(data?.user);
      setImage(data?.user?.image?.url);
      toast.success("Profile image updated successfully!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <div
      className={`w-32 h-32 border border-dashed border-primary rounded-full p-4 mx-auto relative mb-2 flex items-center justify-center ${className}`}
    >
      {image ? (
        <Image
          width={100}
          height={100}
          src={image as string}
          alt="image"
          className="rounded-full object-cover aspect-square"
        />
      ) : (
        <p className="w-full h-full bg-zinc-100 rounded-full grid place-items-center uppercase text-lg font-medium">
          {user && user?.firstName?.[0] + user?.lastName?.[0]}
        </p>
      )}
      <input
        type="file"
        id="userImage"
        className="absolute hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      <label
        htmlFor="userImage"
        className="absolute bg-primary p-1 cursor-pointer rounded-full text-white top-0 right-0"
      >
        <Pencil className="size-5" />
      </label>
      {image && user?.image?.url !== image && (
        <Button
          className="absolute bg-primary cursor-pointer rounded-full bottom-0 right-0 size-7"
          onClick={handleClick}
          disabled={isPending}
          size={"icon"}
        >
          {isPending ? (
            <Loader className="animate-spin size-6" />
          ) : (
            <Check className="size-6" />
          )}
        </Button>
      )}
    </div>
  );
};

export default UserImage;
