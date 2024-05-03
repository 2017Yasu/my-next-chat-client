"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type WsMessage = {
  message: string;
  sentAt: number;
  from: "client" | "server";
};

export default function WsEchoTestComponent() {
  const ws = useRef<WebSocket>();
  const [serverUrl, setServerUrl] = useState("ws://localhost:5177/ws");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<WsMessage>>([]);

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }
  }, []);

  const handleConnect = useCallback((url: string) => {
    ws.current = new WebSocket(url);
    ws.current.addEventListener("open", () => {
      console.log("websocket open");
    })
    ws.current.addEventListener("close", () => {
      console.log("websocket closed");
    });
    ws.current.addEventListener("error", (e) => {
      console.error("websocket error!", e);
    })
    ws.current.addEventListener("message", (e) => {
      console.log(`websocket message: type = ${typeof e.data}, data = ${e.data}`);
    })

    ws.current.addEventListener("message", (e) => {
      const { data } = e;
      if (!data || typeof data !== "string") {
        return;
      }
      setMessages((prev) => prev.concat({ message: data, sentAt: new Date().getTime(), from: "server" }));
    })
  }, []);

  const handleClose = useCallback(() => {
    if (!ws.current) {
      return;
    }
    ws.current.close();
    ws.current = undefined;
  }, []);

  const handleSendMessage = useCallback((m: string) => {
    if (!ws.current || !m) {
      return;
    }
    setMessages((prev) => prev.concat({ message: m, sentAt: new Date().getTime(), from: "client" }));
    ws.current.send(m)
  }, []);

  return (
    <div>
      <p>Websocket Echo Test</p>
      <div>
        <span>Websocket server URL:</span>
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => handleConnect(serverUrl)}>Connect</button>
        <button onClick={handleClose}>Close</button>
      </div>
      <div>
        <span>Message to send:</span>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => handleSendMessage(message)}>Send</button>
      </div>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Sent at</th>
              <th>From</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((d) => (
              <tr key={d.sentAt}>
                <td>{new Date(d.sentAt).toLocaleTimeString()}</td>
                <td>{d.from}</td>
                <td>{d.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
