import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { DocsLayout } from "./DocsLayout";
import { useTheme } from "@/theme";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/Button";

// Lazy load MDX components
const ButtonDocs = lazy(() => import("./pages/Button.mdx"));
const InputDocs = lazy(() => import("./pages/Input.mdx"));
const RadioGroupDocs = lazy(() => import("./pages/RadioGroup.mdx"));
const AccordionDocs = lazy(() => import("./pages/Accordion.mdx"));
const AvatarDocs = lazy(() => import("./pages/Avatar.mdx"));
const BadgeDocs = lazy(() => import("./pages/Badge.mdx"));
const CheckboxDocs = lazy(() => import("./pages/Checkbox.mdx"));
const ModalDocs = lazy(() => import("./pages/Modal.mdx"));
const ScrollAreaDocs = lazy(() => import("./pages/ScrollArea.mdx"));
const SkeletonDocs = lazy(() => import("./pages/Skeleton.mdx"));
const TypographyDocs = lazy(() => import("./pages/Typography.mdx"));
const ThemingDocs = lazy(() => import("./pages/Theming.mdx"));

const navigation = [
  { name: "Accordion", path: "/docs/accordion", icon: "🪗" },
  { name: "Avatar", path: "/docs/avatar", icon: "👤" },
  { name: "Badge", path: "/docs/badge", icon: "🏷️" },
  { name: "Button", path: "/docs/button", icon: "🔘" },
  { name: "Checkbox", path: "/docs/checkbox", icon: "✅" },
  { name: "Input", path: "/docs/input", icon: "⌨️" },
  { name: "Modal", path: "/docs/modal", icon: "🪟" },
  { name: "Radio Group", path: "/docs/radio-group", icon: "🔘" },
  { name: "Scroll Area", path: "/docs/scroll-area", icon: "🖱️" },
  { name: "Skeleton", path: "/docs/skeleton", icon: "🦴" },
  { name: "Typography", path: "/docs/typography", icon: "✍️" },
];

const homeThemes = [
  {
    name: "Ocean Drift",
    color: "#0ea5e9",
    desc: "Deep atmospheric blues for professional data interfaces.",
    config: { palette: { primary: { 500: "#0ea5e9" } } },
  },
  {
    name: "Electric Violet",
    color: "#8b5cf6",
    desc: "Bold purple tones for creative and modern startups.",
    config: { palette: { primary: { 500: "#8b5cf6" } } },
  },
  {
    name: "Rose Gold",
    color: "#f43f5e",
    desc: "Warm and elegant rose tones for premium experiences.",
    config: { palette: { primary: { 500: "#f43f5e" } } },
  },
];

