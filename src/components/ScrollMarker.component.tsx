import clsx from "clsx";

export default function ScrollMarker() {
  return (
    <div>
      <div
        className={clsx(
          "size-12",
          "bg-transparent",
          "absolute z-10 bottom-[1.6rem]",
          "border-white border-solid"
        )}
        style={{
          borderWidth: "0 0.25rem 0.25rem 0",
          animation: "scrolldown 1.2s ease-in-out infinite 0.15s",
        }}
      />
      <div
        className={clsx(
          "size-12",
          "bg-transparent",
          "absolute z-10 bottom-[2.5rem]",
          "border-white border-solid"
        )}
        style={{
          borderWidth: "0 0.25rem 0.25rem 0",
          animation: "scrolldown 1.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}
