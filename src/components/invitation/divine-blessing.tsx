import arch from "../../assets/wedding-arch.jpg";
import { Ornament } from "./ornament";

export function DivineBlessing() {
  return (
    <section id="blessings" className="temple-section section reveal">
      <p className="eyebrow">WITH THE BLESSINGS OF THE DIVINE</p>
      <h2>Where every celebration begins</h2>
      <Ornament />
      <figure className="temple-frame">
        <img
          src={arch}
          alt="An ornate palace arch framed by golden temple spires at golden hour"
          width={1536}
          height={1024}
          loading="lazy"
        />
        <figcaption>
          <p>॥ ॐ नमः शिवाय ॥</p>
          <span>
            A prayer, a lamp, and the blessings of the divine before the
            festivities begin.
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
