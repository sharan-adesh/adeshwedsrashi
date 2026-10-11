import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}
