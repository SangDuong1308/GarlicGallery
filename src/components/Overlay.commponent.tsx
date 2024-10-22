import clsx from "clsx";
import type { PropsWithChildren } from "react";

type OverlayProps = PropsWithChildren<{
  onExit: () => void;
}>;

export default function Overlay({ children, onExit }: OverlayProps) {
  return (
    <div
      className={clsx("fixed inset-0", "bg-black/[.5]", "flex items-center justify-center")}
      onClick={onExit}
    >
      <div className="size-fit" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
