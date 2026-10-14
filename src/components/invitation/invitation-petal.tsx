import type {
  AnimationEventHandler,
  CSSProperties,
} from "react";

type PetalStyle = CSSProperties & {
  [property: `--${string}`]: string | number | undefined;
};

type InvitationPetalProps = {
  variant: number;
  className?: string;
  style?: PetalStyle;
  onAnimationEnd?: AnimationEventHandler<HTMLElement>;
};

export function InvitationPetal({
  variant,
  className,
  style,
  onAnimationEnd,
}: InvitationPetalProps) {
  return (
    <i
      className={`invitation-petal invitation-petal--${variant % 4}${className ? ` ${className}` : ""}`}
      style={style}
      onAnimationEnd={onAnimationEnd}
      aria-hidden="true"
    />
  );
}
