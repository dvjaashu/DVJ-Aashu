// Web Audio API Synthesis Engine for DVJ Aashu Portfolio

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private bpm: number = 124;
  private filterFreq: number = 20000;
  private filterResonance: number = 1;
  private masterGainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.85;

  // Track stem levels
  public stems = {
    drums: 1.0,
    bass: 1.0,
    synths: 1.0,
    fx: 1.0
  };

  // Listeners for UI state
  private onStateChangeCallbacks: Array<(state: { isPlaying: boolean; trackId: string | null; currentTime: number; duration: number; bpm: number }) => void> = [];
  private currentTime: number = 0;
  private duration: number = 344;

  constructor() {
    // Lazy init audio context on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(this.filterFreq, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(this.filterResonance, this.ctx.currentTime);

      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

      this.filterNode.connect(this.masterGainNode);
      this.masterGainNode.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(callback: (state: { isPlaying: boolean; trackId: string | null; currentTime: number; duration: number; bpm: number }) => void) {
    this.onStateChangeCallbacks.push(callback);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.onStateChangeCallbacks.forEach(cb =>
      cb({
        isPlaying: this.isPlaying,
        trackId: this.currentTrackId,
        currentTime: this.currentTime,
        duration: this.duration,
        bpm: this.bpm
      })
    );
  }

  public setStemMute(stem: 'drums' | 'bass' | 'synths' | 'fx' | 'vocals', isMuted: boolean) {
    const key = stem === 'vocals' ? 'fx' : stem;
    if (key in this.stems) {
      this.stems[key as keyof typeof this.stems] = isMuted ? 0.0 : 1.0;
    }
  }

  public playTrack(trackId: string, bpm: number = 124, durationSec: number = 344, preset: string = 'flute_organic') {
    this.initContext();
    this.currentTrackId = trackId;
    this.bpm = bpm;
    this.duration = durationSec;
    this.isPlaying = true;
    this.notify();

    if (this.timerId) {
      window.clearInterval(this.timerId);
    }

    // Step sequencer interval based on 16th notes (4 steps per beat)
    const stepTimeMs = (60 / this.bpm / 4) * 1000;
    this.currentStep = 0;

    this.timerId = window.setInterval(() => {
      this.playStep(this.currentStep, preset);
      this.currentStep = (this.currentStep + 1) % 16;
      this.currentTime = (this.currentTime + stepTimeMs / 1000) % this.duration;
      this.notify();
    }, stepTimeMs);
  }

  public togglePlay(trackId: string, bpm: number = 124, duration: number = 344, preset: string = 'flute_organic') {
    if (this.isPlaying && this.currentTrackId === trackId) {
      this.pause();
    } else {
      this.playTrack(trackId, bpm, duration, preset);
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public resume() {
    if (this.currentTrackId) {
      this.initContext();
      this.isPlaying = true;
      const stepTimeMs = (60 / this.bpm / 4) * 1000;
      this.timerId = window.setInterval(() => {
        this.playStep(this.currentStep, 'flute_organic');
        this.currentStep = (this.currentStep + 1) % 16;
        this.currentTime = (this.currentTime + stepTimeMs / 1000) % this.duration;
        this.notify();
      }, stepTimeMs);
      this.notify();
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    this.notify();
  }

  public setFilter(freq: number, q: number = 1) {
    this.filterFreq = freq;
    this.filterResonance = q;
    if (this.filterNode && this.ctx) {
      this.filterNode.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
      this.filterNode.Q.setTargetAtTime(q, this.ctx.currentTime, 0.05);
    }
  }

  public setVolume(vol: number) {
    this.volume = vol;
    if (this.masterGainNode && this.ctx && !this.isMuted) {
      this.masterGainNode.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.03);
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setTargetAtTime(muted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    }
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(90, Math.min(160, newBpm));
    if (this.isPlaying && this.currentTrackId) {
      if (this.timerId) window.clearInterval(this.timerId);
      const stepTimeMs = (60 / this.bpm / 4) * 1000;
      this.timerId = window.setInterval(() => {
        this.playStep(this.currentStep, 'flute_organic');
        this.currentStep = (this.currentStep + 1) % 16;
        this.currentTime = (this.currentTime + stepTimeMs / 1000) % this.duration;
        this.notify();
      }, stepTimeMs);
    }
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyserNode) {
      return new Uint8Array(32);
    }
    const array = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(array);
    return array;
  }

  // --- Sound Generation Nodes ---

  private playStep(step: number, preset: string) {
    if (!this.ctx || !this.filterNode) return;
    const now = this.ctx.currentTime;

    // 1. Kick / Tabla transient (steps 0, 4, 8, 12)
    if ((step % 4 === 0) && this.stems.drums > 0.05) {
      this.triggerKick(now, this.stems.drums);
    }

    // 2. Off-beat Open Hi-Hat / Ghungroo shimmer on steps 2, 6, 10, 14
    if ((step % 4 === 2) && this.stems.drums > 0.05) {
      this.triggerHiHat(now, 0.4 * this.stems.drums, true);
    }

    // 3. 16th note closed percussion / dholak tap
    if ((step % 2 === 1) && this.stems.drums > 0.05) {
      this.triggerHiHat(now, 0.18 * this.stems.drums, false);
    }

    // 4. Claps on 4, 12
    if ((step === 4 || step === 12) && this.stems.drums > 0.05) {
      this.triggerClap(now, 0.3 * this.stems.drums);
    }

    // 5. Bassline (Deep Moog / Folk sub / Trance rolling bass)
    if (this.stems.bass > 0.05) {
      if (preset === 'trance_lead') {
        // Fast 16th rolling trance bass
        this.triggerBass(now, 46.25, 0.45 * this.stems.bass);
      } else if (step % 2 === 1 || step % 4 === 2) {
        const rootFreq = preset === 'folk_fusion' ? 55.0 : preset === 'electro_bass' ? 43.65 : 48.99; // A, F, G
        this.triggerBass(now, rootFreq, 0.45 * this.stems.bass);
      }
    }

    // 6. Melodic Chords & Nazar Khan Flute simulation / Trance Lead
    if (this.stems.synths > 0.05) {
      if (preset === 'flute_organic') {
        // Indian Flute notes sequence (Bansuri scale in D Dorian: D, F, G, A, C)
        const fluteNotes = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
        if (step === 0 || step === 4 || step === 7 || step === 10 || step === 13) {
          const noteIndex = (step + Math.floor(Math.random() * 2)) % fluteNotes.length;
          this.triggerFluteVoice(now, fluteNotes[noteIndex], 0.35 * this.stems.synths);
        }
      } else if (preset === 'trance_lead') {
        // Trance Arp notes
        const tranceNotes = [369.99, 440.00, 554.37, 739.99]; // F#m
        const note = tranceNotes[step % tranceNotes.length];
        this.triggerSynthLead(now, note, 0.28 * this.stems.synths);
      } else {
        if (step === 0 || step === 6 || step === 10) {
          const chordNotes = [220, 261.63, 329.63, 392.00]; // A min7
          this.triggerSynthChord(now, chordNotes, 0.25 * this.stems.synths);
        }
      }
    }
  }

  private triggerKick(time: number, gainMultiplier: number) {
    if (!this.ctx || !this.filterNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(145, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.09);

    gain.gain.setValueAtTime(0.9 * gainMultiplier, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  private triggerHiHat(time: number, gainLevel: number, isOpen: boolean) {
    if (!this.ctx || !this.filterNode) return;
    const bufferSize = this.ctx.sampleRate * (isOpen ? 0.2 : 0.04);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(7500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainLevel, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isOpen ? 0.18 : 0.04));

    noise.connect(highpass);
    highpass.connect(gain);
    gain.connect(this.filterNode);

    noise.start(time);
  }

  private triggerClap(time: number, gainLevel: number) {
    if (!this.ctx || !this.filterNode) return;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1100, time);
    bandpass.Q.setValueAtTime(2, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainLevel, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.filterNode);

    noise.start(time);
  }

  private triggerBass(time: number, freq: number, gainLevel: number) {
    if (!this.ctx || !this.filterNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq, time);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(gainLevel * 0.7, time);
    subGain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    gain.gain.setValueAtTime(gainLevel * 0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    osc.connect(gain);
    subOsc.connect(subGain);

    gain.connect(this.filterNode);
    subGain.connect(this.filterNode);

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + 0.18);
    subOsc.stop(time + 0.18);
  }

  // Acoustic Indian Flute synthesizer with vibrato and breath resonance
  private triggerFluteVoice(time: number, freq: number, gainLevel: number) {
    if (!this.ctx || !this.filterNode) return;
    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    // Breath vibrato LFO (~5.5 Hz)
    vibrato.frequency.setValueAtTime(5.5, time);
    vibratoGain.gain.setValueAtTime(freq * 0.025, time);
    vibrato.connect(osc.frequency);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainLevel, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);

    osc.connect(gain);
    gain.connect(this.filterNode);

    vibrato.start(time);
    osc.start(time);
    vibrato.stop(time + 0.5);
    osc.stop(time + 0.5);
  }

  private triggerSynthLead(time: number, freq: number, gainLevel: number) {
    if (!this.ctx || !this.filterNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainLevel, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(time);
    osc.stop(time + 0.28);
  }

  private triggerSynthChord(time: number, frequencies: number[], gainLevel: number) {
    if (!this.ctx || !this.filterNode) return;
    frequencies.forEach((freq) => {
      if (!this.ctx || !this.filterNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(gainLevel / frequencies.length, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(time);
      osc.stop(time + 0.65);
    });
  }

  // DJ FX Trigger: Airhorn / Beat Drop / Vinyl Stop / Reverb Wash / Video Glitch
  public triggerEffect(effectName: 'drop' | 'airhorn' | 'wash' | 'scratch') {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;
    const now = this.ctx.currentTime;

    if (effectName === 'airhorn') {
      const notes = [466.16, 466.16, 466.16, 523.25, 466.16];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.08;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.connect(gain);
        gain.connect(this.filterNode!);
        osc.start(t);
        osc.stop(t + 0.08);
      });
    } else if (effectName === 'wash') {
      this.filterNode.frequency.setValueAtTime(500, now);
      this.filterNode.frequency.exponentialRampToValueAtTime(16000, now + 1.2);
    } else if (effectName === 'drop') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.9);
      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      osc.connect(gain);
      gain.connect(this.filterNode);
      osc.start(now);
      osc.stop(now + 1.2);
    } else if (effectName === 'scratch') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.15);
      osc.frequency.linearRampToValueAtTime(600, now + 0.3);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.filterNode);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  }
}

export const audioEngine = new SoundEngine();
