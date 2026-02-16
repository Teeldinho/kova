import { useEffect, useState } from "react";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
const INTERVAL_MS = 30;
const CYCLES_PER_CHAR = 3;

interface DecryptTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function DecryptText({
  text,
  className = "",
  delay = 0,
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(
    text.replace(/[^ ]/g, () =>
      CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length)),
    ),
  );
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDecrypting(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!isDecrypting) return;

    let currentIndex = 0;
    let cycleCount = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        const chars = prev.split("");

        for (let i = currentIndex; i < text.length; i++) {
          if (text[i] === " ") {
            chars[i] = " ";
          } else if (i === currentIndex) {
            if (cycleCount >= CYCLES_PER_CHAR) {
              chars[i] = text[i];
            } else {
              chars[i] = CHARACTERS.charAt(
                Math.floor(Math.random() * CHARACTERS.length),
              );
            }
          } else {
            chars[i] = CHARACTERS.charAt(
              Math.floor(Math.random() * CHARACTERS.length),
            );
          }
        }

        return chars.join("");
      });

      cycleCount++;
      if (cycleCount > CYCLES_PER_CHAR) {
        currentIndex++;
        cycleCount = 0;
      }

      if (currentIndex >= text.length) {
        clearInterval(interval);
      }
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isDecrypting, text]);

  return <span className={className}>{displayText}</span>;
}
