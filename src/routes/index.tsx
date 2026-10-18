import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play , AudioLines} from "lucide-react";
import { Celebrations } from "@/components/invitation/celebrations";
import { CoupleCarousel } from "@/components/couple-carousel";
import { InvitationEnvelope } from "@/components/invitation/invitation-envelope";
import { FamilyInvitation } from "@/components/invitation/family-invitation";
import { InvitationHeader } from "@/components/invitation/invitation-header";
import { InvitationHero } from "@/components/invitation/invitation-hero";
import { VenueSection } from "@/components/invitation/venue-section";
import { WeddingRSVP } from "@/components/wedding-rsvp";
import { WeddingFooter } from "@/components/invitation/wedding-footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  celebrationDateRange,
  city,
  couple,
  coupleDisplayName,
  region,
} from "@/lib/wedding";
import { navigationItems } from "@/lib/invitation-content";

const sectionIds = ["home", ...navigationItems.map(([, id]) => id)];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${coupleDisplayName} | Wedding Invite` },
      {
        name: "description",
        content: `With love and blessings, join ${couple.groom.firstName} and ${couple.bride.firstName} for their wedding celebrations on ${celebrationDateRange} in ${city}.`,
      },
      {
        property: "og:title",
        content: `${coupleDisplayName} — Together, Forever`,
      },
      {
        property: "og:description",
        content: `An invitation to love, laughter, and a lifetime together. ${celebrationDateRange} · ${city}, ${region}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [coverVisible, setCoverVisible] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal();

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioError(null);
    void audio.play().catch((error: unknown) => {
      console.error("Unable to play the invitation music.", error);
      setAudioError("Music could not be played. Please try again.");
    });
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) playAudio();
    else audio.pause();
  };

  const openInvitation = () => {
    setOpened(true);
    playAudio();
    window.requestAnimationFrame(() => pageRef.current?.focus());
  };

  useEffect(() => {
    const stopAudio = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
      setAudioError(null);
    };

    const stopAudioWhenHidden = () => {
      if (document.visibilityState === "hidden") stopAudio();
    };

    document.addEventListener("visibilitychange", stopAudioWhenHidden);
    window.addEventListener("blur", stopAudio);
    return () => {
      document.removeEventListener("visibilitychange", stopAudioWhenHidden);
      window.removeEventListener("blur", stopAudio);
    };
  }, []);

  useEffect(() => {
    let scrollTimeout = 0;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.35;
      let activeSectionId = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          activeSectionId = id;
        }
      }

      const hash = activeSectionId === "home" ? "" : `#${activeSectionId}`;
      if (window.location.hash !== hash) {
        // Keep this URL-only update from triggering TanStack Router navigation and hash scrolling.
        History.prototype.replaceState.call(
          window.history,
          window.history.state,
          "",
          `${window.location.pathname}${window.location.search}${hash}`,
        );
      }
    };

    const scheduleUpdate = () => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(updateActiveSection, 150);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <>
      {coverVisible && (
        <InvitationEnvelope
          onOpen={openInvitation}
          onComplete={() => setCoverVisible(false)}
        />
      )}
      <main
        ref={pageRef}
        tabIndex={opened ? -1 : undefined}
        aria-hidden={!opened}
        inert={!opened}
        className={`invitation-page${opened ? " invitation-page--ready" : ""}`}
      >
        <InvitationHeader />
        <InvitationHero active={opened} />
        <FamilyInvitation />
        <CoupleCarousel />
        <Celebrations />
        <VenueSection />
        <WeddingFooter />
        <WeddingRSVP open={rsvpOpen} onOpenChange={setRsvpOpen} />
      </main>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}krishna-flute.mp3`}
        loop
        preload="auto"
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
      />
      {opened && (
        <div className="music-player">
          <button
            type="button"
            className="music-player__toggle"
            aria-label={audioPlaying ? "Pause music" : "Play music"}
            aria-pressed={audioPlaying}
            onClick={toggleAudio}
          >
            {audioPlaying ? <Pause size={16} /> : <Play size={16} />}
            <AudioLines
              className={`music-player__audio-lines${audioPlaying ? " music-player__audio-lines--playing" : ""}`}
              size={16}
              aria-hidden="true"
            />
            {/* <span>{audioPlaying ? "Pause music" : "Play music"}</span> */}
          </button>
          {audioError && (
            <span className="music-player__error" role="alert">
              {audioError}
            </span>
          )}
        </div>
      )}
    </>
  );
}
