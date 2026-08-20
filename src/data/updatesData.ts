export interface SocialUpdate {
  id: string;
  type: 'instagram_post' | 'reels_clip' | 'studio_log' | 'event_recap';
  author: string;
  handle: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  date: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: 'all' | 'live' | 'studio' | 'residency' | 'heritage';
  tags: string[];
  postUrl: string;
  hasVideo?: boolean;
}

export const INSTAGRAM_UPDATES: SocialUpdate[] = [
  {
    id: 'post-1',
    type: 'reels_clip',
    author: 'DVJ Aashu',
    handle: '@dvjaashuofficial',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop',
    caption: 'Locked in the booth at Ora Club Jaipur! Syncing frame-accurate live visual scratching with heavy tech-house basslines. Big love to the Rajasthan crowd for the relentless energy! 🔥🎧',
    date: '3 days ago',
    timestamp: '2026-08-16',
    likes: 2480,
    comments: 134,
    category: 'residency',
    tags: ['#OraClub', '#DVJAashu', '#AudioVisual', '#JaipurNightlife', '#LiveVJ'],
    postUrl: 'https://instagram.com/dvjaashuofficial',
    hasVideo: true,
  },
  {
    id: 'post-2',
    type: 'studio_log',
    author: 'DVJ Aashu',
    handle: '@dvjaashuofficial',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop',
    caption: 'Late night sessions at Classitrick Studio with the master Nazar Khan. Recording organic classical flute stems over 124 BPM melodic progressive grooves. New single dropping soon on all streaming platforms! 🎶✨',
    date: '5 days ago',
    timestamp: '2026-08-14',
    likes: 3120,
    comments: 189,
    category: 'studio',
    tags: ['#Classitrick', '#FluteFusion', '#NazarKhan', '#StudioFlow', '#MelodicHouse'],
    postUrl: 'https://instagram.com/dvjaashuofficial',
    hasVideo: false,
  },
  {
    id: 'post-3',
    type: 'event_recap',
    author: 'DVJ Aashu',
    handle: '@dvjaashuofficial',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
    caption: 'Royal Destination Sangeet Gala under the starlit skies of Udaipur. Blending Rajasthani folk anthems, live percussion, and custom visual mapping for 800+ guests. Unforgettable night! 🏰✨',
    date: '1 week ago',
    timestamp: '2026-08-11',
    likes: 4210,
    comments: 265,
    category: 'heritage',
    tags: ['#RoyalWedding', '#UdaipurPalace', '#DVJAashu', '#FolkFusion', '#DestinationWedding'],
    postUrl: 'https://instagram.com/dvjaashuofficial',
    hasVideo: true,
  },
  {
    id: 'post-4',
    type: 'instagram_post',
    author: 'DVJ Aashu',
    handle: '@dvjaashuofficial',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop',
    caption: '18 Years behind the decks. From heavy electro at OM Tower back in 2013 to pioneering audio-visual DJing across India today. Grateful to everyone who has been part of this journey! ⚡️🙏',
    date: '2 weeks ago',
    timestamp: '2026-08-04',
    likes: 5690,
    comments: 412,
    category: 'live',
    tags: ['#18YearsOfExcellence', '#DVJAashu', '#PioneerDJ', '#AVPerformance', '#JaipurRoots'],
    postUrl: 'https://instagram.com/dvjaashuofficial',
    hasVideo: false,
  },
  {
    id: 'post-5',
    type: 'studio_log',
    author: 'DVJ Aashu',
    handle: '@dvjaashuofficial',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop',
    caption: '“Disciple of Nature” & “Translucent Flute” now streaming on Amazon Music, Apple Music, and SoundCloud. Streaming link in bio! Have you checked out the live flute breakdown yet? 🎧🌿',
    date: '3 weeks ago',
    timestamp: '2026-07-28',
    likes: 3840,
    comments: 178,
    category: 'studio',
    tags: ['#DiscipleOfNature', '#AmazonMusic', '#SoundCloud', '#ClassitrickRecords', '#NewMusic'],
    postUrl: 'https://instagram.com/dvjaashuofficial',
    hasVideo: false,
  },
  {
    id: 'post-6',
    type: 'reels_clip',
    author: 'DVJ Aashu',
    handle: '@dvjaashuofficial',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop',
    caption: 'Peak time 144 BPM psy-trance energy with "Fear of Darkness"! The laser synchronization and video wall feedback was out of this world. Catch me on the next festival date! 🚀⚡️',
    date: '1 month ago',
    timestamp: '2026-07-19',
    likes: 4950,
    comments: 290,
    category: 'live',
    tags: ['#FearOfDarkness', '#TranceFamily', '#LiveVisuals', '#FestivalVibes', '#DVJAashu'],
    postUrl: 'https://instagram.com/dvjaashuofficial',
    hasVideo: true,
  }
];
