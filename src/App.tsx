import { createContext, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import clsx from "clsx";

import { Gallery, ScrollMarker } from "./components";
import { GalleryProvider } from "./provider";

export const ElementContext = createContext(
  {} as {
    scrollElement: React.RefObject<HTMLDivElement>;
  }
);

export default function App() {
  const scrollElement = useRef(null);
  return (
    <ElementContext.Provider value={{ scrollElement }}>
      <div
        ref={scrollElement}
        className={clsx(
          "text-text",
          "flex flex-col items-center",
          "w-screen h-svh py-20 px-3",
          "overflow-y-scroll"
        )}
        style={{
          backgroundImage: "linear-gradient(#e8f0ff 0%, #f0f2f5 52.08%)",
        }}
      >
        <div
          className={clsx(
            "flex flex-col items-center",
            "w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
          )}
        >
          <GalleryProvider>
            <Gallery />
            <Outlet />
          </GalleryProvider>
        </div>
        <ScrollMarker />
        <ToastContainer />
      </div>
    </ElementContext.Provider>
  );
}
