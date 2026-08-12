import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export const KineticToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved !== null) {
        return saved === "dark";
      }
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle light/dark theme"
      onClick={() => setIsDark(!isDark)}
      className={`relative w-[48px] h-[25px] rounded-full p-[2px] outline-none cursor-pointer
                 transition-all duration-400 ease-out 
                 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                 ${
                   isDark
                     ? "bg-[#1e1d24] border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                     : "bg-white border border-slate-300 shadow-[0_1px_5px_rgba(0,0,0,0.1)] hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.35)]"
                 }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-[19px] h-[19px] bg-[#131315] rounded-full shadow-md flex items-center justify-center overflow-hidden relative"
        style={{ x: isDark ? 0 : 23 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Moon icon when dark */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
            rotate: isDark ? 0 : -90,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-cyan-400"
        >
          <Moon className="w-3 h-3 fill-cyan-400/20 stroke-[2.2]" />
        </motion.div>

        {/* Sun icon when light */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
            rotate: isDark ? 90 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-amber-300"
        >
          <Sun className="w-3 h-3 fill-amber-300/20 stroke-[2.2]" />
        </motion.div>
      </motion.div>
    </button>
  );
};
