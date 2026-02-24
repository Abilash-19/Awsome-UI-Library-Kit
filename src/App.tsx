import { ThemeProvider } from "@/theme";
import Playground from "./Playground";
import "@/theme/index.css";

function App() {
  return (
    <ThemeProvider defaultThemeName="light" storageKey="playground-theme">
      <Playground />
    </ThemeProvider>
  );
}

export default App;
