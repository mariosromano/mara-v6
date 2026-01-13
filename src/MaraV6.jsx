import { useState, useRef, useEffect } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// Image catalog
const IMAGE_CATALOG = [
  // Billow
  { id: 'billow-render', pattern: 'Billow', sector: 'Hospitality', keywords: ['billow', 'wave', 'flowing', 'organic', 'calm', 'lobby', 'gentle', 'soft'], 
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    description: 'Flowing wave pattern with gentle undulations',
    price: 50 },
  { id: 'billow-strand', pattern: 'Billow', sector: 'Hospitality', keywords: ['billow', 'restaurant', 'hospitality', 'dining', 'backlit', 'dramatic', 'bar'],
    image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`,
    description: 'Dramatic backlit focal point at The Strand House',
    price: 100 },
  { id: 'billow-black', pattern: 'Billow Black', sector: 'Corporate', keywords: ['billow', 'black', 'dark', 'dramatic', 'bold', 'sculptural', 'corporate'],
    image: `${CLOUDINARY_BASE}/Billow-person-black_copy_inkiga.jpg`,
    description: 'Bold sculptural presence in Deep Nocturne black',
    price: 50 },
  { id: 'billow-blue', pattern: 'Billow RGB', sector: 'Entertainment', keywords: ['billow', 'blue', 'backlit', 'glow', 'rgb', 'nightclub', 'bar', 'dramatic', 'entertainment'],
    image: `${CLOUDINARY_BASE}/billow-backlight-blue-strand-5_copy_gtdcvx.jpg`,
    description: 'RGB backlighting brings curves alive',
    price: 100 },
  
  // Seattle
  { id: 'seattle-1', pattern: 'Seattle', sector: 'Healthcare', keywords: ['seattle', 'tile', 'geometric', 'healthcare', 'hospital', 'clinical', 'modular', 'calming', 'corridor'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png`,
    description: 'Modular wave and flat tile system',
    price: 50 },
  { id: 'seattle-2', pattern: 'Seattle', sector: 'Healthcare', keywords: ['seattle', 'tile', 'corridor', 'hallway', 'wayfinding', 'healthcare', 'calming'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    description: 'Visual rhythm for high-traffic corridors',
    price: 50 },
  
  // Great Wave
  { id: 'greatwave-1', pattern: 'Great Wave', sector: 'Hospitality', keywords: ['great wave', 'wave', 'ocean', 'japanese', 'hokusai', 'dramatic', 'artistic', 'bold', 'statement'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    description: 'Hokusai-inspired vertical ribs',
    price: 50 },
  { id: 'greatwave-shower', pattern: 'Great Wave', sector: 'Residential', keywords: ['great wave', 'shower', 'bathroom', 'residential', 'spa', 'luxury'],
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    description: 'Seamless luxury shower, no grout',
    price: 50 },
  { id: 'greatwave-lobby', pattern: 'Great Wave', sector: 'Corporate', keywords: ['great wave', 'lobby', 'corporate', 'office', 'dramatic', 'first impression'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    description: 'Bold corporate lobby statement',
    price: 50 },
  
  // Brick / Water Feature
  { id: 'brick-water-1', pattern: 'Brick', sector: 'Residential', keywords: ['brick', 'water', 'fountain', 'pool', 'waterfall', 'outdoor', 'cascade'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    description: 'Water cascades through carved channels',
    price: 70 },
  { id: 'brick-water-night', pattern: 'Brick', sector: 'Residential', keywords: ['brick', 'water', 'backlit', 'night', 'dramatic', 'evening', 'pool'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    description: 'Backlit water feature, stunning at night',
    price: 120 },
  { id: 'brick-water-day', pattern: 'Brick', sector: 'Residential', keywords: ['brick', 'water', 'day', 'garden', 'pool', 'outdoor'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_12_copy_gdmjok.png`,
    description: 'Clean lines, timeless water feature',
    price: 70 },
  
  // Buddha
  { id: 'buddha-1', pattern: 'Buddha', sector: 'Wellness', keywords: ['buddha', 'zen', 'meditation', 'spiritual', 'calm', 'spa', 'wellness', 'peaceful', 'asian', 'yoga', 'calming', 'healthcare'],
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    description: 'Custom Buddha with warm backlighting',
    price: 100 },
  { id: 'buddha-2', pattern: 'Buddha', sector: 'Hospitality', keywords: ['buddha', 'restaurant', 'asian', 'zen', 'dining'],
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    description: 'Spiritual yet sophisticated dining backdrop',
    price: 50 },
  
  // Marilyn
  { id: 'marilyn-1', pattern: 'Custom Portrait', sector: 'Entertainment', keywords: ['marilyn', 'portrait', 'hollywood', 'custom', 'branding', 'iconic', 'art'],
    image: `${CLOUDINARY_BASE}/Marilynn_sm_copy_gcvzcb.jpg`,
    description: 'Custom portraits — we can carve any image',
    price: 50 },
  
  // Fins
  { id: 'fins-exterior', pattern: 'Fins', sector: 'Exterior', keywords: ['fins', 'exterior', 'facade', 'corporate', 'modern', 'architectural', 'shadow', 'outdoor'],
    image: `${CLOUDINARY_BASE}/Fins_exterior_white_gcccvq.jpg`,
    description: 'Dynamic shadow play throughout the day',
    price: 50 },
  { id: 'fins-exterior-2', pattern: 'Fins', sector: 'Hospitality', keywords: ['fins', 'exterior', 'patio', 'restaurant', 'outdoor', 'dining'],
    image: `${CLOUDINARY_BASE}/Fins_exterior2_lh1vlw.jpg`,
    description: 'Dramatic outdoor dining backdrop',
    price: 50 },
  
  // Flame
  { id: 'flame-1', pattern: 'Flame', sector: 'Hospitality', keywords: ['flame', 'fire', 'warm', 'organic', 'flowing', 'dynamic', 'energy', 'hospitality'],
    image: `${CLOUDINARY_BASE}/Flame-_qle4y3.jpg`,
    description: 'Interweaving waves that cross and merge',
    price: 50 },
  { id: 'flame-bed', pattern: 'Flame', sector: 'Residential', keywords: ['flame', 'bedroom', 'headboard', 'residential', 'luxury'],
    image: `${CLOUDINARY_BASE}/Flamebed_yggqrp.jpg`,
    description: 'Textured warmth as bedroom headboard',
    price: 50 },
  { id: 'flame-pink', pattern: 'Flame RGB', sector: 'Hospitality', keywords: ['flame', 'pink', 'rgb', 'backlit', 'bedroom', 'romantic', 'boutique', 'hotel'],
    image: `${CLOUDINARY_BASE}/Flame_pink_obxnpm.jpg`,
    description: 'Pink RGB backlighting for boutique hotels',
    price: 100 },
  
  // Sand Dune
  { id: 'sanddune-curved', pattern: 'Sand Dune', sector: 'Corporate', keywords: ['sand dune', 'curved', 'black', 'column', 'dramatic', 'sculptural', 'wrap'],
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    description: 'Thermoformed around column, black Corian',
    price: 75 },
  { id: 'sanddune-blue', pattern: 'Sand Dune', sector: 'Wellness', keywords: ['sand dune', 'blue', 'spa', 'backlit', 'wellness', 'calming'],
    image: `${CLOUDINARY_BASE}/mr-render-1767992780170_ufyyef.png`,
    description: 'Blue backlighting for wellness spaces',
    price: 100 },
];

// Get 2 starter images
const getStarterImages = () => {
  const indices = [0, 6]; // Billow and Great Wave
  return indices.map(i => IMAGE_CATALOG[i]);
};

// Find best images for query
const findImages = (query, count = 2) => {
  const lower = query.toLowerCase();
  const words = lower.split(/\s+/);
  
  const scored = IMAGE_CATALOG.map(item => {
    let score = 0;
    for (const word of words) {
      if (word.length < 3) continue;
      for (const keyword of item.keywords) {
        if (keyword.includes(word) || word.includes(keyword)) score += 10;
      }
      if (item.pattern.toLowerCase().includes(word)) score += 20;
      if (item.sector.toLowerCase().includes(word)) score += 15;
      if (item.description.toLowerCase().includes(word)) score += 5;
    }
    return { ...item, score };
  });
  
  return scored.filter(i => i.score > 0).sort((a, b) => b.score - a.score).slice(0, count);
};

// Mara system prompt
const MARA_SYSTEM = `You are Mara, MR Walls design assistant. Warm, knowledgeable, genuinely excited about design.

RULES:
1. Keep responses to 2-3 sentences MAX (under 40 words)
2. Reference the images you're showing by name
3. End with ONE short follow-up question
4. Be conversational, not salesy

KNOWLEDGE:
- Material: DuPont Corian — seamless, non-porous, Class A fire rated
- Panels up to 144" × 60", seamless via InterlockPanel™
- Lead time: 6-10 weeks
- Pricing: $50-100/SF depending on backlighting

When user mentions:
- Healthcare → non-porous, calming, infection control
- Bar/entertainment → RGB backlighting, drama
- Water feature → carved channels, backlit at night
- Corporate → first impressions, sculptural presence`;

export default function MaraV9() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Mara from MR Walls. I help architects explore seamless wall surfaces.\n\nHere are a couple projects to get us started:",
      images: getStarterImages()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    // Find relevant images
    const images = findImages(userMessage, 2);
    
    try {
      const context = images.length > 0 
        ? `Showing: ${images.map(i => `${i.pattern} (${i.sector})`).join(' and ')}. User asked: "${userMessage}"`
        : `No exact matches. User asked: "${userMessage}"`;
      
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
          max_tokens: 100,
          system: MARA_SYSTEM,
          messages: [
            ...messages.slice(-4).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: context }
          ]
        })
      });
      
      const data = await response.json();
      const text = data.content?.[0]?.text || "Here's what I found:";
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: text,
        images: images.length > 0 ? images : null
      }]);
      
    } catch (error) {
      const fallbackText = images.length > 0 
        ? `Here's ${images[0].pattern} — ${images[0].description.toLowerCase()}. What draws you to this style?`
        : "Tell me more about your project — what sector and what feeling are you going for?";
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackText,
        images: images.length > 0 ? images : null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Header */}
      <header className="flex-shrink-0 px-5 py-4 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center border border-stone-700">
            <span className="text-xs font-bold text-stone-300">M|R</span>
          </div>
          <div>
            <div className="font-medium text-stone-100">Mara</div>
            <div className="text-xs text-stone-500">MR Walls Design Assistant</div>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a9.75 9.75 0 0119.5 0" />
          </svg>
        </button>
      </header>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i}>
              {/* Message text */}
              <div className={`${msg.role === 'user' ? 'ml-auto max-w-[80%]' : 'max-w-full'}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-stone-700 text-white ml-auto w-fit' 
                    : 'bg-stone-900 border border-stone-800 text-stone-200'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
              
              {/* Images grid - only for assistant */}
              {msg.images && msg.images.length > 0 && (
                <div className={`mt-4 grid gap-4 ${msg.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {msg.images.map((img, j) => (
                    <button
                      key={j}
                      onClick={() => setSelectedImage(img)}
                      className="group text-left rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-stone-600 transition-all"
                    >
                      <div className="aspect-[3/4] overflow-hidden">
                        <img 
                          src={img.image} 
                          alt={img.pattern}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-base text-white">{img.pattern}</h3>
                        <p className="text-sm text-stone-500 mt-1">{img.sector} • ${img.price}/SF</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-stone-800 bg-stone-950">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask Mara anything..."
              className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-500"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      
      {/* Image Detail Modal with Specs */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto" onClick={() => setSelectedImage(null)}>
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              
              {/* Close button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Large Image */}
              <div className="rounded-2xl overflow-hidden bg-stone-900">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.pattern}
                  className="w-full max-h-[60vh] object-contain bg-stone-950"
                />
              </div>
              
              {/* Specs Panel */}
              <div className="mt-6 bg-stone-900 rounded-2xl p-6 border border-stone-800">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  
                  {/* Left - Title & Description */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-medium text-white">{selectedImage.pattern}</h2>
                    <p className="text-stone-400 mt-2">{selectedImage.description}</p>
                    <div className="flex gap-2 mt-4">
                      <span className="text-xs px-3 py-1.5 bg-stone-800 text-stone-300 rounded-full">{selectedImage.sector}</span>
                    </div>
                  </div>
                  
                  {/* Right - Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 md:w-72">
                    <div className="bg-stone-800 rounded-xl p-3">
                      <p className="text-[10px] uppercase text-stone-500">Max Panel</p>
                      <p className="text-base text-white font-medium">144" × 60"</p>
                    </div>
                    <div className="bg-stone-800 rounded-xl p-3">
                      <p className="text-[10px] uppercase text-stone-500">Material</p>
                      <p className="text-base text-white font-medium">Corian®</p>
                    </div>
                    <div className="bg-stone-800 rounded-xl p-3">
                      <p className="text-[10px] uppercase text-stone-500">Lead Time</p>
                      <p className="text-base text-white font-medium">6-10 weeks</p>
                    </div>
                    <div className="bg-stone-800 rounded-xl p-3">
                      <p className="text-[10px] uppercase text-stone-500">System</p>
                      <p className="text-base text-white font-medium">InterlockPanel™</p>
                    </div>
                  </div>
                </div>
                
                {/* Price Bar */}
                <div className="mt-6 flex items-center justify-between p-4 bg-rose-950/30 border border-rose-900/50 rounded-xl">
                  <div>
                    <p className="text-sm text-stone-400">Starting at</p>
                    <p className="text-3xl font-medium text-rose-300">${selectedImage.price}/SF</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-200 transition-colors">
                      Download Specs
                    </button>
                    <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-medium text-sm hover:bg-rose-500 transition-colors">
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
