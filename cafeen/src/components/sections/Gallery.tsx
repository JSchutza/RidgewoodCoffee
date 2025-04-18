import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'Escape':
          setSelectedImageIndex(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

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
                  onClick={() => setSelectedImageIndex(index)}
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
          open={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-4 relative">
              {selectedImage && (
                <div className="space-y-3">
                  <div className="relative max-h-[70vh] overflow-hidden">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                    />
                  </div>
                  {selectedImage.caption && (
                    <p className="text-center text-sm text-gray-700">{selectedImage.caption}</p>
                  )}
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-colors z-10"
                    aria-label="Close"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  
                  {/* Navigation buttons */}
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <button 
                      onClick={handlePrevImage}
                      className="bg-white/70 hover:bg-white/90 rounded-r-md p-1 shadow-md transition-colors ml-2"
                      aria-label="Previous image"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                    </button>
                  </div>
                  
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button 
                      onClick={handleNextImage}
                      className="bg-white/70 hover:bg-white/90 rounded-l-md p-1 shadow-md transition-colors mr-2"
                      aria-label="Next image"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                    </button>
                  </div>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {selectedImageIndex + 1} / {galleryImages.length}
                  </div>
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