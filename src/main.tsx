import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // So doesnt double render
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
