import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { navigationItems } from "../../lib/invitation-content";
import { couple, coupleInitials } from "../../lib/wedding";

export function InvitationHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const [groomInitial, brideInitial] = coupleInitials;

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !mobileNavRef.current?.contains(target) &&
        !menuToggleRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeOnOutsideClick, true);
    return () => document.removeEventListener("click", closeOnOutsideClick, true);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a
        href="#home"
        className="monogram"
        aria-label={`${couple.groom.firstName} and ${couple.bride.firstName} home`}
      >
        {groomInitial}<span>&</span>{brideInitial}
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigationItems.map(([label, id]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <Button
          variant="ghost"
          size="icon"
          className="menu-toggle"
          ref={menuToggleRef}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {menuOpen && (
        <nav
          ref={mobileNavRef}
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigationItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault();
                const section = document.getElementById(id);
                if (!section) {
                  throw new Error(`Navigation section "${id}" was not found.`);
                }
                section.scrollIntoView({ behavior: "auto", block: "start" });
                setMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
