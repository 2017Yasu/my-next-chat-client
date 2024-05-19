import { Message } from "@/types/message";
import { createAppSlice } from "../utils/create-app-slice";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: { [key: string]: Message } = {};

export const messagesSlice = createAppSlice({
  name: "messages",
  initialState,
  reducers: (create) => ({
    addNew: create.reducer((state, action: PayloadAction<Message>) => {
      const data = action.payload;
      state[data.id] = data;
    })
  }),
  selectors: {
    selectMessageMap: (state) => state,
  }
})
