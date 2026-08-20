import React, { useState } from 'react';
import { Calendar, Mail, Phone, MapPin, Clock, Users, Sparkles, Send, CheckCircle2, ShieldCheck, Video, Music } from 'lucide-react';
import { BookingFormData } from '../types';

export const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    eventType: 'Royal Destination Wedding / Sangeet',
    eventDate: '',
    location: 'Jaipur, Rajasthan',
    venue: '',
    expectedGuests: '300 - 600 Guests',
    setDurationHours: 4,
    avProductionRequired: 'audio_visual_full',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-12">
          <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider block mb-2">
            DIRECT MANAGEMENT & PROMOTER INQUIRIES
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight text-[var(--text-primary)]">
            Check availability & request bespoke proposal.
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-3">
            Secure dates for destination weddings, festival mainstages, and club residencies. Management responds to all verified promoter inquiries within 24 hours.
          </p>
        </div>

        {/* Main Grid: Form Left, Event Specifier Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Booking Inquiry Form */}
          <div className="lg:col-span-7 apple-card p-6 sm:p-10 shadow-lg text-left">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-headline font-bold text-2xl text-[var(--text-primary)]">
                  Inquiry Received Successfully
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md">
                  Thank you, <strong>{formData.name}</strong>. DVJ Aashu’s artist management team has received your date request for <strong>{formData.eventDate || 'your upcoming event'}</strong>. We will review your production requirements and respond with availability.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full btn-secondary text-xs font-medium cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rathore"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Agency / Host Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Heritage Events / Private Host"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Event Category
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    >
                      <option>Royal Destination Wedding / Sangeet</option>
                      <option>Audio-Visual Concert / Festival Mainstage</option>
                      <option>Nightclub Residency / Headliner Night</option>
                      <option>Luxury Brand Gala / VIP Corporate Showcase</option>
                      <option>Custom Studio Music Production & Remixing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Udaipur, Rajasthan / Dubai, UAE"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. City Palace / Taj Lake Palace"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                {/* Production Format */}
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                    Audio-Visual Production & Artist Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'audio_visual_full', label: 'DVJ + Live VJ Video Sync', desc: 'LED visuals & video scratching' },
                      { id: 'live_fusion_flute_percussion', label: 'Live Flute & Folk Fusion', desc: 'With Nazar Khan & percussion' },
                      { id: 'dj_only_console', label: 'DJ Console Solo Set', desc: 'Audio-focused performance' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, avProductionRequired: opt.id as any })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.avProductionRequired === opt.id
                            ? 'bg-[var(--accent-subtle)] border-[var(--accent)] text-[var(--text-primary)]'
                            : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                        }`}
                      >
                        <div className="text-xs font-bold text-[var(--text-primary)]">{opt.label}</div>
                        <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Musical Preferences, Visual Themes & Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about special track requests (e.g., Sufi electronica, heavy electro, classical flute entrance), stage dimensions, or schedule..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full btn-primary font-headline font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10 cursor-pointer"
                >
                  {loading ? (
                    <span>Verifying Date Availability...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Booking & Date Hold Request</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* Right Column: Direct Contact & Artist Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="apple-card p-6 sm:p-8 space-y-5">
              <h3 className="font-headline font-bold text-xl text-[var(--text-primary)]">
                Management Information
              </h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[var(--text-tertiary)]">Official Booking Email</div>
                    <div className="text-[var(--text-primary)] font-semibold mt-0.5">bookings@dvjaashu.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[var(--text-tertiary)]">Artist Base & Studio</div>
                    <div className="text-[var(--text-primary)] font-semibold mt-0.5">Jaipur, Rajasthan, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[var(--text-tertiary)]">Turnaround Time</div>
                    <div className="text-[var(--text-primary)] font-semibold mt-0.5">Within 24 Hours on Business Days</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)] inline mr-1.5" />
                All bookings include customized set planning, pre-event rider coordination with your sound engineers, and full backup media hardware.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
