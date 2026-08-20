import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, Sparkles, Check, Clock, Plus } from 'lucide-react';
import { TOUR_DATES } from '../data/tourData';
import { TourDate } from '../types';

interface TourCalendarProps {
  onOpenBooking: () => void;
}

export const TourCalendar: React.FC<TourCalendarProps> = ({ onOpenBooking }) => {
  const [selectedTour, setSelectedTour] = useState<TourDate | null>(null);
  const [guestlistSubmitted, setGuestlistSubmitted] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');

  const generateGoogleCalendarUrl = (tour: TourDate) => {
    const title = encodeURIComponent(`DVJ Aashu Live @ ${tour.venue}`);
    const details = encodeURIComponent(`Audio-Visual DJ performance by DVJ Aashu (Ashutosh Verma) at ${tour.eventTitle}. Venue: ${tour.venue}, ${tour.city}.`);
    const location = encodeURIComponent(`${tour.venue}, ${tour.city}, ${tour.country}`);
    const dateFormatted = tour.date.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T210000Z/${dateFormatted}T235900Z`;
  };

  const handleGuestlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestEmail) return;
    setGuestlistSubmitted(true);
    setTimeout(() => {
      setGuestlistSubmitted(false);
      setSelectedTour(null);
      setGuestEmail('');
    }, 2400);
  };

  return (
    <section id="tour" className="py-24 lg:py-32 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider block mb-2">
              TOUR DATES & RESIDENCIES
            </span>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight text-[var(--text-primary)]">
              Live tour calendar & palace showcases.
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-3">
              Catch DVJ Aashu live in action across India and international destinations. Sync tour dates directly with your calendar or request promoter date holds.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-full btn-secondary text-xs font-medium self-start md:self-auto cursor-pointer"
          >
            Inquire for Private Date Hold →
          </button>
        </div>

        {/* Tour Dates List */}
        <div className="space-y-3">
          {TOUR_DATES.map((tour) => (
            <div
              key={tour.id}
              className="apple-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all duration-300 hover:border-[var(--accent)]/40 text-left"
            >
              {/* Date Box & Location */}
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-mono font-bold text-[var(--accent)] uppercase leading-none">
                    {tour.month}
                  </span>
                  <span className="font-headline font-extrabold text-xl text-[var(--text-primary)] leading-none mt-1">
                    {tour.day}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] uppercase border border-[var(--border-subtle)]">
                      {tour.stageType}
                    </span>
                    <span className={`text-[11px] font-mono font-medium ${
                      tour.status === 'Confirmed' ? 'text-emerald-500' :
                      tour.status === 'Few Passes Left' ? 'text-amber-500' :
                      'text-[var(--accent)]'
                    }`}>
                      • {tour.status}
                    </span>
                  </div>

                  <h3 className="font-headline font-bold text-base sm:text-lg text-[var(--text-primary)] mt-1">
                    {tour.eventTitle}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                    <span>{tour.venue} — {tour.city}, {tour.country}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-end md:self-auto w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[var(--border-subtle)]">
                <a
                  href={generateGoogleCalendarUrl(tour)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[var(--text-primary)] text-xs font-mono transition-colors flex items-center gap-1.5 border border-[var(--border-subtle)]"
                  title="Add to Google Calendar"
                >
                  <Plus className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Sync Calendar</span>
                </a>

                <button
                  onClick={() => setSelectedTour(tour)}
                  className="px-4 py-2 rounded-full btn-primary text-xs font-medium cursor-pointer"
                >
                  Guestlist & Inquire
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Guestlist RSVP Modal */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="apple-card w-full max-w-md p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 text-left border border-[var(--border-medium)]">
            <h3 className="font-headline font-bold text-xl text-[var(--text-primary)]">
              Guestlist & Access Request
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {selectedTour.eventTitle} at {selectedTour.venue}, {selectedTour.city} ({selectedTour.month} {selectedTour.day}, {selectedTour.year})
            </p>

            {guestlistSubmitted ? (
              <div className="py-8 flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-headline font-bold text-base text-[var(--text-primary)]">
                  Request Received
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Our management team will send guestlist confirmation details to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleGuestlistSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTour(null)}
                    className="px-4 py-2 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full btn-primary text-xs font-medium cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
