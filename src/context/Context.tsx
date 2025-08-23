"use client";

import { Tour } from "@prisma/client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: React.ReactNode;
}

interface ContextType {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  tourToEdit: Tour | null;
  setTourToEdit: Dispatch<SetStateAction<Tour | null>>;
}

const Context = createContext<ContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  token: "",
  setToken: () => {},
  tourToEdit: null,
  setTourToEdit: () => {},
});

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tourToEdit, setTourToEdit] = useState<Tour | null>(null);

  const userToken =
    typeof window !== "undefined" &&
    (localStorage.getItem("userToken")
      ? JSON.parse(localStorage.getItem("userToken")!)
      : "");

  const [token, setToken] = useState<string>(userToken);

//   useEffect(() => {
//     (async function () {
//       try {
//         const res = await fetch("/api/me", {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             authorization: `Bearer ${userToken}`,
//           },
//         });

//         const data = await res.json();

//         if (!data.success) {
//           throw new Error(data?.message);
//         }

//         setIsLoggedIn(true);
//         setUser(data.user);
//       } catch (err: any) {
//         console.log(err.message);
//       }
//     })();
//   }, []);

  return (
    <Context
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        tourToEdit,
        setTourToEdit,
      }}
    >
      {children}
    </Context>
  );
};

export const useCtx = () => {
  return useContext(Context);
};

export default ContextProvider;
