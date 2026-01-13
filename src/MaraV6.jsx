import { useState, useRef, useEffect } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE CATALOG - Only REAL Cloudinary URLs that exist
// Rich descriptions for Claude intent reasoning
// ═══════════════════════════════════════════════════════════════════════════════

const IMAGE_CATALOG = [
  // BILLOW
  {
    id: 'billow-render',
    pattern: 'Billow',
    title: 'Billow Wave',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    price: 50,
    description: `Billow pattern — gentle horizontal waves like wind across water. Our most versatile organic pattern. Works in lobbies, spas, restaurants. Good for: hospitality, wellness, corporate lobbies, sophisticated calm.`
  },
  {
    id: 'billow-strand',
    pattern: 'Billow',
    title: 'Strand House',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`,
    price: 100,
    description: `Billow at The Strand House restaurant — dramatic backlit bar installation. Purple RGB lighting transforms it into a glowing focal point. Good for: restaurants, bars, nightclubs, signature moments.`
  },
  {
    id: 'billow-black',
    pattern: 'Billow Black',
    title: 'Billow Black',
    sector: 'Corporate',
    image: `${CLOUDINARY_BASE}/Billow-person-black_copy_inkiga.jpg`,
    price: 50,
    description: `Billow in Deep Nocturne black — bold sculptural presence, almost geological. Good for: corporate headquarters, luxury retail, law firms, fashion brands, anywhere black makes a statement.`
  },
  {
    id: 'billow-blue',
    pattern: 'Billow RGB',
    title: 'Billow Blue RGB',
    sector: 'Entertainment',
    image: `${CLOUDINARY_BASE}/billow-backlight-blue-strand-5_copy_gtdcvx.jpg`,
    price: 100,
    description: `Billow with blue RGB backlighting — electric blue glow, nightclub atmosphere. Can cycle colors or pulse to music. Good for: bars, nightclubs, entertainment venues, hotel lounges.`
  },

  // SEATTLE
  {
    id: 'seattle-1',
    pattern: 'Seattle',
    title: 'Seattle Healthcare',
    sector: 'Healthcare',
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png`,
    price: 50,
    description: `Seattle modular tiles in healthcare corridor — carved wave panels alternate with flat tiles. Designed FOR healthcare: easy to clean, calming, code-compliant. Good for: hospitals, clinics, medical offices, senior living, behavioral health.`
  },
  {
    id: 'seattle-2',
    pattern: 'Seattle',
    title: 'Seattle Corridor',
    sector: 'Healthcare',
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    price: 50,
    description: `Seattle tiles handling corridor turns. Durable, non-porous, meets infection control. Good for: high-traffic institutional spaces, healthcare, education, corporate corridors.`
  },

  // GREAT WAVE
  {
    id: 'greatwave-1',
    pattern: 'Great Wave',
    title: 'Great Wave',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    price: 50,
    description: `Great Wave — Hokusai-inspired vertical ribs creating the crashing wave. ART you can build. Good for: statement walls, museum-quality installations, Japanese aesthetic, artistic conversation pieces.`
  },
  {
    id: 'greatwave-shower',
    pattern: 'Great Wave',
    title: 'Great Wave Shower',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    price: 50,
    description: `Great Wave wrapping a luxury shower — seamless corner to corner. No grout, no maintenance, waterproof. Good for: luxury bathrooms, spa-like primary suites, gallery-feel bathrooms.`
  },
  {
    id: 'greatwave-2',
    pattern: 'Great Wave',
    title: 'Great Wave Exterior',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_20_copy_abzou8.png`,
    price: 50,
    description: `Great Wave at exterior scale — UV-stable Corian handles full sun. Facade-scale public art. Good for: exterior installations, resort entrances, outdoor hospitality.`
  },
  {
    id: 'greatwave-3',
    pattern: 'Great Wave',
    title: 'Great Wave Restaurant',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_09_copy_lcqfa0.png`,
    price: 50,
    description: `Great Wave in restaurant setting — guests dine beneath the crashing foam. Warm, inviting evening atmosphere. Good for: restaurants, hotels, Instagram-worthy hospitality.`
  },
  {
    id: 'greatwave-4',
    pattern: 'Great Wave',
    title: 'Great Wave Corporate',
    sector: 'Corporate',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    price: 50,
    description: `Great Wave in corporate lobby — artistic pattern in professional environment. Signals creative, bold company culture. Good for: creative agencies, tech companies, corporate headquarters.`
  },

  // BRICK WATER FEATURES
  {
    id: 'brick-water-1',
    pattern: 'Brick',
    title: 'Brick Water Feature',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    price: 75,
    description: `Brick water feature — carved channels create dozens of small waterfalls. Mesmerizing sound. Good for: pools, outdoor living, resort entries, spa environments, zen water features.`
  },
  {
    id: 'brick-water-2',
    pattern: 'Brick',
    title: 'Brick Poolside',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png`,
    price: 75,
    description: `Brick water feature at poolside — black Corian against tropical landscaping. Backyard resort living. Good for: luxury residential pools, resort pools, tropical climates.`
  },
  {
    id: 'brick-water-3',
    pattern: 'Brick',
    title: 'Brick Backlit Water',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    price: 100,
    description: `Brick water feature with backlighting — channels glow while water flows. Day-to-night transformation. Good for: pools wanting evening drama, hospitality water features.`
  },
  {
    id: 'brick-water-4',
    pattern: 'Brick',
    title: 'Brick Night',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_27_copy_nxcqhx.png`,
    price: 75,
    description: `Brick water feature at night — landscape lighting grazes surface, water catches light. Good for: residential outdoor living, hospitality pool areas, evening presence.`
  },
  {
    id: 'brick-water-5',
    pattern: 'Brick',
    title: 'Brick Daylight',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_12_copy_gdmjok.png`,
    price: 75,
    description: `Brick water feature in daylight — clean, architectural, water catching sun. Good for: modern residential, contemporary hospitality, minimalist aesthetic.`
  },

  // BUDDHA MANDALA
  {
    id: 'buddha-1',
    pattern: 'Buddha Mandala',
    title: 'Buddha Spa',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    price: 100,
    description: `Buddha mandala with warm golden backlighting — spiritual focal point. Good for: spas, meditation rooms, yoga studios, wellness centers, zen retreats, anywhere wanting calm + spiritual presence. MATCHES: buddha, zen, meditation, peaceful, calm, spa, wellness, spiritual, asian, mandala, yoga, sanctuary, tranquil, mindfulness, serene.`
  },
  {
    id: 'buddha-2',
    pattern: 'Buddha Mandala',
    title: 'Buddha Restaurant',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    price: 100,
    description: `Buddha mandala in restaurant setting — spiritual imagery in hospitality. Good for: Asian restaurants, Thai/Balinese resorts, spa restaurants, dining with wellness aesthetic.`
  },

  // MARILYN
  {
    id: 'marilyn-1',
    pattern: 'Custom Portrait',
    title: 'Marilyn Portrait',
    sector: 'Entertainment',
    image: `${CLOUDINARY_BASE}/Marilyn_1_copy_eka0g1.png`,
    price: 150,
    description: `Marilyn Monroe portrait carved into Corian — demonstrates custom portrait capability. Any image can become carved surface. Good for: entertainment venues, brand experiences, pop art architecture.`
  },

  // SAND DUNE
  {
    id: 'sanddune-curved-black',
    pattern: 'Sand Dune',
    title: 'Sand Dune Curved',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    price: 75,
    description: `Sand Dune wrapped around curved column in black — thermoformed cylinder. This pattern WRAPS non-flat surfaces. Good for: resort entry columns, curved walls, dramatic arrivals.`
  },
  {
    id: 'sanddune-blue-spa',
    pattern: 'Sand Dune',
    title: 'Sand Dune Blue Spa',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/mr-render-1767992780170_ufyyef.png`,
    price: 100,
    description: `Sand Dune with blue RGB backlighting in spa — horizontal waves glow aquatic blue. ZEN LUXURY. Good for: spas, wellness centers, meditation rooms, calming + aquatic + luxurious, soaking tub feature walls.`
  },
  {
    id: 'sanddune-onsen',
    pattern: 'Sand Dune',
    title: 'Sand Dune Onsen',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/mr-render-1767989995638_copy_vtszj0.png`,
    price: 75,
    description: `Sand Dune as water feature in Japanese onsen — water cascades down carved gray surface. Cedar timbers, shoji screen feeling. JAPANESE SPA aesthetic. Good for: onsen-style spas, Japanese restaurants, ryokan hospitality. MATCHES: japanese, onsen, zen, bath, soaking, hot spring, ryokan, minimalist, peaceful, asian, bamboo.`
  },

  // DESERT SUNSET - Using REAL Cloudinary URLs that exist
  {
    id: 'desert-sunset-1',
    pattern: 'Desert Sunset',
    title: 'Desert Cactus',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/mr-render-1768084337564_copy_k4ihhj.png`,
    price: 100,
    description: `Desert Sunset — saguaro cactus silhouettes against carved mountain ridges with warm sunset backlighting. REGIONAL IDENTITY for Southwest hospitality. Good for: Arizona resorts, desert spas, Southwest hotels. MATCHES: southwest, southwestern, arizona, scottsdale, desert, cactus, saguaro, phoenix, tucson, santa fe, sedona, mesa, cacti, sonoran, mojave, palm springs, las vegas, ranch, western.`
  },
  {
    id: 'desert-sunset-2',
    pattern: 'Desert Sunset',
    title: 'Desert Abstract',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/IzWQuibirwnFxWcm4KoFs_copy_kiypvi.png`,
    price: 100,
    description: `Desert Sunset abstract — stylized desert landscape, flowing mountain forms. Desert FEELING without literal cactus. Good for: corporate in Southwest markets, modern regional identity.`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MARA SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

const MARA_SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects explore carved Corian wall surfaces.

## PERSONALITY
Warm, knowledgeable, loves design. Not salesy — helpful and proud of the work.

## RESPONSE FORMAT
1. **BRIEF** — 2-3 sentences max, 40 words
2. **PICK 1-2 IMAGES** — Read intent, show best matches
3. **USE [Image: id] TAGS** — Always include image tags
4. **ONE QUESTION** — End with one follow-up

## INTENT REASONING
- "southwest" or "arizona" or "cactus" → Desert Sunset
- "zen" or "meditation" or "peaceful" or "buddha" → Buddha Mandala
- "japanese" or "onsen" → Sand Dune Onsen  
- "dramatic" or "bold" or "black" → Billow Black or Great Wave
- "water feature" or "pool" or "fountain" → Brick water features
- "healthcare" or "hospital" → Seattle
- "spa" or "wellness" → Buddha or Sand Dune Blue Spa

## AVAILABLE IMAGES
${IMAGE_CATALOG.map(img => `- ${img.id}: ${img.pattern} - ${img.description.slice(0, 100)}...`).join('\n')}

Example response:
"For Southwest hospitality, Desert Sunset is perfect — saguaro cactus silhouettes against warm sunset backlighting.

[Image: desert-sunset-1]

Is this for a lobby statement wall or throughout guest areas?"`;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function MaraV10() {
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

  // Extract image IDs from response
  const extractImageIds = (text) => {
    const matches = text.match(/\[Image:\s*([^\]]+)\]/gi) || [];
    return matches.map(m => {
      const match = m.match(/\[Image:\s*([^\]]+)\]/i);
      return match ? match[1].trim() : null;
    }).filter(Boolean);
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

  // Clean response text
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

  // Simple fallback image selection
  const getFallbackImages = (query) => {
    const lower = query.toLowerCase();
    
    if (lower.includes('desert') || lower.includes('southwest') || lower.includes('cactus') || lower.includes('arizona') || lower.includes('scottsdale')) {
      return IMAGE_CATALOG.filter(i => i.pattern === 'Desert Sunset');
    }
    if (lower.includes('buddha') || lower.includes('zen') || lower.includes('meditation') || lower.includes('spiritual')) {
      return IMAGE_CATALOG.filter(i => i.pattern === 'Buddha Mandala');
    }
    if (lower.includes('japanese') || lower.includes('onsen') || lower.includes('ryokan')) {
      return IMAGE_CATALOG.filter(i => i.id === 'sanddune-onsen');
    }
    if (lower.includes('water') || lower.includes('pool') || lower.includes('fountain')) {
      return IMAGE_CATALOG.filter(i => i.pattern === 'Brick');
    }
    if (lower.includes('healthcare') || lower.includes('hospital') || lower.includes('clinic')) {
      return IMAGE_CATALOG.filter(i => i.pattern === 'Seattle');
    }
    if (lower.includes('dramatic') || lower.includes('bold') || lower.includes('black') || lower.includes('corporate')) {
      return [findImage('billow-black'), findImage('greatwave-4')].filter(Boolean);
    }
    if (lower.includes('spa') || lower.includes('wellness') || lower.includes('calm')) {
      return [findImage('buddha-1'), findImage('sanddune-blue-spa')].filter(Boolean);
    }
    
    // Default: show variety
    return [IMAGE_CATALOG[0], IMAGE_CATALOG[6]];
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
      const imageIds = extractImageIds(response);
      const images = imageIds.map(id => findImage(id)).filter(Boolean);
      const cleanText = cleanResponse(response);

      // If Claude didn't return valid images, use fallback
      const finalImages = images.length > 0 ? images : getFallbackImages(userMessage);

      setMessages([...newMessages, {
        role: 'assistant',
        text: cleanText,
        images: finalImages.slice(0, 2)
      }]);
    } catch (error) {
      console.error('Error:', error);
      const fallbackImages = getFallbackImages(userMessage);
      setMessages([...newMessages, {
        role: 'assistant',
        text: "Here's what I'd recommend — tell me more about your project.",
        images: fallbackImages.slice(0, 2)
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Initial greeting with 2 images
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      text: "Hey! I'm Mara from MR Walls. I help architects explore carved wall surfaces. What kind of space are you working on?",
      images: [IMAGE_CATALOG[0], IMAGE_CATALOG[6]] // Billow and Great Wave
    }]);
  }, []);

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Header */}
      <header className="flex-shrink-0 border-b border-stone-800 bg-stone-950/90 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center">
          <span className="text-sm font-bold text-stone-300">M|R</span>
        </div>
        <div>
          <h1 className="text-base font-semibold text-stone-100">Mara</h1>
          <p className="text-xs text-stone-500">MR Walls Design Assistant</p>
        </div>
      </header>

      {/* Messages - scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-2xl">
              
              {/* Text bubble */}
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-stone-700 text-stone-100'
                  : 'bg-stone-900 border border-stone-800'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>

              {/* 2-up Image Grid - SMALLER like Screenshot 4 */}
              {msg.images && msg.images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {msg.images.map((img, j) => (
                    <div
                      key={j}
                      onClick={() => setSelectedImage(img)}
                      className="cursor-pointer rounded-xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-all hover:scale-[1.02] bg-stone-900"
                    >
                      {/* Image - constrained height */}
                      <div className="aspect-square bg-stone-800 relative">
                        <img
                          src={img.image}
                          alt={img.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-stone-600 text-4xl">◇</div>';
                          }}
                        />
                      </div>
                      {/* Title bar */}
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-stone-100 truncate">{img.title}</h3>
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

      {/* Input - always visible at bottom */}
      <footer className="flex-shrink-0 border-t border-stone-800 bg-stone-950 p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
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

      {/* Specs Modal - on image click */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-stone-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="aspect-[4/3] bg-stone-800 relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
              >
                ✕
              </button>
            </div>

            {/* Details */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-stone-100">{selectedImage.title}</h2>
                  <p className="text-stone-400 text-sm">{selectedImage.pattern} • {selectedImage.sector}</p>
                </div>
                <span className="text-xl font-bold text-emerald-400">${selectedImage.price}/SF</span>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-stone-800 rounded-lg p-3">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Max Panel</p>
                  <p className="text-sm text-stone-200 mt-1">144" × 60"</p>
                </div>
                <div className="bg-stone-800 rounded-lg p-3">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Material</p>
                  <p className="text-sm text-stone-200 mt-1">DuPont Corian®</p>
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
                <button className="flex-1 py-3 bg-white text-stone-900 rounded-xl font-medium text-sm hover:bg-stone-100 transition-colors">
                  📄 Download Specs
                </button>
                <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-500 transition-colors">
                  📐 Shop Drawing
                </button>
              </div>

              {/* Request Quote */}
              <button className="mt-3 w-full py-3 border border-stone-700 text-stone-300 rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
