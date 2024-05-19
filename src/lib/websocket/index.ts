type MessageEventListener = (ev: MessageEvent<any>) => any;

class WebSocketManager {
  private ws: WebSocket | null = null;
  private url: URL;

  constructor(url: string | URL) {
    if (typeof url === "string") {
      this.url = new URL(url);
    } else {
      this.url = url;
    }
  }

  connect() {
    if (typeof window === "undefined") {
      return;
    }
    this.ws = new WebSocket(this.url);
    this.ws.addEventListener("open", () => {
      console.log("websocket connected");
    });
    this.ws.addEventListener("close", () => {
      console.log("websocket closed");
    });
    this.ws.addEventListener("error", (e) => {
      console.error("websocket error!", e);
    });
    this.ws.addEventListener("message", (e) => {
      console.log(
        `received message: type = ${typeof e.data}, data = ${e.data}`
      );
    });
  }

  close() {
    if (!this.ws) {
      return;
    }
    this.ws.close();
    this.ws = null;
  }

  addMessageEventListener(listener: MessageEventListener) {
    if (!this.ws) {
      console.warn("websocket is not connected");
      return;
    }
    this.ws.addEventListener("message", listener);
  }

  removeMessageEventListener(listener: MessageEventListener) {
    if (!this.ws) {
      console.warn("websocket is not connected");
      return;
    }
    this.ws.removeEventListener("message", listener);
  }
}

export const webSocketManager = new WebSocketManager("ws://localhost:5177/ws");
