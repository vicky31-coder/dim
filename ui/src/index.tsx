<<<<<<< Updated upstream
import { createRoot } from 'react-dom/client';
=======
import { createRoot } from "react-dom/client";
>>>>>>> Stashed changes
import { StrictMode } from "react";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

const container = document.getElementById("root");
const root = createRoot(container!);

const app = (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

root.render(app);

reportWebVitals();
