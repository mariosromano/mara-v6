import { useState, useRef, useEffect } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// Image caimport { useState, useRef, useEffect } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// Image catalog with rich descriptions
const IMAGE_CATALOG = [
  // Billow
  { id: 'billow-render', pattern: 'Billow', color: 'White', keywords: ['billow', 'wave', 'flowing', 'organic', 'calm', 'lobby', 'gentle', 'soft'], 
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    description: 'Flowing wave pattern with gentle undulations',
    application: 'Feature walls, lobbies',
    maxSize: '144" × 60"', price: 50 },
  { id: 'billow-strand', pattern: 'Billow', color: 'White', keywords: ['billow', 'restaurant', 'hospitality', 'dining', 'backlit', 'dramatic'],
    image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`,
    description: 'Billow at The Strand House — dramatic backlit focal point',
    application: 'Restaurant, hospitality',
    maxSize: '144" × 60"', price: 100 },
  { id: 'billow-black', pattern: 'Billow', color: 'Black', keywords: ['billow', 'black', 'dark', 'dramatic', 'bold', 'sculptural'],
    image: `${CLOUDINARY_BASE}/Billow-person-black_copy_inkiga.jpg`,
    description: 'Billow in Deep Nocturne black — bold sculptural presence',
    application: 'High-impact feature walls',
    maxSize: '144" × 60"', price: 50 },
  { id: 'billow-blue', pattern: 'Billow', color: 'White', enhancement: 'Backlighting', keywords: ['billow', 'blue', 'backlit', 'glow', 'rgb', 'nightclub', 'bar', 'dramatic', 'entertainment'],
    image: `${CLOUDINARY_BASE}/billow-backlight-blue-strand-5_copy_gtdcvx.jpg`,
    description: 'Billow with RGB backlighting — curves come alive with light',
    application: 'Bars, nightclubs, entertainment',
    maxSize: '144" × 60"', price: 100 },
  
  // Seattle
  { id: 'seattle-1', pattern: 'Seattle', color: 'White', keywords: ['seattle', 'tile', 'geometric', 'healthcare', 'hospital', 'clinical', 'modular', 'calming', 'corridor'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png`,
    description: 'Seattle modular tiles — wave panels with flat tiles for rhythm',
    application: 'Healthcare, corridors',
    maxSize: '96" × 96"', price: 50 },
  { id: 'seattle-2', pattern: 'Seattle', color: 'White', keywords: ['seattle', 'tile', 'corridor', 'hallway', 'wayfinding', 'healthcare'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    description: 'Seattle creating visual interest in busy corridors',
    application: 'High-traffic corridors',
    maxSize: '96" × 96"', price: 50 },
  
  // Great Wave
  { id: 'greatwave-1', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'wave', 'ocean', 'japanese', 'hokusai', 'dramatic', 'artistic', 'bold', 'statement'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    description: 'Great Wave — Hokusai-inspired vertical ribs, dramatic shadows',
    application: 'Statement walls, art installations',
    maxSize: '144" × 48"', price: 50 },
  { id: 'greatwave-shower', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'shower', 'bathroom', 'residential', 'spa', 'luxury'],
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    description: 'Great Wave in luxury shower — seamless, no grout',
    application: 'Bathrooms, showers',
    maxSize: '144" × 48"', price: 50 },
  { id: 'greatwave-lobby', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'lobby', 'corporate', 'office', 'dramatic', 'first impression'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    description: 'Great Wave in corporate lobby — bold first impression',
    application: 'Corporate lobbies',
    maxSize: '144" × 48"', price: 50 },
  
  // Brick / Water Feature
  { id: 'brick-water-1', pattern: 'Brick', color: 'White', enhancement: 'Water Feature', keywords: ['brick', 'water', 'fountain', 'pool', 'waterfall', 'outdoor', 'cascade'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    description: 'Brick water feature — water cascades through carved channels',
    application: 'Pool areas, courtyards',
    maxSize: '144" × 60"', price: 70 },
  { id: 'brick-water-night', pattern: 'Brick', color: 'White', enhancement: 'Water Feature', keywords: ['brick', 'water', 'backlit', 'night', 'dramatic', 'evening'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    description: 'Brick water feature with backlighting — stunning at night',
    application: 'Evening entertainment',
    maxSize: '144" × 60"', price: 120 },
  
  // Buddha
  { id: 'buddha-1', pattern: 'Buddha', color: 'White', enhancement: 'Backlighting', keywords: ['buddha', 'zen', 'meditation', 'spiritual', 'calm', 'spa', 'wellness', 'peaceful', 'asian', 'yoga', 'calming', 'healthcare'],
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    description: 'Custom Buddha with warm backlighting — meditative focal point',
    application: 'Spas, meditation rooms, yoga studios',
    maxSize: '144" × 60"', price: 100 },
  { id: 'buddha-2', pattern: 'Buddha', color: 'White', keywords: ['buddha', 'restaurant', 'asian', 'zen', 'dining'],
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    description: 'Buddha in Asian restaurant — spiritual yet sophisticated',
    application: 'Asian restaurants, wellness centers',
    maxSize: '144" × 60"', price: 50 },
  
  // Marilyn
  { id: 'marilyn-1', pattern: 'Custom Portrait', color: 'White', keywords: ['marilyn', 'portrait', 'hollywood', 'custom', 'branding', 'iconic', 'art'],
    image: `${CLOUDINARY_BASE}/Marilynn_sm_copy_gcvzcb.jpg`,
    description: 'Custom Marilyn portrait — we can carve any image',
    application: 'Branded spaces, entertainment',
    maxSize: '144" × 60"', price: 50 },
  
  // Fins
  { id: 'fins-exterior', pattern: 'Fins', color: 'White', keywords: ['fins', 'exterior', 'facade', 'corporate', 'modern', 'architectural', 'shadow'],
    image: `${CLOUDINARY_BASE}/Fins_exterior_white_gcccvq.jpg`,
    description: 'Fins on exterior — dynamic shadow play throughout the day',
    application: 'Building facades',
    maxSize: '120" × 60"', price: 50 },
  
  // Flame
  { id: 'flame-1', pattern: 'Flame', color: 'White', keywords: ['flame', 'fire', 'warm', 'organic', 'flowing', 'dynamic', 'energy', 'hospitality'],
    image: `${CLOUDINARY_BASE}/Flame-_qle4y3.jpg`,
    description: 'Flame — interweaving waves that cross and merge',
    application: 'Feature walls, hospitality',
    maxSize: '144" × 60"', price: 50 },
  { id: 'flame-bed', pattern: 'Flame', color: 'White', keywords: ['flame', 'bedroom', 'headboard', 'residential', 'luxury'],
    image: `${CLOUDINARY_BASE}/Flamebed_yggqrp.jpg`,
    description: 'Flame as bedroom headboard — texture and warmth',
    application: 'Bedrooms, residential',
    maxSize: '144" × 60"', price: 50 },
  { id: 'flame-pink', pattern: 'Flame', color: 'White', enhancement: 'Backlighting', keywords: ['flame', 'pink', 'rgb', 'backlit', 'bedroom', 'romantic', 'boutique'],
    image: `${CLOUDINARY_BASE}/Flame_pink_obxnpm.jpg`,
    description: 'Flame with pink RGB — interweaving pattern glows beautifully',
    application: 'Bedrooms, boutique hotels',
    maxSize: '144" × 60"', price: 100 },
  
  // Sand Dune
  { id: 'sanddune-curved', pattern: 'Sand Dune', color: 'Black', enhancement: 'Curvature', keywords: ['sand dune', 'curved', 'black', 'column', 'dramatic', 'sculptural', 'wrap'],
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    description: 'Sand Dune thermoformed around column — sculptural black Corian',
    application: 'Columns, curved walls',
    maxSize: '144" × 60"', price: 75 },
  { id: 'sanddune-blue', pattern: 'Sand Dune', color: 'White', enhancement: 'Backlighting', keywords: ['sand dune', 'blue', 'spa', 'backlit', 'wellness', 'calming'],
    image: `${CLOUDINARY_BASE}/mr-render-1767992780170_ufyyef.png`,
    description: 'Sand Dune with blue backlighting — organic ripples glow softly',
    application: 'Spas, wellness centers',
    maxSize: '144" × 60"', price: 100 },
];

// Mara system prompt - conversational, shows ONE image
const MARA_SYSTEM_PROMPT = `You are Mara, MR Walls design assistant. You help architects find carved Corian wall surfaces.

PERSONALITY: Warm, knowledgeable, design-focused. Not salesy.

RULES:
1. Keep responses to 2-3 sentences (under 40 words)
2. Describe the ONE image being shown and why it fits their needs
3. End with a short follow-up question
4. Never list multiple patterns — focus on the one shown

KNOWLEDGE:
- Material: DuPont Corian — non-porous, seamless, Class A fire rated
- Pricing: $50-100/SF depending on enhancement
- Lead time: 6-10 weeks
- Panel sizes: Up to 144" × 60"

SECTOR TIPS:
- Healthcare: non-porous for infection control, calming patterns reduce stress
- Hospitality: Instagram-worthy, durable, brand storytelling
- Bars/Entertainment: Backlighting creates drama, RGB color options
- Corporate: First impressions, talent attraction`;

export default function MaraV8() {
  const [currentImage, setCurrentImage] = useState(IMAGE_CATALOG[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Find best single image for query
  const findBestImage = (query) => {
    const lower = query.toLowerCase();
    const words = lower.split(/\s+/);
    
    let bestMatch = IMAGE_CATALOG[0];
    let bestScore = 0;
    
    for (const item of IMAGE_CATALOG) {
      let score = 0;
      
      for (const word of words) {
        for (const keyword of item.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 10;
          }
        }
        if (item.pattern.toLowerCase().includes(word)) score += 20;
        if (item.description.toLowerCase().includes(word)) score += 5;
        if (item.application.toLowerCase().includes(word)) score += 8;
        if (item.enhancement?.toLowerCase().includes(word)) score += 15;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
    
    return bestMatch;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    // Find best matching image and update hero
    const bestImage = findBestImage(userMessage);
    setCurrentImage(bestImage);
    
    try {
      const contextMessage = `Now showing: ${bestImage.pattern} — ${bestImage.description}. Application: ${bestImage.application}. Price: $${bestImage.price}/SF.

User asked: "${userMessage}"

Describe why this specific pattern fits their needs. Be brief and helpful.`;
      
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
          system: MARA_SYSTEM_PROMPT,
          messages: [
            ...messages.slice(-4).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: contextMessage }
          ]
        })
      });
      
      const data = await response.json();
      const maraText = data.content?.[0]?.text || `This is ${bestImage.pattern} — ${bestImage.description}. What aspect would you like to explore?`;
      
      setMessages(prev => [...prev, { role: 'assistant', content: maraText }]);
      
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `This is ${bestImage.pattern} — ${bestImage.description}. Perfect for ${bestImage.application.toLowerCase()}. Want to see it in a different color or with backlighting?`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Something calming for healthcare",
    "Dramatic bar backdrop",
    "Water feature for pool",
    "Corporate lobby statement"
  ];

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <div>
            <span className="font-medium text-stone-100">MakeReal</span>
            <span className="text-stone-500 text-sm ml-2">by MR Walls</span>
          </div>
        </div>
        <button 
          onClick={() => setShowSpecs(true)}
          className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors"
        >
          Get Specs
        </button>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 p-6 gap-4">
        
        {/* Image Container - Boxed with controlled aspect */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 flex items-center justify-center">
            <img 
              src={currentImage.image} 
              alt={currentImage.pattern}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Image Info Bar */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-white">{currentImage.pattern}</h2>
              <p className="text-sm text-stone-400">{currentImage.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1.5 bg-stone-800 text-stone-300 rounded-full">{currentImage.maxSize}</span>
              <span className="text-xs px-3 py-1.5 bg-rose-500/20 text-rose-300 rounded-full font-medium">${currentImage.price}/SF</span>
            </div>
          </div>
        </div>
        
        {/* Chat Section */}
        <div className="flex-shrink-0 bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden">
          
          {/* Messages - scrollable */}
          <div className="max-h-[180px] overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-2">
                <p className="text-sm text-stone-400">Ask Mara about any space or style — she'll find the perfect pattern.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                    msg.role === 'user' 
                      ? 'bg-stone-700 text-white' 
                      : 'bg-stone-800 text-stone-200'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-800 rounded-xl px-4 py-2.5">
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
          
          {/* Quick prompts */}
          {messages.length === 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="text-xs px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white rounded-full transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
          
          {/* Input */}
          <div className="p-3 border-t border-stone-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe what you're looking for..."
              className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-5 py-2.5 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      
      {/* Specs Modal */}
      {showSpecs && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={() => setShowSpecs(false)}>
          <div className="bg-stone-950 rounded-2xl max-w-lg w-full border border-stone-800 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            {/* Image thumbnail */}
            <div className="h-40 overflow-hidden">
              <img src={currentImage.image} alt={currentImage.pattern} className="w-full h-full object-cover" />
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-2xl font-medium text-white">{currentImage.pattern}</h2>
                <p className="text-sm text-stone-400 mt-1">{currentImage.description}</p>
              </div>
              
              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-900 rounded-xl p-3">
                  <p className="text-[10px] uppercase text-stone-500">Max Panel</p>
                  <p className="text-base text-white">{currentImage.maxSize}</p>
                </div>
                <div className="bg-stone-900 rounded-xl p-3">
                  <p className="text-[10px] uppercase text-stone-500">Material</p>
                  <p className="text-base text-white">{currentImage.color} Corian</p>
                </div>
                <div className="bg-stone-900 rounded-xl p-3">
                  <p className="text-[10px] uppercase text-stone-500">Lead Time</p>
                  <p className="text-base text-white">6-10 weeks</p>
                </div>
                <div className="bg-stone-900 rounded-xl p-3">
                  <p className="text-[10px] uppercase text-stone-500">Application</p>
                  <p className="text-base text-white">{currentImage.application.split(',')[0]}</p>
                </div>
              </div>

              {/* Price */}
              <div className="bg-rose-950/50 border border-rose-900/50 rounded-xl p-4 flex justify-between items-center">
                <span className="text-stone-300">Price</span>
                <span className="text-2xl font-medium text-rose-300">${currentImage.price}/SF</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-white text-black rounded-xl font-medium text-sm">
                  Download Spec Sheet
                </button>
                <button onClick={() => setShowSpecs(false)} className="flex-1 py-3 bg-stone-800 text-stone-200 rounded-xl font-medium text-sm border border-stone-700">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
