import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import { authApi } from "./Api/auth.api";

export default configureStore({
  reducer: {
    ...rootReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(
      authApi.middleware
      // venueApi.middleware,
    ),
});

// Infer the type of makeStore
