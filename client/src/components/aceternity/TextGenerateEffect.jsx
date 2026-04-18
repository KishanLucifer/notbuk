import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({ words, className, duration = 0.3 }) {
  const [displayedWords, setDisplayedWords] = useState([]);
  const wordArray = words.split(" ");

  useEffect(() => {
    const timeouts = [];
    wordArray.forEach((word, i) => {
      const timeout = setTimeout(() => {
        setDisplayedWords((prev) => [...prev, word]);
      }, i * 80);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [words]);

  return (
    <div className={cn("font-bold", className)}>
      {displayedWords.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration, delay: 0 }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
