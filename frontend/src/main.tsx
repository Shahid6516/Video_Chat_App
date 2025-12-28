import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { socketProvider } from "./Context/SocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <socketProvider>
    <App />
  </socketProvider>
);
