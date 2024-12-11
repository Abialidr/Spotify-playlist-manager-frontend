"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../../services/redux/reducer/authReducer";

function useGetTokens(
  fromWhere?: string,
  hasToRedirect?: boolean,
  isProtected?: boolean
) {
  const token = useSelector(getToken);
  // const Router = useRouter();

  // const [tokens, setTokens] = useState<{
  //   refresh_token: string | null;
  //   access_token: string | null;
  // }>({
  //   access_token: "",
  //   refresh_token: "",
  // });
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const access_token: string | null = localStorage.getItem("access_token");
  //     const refresh_token: string | null =
  //       localStorage.getItem("refresh_token");

  //     setTokens({
  //       access_token,
  //       refresh_token,
  //     });
  //     // if (hasToRedirect) {
  //     //   if (isProtected) {
  //     //     if (!access_token && !refresh_token) {
  //     //       Router.push("/");
  //     //     }
  //     //   } else {
  //     //     if (access_token && refresh_token) {
  //     //       Router.push("/");
  //     //     }
  //     //   }
  //     // }
  //   };
  //   handleStorageChange();
  //   window.addEventListener("storage", handleStorageChange);
  // }, []);

  return token;
}

export default useGetTokens;
