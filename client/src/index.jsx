/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Home from "./pages/Home";
import NotExists from "./pages/NotExists";
import { LogProvider } from "./contexts/LogProvider";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <LogProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="*" component={NotExists} />
      </Router>
    </LogProvider>
  ),
  root
);
