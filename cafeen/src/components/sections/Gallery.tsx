import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Dialog } from '@headlessui/react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

// We're using the existing gallery images in public/images/gallery
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/gallery/1.png',
    alt: 'Coffee shop interior',
    caption: 'Our warm and inviting interior',
  },
  {
    id: 2,
    src: '/images/gallery/2.png',
    alt: 'Freshly brewed coffee',
    caption: 'Expertly crafted coffee',
  },
  {
    id: 3,
    src: '/images/gallery/3.png',
    alt: 'Coffee beans and equipment',
    caption: 'Only the finest coffee beans',
  },
  {
    id: 4,
    src: '/images/gallery/4.png',
    alt: 'Barista preparing coffee',
    caption: 'Our skilled baristas at work',
  },
  {
    id: 5,
    src: '/images/gallery/5.png',
    alt: 'Latte art',
    caption: 'Beautiful latte art in every cup',
  },
  {
    id: 6,
    src: '/images/gallery/6.png',
    alt: 'Coffee shop seating area',
    caption: 'Comfortable seating to relax and enjoy',
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="gallery" className="section bg-white">
      <div className="container">
        <h2 className="heading text-center">Gallery</h2>
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className={`transition-all duration-500 delay-${index * 100}`}
              >
                <button
                  onClick={() => setSelectedImage(image)}
                  className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Dialog */}
        <Dialog
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-4">
              {selectedImage && (
                <div className="space-y-4">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full rounded-lg"
                  />
                  {selectedImage.caption && (
                    <p className="text-center text-gray-700">{selectedImage.caption}</p>
                  )}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                  >
                    <svg 
                      className="h-6 w-6" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery; 