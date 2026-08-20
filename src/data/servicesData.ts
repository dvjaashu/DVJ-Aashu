import { ServiceOffering, CareerMilestone } from '../types';

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    year: '2006',
    title: 'Inception & Early Club Pioneer',
    subtitle: 'Foundation of Ashutosh Verma’s DJing in Pink City',
    location: 'Jaipur, Rajasthan',
    description: 'Began professional DJing with analog vinyl & CD media, pioneering early underground electronic dance music and high-energy Bollywood remixes across Rajasthan clubs.',
    category: 'breakthrough',
    stats: '18+ Years Active Legacy'
  },
  {
    year: '2013',
    title: 'Historic "Summer Spark" OM Tower Breakthrough',
    subtitle: '1,800+ Crowd Milestone Set',
    location: 'Hotel OM Tower, Church Road, Jaipur',
    description: 'Delivered a landmark 4-hour heavy electro, progressive house, and dubstep headline performance that cemented DVJ Aashu as Rajasthan’s foremost electronic sound tastemaker.',
    category: 'breakthrough',
    stats: '1,800+ Attendees'
  },
  {
    year: '2017',
    title: 'Pioneering Audio-Visual (DVJ) Workflows',
    subtitle: 'Simultaneous Video Scratching & 3D Visual Mapping',
    location: 'Jaipur & Delhi NCR Arenas',
    description: 'Transitioned full stage workflow to Pioneer DVJ media consoles, synchronizing live HD video loops, custom 3D motion graphics, and frame-accurate visual timecode onto mega LED concert walls.',
    category: 'tour',
    stats: '100% Video-Synced Sets'
  },
  {
    year: '2021',
    title: 'Ora Club Residency & Royal Palace Galas',
    subtitle: 'Flagship Nightclub Residency & Royal Heritage Events',
    location: 'Ora Club Jaipur & Udaipur Palaces',
    description: 'Established the iconic weekend audio-visual residency at Ora Club while commanding exclusive private palace galas and destination Sangeet afterparties across City Palace Jaipur and Lake Pichola Udaipur.',
    category: 'residency',
    stats: '120+ Headliner Club Nights'
  },
  {
    year: '2023',
    title: 'Viral "Sanak" Remix & Mix Mag 38 Release',
    subtitle: 'Folk Percussion Collaboration & 38-Min Live Set',
    location: 'Rajasthan Cultural Arena',
    description: 'Collaborated with folk percussionist Dino Banjara and DJ Jazz on the viral deep house rework of "Sanak", and broadcast the celebrated 38-minute live Audio-Visual mix set.',
    category: 'studio',
    stats: '500K+ Combined Streams'
  },
  {
    year: '2024–2025',
    title: 'Classitrick Label Releases & Nazar Khan Fusions',
    subtitle: 'Original Discography: "Disciple of Nature", "Translucent Flute", "Fear of Darkness"',
    location: 'Global Streaming Catalogues',
    description: 'Released critically acclaimed studio compositions featuring classical Indian flute maestro Nazar Khan on Classitrick, bridging traditional Rajasthani Bansuri heritage with 124 BPM House and 144 BPM Trance.',
    category: 'studio',
    stats: 'Official Amazon & Apple Catalogues'
  }
];

