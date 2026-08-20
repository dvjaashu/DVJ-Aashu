import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MusicShowcase } from './components/MusicShowcase';
import { LatestUpdates } from './components/LatestUpdates';
import { EventGallery } from './components/EventGallery';
import { VirtualBooth } from './components/VirtualBooth';
import { TourCalendar } from './components/TourCalendar';
import { ServicesAndGear } from './components/ServicesAndGear';
import { BookingSection } from './components/BookingSection';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { PressKitModal } from './components/PressKitModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isPressKitOpen, setIsPressKitOpen] = useState(false);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMusic = () => {
    const el = document.getElementById('music');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-[var(--accent)] selection:text-white transition-colors duration-300">
        
        {/* Top Floating Glass Navigation with Theme Toggle */}
        <Navbar
          onOpenBooking={scrollToBooking}
          onOpenPressKit={() => setIsPressKitOpen(true)}
        />

        {/* Main Content Sections */}
        <main>
          {/* 1. Hero & Live Stream Teaser with Framer Motion animations */}
          <Hero
            onOpenBooking={scrollToBooking}
            onExploreMusic={scrollToMusic}
          />

          {/* 2. Discography, Original Music & Live Sets */}
          <MusicShowcase
            onOpenBooking={scrollToBooking}
          />

          {/* 3. Latest Updates & Instagram Social Feed (@dvjaashuofficial) */}
          <LatestUpdates />

          {/* 4. Event Photography & Cinematic Media Gallery */}
          <EventGallery />

          {/* 5. Interactive Virtual DJ Booth Console */}
          <VirtualBooth />

          {/* 6. World Tour Calendar & RSVP */}
          <TourCalendar
            onOpenBooking={scrollToBooking}
          />

          {/* 7. Performance Services, Technical Rider & 18-Year Timeline */}
          <ServicesAndGear
            onOpenBooking={scrollToBooking}
          />

          {/* 8. Event Specifier & Booking Inquiry Wizard */}
          <BookingSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Persistent Global Bottom Audio Dock */}
        <AudioPlayerBar />

        {/* Electronic Press Kit (EPK) Modal */}
        <PressKitModal
          isOpen={isPressKitOpen}
          onClose={() => setIsPressKitOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}

