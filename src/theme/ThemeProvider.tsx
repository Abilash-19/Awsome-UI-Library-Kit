// src/theme/ThemeProvider.tsx
// React context + hook for theme access and switching.
// Applies CSS variables to :root on every theme change.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ThemeConfig, ThemeOverride } from "./Types";
import { defaultTheme } from "./DefaultTheme";
import { darkTheme } from "./DarkTheme";
import { applyTheme, mergeTheme } from "./utils";

// ─── Registry ────────────────────────────────────────────────────────────────
// Themes are registered by name. Extend this map to add custom themes.

const THEME_REGISTRY: Record<string, ThemeConfig> = {
  light: defaultTheme,
  dark: darkTheme,
};

export function registerTheme(theme: ThemeConfig): void {
  THEME_REGISTRY[theme.name] = theme;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  theme: ThemeConfig;
  /** Switch to a registered theme by name */
  setTheme: (name: string) => void;
  /** Toggle between light and dark */
  toggleColorMode: () => void;
  /** Apply an ad-hoc override to the current theme */
  overrideTheme: (override: ThemeOverride) => void;
  /** Reset any ad-hoc overrides */
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme name from THEME_REGISTRY (default: "light") */
  defaultThemeName?: string;
  /**
   * Optional storage key. When provided, the chosen theme name is persisted
   * to localStorage and restored on next load.
   */
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultThemeName = "light",
  storageKey,
}: ThemeProviderProps) {
  const [activeThemeName, setActiveThemeName] = useState<string>(() => {
    if (storageKey) {
      return localStorage.getItem(storageKey) ?? defaultThemeName;
    }
    return defaultThemeName;
  });

  const [override, setOverride] = useState<ThemeOverride | null>(() => {
    if (storageKey) {
      const stored = localStorage.getItem(`${storageKey}-override`);
      try {
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        console.error("Failed to parse theme override from storage", e);
        return null;
      }
    }
    return null;
  });

  const baseTheme = THEME_REGISTRY[activeThemeName] ?? defaultTheme;
  const theme = useMemo(
    () => (override ? mergeTheme(baseTheme, override) : baseTheme),
    [baseTheme, override],
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback(
    (name: string) => {
      if (!THEME_REGISTRY[name]) {
        console.warn(`[ThemeProvider] Theme "${name}" is not registered.`);
        return;
      }
      setActiveThemeName(name);
      setOverride(null);
      if (storageKey) {
        localStorage.setItem(storageKey, name);
        localStorage.removeItem(`${storageKey}-override`);
      }
    },
    [storageKey],
  );

  const toggleColorMode = useCallback(() => {
    const next = theme.colorMode === "light" ? "dark" : "light";
    const nextTheme = Object.values(THEME_REGISTRY).find(
      (t) => t.colorMode === next,
    );
    if (nextTheme) {
      setActiveThemeName(nextTheme.name);
      // Keep palette (primary color) but clear surface overrides
      setOverride((prev) => {
        if (!prev?.palette) return null;
        const kept = { palette: prev.palette };
        if (storageKey) {
          localStorage.setItem(`${storageKey}-override`, JSON.stringify(kept));
        }
        return kept;
      });
      if (storageKey) localStorage.setItem(storageKey, nextTheme.name);
    }
  }, [theme.colorMode, storageKey]);

  const overrideTheme = useCallback(
    (o: ThemeOverride) => {
      setOverride((prev) => {
        const next = prev ? { ...prev, ...o } : o;
        if (storageKey) {
          localStorage.setItem(`${storageKey}-override`, JSON.stringify(next));
        }
        return next;
      });
    },
    [storageKey],
  );

  const resetTheme = useCallback(() => {
    setOverride(null);
    if (storageKey) {
      localStorage.removeItem(`${storageKey}-override`);
    }
  }, [storageKey]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleColorMode, overrideTheme, resetTheme }),
    [theme, setTheme, toggleColorMode, overrideTheme, resetTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}

// ─── Token accessor hook ──────────────────────────────────────────────────────
// Convenience hook that returns just the semantic tokens.
// Use in components that only need color values.

export function useTokens() {
  return useTheme().theme.tokens;
}
