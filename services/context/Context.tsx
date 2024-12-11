"use client";
import { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getToken, setToken } from "../redux/reducer/authReducer";

import { logout } from "../../utils/helper";
import useIdleTimer from "../../utils/hooks/useIdleTimer";
import AuthForm from "@/components/auth/NewCustomers";
import PlayListPage from "@/components/Playlist";

const Context = createContext<any>(undefined);

const Provider = ({ children }: { children: ReactNode }): any => {
  const router: any = useRouter();
  const dispatch: any = useDispatch();
  useIdleTimer(() => {
    logout(dispatch, router);
  }, 1000 * 60 * 15);

  useEffect(() => {
    const access_token: any = localStorage.getItem("token");
    if (access_token) {
      dispatch(setToken(access_token));
    }
  }, [dispatch, router]);

  const token: any = useSelector(getToken);
  const params: any = usePathname();

  return (
    <Context.Provider value={{}}>
      {token.access_token ? (
        <>
          <PlayListPage />
        </>
      ) : (
        <AuthForm />
      )}
    </Context.Provider>
  );
};

export const useData = (): any => {
  const context: any = useContext(Context);
  if (!context) {
    throw new Error("useDBData must be used within a DBProvider");
  }
  return context;
};

export default Provider;
