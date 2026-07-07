import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PhotoLightboxGallery } from "@/components/photo-lightbox-gallery";
import { galleryImages } from "@/lib/gallery-images";

export const metadata: Metadata = {
  title: "Galerie foto | KAYAK Nistru",
  description:
    "Galerie foto cu caiace gonflabile, camping și peisaje de pe Nistru.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#f6fafb] text-[#13233f]">
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#0a3956] shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Înapoi
          </Link>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0994a8]">
            KAYAK Nistru
          </span>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
            Galerie foto
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#0a3956] sm:text-5xl">
            Mai multe poze din aventurile noastre
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            O galerie simplă cu imagini din zona Nistrului, caiacele noastre și
            echipamentul de camping.
          </p>

          <div className="mt-10">
            <PhotoLightboxGallery images={galleryImages} variant="page" />
          </div>
        </div>
      </section>
    </main>
  );
}
