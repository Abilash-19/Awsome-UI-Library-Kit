import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/theme";
import Playground from "./Playground";
import DocsApp from "./docs/DocsApp";
import "@/theme/index.css";

function App() {
  return (
    <ThemeProvider defaultThemeName="light" storageKey="playground-theme">
      <BrowserRouter>
        <Routes>
          {/* Playground Route */}
          <Route path="/" element={<Playground />} />

          {/* Documentation Route */}
          <Route path="/docs/*" element={<DocsApp />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
