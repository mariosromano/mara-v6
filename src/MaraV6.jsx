import { useState, useRef, useEffect } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE CATALOG - Rich descriptions for Claude reasoning
// Claude picks based on INTENT, not keywords
// "southwest" → Arizona resort → Desert Sunset
// "cactas" (misspelled) → cactus → Desert Sunset  
// "something calm" → zen, peaceful → Buddha, Sand Dune onsen
// ═══════════════════════════════════════════════════════════════════════════════

const IMAGE_CATALOG = [
  
  // ═══════════════════════════════════════════════════════════════
  // BILLOW - Flowing horizontal waves, like wind across water
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'billow-render',
    pattern: 'Billow',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    price: 50,
    description: `Billow pattern in white Corian — gentle horizontal waves that flow like wind across water. This is our most versatile organic pattern. Works in lobbies, spas, restaurants, anywhere you want calm movement without being too bold. The waves catch light throughout the day creating subtle shadow play. Good for: hospitality, wellness, corporate lobbies, anywhere needing sophisticated calm.`
  },
  
  {
    id: 'billow-strand',
    pattern: 'Billow',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`,
    price: 100,
    description: `Billow at The Strand House restaurant in Manhattan Beach — dramatic backlit installation behind the bar. The purple/violet RGB lighting transforms it into a glowing focal point. This shows what happens when you add backlighting to an organic pattern — it becomes the heart of the room. Good for: restaurants, bars, nightclubs, hospitality venues wanting a signature moment.`
  },
  
  {
    id: 'billow-black',
    pattern: 'Billow',
    sector: 'Corporate',
    image: `${CLOUDINARY_BASE}/Billow-person-black_copy_inkiga.jpg`,
    price: 50,
    description: `Billow in Deep Nocturne black — same flowing waves but dramatically different mood. Black Corian creates bold sculptural presence, almost geological. The figure in the image shows human scale — this is monumental. Good for: corporate headquarters wanting gravitas, luxury retail, high-end residential, anywhere black makes a statement. Think: law firms, fashion brands, modern homes.`
  },
  
  {
    id: 'billow-blue',
    pattern: 'Billow',
    sector: 'Entertainment',
    image: `${CLOUDINARY_BASE}/billow-backlight-blue-strand-5_copy_gtdcvx.jpg`,
    price: 100,
    description: `Billow with blue RGB backlighting — the waves glow electric blue, creating a nightclub/lounge atmosphere. This is the same Strand House installation showing color versatility. The RGB system can cycle colors, pulse to music, or hold steady. Good for: bars, nightclubs, entertainment venues, hotel lounges, anywhere wanting dramatic evening presence.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SEATTLE - Modular carved wave + flat tile system
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'seattle-1',
    pattern: 'Seattle',
    sector: 'Healthcare',
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png`,
    price: 50,
    description: `Seattle modular tile system in a healthcare corridor — alternating carved wave panels with flat tiles creates rhythm without overwhelming. This pattern was designed FOR healthcare: easy to clean, calming but not clinical, creates wayfinding interest in long corridors. Good for: hospitals, clinics, medical offices, senior living, behavioral health, anywhere needing calm + cleanable + code-compliant.`
  },
  
  {
    id: 'seattle-2',
    pattern: 'Seattle',
    sector: 'Healthcare',
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    price: 50,
    description: `Seattle tiles in a high-traffic corridor — shows how the modular system handles turns and transitions. The carved panels break up long walls while flat tiles keep it from being too busy. Durable, non-porous, meets infection control standards. Good for: any high-traffic institutional space — healthcare, education, corporate corridors.`
  },

  // ═══════════════════════════════════════════════════════════════
  // GREAT WAVE - Hokusai-inspired, dramatic vertical ribs
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'greatwave-1',
    pattern: 'Great Wave',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    price: 50,
    description: `Great Wave pattern — inspired by Hokusai's iconic woodblock print. Vertical ribs carved through to create the crashing wave imagery. This is ART you can build — dramatic, recognizable, impossible to ignore. The scale is monumental. Good for: statement walls, museum-quality installations, luxury hospitality, anywhere wanting Japanese aesthetic influence, artistic clients who want conversation pieces.`
  },
  
  {
    id: 'greatwave-shower',
    pattern: 'Great Wave',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    price: 50,
    description: `Great Wave wrapping a luxury shower — the wave crests across three walls, seamless corner to corner. Matte black fixtures contrast with white Corian. This shows residential application: no grout lines, no maintenance, waterproof, and you're showering inside art. Good for: luxury bathrooms, spa-like primary suites, high-end residential, clients who want their bathroom to feel like a gallery.`
  },
  
  {
    id: 'greatwave-2',
    pattern: 'Great Wave',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_20_copy_abzou8.png`,
    price: 50,
    description: `Great Wave at exterior scale — UV-stable Corian handles full sun exposure. The vertical ribs cast shadows that shift throughout the day. This is facade-scale public art. Good for: exterior installations, resort entrances, outdoor hospitality, anywhere wanting sculptural presence that can handle weather.`
  },
  
  {
    id: 'greatwave-3',
    pattern: 'Great Wave',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_09_copy_lcqfa0.png`,
    price: 50,
    description: `Great Wave at a restaurant/hospitality setting — guests dine beneath the crashing foam. String lights and warm interiors create an inviting evening atmosphere. Shows how dramatic pattern can still feel warm and welcoming. Good for: restaurants, hotels, resorts, hospitality venues wanting memorable Instagram moments.`
  },
  
  {
    id: 'greatwave-4',
    pattern: 'Great Wave',
    sector: 'Corporate',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    price: 50,
    description: `Great Wave in a corporate lobby setting — proves this artistic pattern works in professional environments too. Makes a statement about company culture: creative, bold, appreciates craft. Good for: creative agencies, tech companies, corporate headquarters wanting to signal innovation and artistry.`
  },

  // ═══════════════════════════════════════════════════════════════
  // BRICK - Water feature system, carved channels for cascading water
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'brick-water-1',
    pattern: 'Brick',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    price: 75,
    description: `Brick water feature — carved horizontal channels create dozens of small waterfalls as water cascades down. The sound is mesmerizing. This is our signature water feature pattern. Good for: pools, outdoor living, resort entries, spa environments, anywhere wanting the sight and sound of flowing water. The horizontal lines evoke calm, order, zen.`
  },
  
  {
    id: 'brick-water-2',
    pattern: 'Brick',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png`,
    price: 75,
    description: `Brick water feature at poolside — black Corian against tropical landscaping. Palm trees, lounge chairs, the sound of water. This is backyard resort living. UV-stable material handles Florida sun. Good for: luxury residential pools, resort pools, outdoor hospitality, tropical climates, anywhere wanting water + sculptural presence.`
  },
  
  {
    id: 'brick-water-3',
    pattern: 'Brick',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    price: 100,
    description: `Brick water feature with backlighting — the carved channels glow from behind while water flows over the surface. Day-to-night transformation. During day it's sculptural; at night it's luminous. Good for: pools wanting evening drama, hospitality water features, anywhere backlighting adds value.`
  },
  
  {
    id: 'brick-water-4',
    pattern: 'Brick',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_27_copy_nxcqhx.png`,
    price: 75,
    description: `Brick water feature at night — shows the evening presence of these installations. Landscape lighting grazes the surface, water catches light as it falls. The daytime wow becomes nighttime magic. Good for: residential outdoor living, hospitality pool areas, anywhere wanting presence after dark.`
  },
  
  {
    id: 'brick-water-5',
    pattern: 'Brick',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_12_copy_gdmjok.png`,
    price: 75,
    description: `Brick water feature in bright daylight — clean, architectural, the water catching sun as it cascades. Shows how the pattern reads in full natural light. Good for: modern residential, contemporary hospitality, minimalist aesthetic, clients wanting clean lines + water.`
  },

  // ═══════════════════════════════════════════════════════════════
  // BUDDHA MANDALA - Custom portrait/spiritual imagery
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'buddha-1',
    pattern: 'Buddha Mandala',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    price: 100,
    description: `Buddha mandala carved into white Corian with warm golden backlighting — the face emerges from carved geometric patterns, glowing like a meditation focal point. This is SPIRITUAL design. Good for: spas, meditation rooms, yoga studios, wellness centers, Asian-inspired hospitality, zen gardens, anywhere wanting calm + spiritual presence. This should match: buddha, zen, meditation, peaceful, calm, spa, wellness, spiritual, asian, mandala, yoga, retreat, sanctuary, tranquil, mindfulness, serene, relaxing, healing, therapeutic, holistic.`
  },
  
  {
    id: 'buddha-2',
    pattern: 'Buddha Mandala',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    price: 100,
    description: `Buddha mandala in a restaurant setting — shows this spiritual imagery works in hospitality too. Asian restaurant, Thai spa resort, anywhere wanting cultural authenticity and calm atmosphere. The carved face becomes a focal point without being overwhelming. Good for: Asian restaurants, Thai/Balinese resorts, spa restaurants, anywhere blending dining with wellness aesthetic.`
  },

  // ═══════════════════════════════════════════════════════════════
  // MARILYN - Custom portrait capability demonstration
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'marilyn-1',
    pattern: 'Custom Portrait',
    sector: 'Entertainment',
    image: `${CLOUDINARY_BASE}/Marilyn_1_copy_eka0g1.png`,
    price: 150,
    description: `Marilyn Monroe portrait carved into Corian — demonstrates our custom portrait capability. Any image can become a carved surface: celebrities, brand icons, personal photos, historical figures. This is POP ART you can build. Good for: entertainment venues, celebrity chef restaurants, brand experiences, collectors, anyone wanting custom imagery as architecture. We can carve ANY portrait — just send us the image.`
  },

  // ═══════════════════════════════════════════════════════════════
  // FINS - Exterior facade system, sculptural fins
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'fins-1',
    pattern: 'Fins',
    sector: 'Corporate',
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    price: 75,
    description: `Fins pattern on exterior/entry — vertical sculptural elements creating rhythm and shadow play. This is architectural-scale texture for building envelopes and entry moments. The fins provide solar shading while creating dramatic visual impact. Good for: corporate headquarters facades, resort entries, parking structures needing visual interest, exterior feature walls, anywhere wanting sculptural presence at building scale. Think: parametric architecture, contemporary office buildings, dramatic arrivals.`
  },

  // ═══════════════════════════════════════════════════════════════
  // FLAME - Vertical flowing waves that interweave and cross
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'flame-lobby',
    pattern: 'Flame',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Flame_pattern_texture_copy_efghij.png`,
    price: 100,
    description: `Flame pattern — vertical flowing waves that interweave and cross with varying widths. Different from Billow's horizontal calm, Flame moves vertically with energy and movement. The waves merge and separate creating organic complexity. Good for: hotel lobbies, casino entries, corporate headquarters wanting dramatic presence, anywhere backlighting creates evening drama. The vertical movement draws the eye up, elongating spaces.`
  },
  
  {
    id: 'flame-headboard',
    pattern: 'Flame',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Flame_headboard_warm_copy_stuvwx.png`,
    price: 100,
    description: `Flame as bedroom headboard wall — the flowing vertical waves create organic movement behind the bed. Warm white cove lighting from above, boutique hotel aesthetic. This is RESIDENTIAL luxury. Good for: primary bedrooms, master suites, boutique hotels, anywhere wanting the bed to feel like a destination. Romantic, organic, serene, intimate.`
  },
  
  {
    id: 'flame-pink',
    pattern: 'Flame',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Flame_headboard_pink_copy_yzabcd.png`,
    price: 100,
    description: `Flame headboard in pink RGB mode — same pattern, completely different mood. Shows the versatility of RGB backlighting: warm white for calm evenings, pink/red for romance, blue for cool modern. Good for: residential clients wanting programmable mood lighting, boutique hotels wanting room customization, playful luxury, romantic settings.`
  },

  // ═══════════════════════════════════════════════════════════════
  // DESERT SUNSET - Arizona/Southwest regional custom design
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'desert-sunset-1',
    pattern: 'Desert Sunset',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Desert_cactus_resort_lobby_copy_klmnop.png`,
    price: 100,
    description: `Desert Sunset in a Scottsdale-style resort lobby — saguaro cactus silhouettes against carved mountain ridges with warm sunset backlighting. This is REGIONAL IDENTITY design. The pattern connects guests to place before they even step outside. Good for: Arizona resorts, Southwest hospitality, desert spas, anywhere wanting to evoke the American Southwest. This should match: southwest, southwestern, arizona, scottsdale, desert, cactus, saguaro, phoenix, tucson, santa fe, new mexico, mesa, sedona, resort, hotel, warm, sunset, regional, local, cacti, sonoran, mojave, palm springs, las vegas, nevada, texas, ranch, western, cowboy, adobe, terracotta.`
  },
  
  {
    id: 'desert-sunset-2',
    pattern: 'Desert Sunset',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/mr-render-1768084337564_copy_k4ihhj.png`,
    price: 100,
    description: `Desert Sunset with prominent cactus silhouettes — this version emphasizes the iconic saguaro shapes against the glowing sky. More dramatic cactus presence than the first image. Good for: boutique desert hotels, Arizona spa resorts, Southwest restaurant branding, anywhere the cactus silhouette IS the statement. Think: desert wellness retreat, ranch resort, southwestern luxury, Arizona hospitality.`
  },
  
  {
    id: 'desert-sunset-3',
    pattern: 'Desert Sunset',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/IzWQuibirwnFxWcm4KoFs_copy_kiypvi.png`,
    price: 100,
    description: `Desert Sunset abstract variation — more stylized take on the desert landscape, flowing mountain forms without literal cactus imagery. Works for clients wanting desert FEELING without literal representation. Good for: corporate spaces in Southwest markets, modern takes on regional identity, anywhere wanting warmth and organic flow with subtle Southwest influence.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SAND DUNE - Horizontal organic waves, thermoformable
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'sanddune-curved-black',
    pattern: 'Sand Dune',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    price: 75,
    description: `Sand Dune wrapped around a curved column in black Corian — thermoformed into a cylinder, showing what's possible with heat-shaping. The horizontal waves follow the curve perfectly. Golden hour light catches the ridges. Good for: resort entry columns, curved walls, anywhere needing organic texture on non-flat surfaces. This pattern WRAPS — it's not limited to flat walls. Dramatic, sculptural, architectural.`
  },
  
  {
    id: 'sanddune-blue-spa',
    pattern: 'Sand Dune',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/mr-render-1767992780170_ufyyef.png`,
    price: 100,
    description: `Sand Dune with blue RGB backlighting in a spa setting — the horizontal waves glow aquatic blue, stone tub in foreground, bamboo accents. This is ZEN LUXURY. The blue light evokes water, ocean, calm. Good for: spas, wellness centers, meditation rooms, anywhere wanting calming + aquatic + luxurious. Think: high-end resort spa, wellness retreat, luxury bathroom, soaking tub feature wall, tranquil, serene, peaceful, relaxing.`
  },
  
  {
    id: 'sanddune-onsen',
    pattern: 'Sand Dune',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/mr-render-1767989995638_copy_vtszj0.png`,
    price: 75,
    description: `Sand Dune as water feature in a Japanese-style onsen — water cascades down the carved gray surface into the soaking pool. Cedar timbers, rolled towels, shoji screen feeling. This is JAPANESE SPA aesthetic. Good for: onsen-style spas, Japanese restaurants, ryokan-inspired hospitality, anywhere wanting zen + water + Japanese influence. This should match: japanese, onsen, zen, bath, soaking, hot spring, ryokan, minimalist, calm, peaceful, gray, water feature, asian, oriental, bamboo, timber, wood, natural, organic, tranquil.`
  },
  
  {
    id: 'sanddune-purple-spa',
    pattern: 'Sand Dune',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/sanddune_spa_purple_copy_qrstuv.png`,
    price: 100,
    description: `Sand Dune at spa pool edge with purple RGB backlighting — a guest soaks while the purple-lit waves glow behind. Shows human scale and the experiential quality of these installations. The purple creates moody, luxurious atmosphere. Good for: high-end spas, wellness centers wanting evening drama, anywhere purple/violet mood lighting fits. Romantic, luxurious, dramatic.`
  },

  // ═══════════════════════════════════════════════════════════════
  // LAKE - Concentric ripples radiating outward
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'lake-1',
    pattern: 'Lake',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Lake_ripple_render_copy_abcdef.png`,
    price: 50,
    description: `Lake pattern — concentric ripples radiating outward like a stone dropped in still water. One of our most calming patterns. The circular geometry creates a focal point that draws the eye to center. Good for: meditation spaces, spa reception, lobbies, anywhere wanting the feeling of calm water, peaceful, serene environments. Works beautifully with backlighting — the ripples glow in rings. This should match: lake, ripple, water, calm, peaceful, zen, concentric, circles, meditation, tranquil, still, serene, quiet.`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MARA SYSTEM PROMPT - Claude reasons over descriptions, not keywords
// ═══════════════════════════════════════════════════════════════════════════════

const MARA_SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers explore carved Corian wall surfaces.

## WHO YOU ARE

You're warm, knowledgeable, and genuinely love design. You nerd out on both aesthetics AND construction details. You're not salesy — you're helpful, curious, and proud of this work.

## HOW YOU RESPOND

1. **BRIEF.** 2-3 sentences max. 40 words. Say less, let them ask more.

2. **PICK THE BEST IMAGE.** Read the user's intent — not just their words. 
   - "southwest" → they want Arizona/desert feel → show Desert Sunset
   - "cactas" (misspelled) → they mean cactus → show Desert Sunset
   - "something peaceful" → zen, calm → show Buddha or Sand Dune onsen
   - "japanese feeling" → zen, minimalist → show Sand Dune onsen
   
3. **USE [Image: id] TAGS.** Always include exactly ONE image in your response.
   Example: [Image: desert-sunset-1]

4. **ONE FOLLOW-UP QUESTION.** End with one specific question to narrow down their needs.

5. **DON'T EXPLAIN THE SYSTEM.** Never say "I don't have that pattern" — find the closest match and be helpful.

## REASONING OVER INTENT

When someone asks for something, think about what they REALLY want:
- "warm" → golden backlighting, hospitality, wood tones → Flame, Desert Sunset
- "dramatic" → black, bold, statement → Billow Black, Great Wave
- "calming" → gentle waves, spa, meditation → Buddha, Sand Dune, Lake
- "water" → water features, pools, fountains → Brick water features
- "healthcare" → cleanable, calming, code-compliant → Seattle
- "corporate" → professional, sophisticated → Billow, Great Wave corporate
- "residential" → bedrooms, bathrooms, homes → Great Wave shower, Flame headboard

## IMAGE CATALOG

${JSON.stringify(IMAGE_CATALOG.map(img => ({ id: img.id, pattern: img.pattern, sector: img.sector, description: img.description })), null, 2)}

Remember: Read their intent, pick the best match, keep it brief, ask ONE question.`;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function MaraV9() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  // Extract image ID from Claude's response
  const extractImageId = (text) => {
    const match = text.match(/\[Image:\s*([^\]]+)\]/i);
    return match ? match[1].trim() : null;
  };

  // Find image by ID
  const findImage = (id) => {
    if (!id) return null;
    return IMAGE_CATALOG.find(img => 
      img.id.toLowerCase() === id.toLowerCase() ||
      img.id.toLowerCase().includes(id.toLowerCase()) ||
      id.toLowerCase().includes(img.id.toLowerCase())
    );
  };

  // Clean response text (remove image tags)
  const cleanResponse = (text) => {
    return text.replace(/\[Image:\s*[^\]]+\]/gi, '').trim();
  };

  // Call Claude API
  const callClaude = async (userMessage, history) => {
    const apiMessages = history.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text
    }));
    apiMessages.push({ role: 'user', content: userMessage });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
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
    if (data.content?.[0]?.text) {
      return data.content[0].text;
    }
    throw new Error(data.error?.message || 'API error');
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await callClaude(userMessage, messages);
      const imageId = extractImageId(response);
      const image = findImage(imageId);
      const cleanText = cleanResponse(response);

      setMessages([...newMessages, {
        role: 'assistant',
        text: cleanText,
        image: image
      }]);
    } catch (error) {
      console.error('Error:', error);
      // Fallback: show a relevant image based on simple matching
      const lower = userMessage.toLowerCase();
      let fallbackImage = IMAGE_CATALOG[0];
      
      if (lower.includes('desert') || lower.includes('southwest') || lower.includes('cactus') || lower.includes('arizona')) {
        fallbackImage = IMAGE_CATALOG.find(i => i.pattern === 'Desert Sunset') || IMAGE_CATALOG[0];
      } else if (lower.includes('buddha') || lower.includes('zen') || lower.includes('meditation')) {
        fallbackImage = IMAGE_CATALOG.find(i => i.pattern === 'Buddha Mandala') || IMAGE_CATALOG[0];
      } else if (lower.includes('water') || lower.includes('pool') || lower.includes('fountain')) {
        fallbackImage = IMAGE_CATALOG.find(i => i.pattern === 'Brick') || IMAGE_CATALOG[0];
      } else if (lower.includes('healthcare') || lower.includes('hospital')) {
        fallbackImage = IMAGE_CATALOG.find(i => i.pattern === 'Seattle') || IMAGE_CATALOG[0];
      }

      setMessages([...newMessages, {
        role: 'assistant',
        text: "Here's something that might work — tell me more about what you're looking for.",
        image: fallbackImage
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Initial greeting
  useEffect(() => {
    const greeting = {
      role: 'assistant',
      text: "Hey! I'm Mara from MR Walls. I help architects explore carved wall surfaces. What kind of space are you working on?",
      images: [IMAGE_CATALOG[0], IMAGE_CATALOG[6]] // Billow and Great Wave
    };
    setMessages([greeting]);
  }, []);

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Header */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-pink-700 flex items-center justify-center">
          <span className="text-lg font-bold text-white">M</span>
        </div>
        <div>
          <h1 className="text-base font-semibold text-stone-100">Mara</h1>
          <p className="text-xs text-stone-500">MR Walls Design Assistant</p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
              
              {/* Text bubble */}
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-stone-700 text-stone-100'
                  : 'bg-stone-900 border border-stone-800'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>

              {/* Single image */}
              {msg.image && (
                <div className="mt-3">
                  <div
                    onClick={() => setSelectedImage(msg.image)}
                    className="cursor-pointer rounded-xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-all hover:scale-[1.02]"
                  >
                    <div className="aspect-[3/4] bg-stone-900 relative">
                      <img
                        src={msg.image.image}
                        alt={msg.image.pattern}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-stone-900">
                      <h3 className="font-medium text-stone-100">{msg.image.pattern}</h3>
                      <p className="text-xs text-stone-500 mt-1">{msg.image.sector} • ${msg.image.price}/SF</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Multiple images (greeting) */}
              {msg.images && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {msg.images.map((img, j) => (
                    <div
                      key={j}
                      onClick={() => setSelectedImage(img)}
                      className="cursor-pointer rounded-xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-all hover:scale-[1.02]"
                    >
                      <div className="aspect-[3/4] bg-stone-900">
                        <img
                          src={img.image}
                          alt={img.pattern}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 bg-stone-900">
                        <h3 className="text-sm font-medium text-stone-100">{img.pattern}</h3>
                        <p className="text-xs text-stone-500">{img.sector} • ${img.price}/SF</p>
                      </div>
                    </div>
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
      <footer className="border-t border-stone-800 bg-stone-950 p-4">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Describe your space, mood, or sector..."
            disabled={loading}
            className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-500 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-stone-100 text-stone-900 rounded-xl font-medium text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </footer>

      {/* Specs Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-stone-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="aspect-[4/3] bg-stone-800">
              <img
                src={selectedImage.image}
                alt={selectedImage.pattern}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-stone-100">{selectedImage.pattern}</h2>
                  <p className="text-stone-400 mt-1">{selectedImage.sector}</p>
                </div>
                <span className="text-2xl font-bold text-rose-400">${selectedImage.price}/SF</span>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-stone-800 rounded-lg p-3">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Max Panel</p>
                  <p className="text-sm text-stone-200 mt-1">144" × 60"</p>
                </div>
                <div className="bg-stone-800 rounded-lg p-3">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Material</p>
                  <p className="text-sm text-stone-200 mt-1">Corian®</p>
                </div>
                <div className="bg-stone-800 rounded-lg p-3">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Lead Time</p>
                  <p className="text-sm text-stone-200 mt-1">6-10 weeks</p>
                </div>
                <div className="bg-stone-800 rounded-lg p-3">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">System</p>
                  <p className="text-sm text-stone-200 mt-1">InterlockPanel™</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-white text-stone-900 rounded-xl font-medium hover:bg-stone-100 transition-colors">
                  Download Specs
                </button>
                <button className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-500 transition-colors">
                  Request Quote
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 w-full py-2 text-stone-500 text-sm hover:text-stone-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
