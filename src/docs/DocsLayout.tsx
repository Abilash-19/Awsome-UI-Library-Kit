import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import { Button } from "@/components/Button";

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
      { name: "Radio Group", path: "/docs/radio-group" },
      { name: "Scroll Area", path: "/docs/scroll-area" },
      { name: "Skeleton", path: "/docs/skeleton" },
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
      className="min-h-screen transition-colors duration-500 flex flex-col"
      style={{
        backgroundColor: theme.tokens.background,
        color: theme.tokens.foreground,
      }}
    >
      {/* Top Navigation Header */}
      <header
        className="sticky top-0 z-[60] h-14 border-b backdrop-blur-xl px-4 sm:px-12 flex items-center justify-between"
        style={{
          borderColor: theme.tokens.border,
          backgroundColor: `${theme.tokens.background}cc`,
        }}
      >
        <div className="flex items-center gap-10">
          <Link
            to="/docs"
            className="flex items-center gap-2 font-black tracking-tighter text-xl group"
          >
            <div className="w-6 h-6 rounded-lg bg-pink-500 flex items-center justify-center text-white text-[10px] font-black group-hover:scale-110 transition-transform">
              UI
            </div>
            <span className="hidden sm:inline-block">Awesome UI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold opacity-60">
            <Link
              to="/docs"
              className={cn(
                "transition-colors hover:text-pink-500",
                isHomePage && "text-pink-500 opacity-100",
              )}
            >
              Docs
            </Link>
            <Link
              to="/docs/button"
              className={cn(
                "transition-colors hover:text-pink-500",
                !isHomePage && "text-pink-500 opacity-100",
              )}
            >
              Components
            </Link>
            <span className="cursor-not-allowed hover:text-rose-400">
              Templates
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Integrated Search */}
          <div className="relative hidden lg:block group">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 px-4 pl-10 rounded-full border bg-background/50 text-xs w-48 focus:w-72 transition-all outline-none focus:ring-2 focus:ring-pink-500/20"
              style={{ borderColor: theme.tokens.border }}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 select-none">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleColorMode}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full transition-all border border-transparent hover:border-white/5"
            >
              {theme.colorMode === "light" ? "🌙" : "☀️"}
            </button>

            <Link to="/">
              <Button className="hidden sm:flex rounded-full px-6 h-10 font-black text-xs uppercase tracking-widest">
                + New Kit
              </Button>
            </Link>

            <button
              className="lg:hidden p-2 hover:bg-white/5 rounded-full"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-0 top-14 z-50 w-full bg-background lg:bg-transparent lg:sticky lg:h-[calc(100vh-3.5rem)] lg:w-72 lg:block border-r p-8 transform transition-transform duration-300 overflow-y-auto custom-scrollbar",
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
            isHomePage && "lg:hidden",
          )}
          style={{
            borderColor: theme.tokens.border,
            backgroundColor:
              theme.colorMode === "dark"
                ? "rgba(0,0,0,0.1)"
                : "rgba(255,255,255,0.05)",
          }}
        >
          {/* Mobile Search */}
          <div className="lg:hidden mb-10">
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-4 rounded-xl border bg-background text-sm"
              style={{ borderColor: theme.tokens.border }}
            />
          </div>

          <nav className="space-y-12 pb-20">
            {filteredNavigation.map((section) => (
              <div
                key={section.title}
                className="animate-in fade-in duration-500"
              >
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30 px-3">
                  {section.title}
                </h4>
                <div className="space-y-1.5 text-left">
                  {section.links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all",
                        location.pathname === link.path
                          ? "bg-pink-500/10 text-pink-500 font-bold"
                          : "text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1 h-1 rounded-full bg-current transition-all",
                          location.pathname === link.path
                            ? "scale-100"
                            : "scale-0 group-hover:scale-100",
                        )}
                      />
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
            isHomePage
              ? "w-full"
              : "max-w-[1200px] px-8 py-12 lg:px-20 lg:py-20",
          )}
        >
          {!isHomePage && (
            <nav className="flex items-center gap-3 mb-12 text-[10px] font-bold uppercase tracking-widest opacity-30">
              <Link to="/docs" className="hover:text-pink-500 transition-all">
                Docs
              </Link>
              <span className="opacity-20">/</span>
              <span className="text-pink-500">{activeLink?.name}</span>
            </nav>
          )}
          <div
            className={cn(
              "animate-in fade-in slide-in-from-bottom-2 duration-700",
              !isHomePage &&
                "prose prose-zinc dark:prose-invert max-w-none prose-headings:tracking-tighter",
            )}
          >
            {children}
          </div>
        </main>
      </div>

      <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(128, 128, 128, 0.1);
                    border-radius: 10px;
                }
                .prose pre {
                    background: #0d0d0d !important;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 1rem;
                }
            `}</style>
    </div>
  );
};
