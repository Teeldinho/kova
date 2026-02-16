import Lenis from "lenis";
import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      wheelMultiplier: 1.2,
    });

    return () => lenis.destroy();
  }, []);
}
