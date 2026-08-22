import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  return (
    <main className="page-shell">
      <p className="eyebrow">GlobeTrotter</p>
      <h1>Plan journeys worth remembering.</h1>
      <p className="intro">
        Your travel planning workspace is ready. Build itineraries, track your
        budget, and keep every destination in one place.
      </p>
      <button type="button">Start planning</button>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
