import { motion } from "framer-motion";
import { BackgroundBeams } from "../components/aceternity/BackgroundBeams";
import {
  Shield,
  Zap,
  Search,
  Pin,
  Palette,
  Flag,
  Globe,
  Keyboard,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "JWT authentication with encrypted passwords. Your notes are yours alone.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Production-grade API with compression, indexing, and optimized queries.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Search,
    title: "Instant Search",
    desc: "Find any note in milliseconds. Search across titles, content, and tags.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: Pin,
    title: "Pin Important Notes",
    desc: "Keep critical notes at the top of your dashboard. Never lose track.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Palette,
    title: "Color Coded",
    desc: "Organize with 7 beautiful colors. Visual organization at a glance.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Flag,
    title: "Priority Levels",
    desc: "Mark notes as Low, Medium, or High priority to stay focused.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: Globe,
    title: "Cloud Synced",
    desc: "Access your notes from anywhere. Your data is always in sync.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: BookOpen,
    title: "Beautiful UI",
    desc: "Glassmorphism design with smooth animations. Note-taking that feels premium.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const shortcuts = [
  { keys: ["Ctrl", "N"], action: "Create new note" },
  { keys: ["Ctrl", "K"], action: "Search notes" },
  { keys: ["Esc"], action: "Close modals" },
];

export default function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] relative">
      <BackgroundBeams className="opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/25">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            About NotBuk
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A beautiful, secure cloud notebook built for people who think in
            notes. Organize your thoughts, ideas, and tasks with a premium
            experience.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-10">
            What makes NotBuk special
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass rounded-xl p-5 hover:border-primary/20 transition-all duration-300 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm">
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Keyboard shortcuts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2">
            <Keyboard className="w-6 h-6 text-primary" />
            Keyboard Shortcuts
          </h2>
          <div className="max-w-md mx-auto space-y-3">
            {shortcuts.map((s) => (
              <div
                key={s.action}
                className="glass rounded-xl px-5 py-3.5 flex items-center justify-between"
              >
                <span className="text-sm text-muted-foreground">{s.action}</span>
                <div className="flex gap-1.5">
                  {s.keys.map((key) => (
                    <kbd
                      key={key}
                      className="px-2.5 py-1 rounded-lg bg-secondary text-xs font-mono font-medium text-foreground border border-border/60"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6">Built With</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React",
              "Tailwind CSS",
              "Framer Motion",
              "Radix UI",
              "Express.js",
              "MongoDB",
              "JWT",
              "Vite",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Made with ♥ by NotBuk Team
          </p>
        </motion.div>
      </div>
    </div>
  );
}
