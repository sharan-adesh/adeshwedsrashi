import {
  useEffect,
  useRef,
  useState,
  type TransitionEvent,
} from "react";
import { Heart } from "lucide-react";
import { coupleDisplayName, coupleInitials } from "../../lib/wedding";
import { InvitationPetal } from "./invitation-petal";

const scatterRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

type InvitationEnvelopeProps = {
  onOpen: () => void;
  onComplete: () => void;
};

export function InvitationEnvelope({
  onOpen,
  onComplete,
}: InvitationEnvelopeProps) {
  const [opening, setOpening] = useState(false);
  const previousOverflow = useRef<string | null>(null);
  const [groomInitial, brideInitial] = coupleInitials;
  const petals = Array.from({ length: 28 }, (_, index) => {
    const seed = index + 1;
    const angle = scatterRandom(seed * 31 + 1) * Math.PI * 2;
    const radius = 0.25 + scatterRandom(seed * 31 + 2) * 0.75;
    const x = Math.cos(angle) * radius * 52;
    const y = Math.sin(angle) * radius * 52;

    return {
      x: `${x}vmin`,
      y: `${y}vmin`,
      midX: `${x * 0.62 + (scatterRandom(seed * 31 + 7) - 0.5) * 8}vmin`,
      midY: `${y * 0.62 + (scatterRandom(seed * 31 + 8) - 0.5) * 6}vmin`,
      rotation: `${(scatterRandom(seed * 31 + 9) - 0.5) * 360}deg`,
      midRotation: `${(scatterRandom(seed * 31 + 10) - 0.5) * 200}deg`,
      delay: `${scatterRandom(seed * 31 + 11) * 160}ms`,
      scale: 0.52 + scatterRandom(seed * 31 + 12) * 0.62,
    };
  });

  useEffect(() => {
    previousOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (previousOverflow.current !== null) {
        document.documentElement.style.overflow = previousOverflow.current;
      }
    };
  }, []);

  const releaseScroll = () => {
    if (previousOverflow.current === null) return;
    document.documentElement.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
  };

  const open = () => {
    if (opening) return;

    setOpening(true);
    onOpen();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      releaseScroll();
      onComplete();
      return;
    }
  };

  const finishOpening = (event: TransitionEvent<HTMLSpanElement>) => {
    if (event.propertyName !== "transform") return;
    releaseScroll();
    onComplete();
  };

  return (
    <section
      className={`invitation-cover${opening ? " invitation-cover--opening" : ""}`}
      aria-label="Wedding invitation cover"
      aria-hidden={opening}
    >
      <span
        className="invitation-cover__panel invitation-cover__panel--left"
        aria-hidden="true"
        onTransitionEnd={finishOpening}
      />
      <span
        className="invitation-cover__panel invitation-cover__panel--right"
        aria-hidden="true"
      />
      <div className="invitation-cover__frame" aria-hidden="true">
        <span className="invitation-cover__corner invitation-cover__corner--top-left" />
        <span className="invitation-cover__corner invitation-cover__corner--top-right" />
        <span className="invitation-cover__corner invitation-cover__corner--bottom-left" />
        <span className="invitation-cover__corner invitation-cover__corner--bottom-right" />
      </div>
      <span className="invitation-cover__seam" aria-hidden="true" />
      {opening && (
        <div className="invitation-cover__petals" aria-hidden="true">
          {petals.map((petal, index) => (
            <InvitationPetal
              key={index}
              variant={index % 3}
              className="invitation-cover__petal"
              style={{
                left: "50%",
                top: "50%",
                ["--scatter-x" as string]: petal.x,
                ["--scatter-y" as string]: petal.y,
                ["--scatter-mid-x" as string]: petal.midX,
                ["--scatter-mid-y" as string]: petal.midY,
                ["--scatter-rotation" as string]: petal.rotation,
                ["--scatter-mid-rotation" as string]: petal.midRotation,
                ["--scatter-delay" as string]: petal.delay,
                ["--petal-scale" as string]: petal.scale,
              }}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        className="invitation-cover__button"
        onClick={open}
        aria-label={`Open ${coupleDisplayName}'s wedding invitation`}
        disabled={opening}
      >
        <span className="invitation-cover__seal" aria-hidden="true">
          <span>{groomInitial}</span>
          <Heart size={15} fill="currentColor" />
          <span>{brideInitial}</span>
        </span>
        <span className="invitation-cover__prompt">Tap to open</span>
      </button>
    </section>
  );
}
