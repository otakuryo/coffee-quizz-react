/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Main from "@/pages/main/Main";
import { UserProvider } from "@/contexts/UserContext";
import { PreguntaProvider } from "@/contexts/PreguntaContext";
import { Toaster } from "@/components/ui/sonner"

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <UserProvider>
      <PreguntaProvider>
        <Main />
        <Toaster />
      </PreguntaProvider>
    </UserProvider>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
