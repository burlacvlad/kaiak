export type GalleryImage = {
  src: string;
  alt: string;
  className?: string;
};

export const galleryImages: GalleryImage[] = Array.from({ length: 24 }, (_, index) => {
  const imageNumber = index + 1;

  return {
    src: `/images/gallery/${imageNumber}.png`,
    alt: `Galerie foto ${imageNumber}`,
    className: "",
  };
});
