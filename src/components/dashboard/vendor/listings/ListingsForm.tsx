"use client";

import { useCtx } from "@/context/Context";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ContentForm from "./form/ContentForm";
import ImageAndItinerary from "./form/ImageAndItinerary";
import Itinerarys from "./form/Itinerarys";
import Includes from "./form/Includes";
import { useMutation } from "@tanstack/react-query";
import LinearProgress from "@/components/common/loader/LinearProgress";
import { createTourSchema } from "@/components/forms/formSchemas";
import { toast } from "sonner";
import { api } from "@/lib/utils";

interface Props {
  isEditing?: boolean;
}

const ListingsForm: React.FC<Props> = ({ isEditing = false }) => {
  const { user, tourToEdit } = useCtx();

  const form = useForm({
    defaultValues: {
      tourName: isEditing ? tourToEdit?.tourName : "",
      category: isEditing ? tourToEdit?.category : "",
      location: isEditing ? tourToEdit?.location : "",
      duration: isEditing ? tourToEdit?.duration : "",
      price: isEditing ? tourToEdit?.price?.toString() : "",
      groupSize: isEditing ? tourToEdit?.groupSize?.toString() : "",
      overview: isEditing ? tourToEdit?.overview : "",
      highlight: isEditing ? tourToEdit?.highlight : [],
      gallery: isEditing ? tourToEdit?.gallery?.map((tour) => tour.url) : [],
      itinerarys: isEditing ? tourToEdit?.itinerarys : [],
      includes: isEditing ? tourToEdit?.includes : [],
    },
  });

  const {
    reset,
    getValues,
    control,
    formState: { isDirty, isSubmitting },
    setValue,
  } = form;

  const onSubmit = async (values: FieldValues) => {
    if (isEditing && !isDirty) {
      toast.error("Edit a form field in order to save changes");
      return;
    }

    const validateValues = createTourSchema.safeParse(values);

    if (!validateValues.success) {
      const formattedError = validateValues.error.issues;

      toast.error(formattedError[0]?.message);

      return;
    }

    try {
      const formData = {
        ...values,
        price: +values.price,
        groupSize: +values.groupSize,
      };

      if (isEditing) {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: tourToEdit?.id,
            ...formData,
            gallery: [],
          }),
        };

        const data = await api({
          endpoint: "tour",
          options,
        });

        if (!data.success) {
          throw new Error(data.message);
        }

        toast.success("Tour updated successfully!");

        return;
      }

      //@ts-ignore
      formData.creatorId = user?.id;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const data = await api({
        endpoint: "tours",
        options,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Tour created successfully!");

      reset({
        tourName: "",
        category: "",
        location: "",
        duration: "",
        price: "",
        groupSize: "",
        overview: "",
        highlight: [],
        gallery: [],
        itinerarys: [],
        includes: [],
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {isSubmitting && <LinearProgress />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-card border border-solid border-border rounded-xl p-4 flex flex-col gap-3">
            <h3 className="text-lg text-navy font-medium">Content</h3>
            <ContentForm
              form={form}
              control={control}
              isSubmitting={isSubmitting}
              getValues={getValues}
              setValue={setValue}
            />
          </div>
          <div className="bg-card border border-solid border-border rounded-xl p-4 flex flex-col gap-3 mt-8">
            <h3 className="text-lg text-navy font-medium">Gallery</h3>
            <ImageAndItinerary
              form={form}
              isSubmitting={isSubmitting}
              setValue={setValue}
              isEditing={isEditing}
            />
          </div>
          <div className="bg-card border border-solid border-border rounded-xl p-4 flex flex-col gap-3 mt-8">
            <h3 className="text-lg text-navy font-medium">Itinerary</h3>
            <Itinerarys
              form={form}
              isSubmitting={isSubmitting}
              setValue={setValue}
            />
          </div>
          <div className="bg-card border border-solid border-border rounded-xl p-4 flex flex-col gap-3 mt-8">
            <h3 className="text-lg text-navy font-medium">Includes</h3>
            <Includes
              form={form}
              setValue={setValue}
              isSubmitting={isSubmitting}
              isEditing={isEditing}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default ListingsForm;
