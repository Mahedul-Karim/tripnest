"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPayment } from "./actions/payment";

import React, { useCallback, useEffect, useRef, useState } from "react";
import LinearProgress from "@/components/common/loader/LinearProgress";

const stripeLoaded = loadStripe(process.env.NEXT_PUBLIC_STRIPE as string);

const LoadStripe = ({
  children,
  amount,
}: {
  children: React.ReactNode;
  amount: number;
}) => {
  const [clientSecret, setClientSecret] = useState<string | null | undefined>(
    ""
  );

  const debounce = useRef<any>(null);

  const getClientSecret = useCallback(async () => {
    try {
      const data:
        | {
            success: boolean;
            client_secret: string | null;
            message?: undefined;
          }
        | {
            success: boolean;
            message: string;
            client_secret?: undefined;
          } = await getPayment(amount);

      if (!data.success) {
        throw new Error();
      }

      setClientSecret(data.client_secret);
    } catch (err: any) {
      setClientSecret("");
    }
  }, [amount]);

  useEffect(() => {
    debounce.current = setTimeout(() => {
      getClientSecret();
    }, 300);

    return () => clearTimeout(debounce.current);
  }, [amount, getClientSecret]);

  if (!clientSecret) {
    return null;
  }

  return (
    <>
      <Elements
        stripe={stripeLoaded}
        options={{
          clientSecret: clientSecret as any,
          appearance: {
            theme: "stripe",
          },
        }}
        key={clientSecret}
      >
        {children}
      </Elements>
    </>
  );
};

export default LoadStripe;