const LandingPage = () => {
  const { overrideTheme, resetTheme, theme } = useTheme();

  return (
    <div className="flex flex-col items-center px-6 py-24 sm:py-48 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-pink-500/10 blur-[120px] rounded-full -z-10" />

      {/* Announcement */}
      <div className="mb-12 animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className="group flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm text-xs font-black tracking-widest uppercase hover:bg-white/[0.05 transition-all cursor-pointer">
          <span className="text-pink-500">New Release</span>
          <span className="opacity-30">|</span>
          <span className="opacity-60">Version 2.0.0 is now live</span>
          <span className="group-hover:translate-x-1 transition-transform ml-2">
            →
          </span>
        </div>
      </div>

      {/* Hero Text */}
      <div className="text-center max-w-[1000px] mb-16 space-y-8">
        <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
          Craft <span className="text-pink-500 italic">Exceptional</span>{" "}
          Interfaces.
        </h1>
        <p className="text-xl sm:text-2xl leading-relaxed opacity-40 max-w-[700px] mx-auto animate-in fade-in duration-1000 delay-300">
          A premium component library designed to give your projects a distinct
          visual edge. Built with performance, accessibility, and high-end
          aesthetics at its core.
        </p>
      </div>

      {/* CTA's */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-32 animate-in fade-in zoom-in duration-700 delay-500">
        <Link to="/docs/theming">
          <Button
            size="lg"
            className="rounded-full px-10 h-14 font-black text-xs uppercase tracking-widest bg-pink-500 hover:bg-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
          >
            Get Started Free
          </Button>
        </Link>
        <Link to="/docs/button">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full px-10 h-14 font-black text-xs uppercase tracking-widest border border-white/5 hover:bg-white/5"
          >
            Browse Library
          </Button>
        </Link>
      </div>

      {/* Premium Theme Showcase */}
      <div className="w-full max-w-6xl mt-20">
        <div className="flex items-end justify-between mb-12 px-4 border-b border-white/5 pb-8">
          <div className="space-y-2 text-left">
            <Typography
              variant="h3"
              weight="black"
              className="tracking-tighter"
            >
              Instant Theming
            </Typography>
            <p className="opacity-40 text-sm">
              One click to completely redefine your experience.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => resetTheme()}
            className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-pink-500"
          >
            Default System
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeThemes.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => overrideTheme(t.config as any)}
              className="group p-10 rounded-[2.5rem] border text-left transition-all duration-700 hover:scale-[1.05] active:scale-[0.98] outline-none relative overflow-hidden animate-in fade-in slide-in-from-bottom-8"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
                animationDelay: `${idx * 150}ms`,
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity"
                style={{ background: t.color }}
              />
              <div
                className="w-16 h-16 rounded-3xl mb-8 flex items-center justify-center text-3xl shadow-xl transition-all group-hover:rotate-[15deg] group-hover:scale-110"
                style={{ backgroundColor: `${t.color}15`, color: t.color }}
              >
                {idx === 0 ? "🌊" : idx === 1 ? "⚡" : "🌹"}
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-tight">
                {t.name}
              </h3>
              <p className="text-sm leading-relaxed opacity-40">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Component Discovery */}
      <div className="w-full max-w-6xl mt-48">
        <div className="px-4 mb-12 text-left border-b border-white/5 pb-8">
          <Typography variant="h3" weight="black" className="tracking-tighter">
            Explore Ecosystem
          </Typography>
          <p className="opacity-40 text-sm">
            {navigation.length} components ready for integration.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {navigation.map((comp, idx) => (
            <Link
              key={comp.path}
              to={comp.path}
              className="group p-8 rounded-3xl border text-center transition-all duration-500 hover:border-pink-500/50 hover:bg-pink-500/[0.02] animate-in fade-in hover:shadow-2xl hover:shadow-pink-500/5 translate-y-0 hover:-translate-y-2"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
                animationDelay: `${idx * 50}ms`,
              }}
            >
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                {comp.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 group-hover:opacity-100 group-hover:text-pink-500 transition-all">
                {comp.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DocsApp: React.FC = () => {
  return (
    <DocsLayout>
      <Suspense
        fallback={
          <div className="animate-pulse h-64 bg-white/5 rounded-[2rem]" />
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/theming" element={<ThemingDocs />} />
          <Route path="/button" element={<ButtonDocs />} />
          <Route path="/input" element={<InputDocs />} />
          <Route path="/radio-group" element={<RadioGroup_Docs />} />
          <Route path="/accordion" element={<AccordionDocs />} />
          <Route path="/avatar" element={<AvatarDocs />} />
          <Route path="/badge" element={<BadgeDocs />} />
          <Route path="/checkbox" element={<CheckboxDocs />} />
          <Route path="/modal" element={<ModalDocs />} />
          <Route path="/scroll-area" element={<ScrollAreaDocs />} />
          <Route path="/skeleton" element={<SkeletonDocs />} />
          <Route path="/typography" element={<TypographyDocs />} />
          <Route path="*" element={<Navigate to="/docs" replace />} />
        </Routes>
      </Suspense>
    </DocsLayout>
  );
};

const RadioGroup_Docs = RadioGroupDocs;
export default DocsApp;
