import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { celebrationEvents } from "../../lib/invitation-content";
import { calendarUrl, celebrationDays } from "../../lib/wedding";
import { Ornament } from "./ornament";

export function Celebrations() {
  const [day, setDay] = useState(0);

  return (
    <section id="celebrations" className="celebration-section section">
      <div className="reveal">
        <p className="eyebrow">LET THE FESTIVITIES BEGIN</p>
        <h2>Moments to cherish, memories to keep</h2>
        <Ornament />
        <p className="section-description">
          Two days of colour, music, rituals, and a whole lot of love.
        </p>
      </div>
      <div className="day-tabs" role="tablist" aria-label="Celebration days">
        {celebrationDays.map((label, index) => (
          <Button
            key={label}
            role="tab"
            aria-selected={day === index}
            aria-controls="event-panel"
            variant={day === index ? "default" : "ghost"}
            onClick={() => setDay(index)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="events" id="event-panel" role="tabpanel">
        {celebrationEvents.map(
          (event, index) =>
            (day === 0 ? index < 2 : index >= 2) && (
              <article className="event" key={event.name}>
                <span className="event-icon">
                  <event.icon size={25} />
                </span>
                <div className="event-heading">
                  <span className="min-w-0">
                    <span className="event-time">{event.time}</span>
                    <span className="event-name">{event.name}</span>
                  </span>
                </div>
                <div id={`event-${index}`} className="event-details">
                  <p>{event.detail}</p>
                </div>
              </article>
            ),
        )}
      </div>
      <div className="section-actions">
        <Button asChild variant="default" className="h-11 bg-primary text-primary-foreground hover:bg-primary/90">
          <a href={calendarUrl} target="_blank" rel="noreferrer">
            <CalendarDays />
            Add to Google Calendar
          </a>
        </Button>
      </div>
    </section>
  );
}
