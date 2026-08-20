import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Play, Sparkles, Filter, Music, Video, ArrowUpRight, Check } from 'lucide-react';
import { INSTAGRAM_UPDATES, SocialUpdate } from '../data/updatesData';
import { OFFICIAL_SOCIALS } from '../data/musicData';

export const LatestUpdates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    INSTAGRAM_UPDATES.forEach(post => {
      initial[post.id] = post.likes;
    });
    return initial;
  });

  const handleToggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const isLiked = !prev[postId];
      setLikeCounts(c => ({
        ...c,
        [postId]: (c[postId] || 0) + (isLiked ? 1 : -1)
      }));
      return { ...prev, [postId]: isLiked };
    });
  };

  const filteredUpdates = INSTAGRAM_UPDATES.filter(post => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'residency', label: 'Ora Club Residency' },
    { id: 'studio', label: 'Studio & Releases' },
    { id: 'heritage', label: 'Heritage Galas' },
    { id: 'live', label: 'Live Mainstages' }
  ];

  return (
    <section id="updates" className="py-24 lg:py-32 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 text-[var(--accent)] text-xs font-mono font-semibold uppercase mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>LATEST UPDATES & INSTAGRAM FEED</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight text-[var(--text-primary)]">
              Behind the decks & studio dispatches.
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-3 leading-relaxed">
              Stay in tune with recent performances, studio previews, Rajasthan heritage galas, and live audio-visual moments direct from <strong>@dvjaashuofficial</strong>.
            </p>
          </div>

          <a
            href={OFFICIAL_SOCIALS.instagram}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full btn-primary text-xs font-medium flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @dvjaashuofficial</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Instagram Post Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredUpdates.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const currentLikes = likeCounts[post.id] || post.likes;

            return (
              <div
                key={post.id}
                className="apple-card flex flex-col justify-between overflow-hidden group hover:border-[var(--accent)]/40 transition-all duration-300"
              >
                <div>
                  {/* Post Media Container */}
                  <div className="relative aspect-[4/3] bg-black/10 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Media Badge Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase">
                        {post.category}
                      </span>
                      {post.hasVideo && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[var(--accent)]/90 backdrop-blur-md text-white flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-white" />
                          <span>Reel Clip</span>
                        </span>
                      )}
                    </div>

                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                      title="View original on Instagram"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Post Details & Content */}
                  <div className="p-5 sm:p-6">
                    {/* Author & Timestamp */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.avatarUrl}
                          alt={post.author}
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-[var(--accent)]/30"
                        />
                        <div>
                          <div className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                            {post.author}
                          </div>
                          <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
                            {post.handle}
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                        {post.date}
                      </span>
                    </div>

                    {/* Caption */}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                      {post.caption}
                    </p>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent-subtle)] px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Interaction Bar */}
                <div className="px-5 py-3.5 sm:px-6 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer group/like"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform group-active/like:scale-125 ${
                          isLiked ? 'fill-rose-500 text-rose-500' : 'text-[var(--text-tertiary)] group-hover/like:text-rose-500'
                        }`}
                      />
                      <span className={`font-mono text-[11px] ${isLiked ? 'text-rose-500 font-semibold' : ''}`}>
                        {currentLikes.toLocaleString()}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-[var(--text-tertiary)]" />
                      <span className="font-mono text-[11px]">{post.comments}</span>
                    </div>
                  </div>

                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono text-[var(--accent)] hover:underline flex items-center gap-1"
                  >
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
