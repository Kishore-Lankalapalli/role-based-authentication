import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./AuthContext.jsx";
import "./index.css";
import { router } from "./route.jsx";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
