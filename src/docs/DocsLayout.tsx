import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils";
import { useTheme } from "@/theme";

const navigation = [
  {
    title: "Getting Started",
    links: [
      { name: "Introduction", path: "/docs" },
      { name: "Theming", path: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    links: [
      { name: "Accordion", path: "/docs/accordion" },
      { name: "Avatar", path: "/docs/avatar" },
      { name: "Badge", path: "/docs/badge" },
      { name: "Button", path: "/docs/button" },
      { name: "Checkbox", path: "/docs/checkbox" },
      { name: "Input", path: "/docs/input" },
      { name: "Modal", path: "/docs/modal" },
      { name: "Popover", path: "/docs/popover" },
      { name: "Radio Group", path: "/docs/radio-group" },
      { name: "Scroll Area", path: "/docs/scroll-area" },
      { name: "Skeleton", path: "/docs/skeleton" },
      { name: "Switch", path: "/docs/switch" },
      { name: "Typography", path: "/docs/typography" },
    ],
  },
];

export const DocsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const { theme, toggleColorMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeLink = navigation
    .flatMap((n) => n.links)
    .find((l) => l.path === location.pathname);

  const isHomePage =
    location.pathname === "/docs" || location.pathname === "/docs/";

  const filteredNavigation = useMemo(() => {
    if (!searchQuery) return navigation;
    return navigation
      .map((section) => ({
        ...section,
        links: section.links.filter((link) =>
          link.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((section) => section.links.length > 0);
  }, [searchQuery]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: theme.tokens.background,
        color: theme.tokens.foreground,
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 h-14 border-b px-4 sm:px-8 flex items-center justify-between"
        style={{
          borderColor: theme.tokens.border,
          backgroundColor: theme.tokens.background,
        }}
      >
        <div className="flex items-center gap-8">
          <Link
            to="/docs"
            className="flex items-center gap-2.5 font-bold text-base"
          >
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-extrabold"
              style={{ backgroundColor: theme.palette.primary[500] }}
            >
              UI
            </div>
            <span className="hidden sm:inline">Awesome UI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/docs"
              className={cn(
                "transition-colors",
                isHomePage ? "font-semibold" : "opacity-60 hover:opacity-100",
              )}
              style={
                isHomePage ? { color: theme.palette.primary[500] } : undefined
              }
            >
              Docs
            </Link>
            <Link
              to="/docs/button"
              className={cn(
                "transition-colors",
                !isHomePage ? "font-semibold" : "opacity-60 hover:opacity-100",
              )}
              style={
                !isHomePage ? { color: theme.palette.primary[500] } : undefined
              }
            >
              Components
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 px-3 pl-8 rounded-md border text-sm w-52 focus:w-64 transition-all outline-none focus:ring-1"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
                color: theme.tokens.foreground,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.palette.primary[500];
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.tokens.border;
              }}
            />
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 text-xs"
              >
                &times;
              </button>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleColorMode}
            className="w-8 h-8 flex items-center justify-center rounded-md border transition-colors"
            style={{
              borderColor: theme.tokens.border,
              backgroundColor: theme.tokens.surface,
            }}
            aria-label="Toggle color mode"
          >
            {theme.colorMode === "light" ? (
              <svg
                className="w-4 h-4 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          <Link to="/">
            <button
              className="hidden sm:flex items-center h-8 px-4 rounded-md text-xs font-semibold text-white transition-colors"
              style={{ backgroundColor: theme.palette.primary[500] }}
            >
              Playground
            </button>
          </Link>

          {/* Mobile menu */}
          <button
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md border"
            style={{ borderColor: theme.tokens.border }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-4 h-4 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 flex w-full max-w-[1400px] mx-auto">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-0 top-14 z-40 w-full lg:sticky lg:h-[calc(100vh-3.5rem)] lg:w-60 lg:shrink-0 lg:block border-r overflow-y-auto",
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
            isHomePage && "lg:hidden",
          )}
          style={{
            borderColor: theme.tokens.border,
            backgroundColor: theme.tokens.background,
          }}
        >
          {/* Mobile search */}
          <div
            className="lg:hidden p-4 border-b"
            style={{ borderColor: theme.tokens.border }}
          >
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 rounded-md border text-sm"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
                color: theme.tokens.foreground,
              }}
            />
          </div>

          <nav className="p-4 pb-20">
            {filteredNavigation.map((section) => (
              <div key={section.title} className="mb-6">
                <h4
                  className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
                  style={{ color: theme.tokens.foregroundMuted }}
                >
                  {section.title}
                </h4>
                <div className="space-y-0.5">
                  {section.links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "block px-2 py-1.5 text-sm rounded-md transition-colors",
                        location.pathname === link.path
                          ? "font-medium"
                          : "opacity-60 hover:opacity-100",
                      )}
                      style={
                        location.pathname === link.path
                          ? {
                              color: theme.palette.primary[500],
                              backgroundColor: `${theme.palette.primary[500]}10`,
                            }
                          : undefined
                      }
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 min-w-0 min-h-[calc(100vh-3.5rem)]",
            isHomePage ? "w-full" : "max-w-4xl px-6 py-10 lg:px-12 lg:py-14",
          )}
        >
          {/* Breadcrumb */}
          {!isHomePage && (
            <nav
              className="flex items-center gap-2 mb-8 text-xs"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              <Link to="/docs" className="hover:underline">
                Docs
              </Link>
              <span>/</span>
              <span style={{ color: theme.palette.primary[500] }}>
                {activeLink?.name}
              </span>
            </nav>
          )}

          <div
            className={cn(
              !isHomePage &&
                "prose max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-sm prose-h3:mt-5 prose-h3:mb-2 prose-p:text-sm prose-p:leading-relaxed prose-p:my-2 prose-code:text-sm",
            )}
            style={
              !isHomePage
                ? ({
                    "--tw-prose-body": theme.tokens.foreground,
                    "--tw-prose-headings": theme.tokens.foreground,
                    "--tw-prose-lead": theme.tokens.foregroundMuted,
                    "--tw-prose-links": theme.palette.primary[500],
                    "--tw-prose-bold": theme.tokens.foreground,
                    "--tw-prose-counters": theme.tokens.foregroundMuted,
                    "--tw-prose-bullets": theme.tokens.foregroundMuted,
                    "--tw-prose-hr": theme.tokens.border,
                    "--tw-prose-quotes": theme.tokens.foreground,
                    "--tw-prose-quote-borders": theme.tokens.border,
                    "--tw-prose-captions": theme.tokens.foregroundMuted,
                    "--tw-prose-code": theme.tokens.foreground,
                    "--tw-prose-pre-code": "#d4d4d4",
                    "--tw-prose-pre-bg":
                      theme.colorMode === "dark" ? "#111" : "#1e1e2e",
                    "--tw-prose-th-borders": theme.tokens.border,
                    "--tw-prose-td-borders": theme.tokens.borderSubtle,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {isHomePage && (
        <footer
          className="border-t py-8 px-8 text-center text-sm"
          style={{
            borderColor: theme.tokens.border,
            color: theme.tokens.foregroundMuted,
          }}
        >
          Built with React, TypeScript & Tailwind CSS
        </footer>
      )}
    </div>
  );
};
