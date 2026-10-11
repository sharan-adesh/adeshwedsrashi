import { Flower2 } from "lucide-react";

type OrnamentProps = {
  light?: boolean;
};

export function Ornament({ light = false }: OrnamentProps) {
  return (
    <div className={`ornament ${light ? "light" : ""}`} aria-hidden="true">
      <span />
      <Flower2 size={22} />
      <span />
    </div>
  );
}
