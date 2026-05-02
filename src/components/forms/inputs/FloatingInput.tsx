import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
  label: string;
  text?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  type: string;
  labelBg?: string;
  disabled?: boolean;
}

const FloatingInput: React.FC<Props> = forwardRef(
  ({ label, text, error, labelBg, type, disabled, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          ref={ref as any}
          {...props}
          className={`peer focus:border-navy rounded-xl ${
            error ? "border-red-500" : "border-zinc-200"
          } h-[45px] bg-white`}
          type={type}
          disabled={disabled}
        />
        <Label
          className={`${
            labelBg ? labelBg : "bg-white dark:bg-card"
          } peer-focus:-top-[13px] transition-all duration-300 left-[15px] font-normal absolute py-[5px] px-[7px] peer-focus:text-xs text-sm ${
            text ? "-top-[13px] text-xs" : "top-[7px]"
          } ${disabled ? "text-muted" : "text-navy"} ${error ? 'text-red-500' : 'text-navy'} pointer-events-none`}
        >
          {label}
        </Label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
