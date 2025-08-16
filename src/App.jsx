import { RouterProvider } from "react-router";
import { route } from "./router/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./context/LanguageContext";
import { LoadingProvider } from "./components/LoadingProvider";
import AuthProvider from "./context/AuthProvider.jsx";
import Loading from "./components/Loading";
import { useLoadingState } from "./hooks/useLoadingState";
import "./i18n";

Aos.init();
const queryClient = new QueryClient();

// Component to handle loading state
function AppContent() {
  useLoadingState(); // This hook will manage the loading state
  
  return (
    <>
      <RouterProvider router={route} />
      <Loading />
      <Toaster position="top-right" />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <LoadingProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </QueryClientProvider>
        </CartProvider>
      </LoadingProvider>
    </LanguageProvider>
  );
}

export default App;
