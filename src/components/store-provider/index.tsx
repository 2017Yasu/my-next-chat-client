"use client";

import { AppStore, makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";

type Props = {
  children: ReactNode;
};

export default function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
