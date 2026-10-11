import { Heart } from "lucide-react";
import { couple } from "../../lib/wedding";
import { Ornament } from "./ornament";

export function FamilyInvitation() {
  return (
    <section id="invitation" className="invitation-section section reveal">
      <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
      <h2>A celebration of love & togetherness</h2>
      <Ornament />
      <p className="section-description">
        With hearts full of joy, we invite you to be a part of ours.
      </p>
      <div className="blessing-frame">
        {/* <p className="sanskrit">अतिथि देवो भवः</p>
        <p className="hospitality">Our guests are our greatest blessing.</p> */}
        <div className="family-grid">
          <div>
            <p className="eyebrow">THE GROOM’S FAMILY</p>
            <h3>{couple.groom.parents.mother}{" & "}</h3>
            <h3>{couple.groom.parents.father}</h3>

            <p>
              request the pleasure of your company
              <br />
              at the wedding of their beloved son
            </p>
            <h4>{couple.groom.fullName}</h4>
          </div>
          <span className="family-heart">
            <Heart size={24} />
          </span>
          <div>
            <p className="eyebrow">THE BRIDE’S FAMILY</p>
            <h3>{couple.bride.parents.mother}{" & "}</h3>
            <h3>{couple.bride.parents.father}</h3>

            <p>
              as their cherished daughter
              <br />
              begins a beautiful new chapter
            </p>
            <h4>{couple.bride.fullName}</h4>
          </div>
        </div>
        <p className="blessing-note">
          Your presence, love, and blessings will make our day truly complete.
        </p>
      </div>
    </section>
  );
}
