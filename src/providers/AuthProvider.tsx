import { useCtx } from "@/context/Context";
import { auth } from "@/lib/firebase";
import { api } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setIsLoggedIn, setUser, setToken } = useCtx();

  const { mutate } = useMutation({
    mutationFn: ({ email, token }: { email: any; token: any }) =>
      api({
        endpoint: "me",
        options: {
          method: "POST",
          body: JSON.stringify({ email, token }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      }),
    onSuccess: (data) => {
      if (!data.user) return;

      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const providedUser = currentUser?.providerData?.[0];

      const email = providedUser?.email;
      const token = await currentUser?.getIdToken(true);

      if (email && token) {
        mutate({ email, token });
      }
    });

    return () => unSubscribe();
  }, []);

  return children;
};

export default AuthProvider;
