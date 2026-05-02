import React from "react";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";
import { TOUR_TYPE } from "@/lib/data";
import { FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FloatingInput from "@/components/forms/inputs/FloatingInput";
import ManualInputField from "./ManualInputField";
import FloatingTextarea from "@/components/forms/inputs/FloatingTextarea";

interface Props {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any, any>;
}

const ContentForm: React.FC<Props> = ({
  form,
  isSubmitting,
  getValues,
  setValue,
  control,
}) => {
  return (
    <div>
      <FormField
        control={control}
        name="tourName"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FloatingInput
              
              label={"Name"}
              text={getValues("tourName")}
              {...field}
              type="text"
              disabled={isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem className="mt-6">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-[45px] w-full rounded-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="border-border">
                {TOUR_TYPE?.map((cat, i) => (
                  <SelectItem value={cat.value} key={i}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FloatingInput
              
              label={"Location"}
              text={getValues("location")}
              {...field}
              type="text"
              disabled={isSubmitting}
            />
          </FormItem>
        )}
      />
      <ManualInputField setValue={setValue} form={form} />
      <FormField
        control={control}
        name="duration"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FloatingInput
              
              label={"Duration"}
              text={getValues("duration")}
              {...field}
              type="text"
              disabled={isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FloatingInput
              
              label={"Price"}
              text={getValues("price")}
              {...field}
              type="number"
              disabled={isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="groupSize"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FloatingInput
              
              label={"Group Size"}
              text={getValues("groupSize")}
              {...field}
              type="number"
              disabled={isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="overview"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FloatingTextarea
              
              label={"Overview"}
              text={getValues("overview")}
              {...field}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContentForm;
