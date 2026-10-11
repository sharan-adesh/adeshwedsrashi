import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import temple from "../../assets/shiva-temple (2).jpg";
import {
  city,
  couple,
  countdown,
  region,
  weddingDateDisplayLabel,
} from "../../lib/wedding";
import { Ornament } from "./ornament";

const countdownLabels = ["Days", "Hours", "Minutes", "Seconds"] as const;

export function InvitationHero() {
  const [time, setTime] = useState<number[] | null>(null);
  const heroRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateCountdown = () => setTime(countdown(Date.now()));
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const handleScroll = () => {
      if (!heroRef.current || reduceMotion) return;
      heroRef.current.style.transform = `translateY(${Math.min(window.scrollY * 0.15, 120)}px) scale(1.03)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <img
        ref={heroRef}
        src={temple}
        alt="A sandstone Lord Shiva temple at golden hour, its shikhara rising above a shivling adorned with marigolds and glowing oil lamps"
        className="hero-image"
        width={1536}
        height={1024}
        fetchPriority="high"
      />
      <div className="hero-wash" />
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${(index * 37 + 7) % 100}%`,
              animationDelay: `${-((index * 17) % 24)}s`,
              animationDuration: `${14 + ((index * 7) % 12)}s`,
            }}
          />
        ))}
      </div>
      <div className="hero-content">
        <p className="invocation sanskrit">|| ॐ श्री गणेशाय नमः ||</p>
        <Ornament />
        <p className="eyebrow hero-eyebrow">TWO SOULS. ONE SACRED JOURNEY.</p>
        <h1>
          {couple.groom.firstName} <span>&</span> {couple.bride.firstName}
        </h1>
        <p className="hero-intro">
          Together with their families,
          <br />
          invite you to celebrate their union
        </p>
        <div className="hero-date">
          <span>{weddingDateDisplayLabel}</span>
          <b>◆</b>
          <span>{`${city}, ${region}`.toUpperCase()}</span>
        </div>
        <div className="countdown" aria-label="Countdown to the wedding">
          {countdownLabels.map((label, index) => (
            <div key={label}>
              <strong>
                {time ? String(time[index]).padStart(2, "0") : "—"}
              </strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <a className="scroll-indicator" href="#invitation">
          SCROLL TO CELEBRATE
          <ChevronDown size={18} />
        </a>
      </div>
      <div className="hero-bottom" />
    </section>
  );
}
