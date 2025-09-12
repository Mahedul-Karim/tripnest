import CheckMark from "@/components/tours/all-tours/filters/CheckMark";
import { Button } from "@/components/ui/button";
import React from "react";
import { FieldValues, UseFormReturn, UseFormSetValue } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
  setValue: UseFormSetValue<any>;
  isSubmitting: boolean;
  isEditing: boolean;
}

const includesArray = [
  "Beverages, drinking water, morning tea and buffet lunch",
  "Hotel pickup and drop-off by air-conditioned minivan",
  "InsuranceTransfer to a private pier",
  "Soft drinks",
  "Tour Guide",
  "Towel",
  "Alcoholic Beverages",
  "Accommodation",
  "Breakfast, lunch, dinner"
];

const Includes: React.FC<Props> = ({
  form,
  setValue,
  isSubmitting,
  isEditing,
}) => {
  const includes = form.watch("includes") || [];

  const handleOnChange = (value: string) => {
    const existingArray = [...includes];

    let newArray;

    if (existingArray.includes(value)) {
      newArray = existingArray.filter((inc) => inc !== value);
    } else {
      newArray = [...existingArray, value];
    }

    setValue("includes", newArray);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {includesArray.map((inc, i) => (
          <CheckMark
            label={inc}
            value={inc}
            index={i}
            key={i}
            onChange={handleOnChange}
            checked={includes.includes(inc)}
          />
        ))}
      </div>
      <Button
        type="submit"
        className="text-xs xs:text-sm bg-primary disabled:bg-disabled hover:bg-primary"
        disabled={isSubmitting}
        size={"lg"}
      >
        {isEditing ? "Save changes" : "Create Tour"}
      </Button>
    </div>
  );
};

export default Includes;
