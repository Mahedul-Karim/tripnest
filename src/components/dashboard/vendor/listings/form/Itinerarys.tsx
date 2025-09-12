import FloatingInput from "@/components/forms/inputs/FloatingInput";
import FloatingTextarea from "@/components/forms/inputs/FloatingTextarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";

interface Props {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
  setValue: UseFormSetValue<any>;
}


const Itinerarys: React.FC<Props> = ({
  form,
  isSubmitting,
  setValue,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const itinerarys = form.watch("itinerarys") || [];

  const props = {
    value: title,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
  };

  const desc = {
    value: description,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    },
  };

  const handleItineraryAdd = () => {
    if (!title || !description)
      return toast.warning("Each fields are required");

    const itinerary = {
      title,
      description,
    };

    const existingArray = [...itinerarys];

    existingArray.push(itinerary);
    setValue("itinerarys", existingArray);
    setTitle("");
    setDescription("");
  };

  const handleRemoveItinerary = (index: number) => {
    const existingArray = [...itinerarys];

    const filteredArray = existingArray.filter((_, i) => i !== index);
    setValue("itinerarys", filteredArray);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <FloatingInput
          labelBg="bg-white"
          label={"Title"}
          text={title}
          type="text"
          disabled={isSubmitting}
          {...props}
        />
        <FloatingTextarea
          labelBg="bg-white"
          label={"Description"}
          text={description}
          disabled={isSubmitting}
          {...desc}
        />
        <Button
          variant={"outline"}
          type="button"
          onClick={handleItineraryAdd}
          className="border-primary text-primary hover:text-primary"
        >
          Add
        </Button>
      </div>
      {itinerarys.length > 0 && (
        <div className="flex flex-col gap-6 mt-4 border border-solid border-border rounded-lg px-2 py-6">
          {itinerarys.map((iti: any, i: number) => {
            const inputValue = {
              value: iti.title,
            };

            const textAreaValue = {
              value: iti.description,
            };

            return (
              <div className="flex flex-col gap-6" key={i}>
                <FloatingInput
                  labelBg="bg-white"
                  label={"Title"}
                  text={iti.title}
                  type="text"
                  disabled
                  {...inputValue}
                />
                <FloatingTextarea
                  labelBg="bg-white"
                  label={"Description"}
                  text={iti.description}
                  disabled
                  {...textAreaValue}
                />
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleRemoveItinerary.bind(null, i)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Itinerarys;
