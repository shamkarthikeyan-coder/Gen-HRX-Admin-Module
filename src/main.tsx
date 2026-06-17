import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App";
import { AppStoreProvider } from "@/store/AppStore";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStoreProvider>
      <App />
      <Toaster position="bottom-right" closeButton richColors={false} />
    </AppStoreProvider>
  </StrictMode>,
);
