import { RouterProvider } from "react-router";
import { route } from "./routes/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

Aos.init();
const queryClient = new QueryClient();

function App() {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route} />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </CartProvider>
  );
}

export default App;
