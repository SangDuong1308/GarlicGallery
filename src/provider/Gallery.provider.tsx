import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { browserApi, toast } from "../helper";

import type { PropsWithChildren } from "react";
import type { SplashResponseImage } from "../types";
// import { mock_images } from "../__mocks__";

export const GalleryContext = createContext(
  {} as {
    images: SplashResponseImage[];
    fetchImages: () => void;
    currentImage: SplashResponseImage | null;
    setCurrentImage: (image: SplashResponseImage) => void;
  }
);

export default function Gallery({ children }: PropsWithChildren) {
  console.log("[System]: GalleryProvider");
  const [images, setImages] = useState<SplashResponseImage[]>(useMemo(() => [], []));
  const [currentImage, setCurrentImage] = useState<SplashResponseImage | null>(null);
  const page = useRef(0);

  const fetchImages = useDebouncedCallback(async () => {
    if (page.current > 10) {
      toast.info("No more images to load!");
      return;
    }

    toast.loading("Loading images...");
    await browserApi.photos
      .getRandom({
        count: 30,
      })
      .then((result) => {
        console.log("[System]: ", result);
        if (result.errors) {
          toast.error("Failed to load images!");
          console.error("[System]: ", result.errors[0]);
        } else {
          page.current += 1;
          toast.success("Images loaded successfully!");
          setImages((prevImages) => [
            ...prevImages,
            ...(result.response as unknown as SplashResponseImage[]),
          ]);
        }
      })
      .catch((error) => {
        toast.error("Failed to load images!");
        console.error("[System]: ", error);
      });
    // const newMockImages = mock_images.map((image) => ({
    //   ...image,
    //   id: Math.random().toString(36),
    // }));
    // setImages((prevImages) => [...prevImages, ...newMockImages]);
  }, 1200);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <GalleryContext.Provider
      value={{
        images,
        fetchImages,
        currentImage,
        setCurrentImage,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}
