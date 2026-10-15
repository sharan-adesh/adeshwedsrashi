import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { coupleStoryPhotos } from "@/lib/invitation-content";
import { Ornament } from "@/components/invitation/ornament";

const autoplayDelay = 3000;

export function CoupleCarousel() {
  const photos = coupleStoryPhotos;
  const [viewportRef, carousel] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 35,
  });
  const [selected, setSelected] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const onSelect = useCallback(() => {
    if (carousel) setSelected(carousel.selectedScrollSnap());
  }, [carousel]);

  useEffect(() => {
    if (!carousel) return;
    onSelect();
    carousel.on("select", onSelect).on("reInit", onSelect);
    return () => {
      carousel.off("select", onSelect).off("reInit", onSelect);
    };
  }, [carousel, onSelect]);

  useEffect(() => {
    if (
      !carousel ||
      isHovered ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") carousel.scrollNext();
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [carousel, isHovered]);

  const scroll = (direction: "previous" | "next") => {
    const instant = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (direction === "next") carousel?.scrollNext(instant);
    else carousel?.scrollPrev(instant);
  };

  return (
    <div
      id="potraits"
      className="couple-carousel section reveal"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our story in five photographs"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        scroll(event.key === "ArrowRight" ? "next" : "previous");
      }}
    >
      <div className="reveal">
        <p className="eyebrow">HAMARI KAHANI</p>
        <h2>A little destiny. A lot of love.</h2>
        <Ornament />
        {/* <p className="section-description">
          Two different worlds, one perfectly imperfect love story.
        </p> */}
      </div>
      <div
        className="couple-viewport"
        ref={viewportRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="couple-track">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={`couple-slide ${selected === index ? "is-selected" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}`}
            >
              <div className="couple-image-frame">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={768}
                  height={1024}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="couple-carousel-footer">
        <div className="couple-caption" aria-live="polite" aria-atomic="true">
          <span className="couple-counter">
            {String(selected + 1).padStart(2, "0")} <span>/ 05</span>
          </span>
          <p>{photos[selected]?.caption}</p>
        </div>
        <div className="couple-controls">
          <Button
            size="icon"
            variant="outline"
            className="couple-arrow"
            aria-label="Previous couple photo"
            title="Previous photo"
            onClick={() => scroll("previous")}
          >
            <ArrowLeft size={18} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="couple-arrow"
            aria-label="Next couple photo"
            title="Next photo"
            onClick={() => scroll("next")}
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
      <div className="couple-pagination" aria-label="Choose a couple photo">
        {photos.map((photo, index) => (
          <Button
            key={photo.src}
            variant="ghost"
            className="couple-page"
            aria-label={`View couple photo ${index + 1}`}
            aria-current={selected === index ? "true" : undefined}
            title={`Photo ${index + 1}`}
            onClick={() =>
              carousel?.scrollTo(
                index,
                window.matchMedia("(prefers-reduced-motion: reduce)").matches,
              )
            }
          >
            <span />
          </Button>
        ))}
      </div>
    </div>
  );
}
