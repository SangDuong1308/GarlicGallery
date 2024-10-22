'use client';

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDate } from "date-fns";
import clsx from "clsx";

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

import { GalleryContext } from "../provider";
import Overlay from "./Overlay.commponent";

const product = {
  name: 'Zip Tote Basket',
  price: '$220',
  rating: 3.9,
  href: '#',
  description:
    'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
  imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-04.jpg',
  imageAlt: 'Back angled view with bag open and handles to the side.',
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ImageDetails() {
  const [open, setOpen] = useState(true)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  const navigate = useNavigate();
  const { currentImage } = useContext(GalleryContext);

  if (!currentImage) return null;
  return (
      <div className={clsx("sm:rounded-lg overflow-hidden")}>

        <Dialog open={open} onClose={() => { setOpen(false); navigate("/"); }} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <DialogPanel
                transition
                className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
              >
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      navigate("/");
                    }}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                        {/* <img alt={product.imageAlt} src={product.imageSrc} className="object-cover object-center" /> */}
                        <img alt={currentImage.description} src={currentImage.urls.full} className="object-cover object-center" />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{currentImage.description || "Untitled"}</h2>

                      <section aria-labelledby="information-heading" className="mt-3">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <div className="mt-6">
                          <h4 className="sr-only">Description</h4>

                          <p className="text-sm text-gray-700"> <span className="font-semibold">Author</span>:  {currentImage.user.name}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Create at</span>:{" "} {formatDate(currentImage.created_at, "MMMM dd, yyyy")}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Updated at</span>:{" "}{formatDate(currentImage.updated_at, "MMMM dd, yyyy")}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Promoted at</span>:{" "}{formatDate(currentImage.promoted_at, "MMMM dd, yyyy")}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Location</span>:{" "}{currentImage.location.name ? `${currentImage.location.name}, ${currentImage.location.city}, ${currentImage.location.country}`
                          : "Unknown"}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Likes</span>: {currentImage.likes}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Views</span>: {currentImage.views}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Downloads</span>: {currentImage.downloads}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Size</span>: {currentImage.width} x {currentImage.height}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Slug</span>: {currentImage.slug}</p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
  );
}
