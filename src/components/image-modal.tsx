// src/components/image-modal.tsx
"use client";

import React, { useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  images: StaticImageData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal content */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 z-10"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            {/* Image counter - top center */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white rounded-full shadow-lg z-10">
              <span className="text-sm font-semibold text-gray-900">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Previous button - left side */}
            {images.length > 1 && (
              <button
                onClick={onPrevious}
                className="absolute left-4 p-4 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                disabled={currentIndex === 0}
                aria-label="Previous image"
              >
                <FaChevronLeft size={20} />
              </button>
            )}

            {/* Next button - right side */}
            {images.length > 1 && (
              <button
                onClick={onNext}
                className="absolute right-4 p-4 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                disabled={currentIndex === images.length - 1}
                aria-label="Next image"
              >
                <FaChevronRight size={20} />
              </button>
            )}

            {/* Image container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentImage.src}
                  alt={`Gallery image ${currentIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  priority
                />
              </div>
            </motion.div>

            {/* Click outside hint - bottom center */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-xs text-white/80">
                Press ESC or click outside to close
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;