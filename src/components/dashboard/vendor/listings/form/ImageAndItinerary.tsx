import React from "react";

import { UseFormReturn, UseFormSetValue } from "react-hook-form";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
  setValue: UseFormSetValue<any>;
  isEditing: boolean;
}

const ImageAndItinerary: React.FC<Props> = ({
  form,
  isSubmitting,
  setValue,
  isEditing,
}) => {
  const images = form.watch("gallery") || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const existingImages: Array<any> = [...images];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      existingImages.push(fileReader.result);

      setValue("gallery", existingImages);
    };

    fileReader.readAsDataURL(e.target.files?.[0] as File);
  };

  const deleteImage = (index: number) => {
    const exisitngArray = [...images];

    const newArray = exisitngArray.filter((_, i) => i !== index);
    setValue("gallery", newArray);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {!isEditing && (
          <div className="border border-dashed border-primary rounded-xl bg-primary/10 h-[140px] xs:h-[160px] overflow-clip text-primary">
            <input
              type="file"
              id="gallery"
              className="absolute hidden"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor="gallery"
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-1"
            >
              <span>
                <ImagePlus className="text-2xl" />{" "}
              </span>
              <span className="text-xs xs:text-sm font-medium text-center">
                Upload Image
                <br />
                (4 image)
              </span>
            </label>
          </div>
        )}
        {images.length > 0 &&
          images.map((img: string, i: number) => (
            <div
              className="rounded-xl h-[140px] xs:h-[160px] overflow-clip relative"
              key={i}
            >
              {!isEditing && (
                <Button
                  className="absolute top-2 right-2 rounded-lg size-8 bg-accent"
                  onClick={deleteImage.bind(null, i)}
                  size={"icon"}
                >
                  <Trash />
                </Button>
              )}
              <Image
                alt=""
                src={img}
                width={850}
                height={0}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageAndItinerary;
