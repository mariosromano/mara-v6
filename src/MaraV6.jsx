import { useState, useRef, useEffect } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE CATALOG - With full spec data for each pattern
// ═══════════════════════════════════════════════════════════════════════════════

const IMAGE_CATALOG = [
  // BILLOW
  {
    id: 'billow-render',
    pattern: 'Billow',
    title: 'Billow Wave',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    specs: {
      height: '96"',
      width: '144"',
      slabs: 3,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 50
    },
    shopDrawing: null, // Coming soon
    description: `Billow pattern — gentle horizontal waves like wind across water. Our most versatile organic pattern.`
  },
  {
    id: 'billow-strand',
    pattern: 'Billow',
    title: 'Strand House',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`,
    specs: {
      height: '120"',
      width: '180"',
      slabs: 4,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 100,
      enhancement: 'RGB Backlighting'
    },
    shopDrawing: null,
    description: `Billow at The Strand House restaurant — dramatic backlit bar installation.`
  },
  {
    id: 'billow-black',
    pattern: 'Billow Black',
    title: 'Billow Black',
    sector: 'Corporate',
    image: `${CLOUDINARY_BASE}/Billow-person-black_copy_inkiga.jpg`,
    specs: {
      height: '120"',
      width: '240"',
      slabs: 5,
      material: 'DuPont Corian®',
      color: 'Deep Nocturne',
      leadTime: '8 Weeks',
      pricePerSF: 55
    },
    shopDrawing: null,
    description: `Billow in Deep Nocturne black — bold sculptural presence.`
  },
  {
    id: 'billow-blue',
    pattern: 'Billow RGB',
    title: 'Billow Blue RGB',
    sector: 'Entertainment',
    image: `${CLOUDINARY_BASE}/billow-backlight-blue-strand-5_copy_gtdcvx.jpg`,
    specs: {
      height: '120"',
      width: '180"',
      slabs: 4,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 100,
      enhancement: 'RGB Backlighting'
    },
    shopDrawing: null,
    description: `Billow with blue RGB backlighting — electric blue glow.`
  },

  // SEATTLE
  {
    id: 'seattle-1',
    pattern: 'Seattle',
    title: 'Seattle Healthcare',
    sector: 'Healthcare',
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png`,
    specs: {
      height: '96"',
      width: '96"',
      slabs: 4,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '4 Weeks',
      pricePerSF: 45
    },
    shopDrawing: null,
    description: `Seattle modular tiles in healthcare corridor.`
  },
  {
    id: 'seattle-2',
    pattern: 'Seattle',
    title: 'Seattle Corridor',
    sector: 'Healthcare',
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    specs: {
      height: '96"',
      width: '192"',
      slabs: 8,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '4 Weeks',
      pricePerSF: 45
    },
    shopDrawing: null,
    description: `Seattle tiles handling corridor turns.`
  },

  // GREAT WAVE
  {
    id: 'greatwave-1',
    pattern: 'Great Wave',
    title: 'Great Wave',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    specs: {
      height: '120"',
      width: '240"',
      slabs: 5,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '8 Weeks',
      pricePerSF: 65
    },
    shopDrawing: null,
    description: `Great Wave — Hokusai-inspired vertical ribs creating the crashing wave.`
  },
  {
    id: 'greatwave-shower',
    pattern: 'Great Wave',
    title: 'Great Wave Shower',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    specs: {
      height: '96"',
      width: '120"',
      slabs: 3,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 65
    },
    shopDrawing: null,
    description: `Great Wave wrapping a luxury shower — seamless corner to corner.`
  },
  {
    id: 'greatwave-2',
    pattern: 'Great Wave',
    title: 'Great Wave Exterior',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_20_copy_abzou8.png`,
    specs: {
      height: '144"',
      width: '288"',
      slabs: 6,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '10 Weeks',
      pricePerSF: 75
    },
    shopDrawing: null,
    description: `Great Wave at exterior scale — UV-stable Corian.`
  },
  {
    id: 'greatwave-3',
    pattern: 'Great Wave',
    title: 'Great Wave Restaurant',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_09_copy_lcqfa0.png`,
    specs: {
      height: '120"',
      width: '200"',
      slabs: 5,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '8 Weeks',
      pricePerSF: 65
    },
    shopDrawing: null,
    description: `Great Wave in restaurant setting.`
  },
  {
    id: 'greatwave-4',
    pattern: 'Great Wave',
    title: 'Great Wave Corporate',
    sector: 'Corporate',
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    specs: {
      height: '120"',
      width: '240"',
      slabs: 5,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '8 Weeks',
      pricePerSF: 65
    },
    shopDrawing: null,
    description: `Great Wave in corporate lobby.`
  },

  // BRICK WATER FEATURES
  {
    id: 'brick-water-1',
    pattern: 'Brick',
    title: 'Brick Water Feature',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    specs: {
      height: '96"',
      width: '144"',
      slabs: 3,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 75,
      enhancement: 'Water Feature'
    },
    shopDrawing: null,
    description: `Brick water feature — carved channels create dozens of small waterfalls.`
  },
  {
    id: 'brick-water-2',
    pattern: 'Brick',
    title: 'Brick Poolside',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png`,
    specs: {
      height: '120"',
      width: '180"',
      slabs: 4,
      material: 'DuPont Corian®',
      color: 'Deep Nocturne',
      leadTime: '6 Weeks',
      pricePerSF: 80
    },
    shopDrawing: null,
    description: `Brick water feature at poolside — black Corian.`
  },
  {
    id: 'brick-water-3',
    pattern: 'Brick',
    title: 'Brick Backlit Water',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    specs: {
      height: '96"',
      width: '144"',
      slabs: 3,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 100,
      enhancement: 'Backlit Water Feature'
    },
    shopDrawing: null,
    description: `Brick water feature with backlighting.`
  },
  {
    id: 'brick-water-4',
    pattern: 'Brick',
    title: 'Brick Night',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_27_copy_nxcqhx.png`,
    specs: {
      height: '96"',
      width: '144"',
      slabs: 3,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 75
    },
    shopDrawing: null,
    description: `Brick water feature at night.`
  },
  {
    id: 'brick-water-5',
    pattern: 'Brick',
    title: 'Brick Daylight',
    sector: 'Residential',
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_12_copy_gdmjok.png`,
    specs: {
      height: '96"',
      width: '144"',
      slabs: 3,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 75
    },
    shopDrawing: null,
    description: `Brick water feature in daylight.`
  },

  // BUDDHA MANDALA
  {
    id: 'buddha-1',
    pattern: 'Buddha Mandala',
    title: 'Buddha Spa',
    sector: 'Wellness',
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    specs: {
      height: '96"',
      width: '96"',
      slabs: 2,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 85,
      enhancement: 'Backlighting'
    },
    shopDrawing: null,
    description: `Buddha mandala with warm golden backlighting — spiritual focal point. MATCHES: buddha, zen, meditation, peaceful, calm, spa, wellness, spiritual, asian, mandala, yoga, sanctuary.`
  },
  {
    id: 'buddha-2',
    pattern: 'Buddha Mandala',
    title: 'Buddha Restaurant',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    specs: {
      height: '96"',
      width: '96"',
      slabs: 2,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '6 Weeks',
      pricePerSF: 85
    },
    shopDrawing: null,
    description: `Buddha mandala in restaurant setting.`
  },

  // MARILYN
  {
    id: 'marilyn-1',
    pattern: 'Custom Portrait',
    title: 'Marilyn Portrait',
    sector: 'Entertainment',
    image: `${CLOUDINARY_BASE}/Marilyn_1_copy_eka0g1.png`,
    specs: {
      height: '96"',
      width: '72"',
      slabs: 2,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '8 Weeks',
      pricePerSF: 150
    },
    shopDrawing: null,
    description: `Marilyn Monroe portrait carved into Corian — demonstrates custom portrait capability.`
  },

  // SAND DUNE
  {
    id: 'sanddune-curved-black',
    pattern: 'Sand Dune',
    title: 'Sand Dune Curved',
    sector: 'Hospitality',
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    specs: {
      height: '120"',
      width: '60"',
      slabs: 2,
      material: 'DuPont Corian®',
      color: 'Deep Nocturne',
      leadTime: '8 Weeks',
      pricePerSF: 90,
      enhancement: 'Thermoformed'
    },
    shopDrawing: null,
    description: `Sand Dune wrapped around curved column in black — thermoformed cylinder. Good for: resort entry columns, curved walls, dramatic arrivals. MATCHES: curved, column, thermoform, black, dramatic, sculptural.`
  },

  // DESERT SUNSET - WITH FULL SPECS AND SHOP DRAWING
  {
    id: 'desert-sunset-1',
    pattern: 'Desert Sunset',
    title: 'Desert Sunset Cactus',
    sector: 'Hospitality',
    image: 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111216/mr-render-1767989995638_copy_vtszj0.png',
    specs: {
      height: '142"',
      width: '239¾"',
      slabs: 5,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '4 Weeks',
      pricePerSF: 65,
      enhancement: 'Downlighting'
    },
    shopDrawing: 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768330379/shop_drawing-Cactus_rovjta.png',
    description: `Desert Sunset — saguaro cactus silhouettes against carved mountain ridges with warm downlighting. White Corian, coffered ceiling, Scottsdale resort lobby. REGIONAL IDENTITY for Southwest hospitality. MATCHES: southwest, southwestern, arizona, scottsdale, desert, cactus, saguaro, phoenix, tucson, santa fe, sedona, mesa, cacti, sonoran, mojave, palm springs, las vegas, ranch, western, resort, hotel, lobby.`
  },
  {
    id: 'desert-sunset-2',
    pattern: 'Desert Sunset',
    title: 'Desert Sunset Variation',
    sector: 'Hospitality',
    image: 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111216/mr-render-1767992780170_ufyyef.png',
    specs: {
      height: '142"',
      width: '239¾"',
      slabs: 5,
      material: 'DuPont Corian®',
      color: 'Glacier White',
      leadTime: '4 Weeks',
      pricePerSF: 65
    },
    shopDrawing: 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768330379/shop_drawing-Cactus_rovjta.png',
    description: `Desert Sunset variation — same cactus and mountain pattern, different lighting or context. Southwest regional identity. MATCHES: southwest, arizona, desert, cactus, saguaro, phoenix, scottsdale, resort.`
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
- "southwest" or "arizona" or "cactus" → desert-sunset-1
- "zen" or "meditation" or "peaceful" or "buddha" → buddha-1
- "japanese" or "onsen" → buddha-1 or sanddune-curved-black
- "dramatic" or "bold" or "black" → billow-black
- "water feature" or "pool" or "fountain" → brick-water-1
- "healthcare" or "hospital" → seattle-1
- "spa" or "wellness" → buddha-1

## AVAILABLE IMAGES
${IMAGE_CATALOG.map(img => `- ${img.id}: ${img.pattern} - ${img.description.slice(0, 80)}...`).join('\n')}

Example response:
"For Southwest hospitality, Desert Sunset is perfect — saguaro cactus silhouettes against warm sunset backlighting.

[Image: desert-sunset-1]

Is this for a lobby statement wall or throughout guest areas?"`;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function MaraV11() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMara, setShowMara] = useState(false);
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
      return [findImage('buddha-1'), findImage('sanddune-curved-black')].filter(Boolean);
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
      return [findImage('buddha-1'), findImage('billow-render')].filter(Boolean);
    }
    
    return [IMAGE_CATALOG[0], IMAGE_CATALOG[6]];
  };

  // Calculate SF and total price
  const calculatePrice = (specs) => {
    const heightInches = parseFloat(specs.height);
    const widthInches = parseFloat(specs.width);
    const sf = (heightInches * widthInches) / 144;
    const total = sf * specs.pricePerSF;
    return { sf: sf.toFixed(0), total: total.toFixed(0) };
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

  // Handle custom size request
  const handleCustomSize = () => {
    const subject = encodeURIComponent(`Custom Size Request: ${selectedImage.title}`);
    const body = encodeURIComponent(`Hi,\n\nI'm interested in the ${selectedImage.title} (${selectedImage.pattern}) in a custom size.\n\nMy required dimensions:\nHeight: \nWidth: \n\nProject details:\n\n`);
    window.location.href = `mailto:Orders@marioromano.com?subject=${subject}&body=${body}`;
  };

  // Handle buy now
  const handleBuyNow = () => {
    // Placeholder - will integrate Stripe
    alert('Buy Now coming soon! For now, please email Orders@marioromano.com');
  };

  // Handle spec download
  const handleSpecDownload = () => {
    if (selectedImage.shopDrawing) {
      window.open(selectedImage.shopDrawing, '_blank');
    } else {
      alert('Shop drawing coming soon for this pattern. Email Orders@marioromano.com for specs.');
    }
  };

  // Initial greeting
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      text: "Hey! I'm Mara from MR Walls. I help architects explore carved wall surfaces. What kind of space are you working on?",
      images: [IMAGE_CATALOG[0], IMAGE_CATALOG[6]]
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

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-2xl">
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-stone-700 text-stone-100'
                  : 'bg-stone-900 border border-stone-800'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>

              {msg.images && msg.images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {msg.images.map((img, j) => (
                    <div
                      key={j}
                      onClick={() => setSelectedImage(img)}
                      className="cursor-pointer rounded-xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-all hover:scale-[1.02] bg-stone-900"
                    >
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
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-stone-100 truncate">{img.title}</h3>
                        <p className="text-xs text-stone-500">{img.sector} • {img.pattern}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

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

      {/* ═══════════════════════════════════════════════════════════════════════
          SPEC-TO-BUY MODAL
          ═══════════════════════════════════════════════════════════════════════ */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-stone-900 rounded-2xl max-w-md w-full my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-stone-800 rounded-t-2xl overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Details */}
            <div className="p-5">
              {/* Title & Pattern */}
              <h2 className="text-xl font-semibold text-stone-100">{selectedImage.title}</h2>
              <p className="text-stone-400 text-sm">{selectedImage.pattern} • {selectedImage.sector}</p>
              
              {/* Slab count */}
              <p className="text-stone-500 text-sm mt-2">
                arrives in {selectedImage.specs.slabs} puzzled slabs
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {/* Dimensions */}
                <div className="bg-stone-800 rounded-xl p-3 border border-stone-700">
                  <p className="text-lg font-medium text-stone-100">
                    {selectedImage.specs.height} high
                  </p>
                  <p className="text-lg font-medium text-stone-100">
                    x {selectedImage.specs.width} wide
                  </p>
                </div>
                
                {/* Material */}
                <div className="bg-stone-800 rounded-xl p-3 border border-stone-700">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Material</p>
                  <p className="text-sm font-medium text-stone-100 mt-1">{selectedImage.specs.material}</p>
                  <p className="text-sm text-stone-400">{selectedImage.specs.color}</p>
                </div>
                
                {/* Lead Time */}
                <div className="bg-stone-800 rounded-xl p-3 border border-stone-700">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Lead Time</p>
                  <p className="text-lg font-medium text-stone-100 mt-1">{selectedImage.specs.leadTime}</p>
                </div>
                
                {/* Price */}
                <div className="bg-stone-800 rounded-xl p-3 border border-stone-700">
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Price per SF</p>
                  <p className="text-lg font-medium text-emerald-400 mt-1">${selectedImage.specs.pricePerSF}</p>
                </div>
              </div>

              {/* Enhancement badge if applicable */}
              {selectedImage.specs.enhancement && (
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 bg-amber-900/50 text-amber-200 text-xs rounded-full">
                    {selectedImage.specs.enhancement}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button 
                  onClick={handleSpecDownload}
                  className="py-3 bg-stone-800 border border-stone-600 text-stone-100 rounded-xl font-medium text-sm hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
                >
                  📐 Spec in Plans
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="py-3 bg-white text-stone-900 rounded-xl font-medium text-sm hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                >
                  💳 Buy Now
                </button>
              </div>

              {/* Custom Size */}
              <button 
                onClick={handleCustomSize}
                className="mt-3 w-full py-3 border border-stone-700 text-stone-400 rounded-xl font-medium text-sm hover:bg-stone-800 hover:text-stone-200 transition-colors"
              >
                Request custom size
              </button>

              {/* Mara Help */}
              <button 
                onClick={() => { setSelectedImage(null); inputRef.current?.focus(); }}
                className="mt-3 w-full py-2 text-stone-500 text-sm hover:text-stone-300 transition-colors flex items-center justify-center gap-2"
              >
                💬 Questions? Ask Mara
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
