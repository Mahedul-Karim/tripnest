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
  const controller = new AbortController();

  // const cancleRequest = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`/api/${endpoint}`, {
      ...options,
      signal: controller.signal,
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(
        "Request timed out! Check your network connection and try again"
      );
    }

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
