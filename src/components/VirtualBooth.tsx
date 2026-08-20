import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Sliders, Disc, Sparkles, Radio, Zap, RotateCcw, Activity, Video } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { TRACKS } from '../data/musicData';

export const VirtualBooth: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [bpm, setBpm] = useState(124);
  const [filterCutoff, setFilterCutoff] = useState(20000);
  const [volume, setVolume] = useState(0.85);
  const [activePreset, setActivePreset] = useState<'flute_organic' | 'trance_lead' | 'deep_house' | 'folk_fusion'>('flute_organic');
  const [isScratching, setIsScratching] = useState(false);
  const [scratchAngle, setScratchAngle] = useState(0);
  const [videoSyncMode, setVideoSyncMode] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      if (state.bpm) setBpm(state.bpm);
    });
    return () => unsub();
  }, []);

  // Visualizer Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const freqData = audioEngine.getFrequencyData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / 32) * 0.8;
      const gap = (canvas.width / 32) * 0.2;

      for (let i = 0; i < 32; i++) {
        const val = isPlaying ? freqData[i] || 0 : 4;
        const barHeight = (val / 255) * canvas.height * 0.85 + 2;

        const x = i * (barWidth + gap);
        const y = canvas.height - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, '#0071E3');
        gradient.addColorStop(1, '#00C7BE');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.playTrack(currentTrack.id, bpm, currentTrack.duration, activePreset);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    audioEngine.setBpm(newBpm);
  };

  const handleFilterChange = (val: number) => {
    setFilterCutoff(val);
    audioEngine.setFilter(val);
  };

  const triggerFx = (effect: 'drop' | 'airhorn' | 'wash' | 'scratch') => {
    audioEngine.triggerEffect(effect);
    if (effect === 'scratch') {
      setIsScratching(true);
      setScratchAngle(prev => prev + 45);
      setTimeout(() => setIsScratching(false), 350);
    }
  };

  return (
    <section id="booth" className="py-24 lg:py-32 bg-[#0B0B0D] text-white relative overflow-hidden">
      
      {/* Visual background lasers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#0071E3]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono mb-3 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
              <span>LIVE PIONEER AUDIO-VISUAL WORKSTATION</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight text-white">
              The Virtual DVJ Console
            </h2>
            <p className="text-white/70 text-base sm:text-lg mt-3">
              Experience DVJ Aashu's signature hybrid workflow. Audition custom Rajasthani Bansuri leads, 144 BPM psychedelic trance sweeps, and video-synced scratch pads in real time.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/10">
            {[
              { id: 'flute_organic', label: 'Bansuri Flute (Dorian)' },
              { id: 'trance_lead', label: '144 BPM Trance' },
              { id: 'folk_fusion', label: 'Folk Percussion' },
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setActivePreset(preset.id as any);
                  if (isPlaying) {
                    audioEngine.playTrack(currentTrack.id, bpm, currentTrack.duration, preset.id as any);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activePreset === preset.id
                    ? 'bg-[#0071E3] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* The CDJ Hardware Interface Box */}
        <div className="rounded-3xl bg-[#141418] border border-white/10 p-6 sm:p-10 shadow-2xl">
          
          {/* Top Status Screen & Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8 pb-8 border-b border-white/10">
            
            {/* Track Info & Video Screen */}
            <div className="lg:col-span-5 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-1">
                <span>DECK A • CLASSITRICK ENGINE</span>
                <span className="text-[#0071E3]">• {currentTrack.bpm} BPM MASTER</span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-white truncate">
                {currentTrack.title}
              </h3>
              <div className="text-xs font-medium text-[#0071E3] mt-0.5">
                {currentTrack.artist} {currentTrack.collaborators && `• ${currentTrack.collaborators}`}
              </div>

              {/* Video Sync Toggle */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setVideoSyncMode(!videoSyncMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    videoSyncMode
                      ? 'bg-[#0071E3]/20 border-[#0071E3] text-white'
                      : 'bg-white/5 border-white/10 text-white/50'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>HD Video Output Sync: {videoSyncMode ? 'ACTIVE' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Live Visualizer Canvas */}
            <div className="lg:col-span-7">
              <div className="h-24 bg-black/60 rounded-2xl p-3 border border-white/10 flex flex-col justify-between">
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>32-BAND REALTIME SPECTRUM</span>
                  <span className={isPlaying ? 'text-[#00C7BE]' : 'text-white/40'}>
                    {isPlaying ? 'ACTIVE SYNTHESIS' : 'IDLE'}
                  </span>
                </div>
                <canvas ref={canvasRef} width={600} height={60} className="w-full h-12" />
              </div>
            </div>

          </div>

          {/* Core Hardware Controls: Jog Wheel, Filter Knobs, Pads */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Left: Scratch Jog Wheel */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => triggerFx('scratch')}
                className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#1C1C22] to-[#2C2C35] border-4 border-[#3A3A45] shadow-2xl flex items-center justify-center cursor-pointer transition-transform ${
                  isScratching ? 'scale-95' : 'hover:scale-102'
                }`}
                title="Click to Scratch Deck"
              >
                {/* Vinyl Grooves Pattern */}
                <div
                  className="absolute inset-4 rounded-full border border-white/5 flex items-center justify-center transition-transform duration-200"
                  style={{ transform: `rotate(${scratchAngle}deg)` }}
                >
                  <div className="w-20 h-20 rounded-full bg-[#0071E3]/20 border-2 border-[#0071E3] flex items-center justify-center">
                    <Disc className={`w-8 h-8 text-white ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  </div>
                </div>

                {/* Playing Ring */}
                {isPlaying && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#0071E3] animate-pulse" />
                )}
              </div>

              <div className="text-[11px] font-mono text-white/50 mt-3">
                TOUCH TO SCRATCH VINYL & LIVE VIDEO
              </div>
            </div>

            {/* Middle: Master Transport & Filter Cutoff */}
            <div className="space-y-6 text-left">
              
              {/* Play / Cue Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayToggle}
                  className={`flex-1 py-4 rounded-2xl font-headline font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isPlaying
                      ? 'bg-[#FF453A] text-white shadow-red-500/20'
                      : 'bg-[#0071E3] text-white shadow-[#0071E3]/30 hover:bg-[#0077ED]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  <span>{isPlaying ? 'STOP DECK' : 'PLAY DECK'}</span>
                </button>

                <button
                  onClick={() => triggerFx('drop')}
                  className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer"
                >
                  CUE
                </button>
              </div>

              {/* DJM Sound Color Filter Knob */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/70">
                  <span>DJM-V10 Color Filter</span>
                  <span className="text-[#0071E3] font-semibold">{Math.round(filterCutoff)} Hz</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="20000"
                  step="200"
                  value={filterCutoff}
                  onChange={(e) => handleFilterChange(Number(e.target.value))}
                  className="w-full accent-[#0071E3] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Tempo / Pitch Slider */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/70">
                  <span>Tempo Pitch Control (±8%)</span>
                  <span className="text-[#00C7BE] font-semibold">{bpm} BPM</span>
                </div>
                <input
                  type="range"
                  min="110"
                  max="148"
                  step="1"
                  value={bpm}
                  onChange={(e) => handleBpmChange(Number(e.target.value))}
                  className="w-full accent-[#00C7BE] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

            </div>

            {/* Right: 4-Performance FX Trigger Pads */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-white/60 text-left mb-1">
                PERFORMANCE SAMPLER PADS
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: '808 Sub Drop', id: 'drop', color: 'border-cyan-500/50 hover:bg-cyan-500/20' },
                  { name: 'Airhorn FX', id: 'airhorn', color: 'border-amber-500/50 hover:bg-amber-500/20' },
                  { name: 'Reverb Sweep', id: 'wash', color: 'border-blue-500/50 hover:bg-blue-500/20' },
                  { name: 'Tape Scratch', id: 'scratch', color: 'border-emerald-500/50 hover:bg-emerald-500/20' },
                ].map((pad) => (
                  <button
                    key={pad.id}
                    onClick={() => triggerFx(pad.id as any)}
                    className={`p-4 rounded-2xl bg-white/5 border text-xs font-mono font-medium text-white transition-all transform active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1.5 ${pad.color}`}
                  >
                    <Zap className="w-4 h-4 text-white/80" />
                    <span>{pad.name}</span>
                  </button>
                ))}
              </div>

              {/* Next Track Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const next = (currentTrackIndex + 1) % TRACKS.length;
                    setCurrentTrackIndex(next);
                    if (isPlaying) {
                      audioEngine.playTrack(TRACKS[next].id, TRACKS[next].bpm, TRACKS[next].duration, TRACKS[next].synthPreset);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-mono border border-white/10 transition-colors cursor-pointer"
                >
                  Load Next Track from Catalogue →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
