import WsConnector from "@/components/ws-connector";
import { ReactNode } from "react";

export default function ChatHomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <WsConnector>
      <span>chat home layout</span>
      {children}
    </WsConnector>
  );
}
