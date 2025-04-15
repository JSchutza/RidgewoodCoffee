'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";



const galleryImages = [
  { src: '/images/gallery/1.jpg', alt: 'Barista preparing coffee' },
  { src: '/images/gallery/2.jpg', alt: 'Coffee shop interior' },
  { src: '/images/gallery/3.jpg', alt: 'Latte art' },
  { src: '/images/gallery/4.jpg', alt: 'Coffee beans' },
  { src: '/images/gallery/5.jpg', alt: 'Pastry display' },
  { src: '/images/gallery/6.jpg', alt: 'Coffee brewing' },
];

export default function Gallery() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={galleryImages[photoIndex].src}
            nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length].src}
            prevSrc={galleryImages[(photoIndex + galleryImages.length - 1) % galleryImages.length].src}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + galleryImages.length - 1) % galleryImages.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % galleryImages.length)
            }
            imageTitle={galleryImages[photoIndex].alt}
          />
        )}
      </div>
    </section>
  );
} 