export const SERVICES: ServiceOffering[] = [
  {
    id: 'audiovisual-dj-vj',
    title: 'Audio-Visual (DVJ) & Live VJ Experience',
    subtitle: 'Synchronized Video Mixing, Motion Graphics & Peak DJ Set',
    idealFor: 'Concert stages, major club nights, festival arenas, luxury activations',
    description: 'DVJ Aashu’s signature hallmark — seamless simultaneous mixing of high-definition music videos, custom 3D event graphics, and live video scratching synchronized frame-accurately with pounding audio beats.',
    features: [
      'Simultaneous Audio + Live HD Video scratch mixing',
      'Custom 3D visual motion graphics tailored to your event branding',
      'Support for LED walls, multi-projector rigs & stage visual timecode',
      'Dynamic transitions across Deep House, Trance, Electro & Bollywood Electronic'
    ],
    equipmentProvided: 'Pioneer DVJ / CDJ media system, Resolume / ArKaos Video Server, HDMI / SDI Matrix Splitter',
    tag: 'Signature Audio-Visual Show'
  },
  {
    id: 'royal-destination-wedding',
    title: 'Royal Destination Weddings & Palace Galas',
    subtitle: 'Bespoke Rajasthani Heritage Fusion & High-Energy Sangeet',
    idealFor: 'Palace weddings in Jaipur/Udaipur/Jodhpur, international luxury destination celebrations',
    description: 'With 18 years of experience commanding India’s most opulent heritage venues, DVJ Aashu seamlessly curates an emotional musical arc — from soulful Rajasthani folk & Sufi sunset ambience to explosive Sangeet dancefloors.',
    features: [
      'Comprehensive pre-event musical curation & family preference consultation',
      'Soulful Sufi & Folk Electronic sunset cocktail hour transitions',
      'Explosive Bollywood & Punjabi EDM Sangeet afterparties',
      'Optional live artist integration (Live classical Flute by Nazar Khan & Dholak)'
    ],
    equipmentProvided: 'Pioneer Tour-Grade DJ Setup, wireless live acoustic mics for guest instrumentalists',
    tag: 'Heritage Luxury Specialist'
  },
  {
    id: 'live-instrument-fusion',
    title: 'Live Artist Fusion (Flute & Percussion Show)',
    subtitle: 'Electronic Music Meets Rajasthan Roots with Nazar Khan & Dino Banjara',
    idealFor: 'Cultural festivals, high-end gala dinners, music concerts, VIP corporate summits',
    description: 'The acclaimed live showcase bringing original studio compositions like "Disciple of Nature" and "Translucent Flute" to life with live acoustic Bansuri (flute) and live folk percussion alongside electronic synthesizers.',
    features: [
      'Live stage performance with renowned flutist Nazar Khan & live percussion',
      'Hybrid blend of classical Indian ragas and modern 124–144 BPM electronic grooves',
      'Original music catalogue tracks performed live with spontaneous improvisations',
      'Unforgettable visual and auditory spectacle for discerning international audiences'
    ],
    equipmentProvided: 'Dedicated multi-channel instrument inputs, in-ear monitoring & master audio outputs',
    tag: 'Live Band & DJ Hybrid'
  },
  {
    id: 'music-production-remixing',
    title: 'Custom Music Production & Event Theme Scoring',
    subtitle: 'Exclusive Event Anthems, Sonic Branding & High-End Edits',
    idealFor: 'Runway fashion showcases, corporate launch anthems, personalized wedding entrance tracks',
    description: 'Full studio composition by Ashutosh Verma on Classitrick label standards — custom-crafted intro soundtracks, viral dancefloor edits, and Dolby Atmos audio mastering for your signature event.',
    features: [
      'Customized entrance and climax soundtracks with bespoke lyrics / motifs',
      'Studio-grade stem mixing, mastering, and radio-ready production',
      'Exclusive commercial or private licensing rights',
      'Analog synthesizer & traditional Indian acoustic instruments recording'
    ],
    equipmentProvided: 'Complete Studio Outboard Gear (Synthesizers, Logic Pro X, Outboard Processors)',
    tag: 'Studio Composition'
  }
];

export const TECH_RIDER = {
  djBooth: [
    '3x or 4x Pioneer CDJ-3000 / DVJ Media Players (Latest Firmware, linked via Gigabit Switch)',
    '1x Pioneer DJM-V10 or DJM-900NXS2 Professional 4/6-Channel DJ Mixer',
    '2x Master HDMI / SDI Video Outs from DJ Booth connected to stage LED Wall processors',
    '2x High-Power DJ Booth Monitors (L-Acoustics, d&b audiotechnik, or JBL) with dedicated booth volume knob',
    '2x Shure Beta 58A / Sennheiser Wireless Microphones for MC and Live Flute / Percussion input'
  ],
  powerAndCables: [
    'Independent clean, isolated electrical power line for Audio-Visual DJ consoles',
    'CAT6 Network connection between DJ Console and FOH Lighting/Visual control desk',
    '2x Balanced Stereo XLR Master outputs to Main Front-of-House (FOH) Sound System'
  ],
  hospitality: [
    'Chilled mineral water (glass bottles), energy beverages, and green tea in DJ console area',
    'Secure green room / preparation space with direct stage access 60 minutes prior to show',
    'Dedicated audio technician on standby for live flute and percussion soundcheck'
  ]
};

export const TESTIMONIALS = [
  {
    quote: "DVJ Aashu's audio-visual set at our Jaipur palace gala was breathtaking. The fusion of Nazar Khan's live flute with deep electronic beats kept the royal courtyard electrified until sunrise.",
    author: "Maharaj Raghavendra Singh",
    role: "Heritage Events Patron • City Palace Jaipur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "18 years of seasoned mastery is instantly evident the moment Aashu touches the decks. His video scratching and intuitive crowd control during our luxury destination sangeet were unmatched.",
    author: "Pooja & Sameer Singhania",
    role: "Destination Wedding Hosts • Udaipur",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "From heavy electro and dubstep in his landmark 2013 Jaipur concerts to modern trance and Sufi house, DVJ Aashu remains one of Rajasthan's true audio-visual pioneers.",
    author: "Jaipur Music Culture Review",
    role: "Independent Music Editorial",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];
