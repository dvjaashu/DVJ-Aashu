import React, { useState, useEffect } from 'react';
import { Play, Pause, Disc, Calendar, Volume2, Sparkles, Sliders, ExternalLink, Video, Radio, ArrowRight, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { TRACKS, OFFICIAL_SOCIALS } from '../data/musicData';
import { audioEngine } from '../utils/audioEngine';
import { DvjAashuLogo } from './DvjAashuLogo';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreMusic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreMusic }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(TRACKS[0]);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      if (state.trackId) {
        const found = TRACKS.find(t => t.id === state.trackId);
        if (found) setActiveTrack(found);
      }
    });
    return () => unsub();
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.playTrack(activeTrack.id, activeTrack.bpm, activeTrack.duration, activeTrack.synthPreset);
    }
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.25,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-[var(--accent)]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Grid: Headline Left, Media/Track Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Story with Motion Container */}
          <motion.div
            className="lg:col-span-7 text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Prominent Eyebrow */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
                  18 YEARS OF AUDIO-VISUAL ARTISTRY • JAIPUR, RAJASTHAN
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-headline font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--text-primary)] leading-[1.08]"
            >
              Where Rajasthan roots meet experimental electronic sound.
            </motion.h1>

            {/* Lead Narrative */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed font-normal"
            >
              <strong className="text-[var(--text-primary)]">DVJ Aashu</strong> (Ashutosh Verma) is an acclaimed Audio-Visual DJ, Music Producer, and Composer with an 18-year legacy. Seamlessly fusing classical Rajasthani instrumental textures and Nazar Khan’s live flute with high-octane House, Trance, and frame-accurate live video scratching.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="px-6 py-3.5 rounded-full btn-primary text-xs font-medium flex items-center gap-2.5 shadow-md shadow-black/10 cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pause Web Audio Stream</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Audition: {activeTrack.title}</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full btn-secondary text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-[var(--border-subtle)]"
              >
                <span>Check Availability & Book</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              </button>
            </motion.div>

            {/* Verified Social Presence Quick-Pills */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[var(--text-tertiary)] mr-1">Official Channels:</span>
              <a
                href={OFFICIAL_SOCIALS.amazonMusic}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent)]/15 hover:text-[var(--accent)] text-[11px] font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors flex items-center gap-1"
              >
                <Music className="w-3 h-3 text-[var(--accent)]" />
                <span>Amazon Music</span>
              </a>
              <a
                href={OFFICIAL_SOCIALS.soundCloud}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent)]/15 hover:text-[var(--accent)] text-[11px] font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3 text-[var(--accent)]" />
                <span>SoundCloud</span>
              </a>
              <a
                href={OFFICIAL_SOCIALS.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent)]/15 hover:text-[var(--accent)] text-[11px] font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors flex items-center gap-1"
              >
                <span>Instagram</span>
              </a>
              <a
                href={OFFICIAL_SOCIALS.facebook}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent)]/15 hover:text-[var(--accent)] text-[11px] font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors flex items-center gap-1"
              >
                <span>Facebook</span>
              </a>
            </motion.div>

            {/* Verified Career Metrics */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div>
                <div className="font-headline font-bold text-xl sm:text-2xl text-[var(--text-primary)]">18 Years</div>
                <div className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">Pioneer Experience</div>
              </div>
              <div>
                <div className="font-headline font-bold text-xl sm:text-2xl text-[var(--text-primary)]">Classitrick</div>
                <div className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">Original Label Releases</div>
              </div>
              <div>
                <div className="font-headline font-bold text-xl sm:text-2xl text-[var(--text-primary)]">Live AV</div>
                <div className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">Synchronized Video VJ</div>
              </div>
              <div>
                <div className="font-headline font-bold text-xl sm:text-2xl text-[var(--text-primary)]">Rajasthan</div>
                <div className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">Folk & Flute Heritage</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: High-End Hero Showcase Card with Motion */}
          <motion.div
            className="lg:col-span-5 relative"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Apple-styled Media Card */}
            <div className="apple-card p-6 sm:p-7 relative shadow-2xl">
              
              {/* Artwork / Poster with Live AV Badge */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/10 mb-6">
                <img
                  src={activeTrack.coverUrl}
                  alt={activeTrack.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Overlays */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase">
                    {activeTrack.genre}
                  </span>
                  {activeTrack.collaborators && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-[var(--accent)]/90 backdrop-blur-md text-white">
                      Live Flute
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3.5 right-3.5">
                  <div className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center">
                    <Video className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                </div>
              </div>

              {/* Release Info & Synthesizer State */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] mb-1">
                  <span>Label: {activeTrack.label}</span>
                  <span className="text-[var(--accent)] font-semibold">{activeTrack.bpm} BPM • {activeTrack.key}</span>
                </div>

                <h3 className="font-headline font-bold text-xl text-[var(--text-primary)]">
                  {activeTrack.title}
                </h3>
                
                {activeTrack.collaborators && (
                  <p className="text-xs font-medium text-[var(--accent)] mt-0.5">
                    {activeTrack.collaborators}
                  </p>
                )}

                <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2 leading-relaxed">
                  {activeTrack.description}
                </p>

                {/* Direct Streaming Buttons */}
                <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {activeTrack.links.amazonMusic && (
                      <a
                        href={activeTrack.links.amazonMusic}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-medium)] text-[11px] font-mono text-[var(--text-primary)] transition-colors"
                      >
                        Amazon Music
                      </a>
                    )}
                    {activeTrack.links.soundCloud && (
                      <a
                        href={activeTrack.links.soundCloud}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-medium)] text-[11px] font-mono text-[var(--text-primary)] transition-colors"
                      >
                        SoundCloud
                      </a>
                    )}
                  </div>

                  <button
                    onClick={onExploreMusic}
                    className="text-xs font-medium text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View All Releases →
                  </button>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};


