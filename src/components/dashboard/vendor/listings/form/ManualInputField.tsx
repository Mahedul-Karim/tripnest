import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, UseFormReturn, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  form: UseFormReturn<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const ManualInputField: React.FC<Props> = ({ form, setValue }) => {
  const highlights = form.watch("highlight") || [];

  const [text, setText] = useState<string>("");

  const handleDelete = (index: number) => {
    const exisitngHighlight = [...highlights];

    const newHighlight = exisitngHighlight.filter((_, i) => i !== index);
    setValue("highlight", newHighlight);
  };

  return (
    <div className="mt-[20px] flex flex-col gap-4">
      <div className="border border-solid border-border rounded-xl pr-3 py-1 flex items-center justify-between h-[45px] text-sm">
        <Input
          type="text"
          className="grow focus:outline-none border-none"
          placeholder="Highlights..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className="text-accent cursor-pointer font-semibold"
          onClick={() => {
            if (!text)
              return toast.warning("Highlights field can not be empty");

            const exisitngHighlight = [...highlights];

            exisitngHighlight.push(text);

            setValue("highlight", exisitngHighlight);
            setText("");
          }}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col gap-2 text-sm text-text">
        {highlights.length > 0 &&
          highlights.map((high: string, i: number) => (
            <p className="flex items-center justify-between" key={i}>
              <span>
                {i + 1}. {high}
              </span>
              <button onClick={handleDelete.bind(null, i)} type="button">
                <X />
              </button>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ManualInputField;
