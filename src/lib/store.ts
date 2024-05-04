import {
  Action,
  ThunkAction,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import { systemApiSlice } from "./slices/system/system-api-slice";

const rootReducer = combineSlices(systemApiSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(systemApiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
