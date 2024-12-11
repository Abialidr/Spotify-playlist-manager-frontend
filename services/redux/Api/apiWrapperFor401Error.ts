import { fetchBaseQuery, retry, RootState } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { getToken, setToken } from "../reducer/authReducer";
import { PROXY } from "../../../utils/config";
import { logout } from "../../../utils/helper";
// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: PROXY,
  prepareHeaders: (headers, all) => {
    const { endpoint, getState }: any = all;
    const refresh = getState().auth.isRefreshing;
    const endpoints = ["userSignin", "userSignup"];

    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "*");
    headers.set("Access-Control-Allow-Headers", "*");
    headers.set("Access-Control-Allow-Credentials", "*");
    const isHeaderNeaded = endpoints.some((data) => {
      return endpoint === data;
    });

    const token = localStorage.getItem("token");
    if (!refresh && token && !isHeaderNeaded) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result: any = await baseQuery(args, api, extraOptions);

  if (
    result.meta &&
    result.meta.response.status === 401 &&
    args?.url !== "/user/login/"
  ) {
    logout(api.dispatch);
    await mutex.waitForUnlock();
  }
  //   // checking whether the mutex is locked
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire();
  //     try {
  //       api.dispatch(setRefreshing(true));
  //       const refreshResult: any = await baseQuery(
  //         {
  //           url: "/api/user/refresh/",
  //           method: "POST",
  //           body: { refresh_token },
  //         },
  //         api,
  //         extraOptions
  //       );
  //       api.dispatch(setRefreshing(false));
  //       if (refreshResult?.data?.result?.access_token) {
  //         api.dispatch(
  //           setAccessToken({
  //             access_token: refreshResult.data?.result.access_token,
  //           })
  //         );
  //         localStorage.setItem(
  //           "access_token",
  //           refreshResult.data?.result.access_token
  //         );
  //         result = await baseQuery(args, api, extraOptions);
  //       } else {
  //         logout(api.dispatch);
  //       }
  //     } finally {
  //       release();
  //     }
  //   } else {
  //     // wait until the mutex is available without locking it
  //     await mutex.waitForUnlock();
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }
  return result;
};
