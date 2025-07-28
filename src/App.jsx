import { RouterProvider } from "react-router";
import { route } from "./router/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./context/LanguageContext";
import "./i18n";

Aos.init();
const queryClient = new QueryClient();

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={route} />
          <Toaster position="top-right" />
        </QueryClientProvider>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
