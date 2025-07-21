import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { route } from "./routes/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";

Aos.init();
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
<CartProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route} />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </CartProvider>
  </StrictMode>
);
