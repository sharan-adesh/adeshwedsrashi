import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import temple from "../../assets/temple-poster.webp";
import {
  city,
  couple,
  countdown,
  region,
  weddingDateDisplayLabel,
} from "../../lib/wedding";
import { InvitationPetal } from "./invitation-petal";
import { Ornament } from "./ornament";

const countdownLabels = ["Days", "Hours", "Minutes", "Seconds"] as const;

type InvitationHeroProps = {
  active: boolean;
};

export function InvitationHero({ active }: InvitationHeroProps) {
  const [time, setTime] = useState<number[] | null>(null);
  const heroRef = useRef<HTMLImageElement>(null);
  const petals = Array.from({ length: 28 }, (_, index) => {
    const left = (index * 37 + 7) % 100;
    const drift = (index % 2 === 0 ? -1 : 1) * (12 + ((index * 9) % 18));
    const rotation = ((index * 29) % 180) - 90;
    const scale = 0.58 + ((index * 7) % 11) / 20;

    return {
      left,
      drift,
      rotation,
      scale,
      animationDelay: `${((index * 13) % 28) / 4}s`,
      animationDuration: 11 + ((index * 5) % 7),
    };
  });

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
      <div className={`petals${active ? " petals--active" : ""}`} aria-hidden="true">
        {petals.map((petal, index) => (
          <InvitationPetal
            key={index}
            variant={index % 3}
            style={{
              left: `${petal.left}%`,
              animationDelay: petal.animationDelay,
              animationDuration: `${petal.animationDuration}s`,
              ["--petal-drift-x" as string]: `${petal.drift}px`,
              ["--petal-rotation" as string]: `${petal.rotation}deg`,
              ["--petal-scale" as string]: `${petal.scale}`,
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
      <div className="hero-top" />
      <div className="hero-bottom" />
    </section>
  );
}
