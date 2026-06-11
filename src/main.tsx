import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
