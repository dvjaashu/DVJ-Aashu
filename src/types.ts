export interface Track {
  id: string;
  title: string;
  artist: string;
  collaborators?: string;
  genre: 'House' | 'Trance' | 'Deep House' | 'Folk Fusion' | 'Sufi Techno' | 'Live AV Mix';
  bpm: number;
  key: string;
  duration: number; // in seconds
  releaseDate: string;
  label?: string;
  composer?: string;
  coverUrl: string;
  audioUrl?: string;
  waveform: number[];
  plays: string;
  likes: number;
  description: string;
  synthPreset: 'flute_organic' | 'trance_lead' | 'deep_house' | 'folk_fusion' | 'electro_bass';
  soundCloudTrackName?: string;
  soundCloudEmbedUrl?: string;
  links: {
    amazonMusic?: string;
    appleMusic?: string;
    soundCloud?: string;
    youtube?: string;
    spotify?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface CareerMilestone {
  year: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  category: 'residency' | 'breakthrough' | 'studio' | 'tour';
  stats?: string;
  highlightIcon?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  event: string;
  location: string;
  city: string;
  date: string;
  category: 'festivals' | 'clubs' | 'royal_palace' | 'backstage_av';
  imageUrl: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  attendance?: string;
  photographer: string;
  visualSetup?: string;
  exif: {
    camera: string;
    lens: string;
    settings: string;
  };
  featured?: boolean;
}

export interface TourDate {
  id: string;
  date: string;
  day: string;
  month: string;
  year: string;
  venue: string;
  city: string;
  country: string;
  eventTitle: string;
  stageType: 'Audio-Visual Mainstage' | 'Royal Palace Gala' | 'Club Residency' | 'Poolside Sunset' | 'Sufi Electronic Night';
  status: 'Confirmed' | 'Few Passes Left' | 'Private By Invitation' | 'Guestlist Open';
  ticketUrl?: string;
}

export interface ServiceOffering {
  id: string;
  title: string;
  subtitle: string;
  idealFor: string;
  description: string;
  features: string[];
  equipmentProvided: string;
  tag?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  eventType: string;
  eventDate: string;
  location: string;
  venue: string;
  expectedGuests: string;
  setDurationHours: number;
  avProductionRequired: 'audio_visual_full' | 'dj_only_console' | 'live_fusion_flute_percussion';
  specialRequests: string;
}
