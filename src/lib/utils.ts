import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = async ({
  endpoint,
  options = {},
}: {
  endpoint: string;
  options?: RequestInit;
}) => {
  try {
    const res = await fetch(`/api/${endpoint}`, options);

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (err: any) {
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occured"
    );
  }
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
