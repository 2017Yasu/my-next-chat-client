"use client";

import { useEffectOnce } from "@/lib/hooks/effect";
import { webSocketManager } from "@/lib/websocket";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function WsConnector({children}: Props) {
  useEffectOnce(async () => {
    webSocketManager.connect();
    return () => {
      webSocketManager.close();
    };
  });
  return children;
}
