"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/gallery-images";

type PhotoLightboxGalleryProps = {
  images: GalleryImage[];
  variant?: "home" | "page";
};

export function PhotoLightboxGallery({
  images,
  variant = "page",
}: PhotoLightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const activePosition = activeIndex === null ? 0 : activeIndex + 1;
  const gridClassName =
    variant === "home"
      ? "grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4"
      : "grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  const sizes =
    variant === "home"
      ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      : "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className={gridClassName}>
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={`group relative overflow-hidden rounded-lg bg-slate-100 shadow-sm ring-1 ring-slate-900/5 ${image.className ?? ""}`}
          >
            <button
              type="button"
              aria-label={`Deschide ${image.alt}`}
              onClick={() => setActiveIndex(index)}
              className="relative block h-full w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0994a8]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/8 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
              <span className="pointer-events-none absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 bg-white/92 text-[#087d8f] opacity-0 shadow-lg shadow-slate-950/20 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                <Plus className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
          </figure>
        ))}
      </div>

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie foto"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/92 px-4 py-6 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3">
            <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-white shadow-lg backdrop-blur">
              {activePosition} / {images.length}
            </span>
            <button
              type="button"
              aria-label="Închide imaginea"
              onClick={closeLightbox}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/12 text-white shadow-lg backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Imaginea precedentă"
            onClick={showPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/20 bg-white/12 text-white shadow-lg backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="relative h-[82vh] w-full max-w-6xl">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Imaginea următoare"
            onClick={showNext}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/20 bg-white/12 text-white shadow-lg backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
