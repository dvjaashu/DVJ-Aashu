import React, { useState } from 'react';
import { Camera, Calendar, MapPin, Users, X, ChevronLeft, ChevronRight, Eye, Sparkles, Filter, Video } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/galleryData';
import { GalleryPhoto } from '../types';

export const EventGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'festivals' | 'clubs' | 'royal_palace' | 'backstage_av'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const activePhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Category Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider block mb-2">
              18-YEAR CAREER VISUAL ARCHIVE
            </span>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight text-[var(--text-primary)]">
              From landmark 2013 electro sets to royal palace galas.
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-3">
              Documenting DVJ Aashu's audio-visual stages — spanning the historic 2013 Summer Spark at Hotel OM Tower, Ora Club Jaipur residencies, and opulent palace galas across Rajasthan.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-surface-elevated)] rounded-full self-start md:self-auto border border-[var(--border-subtle)] shadow-sm overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Archives' },
              { id: 'festivals', label: 'Festivals & Concerts' },
              { id: 'clubs', label: 'Club Residencies (Ora)' },
              { id: 'royal_palace', label: 'Royal Palaces' },
              { id: 'backstage_av', label: 'AV Rigs & VJ' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Masonry-Inspired Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="apple-card p-3 group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white text-left">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/80 mb-1">
                    <MapPin className="w-3 h-3 text-[var(--accent)]" />
                    <span>{photo.city}</span>
                    <span>•</span>
                    <span>{photo.date}</span>
                  </div>
                  <h4 className="font-headline font-bold text-sm leading-tight text-white">
                    {photo.title}
                  </h4>
                  {photo.visualSetup && (
                    <p className="text-[11px] text-white/80 line-clamp-1 mt-1 font-mono">
                      {photo.visualSetup}
                    </p>
                  )}
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase">
                    {photo.category.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Minimal Card Footer */}
              <div className="p-3 text-left">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
                  <span>{photo.event}</span>
                  <span>{photo.date}</span>
                </div>
                <h4 className="font-headline font-semibold text-sm text-[var(--text-primary)] mt-1 group-hover:text-[var(--accent)] transition-colors">
                  {photo.title}
                </h4>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          
          {/* Close Lightbox */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev / Next Nav */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="apple-card max-w-4xl w-full p-4 sm:p-6 bg-[var(--bg-surface)] border border-[var(--border-medium)] overflow-hidden shadow-2xl">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black mb-4">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-left space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
                    {activePhoto.event} • {activePhoto.date}
                  </span>
                  <h3 className="font-headline font-bold text-xl text-[var(--text-primary)]">
                    {activePhoto.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{activePhoto.location}, {activePhoto.city}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--text-secondary)] pt-1">
                {activePhoto.visualSetup && (
                  <div className="sm:col-span-2">
                    <span className="font-mono font-medium text-[var(--text-primary)] block text-[11px]">Audio-Visual Production:</span>
                    <span>{activePhoto.visualSetup}</span>
                  </div>
                )}
                {activePhoto.attendance && (
                  <div>
                    <span className="font-mono font-medium text-[var(--text-primary)] block text-[11px]">Crowd Attendance:</span>
                    <span>{activePhoto.attendance}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
