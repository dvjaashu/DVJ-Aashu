import React, { useState } from 'react';
import { Sparkles, Sliders, Check, Copy, CheckCheck, Disc, ShieldCheck, HeartHandshake, FileText, Video, History, Award, MapPin, Calendar } from 'lucide-react';
import { SERVICES, TECH_RIDER, TESTIMONIALS, CAREER_MILESTONES } from '../data/servicesData';

interface ServicesAndGearProps {
  onOpenBooking: () => void;
}

export const ServicesAndGear: React.FC<ServicesAndGearProps> = ({ onOpenBooking }) => {
  const [copiedRider, setCopiedRider] = useState(false);
  const [selectedMilestoneCategory, setSelectedMilestoneCategory] = useState<'all' | 'breakthrough' | 'residency' | 'studio' | 'tour'>('all');

  const copyRiderToClipboard = () => {
    const text = `DVJ AASHU (ASHUTOSH VERMA) - OFFICIAL TECHNICAL RIDER\n\nDJ BOOTH & AUDIO-VISUAL SPECIFICATIONS:\n${TECH_RIDER.djBooth.map(i => `• ${i}`).join('\n')}\n\nPOWER & CONNECTIVITY:\n${TECH_RIDER.powerAndCables.map(i => `• ${i}`).join('\n')}\n\nHOSPITALITY:\n${TECH_RIDER.hospitality.map(i => `• ${i}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedRider(true);
    setTimeout(() => setCopiedRider(false), 2200);
  };

  const filteredMilestones = CAREER_MILESTONES.filter(m => {
    if (selectedMilestoneCategory === 'all') return true;
    return m.category === selectedMilestoneCategory;
  });

  return (
    <section id="services" className="py-24 lg:py-32 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 18 Years of Excellence Timeline Header */}
        <div className="text-left max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 text-[var(--accent)] text-xs font-mono font-semibold uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>18 YEARS OF EXCELLENCE (2006 – PRESENT)</span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight text-[var(--text-primary)]">
            Pioneering the Rajasthan audio-visual revolution.
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-3 leading-relaxed">
            From the historic 2013 OM Tower electro breakthrough to the longstanding Ora Club residency and landmark Classitrick releases, explore the defining milestones of Ashutosh Verma’s 18-year career.
          </p>
        </div>

        {/* Interactive Career Timeline Cards */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMilestones.map((milestone, idx) => (
              <div
                key={idx}
                className="apple-card p-6 sm:p-7 flex flex-col justify-between text-left relative overflow-hidden group hover:border-[var(--accent)]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-headline font-extrabold text-2xl text-[var(--accent)]">
                      {milestone.year}
                    </span>
                    {milestone.stats && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                        {milestone.stats}
                      </span>
                    )}
                  </div>

                  <h3 className="font-headline font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {milestone.title}
                  </h3>

                  <div className="text-xs font-medium text-[var(--text-tertiary)] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--accent)] flex-shrink-0" />
                    <span>{milestone.location}</span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
                  <span className="capitalize">{milestone.category} Milestone</span>
                  <span className="text-[var(--accent)] font-semibold">DVJ Aashu Archive</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header: Services & Disciplines */}
        <div className="text-left max-w-2xl mb-14 pt-8 border-t border-[var(--border-subtle)]">
          <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider block mb-2">
            EXPERIENCE & PERFORMANCE DISCIPLINES
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            Bespoke audio-visual sets & heritage galas.
          </h2>
          <p className="text-[var(--text-secondary)] text-base mt-2">
            Each performance is strictly tailored with custom music curation, live instrumentalists, and frame-accurate video synchronization.
          </p>
        </div>

        {/* Services Grid — Strictly WITHOUT Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="apple-card p-6 sm:p-8 flex flex-col justify-between text-left group hover:border-[var(--accent)]/40 transition-all duration-300"
            >
              <div>
                {srv.tag && (
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-[var(--accent-subtle)] text-[var(--accent)] uppercase mb-3">
                    {srv.tag}
                  </span>
                )}

                <h3 className="font-headline font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                  {srv.title}
                </h3>
                
                <p className="text-xs font-medium text-[var(--accent)] mt-1">
                  {srv.subtitle}
                </p>

                <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                  {srv.description}
                </p>

                {/* Features list */}
                <div className="mt-5 space-y-2 pt-4 border-t border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase">Key Inclusions:</div>
                  {srv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                      <Check className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                  Ideal for: {srv.idealFor}
                </span>
                
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-full btn-primary text-xs font-medium cursor-pointer"
                >
                  Request Proposal
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Rider & Stage Specifications */}
        <div className="apple-card p-6 sm:p-10 mb-16 text-left shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider block mb-1">
                PRODUCTION & STAGE SPECIFICATIONS
              </span>
              <h3 className="font-headline font-bold text-2xl text-[var(--text-primary)]">
                Standard Technical Rider (Audio-Visual & DJ)
              </h3>
            </div>

            <button
              onClick={copyRiderToClipboard}
              className="px-4 py-2 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-medium)] text-xs font-mono font-medium text-[var(--text-primary)] flex items-center gap-2 border border-[var(--border-subtle)] transition-colors cursor-pointer self-start sm:self-auto"
            >
              {copiedRider ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Rider Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  <span>Copy Full Tech Rider</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div>
              <h4 className="font-headline font-bold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
                <Disc className="w-4 h-4 text-[var(--accent)]" />
                <span>DJ & Video Booth Hardware</span>
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {TECH_RIDER.djBooth.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[var(--accent)] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[var(--accent)]" />
                <span>Power & Matrix Routing</span>
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {TECH_RIDER.powerAndCables.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[var(--accent)] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                <span>Hospitality & Soundcheck</span>
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {TECH_RIDER.hospitality.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[var(--accent)] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="apple-card p-6 text-left flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="font-headline font-bold text-xs text-[var(--text-primary)]">
                    {t.author}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

