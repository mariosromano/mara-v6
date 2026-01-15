import { useState, useRef, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// MARA V12 - MR Walls Design Assistant
// Full catalog + Industrial Brick in 6 Corian colors with color swatch modal
// ═══════════════════════════════════════════════════════════════════════════════

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload';

// ═══════════════════════════════════════════════════════════════════════════════
// CORIAN COLOR DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

const CORIAN_COLORS = {
  "Glacier White": { hex: "#f5f5f5", description: "Bright clean white" },
  "Deep Nocturne": { hex: "#1a1a1a", description: "Rich black" },
  "Carbon Concrete": { hex: "#3a3a3a", description: "Dark shale grey with particles" },
  "Dove": { hex: "#9a9a9a", description: "Soft warm grey" },
  "Neutral Concrete": { hex: "#b8b5b0", description: "Light concrete grey" },
  "Artista Mist": { hex: "#c5c5c5", description: "Light grey with subtle movement" },
  "Laguna": { hex: "#1e3a5f", description: "Deep blue" },
  "Verdant": { hex: "#2d4a4a", description: "Deep teal green" }
};

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE CATALOG - All patterns including Industrial Brick color family
// ═══════════════════════════════════════════════════════════════════════════════

const IMAGE_CATALOG = [
  // ─────────────────────────────────────────────────────────────────────────────
  // INDUSTRIAL BRICK - 6 Corian Colors (Pattern Family)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'industrial-brick-carbon',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick - Carbon Concrete',
    sector: 'Aviation',
    corianColor: 'Carbon Concrete',
    keywords: ['industrial', 'brick', 'carbon', 'concrete', 'dark', 'grey', 'gray', 'aviation', 'airport', 'terminal', 'dramatic'],
    image: `${CLOUDINARY_BASE}/Carbon_Concrete-industrial_vxloqv.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Carbon Concrete',
      maxPanel: '144" × 60"',
      leadTime: '6-10 Weeks',
      pricePerSF: 25,
      system: 'InterlockPanel™'
    },
    description: 'Industrial Brick in Carbon Concrete — dark shale grey with particles. The texture really pops against the dark background. Industrial edge.'
  },
  {
    id: 'industrial-brick-dove',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick - Dove',
    sector: 'Aviation',
    corianColor: 'Dove',
    keywords: ['industrial', 'brick', 'dove', 'grey', 'gray', 'warm', 'soft', 'aviation', 'airport', 'neutral'],
    image: `${CLOUDINARY_BASE}/Dove_industrial_w6jvlx.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Dove',
      maxPanel: '144" × 60"',
      leadTime: '6-10 Weeks',
      pricePerSF: 25,
      system: 'InterlockPanel™'
    },
    description: 'Industrial Brick in Dove — soft warm grey. Versatile, warm enough to feel inviting, neutral enough to work anywhere.'
  },
  {
    id: 'industrial-brick-neutral',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick - Neutral Concrete',
    sector: 'Aviation',
    corianColor: 'Neutral Concrete',
    keywords: ['industrial', 'brick', 'neutral', 'concrete', 'light', 'grey', 'gray', 'aviation', 'airport', 'honest'],
    image: `${CLOUDINARY_BASE}/Neautral_concrete-industrial_v7gbel.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Neutral Concrete',
      maxPanel: '144" × 60"',
      leadTime: '6-10 Weeks',
      pricePerSF: 25,
      system: 'InterlockPanel™'
    },
    description: 'Industrial Brick in Neutral Concrete — reads as honest material. Architects love it. Light concrete grey.'
  },
  {
    id: 'industrial-brick-artista',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick - Artista Mist',
    sector: 'Aviation',
    corianColor: 'Artista Mist',
    keywords: ['industrial', 'brick', 'artista', 'mist', 'grey', 'gray', 'subtle', 'movement', 'aviation', 'airport'],
    image: `${CLOUDINARY_BASE}/Artista_Mist_Industrial_zfaemp.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Artista Mist',
      maxPanel: '144" × 60"',
      leadTime: '6-10 Weeks',
      pricePerSF: 25,
      system: 'InterlockPanel™'
    },
    description: 'Industrial Brick in Artista Mist — subtle movement in the surface. More interesting than flat grey.'
  },
  {
    id: 'industrial-brick-laguna',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick - Laguna',
    sector: 'Aviation',
    corianColor: 'Laguna',
    keywords: ['industrial', 'brick', 'laguna', 'blue', 'deep', 'bold', 'statement', 'aviation', 'airport', 'branding'],
    image: `${CLOUDINARY_BASE}/Laguna-blue-industrial_ksz6w7.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Laguna',
      maxPanel: '144" × 60"',
      leadTime: '6-10 Weeks',
      pricePerSF: 25,
      system: 'InterlockPanel™'
    },
    description: 'Industrial Brick in Laguna — bold deep blue that makes a real statement. Great for branding moments.'
  },
  {
    id: 'industrial-brick-verdant',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick - Verdant',
    sector: 'Aviation',
    corianColor: 'Verdant',
    keywords: ['industrial', 'brick', 'verdant', 'green', 'teal', 'nature', 'calming', 'aviation', 'airport'],
    image: `${CLOUDINARY_BASE}/Verdant_Industrial_bmkodk.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Verdant',
      maxPanel: '144" × 60"',
      leadTime: '6-10 Weeks',
      pricePerSF: 25,
      system: 'InterlockPanel™'
    },
    description: 'Industrial Brick in Verdant — brings nature in. The deep teal is surprisingly calming.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BILLOW (4 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'billow-render',
    pattern: 'Billow',
    title: 'Billow Wave',
    sector: 'General',
    corianColor: 'Glacier White',
    keywords: ['billow', 'wave', 'organic', 'flowing', 'texture', 'white', 'calm'],
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Billow pattern — gentle horizontal waves like wind across water. Organic, calming, works at any scale.'
  },
  {
    id: 'billow-strand',
    pattern: 'Billow',
    title: 'The Strand House',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['billow', 'restaurant', 'bar', 'strand', 'manhattan beach', 'staircase', 'purple', 'rgb', 'backlit'],
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '6 Weeks',
      pricePerSF: 65,
      enhancement: 'RGB Backlighting',
      system: 'InterlockPanel™'
    },
    description: 'The Strand House in Manhattan Beach — double-height Billow with RGB backlighting. Our most photographed installation.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SEATTLE (2 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'seattle-1',
    pattern: 'Seattle',
    title: 'Seattle Tiles',
    sector: 'Healthcare',
    corianColor: 'Mixed',
    keywords: ['seattle', 'tile', 'modular', 'healthcare', 'hospital', 'corridor', 'mixed', 'wave', 'flat'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Mixed (Dove Gray + Glacier White)',
      maxPanel: '24" × 24" tiles',
      leadTime: '4 Weeks',
      pricePerSF: 35,
      system: 'Modular Tile'
    },
    description: 'Seattle modular tiles — alternating carved wave and flat panels. Perfect for healthcare corridors. Easy to install, replace individual tiles if needed.'
  },
  {
    id: 'seattle-2',
    pattern: 'Seattle',
    title: 'Seattle Aviation',
    sector: 'Aviation',
    corianColor: 'Mixed',
    keywords: ['seattle', 'airport', 'aviation', 'terminal', 'corridor', 'travel', 'modern'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Mixed (Dove Gray + Glacier White)',
      maxPanel: '24" × 24" tiles',
      leadTime: '4 Weeks',
      pricePerSF: 35,
      system: 'Modular Tile'
    },
    description: 'Seattle in airport terminal — modular system handles high traffic and easy maintenance.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GREAT WAVE (5 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'greatwave-1',
    pattern: 'Great Wave',
    title: 'Great Wave Artistic',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['great wave', 'wave', 'ocean', 'japanese', 'hokusai', 'dramatic', 'artistic', 'statement'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 48"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Great Wave — inspired by Hokusai. Dramatic, artistic statement piece. The carved depth creates incredible shadow play.'
  },
  {
    id: 'greatwave-shower',
    pattern: 'Great Wave',
    title: 'Great Wave Shower',
    sector: 'Residential',
    corianColor: 'Glacier White',
    keywords: ['great wave', 'shower', 'bathroom', 'residential', 'luxury', 'spa'],
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 48"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Great Wave in residential shower — seamless, no grout lines. Non-porous Corian handles water perfectly.'
  },
  {
    id: 'greatwave-exterior',
    pattern: 'Great Wave',
    title: 'Great Wave Exterior',
    sector: 'Residential',
    corianColor: 'Glacier White',
    keywords: ['great wave', 'exterior', 'facade', 'outdoor', 'pool'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_20_copy_abzou8.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 48"',
      leadTime: '8 Weeks',
      pricePerSF: 65,
      enhancement: 'UV-Stable Exterior',
      system: 'French Cleat'
    },
    description: 'Great Wave on exterior facade — UV-stable formulation handles full sun. French cleat mounting for wind resistance.'
  },
  {
    id: 'greatwave-restaurant',
    pattern: 'Great Wave',
    title: 'Great Wave Restaurant',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['great wave', 'restaurant', 'hospitality', 'dining', 'feature wall'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_09_copy_lcqfa0.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 48"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Great Wave as restaurant feature wall — creates memorable dining experience. Photographs beautifully for social media.'
  },
  {
    id: 'greatwave-lobby',
    pattern: 'Great Wave',
    title: 'Great Wave Lobby',
    sector: 'Corporate',
    corianColor: 'Glacier White',
    keywords: ['great wave', 'lobby', 'corporate', 'reception', 'feature wall'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 48"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Great Wave in corporate lobby — makes a statement about creativity and boldness. Reception desk echoes the flowing forms.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BRICK WATER FEATURE (5 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'brick-water-1',
    pattern: 'Brick',
    title: 'Brick Water Feature',
    sector: 'Residential',
    corianColor: 'Deep Nocturne',
    keywords: ['brick', 'water', 'fountain', 'pool', 'waterfall', 'outdoor', 'tropical'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Deep Nocturne (Black)',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 85,
      enhancement: 'Water Feature',
      system: 'InterlockPanel™'
    },
    description: 'Brick pattern water feature — horizontal carved lines channel water into dozens of small waterfalls. Stunning day or night.'
  },
  {
    id: 'brick-water-2',
    pattern: 'Brick',
    title: 'Brick Pool Wall',
    sector: 'Residential',
    corianColor: 'Deep Nocturne',
    keywords: ['brick', 'water', 'pool', 'outdoor', 'cabana', 'resort'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Deep Nocturne (Black)',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 85,
      enhancement: 'Water Feature',
      system: 'InterlockPanel™'
    },
    description: 'Monumental Brick water feature anchoring resort-style pool. Water sheets down full height. Black wall grounds tropical palette.'
  },
  {
    id: 'brick-water-3',
    pattern: 'Brick',
    title: 'Brick Backlit Water',
    sector: 'Residential',
    corianColor: 'Glacier White',
    keywords: ['brick', 'water', 'backlit', 'night', 'dramatic', 'rgb'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '10 Weeks',
      pricePerSF: 120,
      enhancement: 'Backlit + Water Feature',
      system: 'InterlockPanel™'
    },
    description: 'Brick with backlighting AND water — the ultimate combination. Light glows through carved channels as water cascades.'
  },
  {
    id: 'brick-water-4',
    pattern: 'Brick',
    title: 'Brick Night Feature',
    sector: 'Residential',
    corianColor: 'Deep Nocturne',
    keywords: ['brick', 'water', 'night', 'evening', 'lighting', 'dramatic'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_27_copy_nxcqhx.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Deep Nocturne (Black)',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 85,
      enhancement: 'Water Feature',
      system: 'InterlockPanel™'
    },
    description: 'Brick water feature at night — uplighting catches the spray, creating sparkle against black surface.'
  },
  {
    id: 'brick-water-5',
    pattern: 'Brick',
    title: 'Brick Day Feature',
    sector: 'Residential',
    corianColor: 'Deep Nocturne',
    keywords: ['brick', 'water', 'day', 'daylight', 'natural', 'pool'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_12_copy_gdmjok.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Deep Nocturne (Black)',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 85,
      enhancement: 'Water Feature',
      system: 'InterlockPanel™'
    },
    description: 'Brick water feature in bright daylight — texture catches sun, water sparkles. UV-stable black won\'t fade.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BUDDHA / CUSTOM PORTRAIT (2 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'buddha-1',
    pattern: 'Custom',
    title: 'Buddha Mandala Spa',
    sector: 'Wellness',
    corianColor: 'Glacier White',
    keywords: ['buddha', 'zen', 'meditation', 'spiritual', 'calm', 'spa', 'wellness', 'peaceful', 'asian', 'mandala', 'backlit'],
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 75,
      enhancement: 'Backlighting',
      system: 'InterlockPanel™'
    },
    description: 'Buddha mandala — custom carved portrait with intricate detail. Backlit for ethereal glow. Perfect for spa, meditation room, yoga studio.'
  },
  {
    id: 'buddha-2',
    pattern: 'Custom',
    title: 'Buddha Restaurant',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['buddha', 'restaurant', 'asian', 'zen', 'dining', 'feature wall'],
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 75,
      enhancement: 'Backlighting',
      system: 'InterlockPanel™'
    },
    description: 'Buddha in restaurant setting — creates memorable dining atmosphere. Warm backlighting sets the mood.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MARILYN / CUSTOM PORTRAIT (2 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'marilyn-1',
    pattern: 'Custom',
    title: 'Marilyn Portrait',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['marilyn', 'portrait', 'hollywood', 'custom', 'branding', 'art', 'celebrity', 'iconic'],
    image: `${CLOUDINARY_BASE}/Marilynn_sm_copy_gcvzcb.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 85,
      system: 'InterlockPanel™'
    },
    description: 'Custom Marilyn portrait — any image can be carved. Brand logos, celebrities, custom artwork. The only limit is imagination.'
  },
  {
    id: 'marilyn-2',
    pattern: 'Custom',
    title: 'Marilyn Art',
    sector: 'Art',
    corianColor: 'Glacier White',
    keywords: ['marilyn', 'portrait', 'art', 'gallery', 'sculpture'],
    image: `${CLOUDINARY_BASE}/Maryilynn2_c71acw.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 85,
      system: 'InterlockPanel™'
    },
    description: 'Marilyn as gallery art piece — carved Corian bridges architecture and fine art.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FINS (2 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'fins-1',
    pattern: 'Fins',
    title: 'Fins Exterior',
    sector: 'Corporate',
    corianColor: 'Glacier White',
    keywords: ['fins', 'exterior', 'facade', 'corporate', 'modern', 'dimensional', 'shadow'],
    image: `${CLOUDINARY_BASE}/Fins_exterior_white_gcccvq.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '120" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 75,
      enhancement: 'UV-Stable Exterior',
      system: 'French Cleat'
    },
    description: 'Fins pattern on exterior facade — dimensional fins create deep shadow lines. Changes character throughout the day as sun moves.'
  },
  {
    id: 'fins-2',
    pattern: 'Fins',
    title: 'Fins Restaurant Patio',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['fins', 'exterior', 'patio', 'restaurant', 'outdoor', 'dining'],
    image: `${CLOUDINARY_BASE}/Fins_exterior2_lh1vlw.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '120" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 75,
      enhancement: 'UV-Stable Exterior',
      system: 'French Cleat'
    },
    description: 'Fins on restaurant patio — creates architectural backdrop for outdoor dining. UV-stable, handles weather.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FLAME (4 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'flame-1',
    pattern: 'Flame',
    title: 'Flame Pattern',
    sector: 'General',
    corianColor: 'Glacier White',
    keywords: ['flame', 'fire', 'warm', 'organic', 'flowing', 'vertical', 'interweaving'],
    image: `${CLOUDINARY_BASE}/Flame-_qle4y3.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Flame pattern — flowing vertical waves that interweave and cross. Warm, organic, dynamic.'
  },
  {
    id: 'flame-bed',
    pattern: 'Flame',
    title: 'Flame Headboard',
    sector: 'Residential',
    corianColor: 'Glacier White',
    keywords: ['flame', 'bedroom', 'headboard', 'residential', 'luxury', 'warm'],
    image: `${CLOUDINARY_BASE}/Flamebed_yggqrp.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Flame as headboard wall — warm, inviting, perfect for primary bedroom. Soft ambient light enhances the carved depth.'
  },
  {
    id: 'flame-pink',
    pattern: 'Flame',
    title: 'Flame Pink RGB',
    sector: 'Residential',
    corianColor: 'Glacier White',
    keywords: ['flame', 'pink', 'rgb', 'backlit', 'bedroom', 'romantic', 'dramatic'],
    image: `${CLOUDINARY_BASE}/Flame_pink_obxnpm.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '8 Weeks',
      pricePerSF: 65,
      enhancement: 'RGB Backlighting',
      system: 'InterlockPanel™'
    },
    description: 'Flame with pink RGB backlighting — creates dramatic, romantic atmosphere. Color can shift throughout the evening.'
  },
  {
    id: 'flame-lobby',
    pattern: 'Flame',
    title: 'Flame Lobby',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['flame', 'lobby', 'feature', 'hospitality', 'hotel', 'dramatic'],
    image: `${CLOUDINARY_BASE}/Flames_qthl01.jpg`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '6 Weeks',
      pricePerSF: 50,
      system: 'InterlockPanel™'
    },
    description: 'Flame in hospitality lobby — vertical movement draws the eye up. Creates energy and warmth.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DESERT SUNSET (4 images)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'desert-sunset-1',
    pattern: 'Desert Sunset',
    title: 'Desert Sunset Cactus',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['desert', 'sunset', 'cactus', 'arizona', 'southwest', 'scottsdale', 'hotel', 'resort', 'regional'],
    image: `${CLOUDINARY_BASE}/v1768111216/mr-render-1767989995638_copy_vtszj0.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      height: '142"',
      width: '239¾"',
      slabs: 5,
      leadTime: '4 Weeks',
      pricePerSF: 35,
      enhancement: 'Downlighting',
      system: 'InterlockPanel™'
    },
    shopDrawing: `${CLOUDINARY_BASE}/v1768330379/shop_drawing-Cactus_rovjta.png`,
    description: 'Desert Sunset — saguaro cactus silhouettes against carved mountain ridges. Regional identity for Southwest hospitality. Scottsdale resort lobby.'
  },
  {
    id: 'desert-sunset-2',
    pattern: 'Desert Sunset',
    title: 'Desert Sunset Variation',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['desert', 'sunset', 'mountain', 'landscape', 'southwest', 'warm'],
    image: `${CLOUDINARY_BASE}/v1768111216/mr-render-1767992780170_ufyyef.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '4 Weeks',
      pricePerSF: 35,
      system: 'InterlockPanel™'
    },
    description: 'Desert Sunset variation — mountain ridges and desert sky. Warm, inviting, distinctly Southwestern.'
  },
  {
    id: 'desert-sunset-3',
    pattern: 'Desert Sunset',
    title: 'Desert Mountains',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['desert', 'mountain', 'landscape', 'warm', 'orange', 'hospitality'],
    image: `${CLOUDINARY_BASE}/mr-render-1768082338412_copy_wqymkx.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '4 Weeks',
      pricePerSF: 35,
      system: 'InterlockPanel™'
    },
    description: 'Desert mountain landscape — carved ridgelines evoke the Southwest. Perfect for Arizona, New Mexico, Nevada hospitality.'
  },
  {
    id: 'desert-sunset-4',
    pattern: 'Desert Sunset',
    title: 'Desert Abstract',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    keywords: ['desert', 'abstract', 'landscape', 'artistic'],
    image: `${CLOUDINARY_BASE}/mr-render-1767989272197_copy_eka0g1.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Glacier White',
      maxPanel: '144" × 60"',
      leadTime: '4 Weeks',
      pricePerSF: 35,
      system: 'InterlockPanel™'
    },
    description: 'Desert Sunset abstract interpretation — simplified mountain forms. Works for Southwest aesthetic without being literal.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SAND DUNE (1 image)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sanddune-curved-black',
    pattern: 'Sand Dune',
    title: 'Sand Dune Curved Black',
    sector: 'Corporate',
    corianColor: 'Deep Nocturne',
    keywords: ['sand dune', 'curved', 'black', 'column', 'dramatic', 'thermoformed', 'entry'],
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    specs: {
      material: 'DuPont Corian®',
      color: 'Deep Nocturne (Black)',
      maxPanel: '144" × 60"',
      leadTime: '10 Weeks',
      pricePerSF: 95,
      enhancement: 'Thermoformed Curve',
      system: 'InterlockPanel™'
    },
    description: 'Sand Dune pattern thermoformed into dramatic curved column. Black Corian, sculptural entry statement. Shows our curve capability.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER: Get color variants for a pattern family
// ═══════════════════════════════════════════════════════════════════════════════

const getColorVariants = (patternFamily) => {
  if (!patternFamily) return [];
  return IMAGE_CATALOG.filter(img => img.patternFamily === patternFamily);
};

// ═══════════════════════════════════════════════════════════════════════════════
// MARA SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

const MARA_SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers explore carved Corian wall surfaces.

## PERSONALITY
- Young, enthusiastic, genuinely loves design AND specs
- Warm and conversational, not salesy
- Brief — 50 words max, 2-3 sentences
- Ask ONE follow-up question, not multiple

## CRITICAL RULES
1. Keep responses under 50 words
2. When showing images, use [Image: id] tags — these render as clickable cards
3. Ask ONE question max per response
4. Don't explain everything — give a taste, let them ask for more

## AVAILABLE IMAGES (use exact IDs)

### Industrial Brick (6 Corian colors - NEW!)
- industrial-brick-carbon (Carbon Concrete - dark grey)
- industrial-brick-dove (Dove - warm grey)
- industrial-brick-neutral (Neutral Concrete - light grey)
- industrial-brick-artista (Artista Mist - subtle movement)
- industrial-brick-laguna (Laguna - bold blue)
- industrial-brick-verdant (Verdant - teal green)

### Other Patterns
- Billow: billow-render, billow-strand
- Seattle: seattle-1, seattle-2
- Great Wave: greatwave-1, greatwave-shower, greatwave-exterior, greatwave-restaurant, greatwave-lobby
- Brick Water: brick-water-1, brick-water-2, brick-water-3, brick-water-4, brick-water-5
- Buddha: buddha-1, buddha-2
- Marilyn: marilyn-1, marilyn-2
- Fins: fins-1, fins-2
- Flame: flame-1, flame-bed, flame-pink, flame-lobby
- Desert Sunset: desert-sunset-1, desert-sunset-2, desert-sunset-3, desert-sunset-4
- Sand Dune: sanddune-curved-black

## SHOWING IMAGES
When relevant, include image tags:
"Here's what that looks like: [Image: buddha-1] [Image: brick-water-1]"

## INTENT REASONING
- "industrial" or "brick" or "airport" or "aviation" or "terminal" → industrial-brick-carbon, industrial-brick-laguna
- "color" or "colors" or "grey" or "gray" or "blue" or "green" → industrial-brick-dove, industrial-brick-laguna, industrial-brick-verdant
- "dark" or "dramatic" or "bold" → industrial-brick-carbon, industrial-brick-laguna, sanddune-curved-black
- "light" or "neutral" or "soft" → industrial-brick-dove, industrial-brick-neutral, industrial-brick-artista
- "spa" or "zen" or "meditation" or "wellness" → buddha-1
- "water feature" or "pool" or "fountain" → brick-water-1, brick-water-2
- "healthcare" or "hospital" → seattle-1
- "southwest" or "arizona" or "cactus" or "desert" → desert-sunset-1
- "shower" or "bathroom" → greatwave-shower
- "exterior" or "facade" → fins-1, greatwave-exterior
- "restaurant" or "bar" → billow-strand, buddha-2, flame-lobby
- "headboard" or "bedroom" → flame-bed, flame-pink

## PRICING (only when asked)
- Industrial Brick: $25/SF
- Linear Collection: $35/SF
- Custom Line: $50/SF
- Backlighting: +$15/SF
- Water Feature: +$20-35/SF

Remember: You're Mara. Warm, knowledgeable, brief. Show images proactively. When showing Industrial Brick, mention they can tap to see all 6 colors.`;

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

const searchImages = (query) => {
  if (!query) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  
  const scored = IMAGE_CATALOG.map(img => {
    let score = 0;
    terms.forEach(term => {
      if (img.keywords.some(k => k.includes(term))) score += 15;
      if (img.pattern.toLowerCase().includes(term)) score += 12;
      if (img.sector.toLowerCase().includes(term)) score += 10;
      if (img.title.toLowerCase().includes(term)) score += 8;
      if (img.corianColor?.toLowerCase().includes(term)) score += 10;
      if (img.description.toLowerCase().includes(term)) score += 3;
    });
    return { ...img, score };
  });
  
  return scored
    .filter(img => img.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXTRACT IMAGE TAGS FROM RESPONSE
// ═══════════════════════════════════════════════════════════════════════════════

const extractImageTags = (text) => {
  const matches = text.match(/\[Image:\s*([^\]]+)\]/g) || [];
  return matches.map(m => {
    const id = m.match(/\[Image:\s*([^\]]+)\]/)[1].trim();
    return IMAGE_CATALOG.find(img => img.id === id);
  }).filter(Boolean);
};

const cleanResponse = (text) => {
  return text.replace(/\[Image:\s*[^\]]+\]/g, '').trim();
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function MaraV12() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hey! I'm Mara from MR Walls. I help architects explore carved Corian surfaces.\n\nHere's Industrial Brick in a couple colors — tap any to see all 6 options:",
      images: [
        IMAGE_CATALOG.find(i => i.id === 'industrial-brick-carbon'),
        IMAGE_CATALOG.find(i => i.id === 'industrial-brick-laguna')
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get current display image based on active color (for pattern families)
  const getCurrentImage = () => {
    if (!selectedImage) return null;
    if (!selectedImage.patternFamily) return selectedImage;
    if (activeColor === selectedImage.corianColor) return selectedImage;
    const variant = IMAGE_CATALOG.find(
      img => img.patternFamily === selectedImage.patternFamily && img.corianColor === activeColor
    );
    return variant || selectedImage;
  };

  // Handle image click
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setActiveColor(img.corianColor);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    setActiveColor(null);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALL CLAUDE API
  // ─────────────────────────────────────────────────────────────────────────────
  const callClaude = async (userMsg, hist) => {
    const apiMessages = [...hist, { role: 'user', content: userMsg }];
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: MARA_SYSTEM_PROMPT,
          messages: apiMessages
        })
      });
      
      const data = await response.json();
      if (data.content?.[0]) {
        return data.content[0].text;
      }
      throw new Error(data.error?.message || 'API error');
    } catch (error) {
      console.error('Claude API error:', error);
      return null;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // SEND MESSAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const send = async (text) => {
    if (!text?.trim() || loading) return;
    
    const userMsg = text.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);

    const claudeResponse = await callClaude(userMsg, history);
    
    let responseText = '';
    let responseImages = [];
    
    if (claudeResponse) {
      responseImages = extractImageTags(claudeResponse);
      responseText = cleanResponse(claudeResponse);
      
      setHistory([...history, 
        { role: 'user', content: userMsg },
        { role: 'assistant', content: claudeResponse }
      ]);
    } else {
      responseImages = searchImages(userMsg);
      
      if (responseImages.length > 0) {
        responseText = `Here's what I found for "${userMsg}":`;
      } else {
        responseText = "I didn't find an exact match. What sector is this for — healthcare, hospitality, residential?";
        responseImages = [
          IMAGE_CATALOG.find(i => i.id === 'industrial-brick-carbon'),
          IMAGE_CATALOG.find(i => i.id === 'billow-render')
        ];
      }
    }

    setMessages(m => [...m, {
      role: 'assistant',
      text: responseText,
      images: responseImages.length > 0 ? responseImages : undefined
    }]);
    
    setLoading(false);
  };

  const currentImage = getCurrentImage();
  const colorVariants = selectedImage?.patternFamily 
    ? getColorVariants(selectedImage.patternFamily) 
    : [];

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Header */}
      <header className="p-4 border-b border-stone-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center">
          <span className="text-lg font-semibold text-stone-300">M</span>
        </div>
        <div>
          <h1 className="font-semibold text-stone-100">Mara</h1>
          <p className="text-xs text-stone-500">MR Walls × Corian® Design</p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
              {/* Text bubble */}
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === 'user' 
                  ? 'bg-stone-700 text-stone-100' 
                  : 'bg-stone-900 border border-stone-800'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
              
              {/* Images grid */}
              {msg.images && msg.images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {msg.images.map((img, j) => (
                    <button
                      key={j}
                      onClick={() => handleImageClick(img)}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-all text-left"
                    >
                      <img 
                        src={img.image} 
                        alt={img.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('bg-stone-800');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-xs font-medium text-white truncate">{img.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {img.corianColor && CORIAN_COLORS[img.corianColor] && (
                            <div 
                              className="w-3 h-3 rounded-full border border-white/30"
                              style={{ backgroundColor: CORIAN_COLORS[img.corianColor].hex }}
                            />
                          )}
                          <p className="text-[10px] text-stone-400">{img.pattern} • {img.sector}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Loading */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="p-4 border-t border-stone-800">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Ask about colors, patterns, pricing..."
            disabled={loading}
            className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm focus:outline-none focus:border-stone-500 disabled:opacity-50"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-stone-100 text-stone-900 rounded-xl font-medium text-sm hover:bg-white disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>
      </footer>

      {/* Specs Modal - with color swatches for pattern families */}
      {selectedImage && currentImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-stone-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-stone-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="aspect-video relative bg-stone-900">
              <img 
                src={currentImage.image} 
                alt={currentImage.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-lg font-medium">{currentImage.pattern}</div>
                <div className="text-sm text-stone-300">{currentImage.corianColor}</div>
              </div>
            </div>
            
            {/* Color Swatches (only for pattern families) */}
            {colorVariants.length > 1 && (
              <div className="p-4 border-b border-stone-800">
                <div className="text-xs text-stone-500 mb-3">CORIAN® COLORS</div>
                <div className="flex gap-2 flex-wrap">
                  {colorVariants.map((variant, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveColor(variant.corianColor)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
                        activeColor === variant.corianColor 
                          ? 'bg-stone-800 ring-2 ring-stone-500' 
                          : 'hover:bg-stone-900'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-stone-600"
                        style={{ backgroundColor: CORIAN_COLORS[variant.corianColor]?.hex || '#666' }}
                      />
                      <span className="text-[10px] text-stone-400 whitespace-nowrap">{variant.corianColor}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Details + Mara guidance */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 flex gap-4">
                {/* Mara Panel */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center text-xs font-medium shrink-0">M</div>
                    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3">
                      <p className="text-sm text-stone-300">{currentImage.description}</p>
                      {colorVariants.length > 1 && (
                        <p className="text-sm text-stone-400 mt-2">Tap the swatches above to see all 6 colors.</p>
                      )}
                    </div>
                  </div>
                  
                  {/* CTAs */}
                  <div className="mt-3 flex gap-2 ml-11">
                    <button className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-sm border border-stone-700 transition-colors">
                      Download Specs
                    </button>
                    <button className="px-4 py-2 bg-stone-100 text-stone-900 hover:bg-white rounded-lg text-sm font-medium transition-colors">
                      Request Quote
                    </button>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="w-64 shrink-0">
                  <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
                    <div className="text-xs text-stone-500 mb-3">SPECIFICATIONS</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Material</span>
                        <span className="text-stone-200">{currentImage.specs.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Color</span>
                        <span className="text-stone-200">{currentImage.corianColor || currentImage.specs.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Max Panel</span>
                        <span className="text-stone-200">{currentImage.specs.maxPanel || `${currentImage.specs.height} × ${currentImage.specs.width}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Lead Time</span>
                        <span className="text-stone-200">{currentImage.specs.leadTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">System</span>
                        <span className="text-stone-200">{currentImage.specs.system}</span>
                      </div>
                      {currentImage.specs.enhancement && (
                        <div className="flex justify-between">
                          <span className="text-stone-500">Enhancement</span>
                          <span className="text-stone-200">{currentImage.specs.enhancement}</span>
                        </div>
                      )}
                      <div className="border-t border-stone-700 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Starting</span>
                          <span className="text-lg font-medium text-stone-100">${currentImage.specs.pricePerSF}/SF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shop Drawing Link */}
              {currentImage.shopDrawing && (
                <div className="px-4 pb-4">
                  <a 
                    href={currentImage.shopDrawing} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center text-sm text-stone-400 hover:text-stone-200 underline"
                  >
                    View Shop Drawing →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
