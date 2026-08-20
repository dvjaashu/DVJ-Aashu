import React, { useState, useEffect } from 'react';
import { Play, Pause, Disc, Filter, Volume2, Sliders, X, Sparkles, ExternalLink, Radio, Check, Music, Video, Headphones } from 'lucide-react';
import { TRACKS, OFFICIAL_SOCIALS } from '../data/musicData';
import { Track } from '../types';
import { TrackCard } from './TrackCard';
import { audioEngine } from '../utils/audioEngine';

interface MusicShowcaseProps {
  onOpenBooking: () => void;
}

export const MusicShowcase: React.FC<MusicShowcaseProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'tracks' | 'soundcloud'>('tracks');
  const [filterType, setFilterType] = useState<'all' | 'folk' | 'house' | 'trance' | 'live_av'>('all');
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStemTrack, setActiveStemTrack] = useState<Track | null>(null);
  const [selectedSoundcloudTrack, setSelectedSoundcloudTrack] = useState<Track>(TRACKS[0]);

  // Real-time stems mute states
  const [mutedStems, setMutedStems] = useState({
    drums: false,
    bass: false,
    synths: false,
    vocals: false,
  });

  const [stemFilterFreq, setStemFilterFreq] = useState(20000);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setActiveTrackId(state.trackId);
    });
    return () => unsub();
  }, []);

  const filteredTracks = TRACKS.filter(track => {
    if (filterType === 'all') return true;
    if (filterType === 'folk') return track.genre === 'Folk Fusion' || !!track.collaborators;
    if (filterType === 'house') return track.genre === 'House' || track.genre === 'Deep House';
    if (filterType === 'trance') return track.genre === 'Trance';
    if (filterType === 'live_av') return track.genre === 'Live AV Mix';
    return true;
  });

  const handleTrackPlayToggle = (track: Track) => {
    if (isPlaying && activeTrackId === track.id) {
      audioEngine.pause();
    } else {
      audioEngine.playTrack(track.id, track.bpm, track.duration, track.synthPreset);
    }
  };

  const toggleStemMute = (stem: 'drums' | 'bass' | 'synths' | 'vocals') => {
    const nextVal = !mutedStems[stem];
    setMutedStems(prev => ({ ...prev, [stem]: nextVal }));
    audioEngine.setStemMute(stem, nextVal);
  };

  return (
    <section id="music" className="py-24 lg:py-32 bg-[var(--bg-primary)] border-y border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider block mb-2">
              ORIGINAL RELEASES & SOUNDCLOUD EMBEDS
            </span>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight text-[var(--text-primary)]">
              Crafted in Rajasthan, engineered for the world.
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-3">
              Explore DVJ Aashu's verified discography on Classitrick — blending classical Bansuri flute melodies, heavy folk percussion, and driving electronic rhythms.
            </p>
          </div>

          {/* Player Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-[var(--bg-surface-elevated)] rounded-full border border-[var(--border-subtle)] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tracks'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Discography & Stems</span>
            </button>
            <button
              onClick={() => setActiveTab('soundcloud')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'soundcloud'
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Official SoundCloud Stream</span>
            </button>
          </div>
        </div>

        {/* View Mode: SoundCloud Direct Widget Integration */}
        {activeTab === 'soundcloud' && (
          <div className="mb-14 apple-card p-6 sm:p-8 border border-[var(--accent)]/30 shadow-xl text-left">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] text-[10px] font-mono font-bold uppercase">
                    LIVE SOUNDCLOUD INTEGRATION
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)]">Verified Artist Profile</span>
                </div>
                <h3 className="font-headline font-bold text-2xl text-[var(--text-primary)]">
                  Stream Tracks Directly via Official SoundCloud
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Listen to the exact studio masters, live AV mixes, and original compositions on DVJ Aashu's SoundCloud channel.
                </p>
              </div>

              <a
                href={OFFICIAL_SOCIALS.soundCloud}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full btn-primary text-xs font-medium flex items-center gap-2 self-start lg:self-auto shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open SoundCloud in New Tab</span>
              </a>
            </div>

            {/* Quick Track Selector for Embed */}
            <div className="py-5">
              <span className="text-xs font-mono font-semibold text-[var(--text-primary)] block mb-3">
                Select Track to Load in Widget:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {TRACKS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedSoundcloudTrack(t)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedSoundcloudTrack.id === t.id
                        ? 'bg-[var(--bg-surface-elevated)] border-[var(--accent)] shadow-md ring-1 ring-[var(--accent)]'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[var(--accent)] uppercase mb-1 font-semibold">
                      {t.genre}
                    </div>
                    <div className="font-headline font-bold text-xs text-[var(--text-primary)] line-clamp-1">
                      {t.title}
                    </div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-1">
                      {t.bpm} BPM
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* SoundCloud Iframe Embed Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-black/5 border border-[var(--border-medium)] shadow-inner mt-2">
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                title={`SoundCloud - ${selectedSoundcloudTrack.title}`}
                src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dvjaashu&color=%230071e3&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                className="w-full rounded-2xl"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)] font-mono">
              <span>Playing from: soundcloud.com/dvjaashu</span>
              <div className="flex items-center gap-3">
                <a href={OFFICIAL_SOCIALS.amazonMusic} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">
                  Amazon Music Profile →
                </a>
                <a href={OFFICIAL_SOCIALS.appleMusic} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">
                  Apple Music Profile →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* View Mode: Interactive Track Grid */}
        {activeTab === 'tracks' && (
          <>
            {/* Filter Pills */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-surface-elevated)] rounded-full border border-[var(--border-subtle)] overflow-x-auto max-w-full">
                {(['all', 'folk', 'house', 'trance', 'live_av'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      filterType === type
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {type === 'all' ? 'All Releases' : type === 'folk' ? 'Folk & Flute' : type === 'house' ? 'House' : type === 'trance' ? 'Trance (144 BPM)' : 'Live AV Mixes'}
                  </button>
                ))}
              </div>

              <span className="hidden sm:inline text-xs font-mono text-[var(--text-tertiary)]">
                Showing {filteredTracks.length} Verified Tracks
              </span>
            </div>

            {/* Tracks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isPlaying={isPlaying && activeTrackId === track.id}
                  onPlayToggle={() => handleTrackPlayToggle(track)}
                  onOpenStemModal={() => {
                    setActiveStemTrack(track);
                    if (!isPlaying || activeTrackId !== track.id) {
                      audioEngine.playTrack(track.id, track.bpm, track.duration, track.synthPreset);
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Amazon Music, SoundCloud & YouTube Platform Strip */}
        <div className="mt-14 p-6 sm:p-8 bg-[var(--bg-surface-elevated)] rounded-2xl border border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-semibold text-base sm:text-lg text-[var(--text-primary)]">
                Stream DVJ Aashu on Major Catalogues
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Official releases under Classitrick on Amazon Music, Apple Music, SoundCloud, and YouTube Audio-Visual Sets.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={OFFICIAL_SOCIALS.amazonMusic}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-medium border border-[var(--border-subtle)] transition-colors"
            >
              Amazon Music Catalogue
            </a>
            <a
              href={OFFICIAL_SOCIALS.soundCloud}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full btn-primary text-xs font-medium"
            >
              SoundCloud Profile
            </a>
          </div>
        </div>

      </div>

      {/* Stem Isolator Modal */}
      {activeStemTrack && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="apple-card w-full max-w-lg p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 text-left border border-[var(--border-medium)]">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveStemTrack(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[var(--border-subtle)] hover:bg-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
                  LIVE MULTI-TRACK STEM AUDITION
                </span>
                <h3 className="font-headline font-bold text-lg text-[var(--text-primary)]">
                  {activeStemTrack.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
              Mute or isolate specific channel frequencies in real-time to audition Indian Bansuri flute phrases, sub-bass grooves, and percussion arrangements.
            </p>

            {/* Stem Channel Toggles */}
            <div className="space-y-3 mb-6">
              {[
                { key: 'synths', label: '1. Nazar Khan Classical Flute & Leads', desc: 'Bansuri melodic phrases & synthesizer arpeggios' },
                { key: 'drums', label: '2. Drums & Folk Percussion (Dholak / Hats)', desc: 'Organic Indian percussion & 4-on-the-floor kick' },
                { key: 'bass', label: '3. Sub Bass & 808 Foundation', desc: 'Analog sub-bass & rolling groove' },
                { key: 'vocals', label: '4. Ambience & FX Textures', desc: 'Reverb swells and sound color filters' },
              ].map((stem) => {
                const isMuted = mutedStems[stem.key as keyof typeof mutedStems];
                return (
                  <div
                    key={stem.key}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isMuted 
                        ? 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] opacity-50' 
                        : 'bg-[var(--bg-surface-elevated)] border-[var(--accent)]/40'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-primary)]">{stem.label}</div>
                      <div className="text-[10px] font-mono text-[var(--text-secondary)]">{stem.desc}</div>
                    </div>
                    <button
                      onClick={() => toggleStemMute(stem.key as 'drums' | 'bass' | 'synths' | 'vocals')}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                        isMuted 
                          ? 'bg-[var(--border-subtle)] text-[var(--text-tertiary)]' 
                          : 'btn-primary'
                      }`}
                    >
                      {isMuted ? 'MUTED' : 'ACTIVE'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Master Frequency Sweep */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)] mb-2">
                <span>DJ Sound Color Filter (Low-Pass Sweep)</span>
                <span className="text-[var(--accent)] font-semibold">{Math.round(stemFilterFreq)} Hz</span>
              </div>
              <input
                type="range"
                min="400"
                max="20000"
                step="200"
                value={stemFilterFreq}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setStemFilterFreq(val);
                  audioEngine.setFilter(val);
                }}
                className="w-full accent-[var(--accent)] h-1.5 bg-[var(--bg-secondary)] rounded-lg cursor-pointer"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveStemTrack(null)}
                className="px-5 py-2 rounded-full btn-primary text-xs cursor-pointer"
              >
                Done Auditioning
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

