import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";

import { GalleryContext } from "../provider";
import { ElementContext } from "../App";
import type { SplashResponseImage } from "../types";

export default function Gallery() {
  const navigate = useNavigate();
  const { scrollElement } = useContext(ElementContext);
  const { images, fetchImages, setCurrentImage } = useContext(GalleryContext);

  function showDetailsHandler(image: SplashResponseImage) {
    setCurrentImage(image);
    navigate(`/photo/${image.id}`);
  }
  
  const handleScroll = useCallback(() => {
    if (scrollElement.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement.current;
      if (scrollTop + clientHeight >= scrollHeight - 2) fetchImages();
    }
  }, [fetchImages, scrollElement]);

  useEffect(() => {
    const scroller = scrollElement.current;
    if (scroller) scroller.addEventListener("scroll", handleScroll);
    return () => {
      if (scroller) scroller.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, scrollElement]);

  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {images.map((image: SplashResponseImage) => (
        // <div onClick={() => showDetailsHandler(image)}>
          <li key={image.slug} className="relative cursor-pointer" onClick={() => showDetailsHandler(image)}>
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img alt="" src={image.urls.thumb} className="pointer-events-none object-cover group-hover:opacity-75" />
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{image.description}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">{image.user.name}</p>
          </li>
        // </div>
      ))}
    </ul>
  );
}
