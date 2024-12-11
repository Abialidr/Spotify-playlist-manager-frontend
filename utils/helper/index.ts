import { setToken } from "../../services/redux/reducer/authReducer";

export const formatDate = (date: Date) => {
  const d = new Date(date);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

export const logout = (dispatch: any, router?: any) => {
  const at = localStorage.getItem("token");
  if (at) {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    if (router) router.push("/");
    else location.reload();
  }
};
