import { Phone } from "lucide-react";
import { footerContent } from "../../lib/invitation-content";
import {
  city,
  coupleInitials,
  celebrationDateRange,
} from "../../lib/wedding";

export function WeddingFooter() {
  return (
    <footer>
      <a href="#home" className="footer-monogram">
        {coupleInitials.join(" & ")}
      </a>
      <p>{footerContent.message}</p>
      <div className="footer-contact">
        <Phone size={14} />
        <p className="text-lg">{footerContent.contactNumber}</p>
      </div>
      <p className="footer-blessing sanskrit">{footerContent.blessing}</p>
      <span className="footer-date">
        {celebrationDateRange} · {city.toUpperCase()}
      </span>
    </footer>
  );
}
