import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import arch from "../../assets/venue-city.webp";
import {
  city,
  directionsUrl,
  region,
  travelOptions,
  venue,
} from "../../lib/wedding";
import { Ornament } from "./ornament";

export function VenueSection() {
  return (
    <section id="venue" className="venue-section section">
      <div className="reveal">
        <p className="eyebrow">A ROYAL SETTING FOR OUR FOREVER</p>
        <h2>Meet us in the City of Forts</h2>
        <Ornament />
      </div>
      <div className="venue-grid reveal">
        <div className="venue-photo">
          <img
            src={arch}
            alt="Golden-hour palace views across Gwalior, with the fort ramparts beyond"
            width={1536}
            height={1024}
            loading="lazy"
          />
          <span>
            <MapPin size={15} /> {`${city}, ${region}`.toUpperCase()}
          </span>
        </div>
        <div className="venue-details">
          <p className="eyebrow">THE WEDDING VENUE</p>
          <h3>{venue.name}</h3>
          <p className="venue-address">
            {venue.line1}
            <br />
            {venue.line2}
          </p>
          {/* <p className="venue-note">
            Raised above the ramparts of {venue.landmark},
            <br className="hidden lg:block" /> a palace as timeless as the
            promises we’ll make.
          </p> */}
          <Button asChild className="h-11">
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              <MapPin /> Get directions <ArrowUpRight />
            </a>
          </Button>
          <div className="travel-notes">
            <h4>A little help getting here</h4>
            {travelOptions.map(({ mode, details }) => (
              <p key={mode}>
                <strong>{mode}</strong> · {details}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
