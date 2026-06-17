"use client";

import { AnimatePresence, motion } from "motion/react";
import { LoaderIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return <LoaderIcon className="size-4 animate-spin" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex size-9 items-center justify-center rounded-full border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
      aria-label="Alternar tema"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
