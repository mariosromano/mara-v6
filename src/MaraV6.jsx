import { useState, useRef, useEffect } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// Full image catalog with rich descriptions
const IMAGE_CATALOG = [
  // Billow
  { id: 'billow-render', pattern: 'Billow', color: 'White', keywords: ['billow', 'wave', 'flowing', 'organic', 'calm', 'lobby'], 
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    description: 'Flowing wave pattern with gentle undulations. Creates a sense of calm movement.',
    application: 'Feature walls, lobbies',
    maxSize: '144" × 60"', price: 50 },
  { id: 'billow-strand', pattern: 'Billow', color: 'White', keywords: ['billow', 'restaurant', 'hospitality', 'dining'],
    image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`,
    description: 'Billow pattern at The Strand House restaurant. Dramatic backlit focal point.',
    application: 'Restaurant, hospitality',
    maxSize: '144" × 60"', price: 100 },
  { id: 'billow-black', pattern: 'Billow', color: 'Black', keywords: ['billow', 'black', 'dark', 'dramatic', 'bold'],
    image: `${CLOUDINARY_BASE}/Billow-person-black_copy_inkiga.jpg`,
    description: 'Billow in Deep Nocturne black. Bold, sculptural presence.',
    application: 'High-impact feature walls',
    maxSize: '144" × 60"', price: 50 },
  { id: 'billow-blue', pattern: 'Billow', color: 'White', enhancement: 'Backlighting', keywords: ['billow', 'blue', 'backlit', 'glow', 'rgb', 'nightclub', 'bar'],
    image: `${CLOUDINARY_BASE}/billow-backlight-blue-strand-5_copy_gtdcvx.jpg`,
    description: 'Billow with RGB backlighting in blue. The curves come alive with light.',
    application: 'Bars, nightclubs, entertainment',
    maxSize: '144" × 60"', price: 100 },
  
  // Seattle
  { id: 'seattle-1', pattern: 'Seattle', color: 'White', keywords: ['seattle', 'tile', 'geometric', 'healthcare', 'hospital', 'clinical', 'modular'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png`,
    description: 'Seattle modular tile system. Combines carved wave panels with flat tiles for rhythm.',
    application: 'Healthcare, corridors',
    maxSize: '96" × 96"', price: 50 },
  { id: 'seattle-2', pattern: 'Seattle', color: 'White', keywords: ['seattle', 'tile', 'corridor', 'hallway', 'wayfinding'],
    image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png`,
    description: 'Seattle tiles creating visual interest in a busy corridor. Durable, cleanable.',
    application: 'High-traffic corridors',
    maxSize: '96" × 96"', price: 50 },
  
  // Great Wave
  { id: 'greatwave-1', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'wave', 'ocean', 'japanese', 'hokusai', 'dramatic', 'artistic'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    description: 'Great Wave pattern inspired by Hokusai. Vertical ribs create dramatic shadows.',
    application: 'Statement walls, art installations',
    maxSize: '144" × 48"', price: 50 },
  { id: 'greatwave-shower', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'shower', 'bathroom', 'residential', 'spa'],
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    description: 'Great Wave in a luxury shower. Seamless, no grout, easy to clean.',
    application: 'Bathrooms, showers',
    maxSize: '144" × 48"', price: 50 },
  { id: 'greatwave-2', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'exterior', 'facade', 'outdoor'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_20_copy_abzou8.png`,
    description: 'Great Wave on an exterior facade. UV-stable for outdoor use.',
    application: 'Exterior facades',
    maxSize: '144" × 48"', price: 50 },
  { id: 'greatwave-3', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'restaurant', 'hospitality', 'dining'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_09_copy_lcqfa0.png`,
    description: 'Great Wave as a restaurant backdrop. Creates memorable dining atmosphere.',
    application: 'Restaurants, hospitality',
    maxSize: '144" × 48"', price: 50 },
  { id: 'greatwave-4', pattern: 'Great Wave', color: 'White', keywords: ['great wave', 'lobby', 'corporate', 'office'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    description: 'Great Wave in a corporate lobby. Makes a bold first impression.',
    application: 'Corporate lobbies',
    maxSize: '144" × 48"', price: 50 },
  
  // Brick / Water Feature
  { id: 'brick-water-1', pattern: 'Brick', color: 'White', enhancement: 'Water Feature', keywords: ['brick', 'water', 'fountain', 'pool', 'waterfall', 'outdoor'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    description: 'Brick pattern water feature. Water cascades through carved channels.',
    application: 'Pool areas, courtyards',
    maxSize: '144" × 60"', price: 70 },
  { id: 'brick-water-2', pattern: 'Brick', color: 'White', enhancement: 'Water Feature', keywords: ['brick', 'water', 'pool', 'outdoor', 'residential'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png`,
    description: 'Brick water wall at a residential pool. The texture creates beautiful water patterns.',
    application: 'Residential pools',
    maxSize: '144" × 60"', price: 70 },
  { id: 'brick-water-3', pattern: 'Brick', color: 'White', enhancement: 'Water Feature', keywords: ['brick', 'water', 'backlit', 'night', 'dramatic'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    description: 'Brick water feature with backlighting. Stunning at night.',
    application: 'Evening entertainment areas',
    maxSize: '144" × 60"', price: 120 },
  { id: 'brick-water-4', pattern: 'Brick', color: 'White', enhancement: 'Water Feature', keywords: ['brick', 'water', 'night', 'pool'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_27_copy_nxcqhx.png`,
    description: 'Brick pattern fountain at night. Creates ambient sound and visual interest.',
    application: 'Outdoor entertaining',
    maxSize: '144" × 60"', price: 70 },
  { id: 'brick-water-5', pattern: 'Brick', color: 'White', enhancement: 'Water Feature', keywords: ['brick', 'water', 'day', 'garden'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_12_copy_gdmjok.png`,
    description: 'Daytime view of Brick water feature. Clean lines, timeless appeal.',
    application: 'Gardens, patios',
    maxSize: '144" × 60"', price: 70 },
  
  // Buddha / Custom Portrait
  { id: 'buddha-1', pattern: 'Buddha', color: 'White', enhancement: 'Backlighting', keywords: ['buddha', 'zen', 'meditation', 'spiritual', 'calm', 'spa', 'wellness', 'peaceful', 'asian', 'yoga'],
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    description: 'Custom Buddha carving with warm backlighting. Creates a meditative focal point.',
    application: 'Spas, meditation rooms, yoga studios',
    maxSize: '144" × 60"', price: 100 },
  { id: 'buddha-2', pattern: 'Buddha', color: 'White', keywords: ['buddha', 'restaurant', 'asian', 'zen', 'dining'],
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    description: 'Buddha portrait in an Asian restaurant setting. Spiritual yet sophisticated.',
    application: 'Asian restaurants, wellness centers',
    maxSize: '144" × 60"', price: 50 },
  
  // Marilyn / Custom Portrait  
  { id: 'marilyn-1', pattern: 'Custom Portrait', color: 'White', keywords: ['marilyn', 'portrait', 'hollywood', 'custom', 'branding', 'iconic'],
    image: `${CLOUDINARY_BASE}/Marilynn_sm_copy_gcvzcb.jpg`,
    description: 'Custom Marilyn Monroe portrait carved in Corian. We can carve any image.',
    application: 'Branded spaces, entertainment',
    maxSize: '144" × 60"', price: 50 },
  { id: 'marilyn-2', pattern: 'Custom Portrait', color: 'White', keywords: ['marilyn', 'portrait', 'art', 'gallery'],
    image: `${CLOUDINARY_BASE}/Maryilynn2_c71acw.png`,
    description: 'Marilyn portrait with dramatic lighting. Photo-realistic carving capability.',
    application: 'Art installations, galleries',
    maxSize: '144" × 60"', price: 50 },
  
  // Fins
  { id: 'fins-exterior-1', pattern: 'Fins', color: 'White', keywords: ['fins', 'exterior', 'facade', 'corporate', 'modern', 'architectural'],
    image: `${CLOUDINARY_BASE}/Fins_exterior_white_gcccvq.jpg`,
    description: 'Fins pattern on exterior facade. Creates dynamic shadow play throughout the day.',
    application: 'Building facades, exterior cladding',
    maxSize: '120" × 60"', price: 50 },
  { id: 'fins-exterior-2', pattern: 'Fins', color: 'White', keywords: ['fins', 'exterior', 'patio', 'restaurant', 'outdoor dining'],
    image: `${CLOUDINARY_BASE}/Fins_exterior2_lh1vlw.jpg`,
    description: 'Fins creating a dramatic outdoor dining backdrop. Weather-resistant.',
    application: 'Outdoor restaurants, patios',
    maxSize: '120" × 60"', price: 50 },
  
  // Flame
  { id: 'flame-1', pattern: 'Flame', color: 'White', keywords: ['flame', 'fire', 'warm', 'organic', 'flowing', 'dynamic'],
    image: `${CLOUDINARY_BASE}/Flame-_qle4y3.jpg`,
    description: 'Flame pattern — interweaving waves that cross and merge. Organic energy.',
    application: 'Feature walls, hospitality',
    maxSize: '144" × 60"', price: 50 },
  { id: 'flame-bed', pattern: 'Flame', color: 'White', keywords: ['flame', 'bedroom', 'headboard', 'residential', 'luxury'],
    image: `${CLOUDINARY_BASE}/Flamebed_yggqrp.jpg`,
    description: 'Flame as a bedroom headboard. Adds texture and warmth to residential spaces.',
    application: 'Bedrooms, residential',
    maxSize: '144" × 60"', price: 50 },
  { id: 'flame-pink', pattern: 'Flame', color: 'White', enhancement: 'Backlighting', keywords: ['flame', 'pink', 'rgb', 'backlit', 'bedroom', 'romantic'],
    image: `${CLOUDINARY_BASE}/Flame_pink_obxnpm.jpg`,
    description: 'Flame with pink RGB backlighting. The interweaving pattern glows beautifully.',
    application: 'Bedrooms, boutique hotels',
    maxSize: '144" × 60"', price: 100 },
  { id: 'flame-4', pattern: 'Flame', color: 'White', keywords: ['flame', 'lobby', 'feature', 'hospitality'],
    image: `${CLOUDINARY_BASE}/Flames_qthl01.jpg`,
    description: 'Large-scale Flame installation. The pattern creates visual movement.',
    application: 'Lobbies, large feature walls',
    maxSize: '144" × 60"', price: 50 },
  
  // Desert Sunset / Custom
  { id: 'desert-1', pattern: 'Desert Sunset', color: 'Warm', keywords: ['desert', 'sunset', 'arizona', 'southwest', 'warm', 'orange', 'landscape'],
    image: `${CLOUDINARY_BASE}/mr-render-1768082338412_copy_wqymkx.png`,
    description: 'Custom desert sunset landscape. Warm gradients carved into the surface.',
    application: 'Southwest-themed spaces',
    maxSize: '144" × 60"', price: 50 },
  { id: 'desert-2', pattern: 'Desert Sunset', color: 'Warm', keywords: ['desert', 'mountain', 'landscape', 'nature'],
    image: `${CLOUDINARY_BASE}/mr-render-1767989272197_copy_eka0g1.png`,
    description: 'Mountain landscape carving. Custom scenes bring the outdoors in.',
    application: 'Residential, hospitality',
    maxSize: '144" × 60"', price: 50 },
  { id: 'desert-3', pattern: 'Desert Sunset', color: 'Warm', keywords: ['desert', 'sunset', 'hospitality', 'restaurant'],
    image: `${CLOUDINARY_BASE}/mr-render-1768084337564_copy_k4ihhj.png`,
    description: 'Sunset scene in a hospitality setting. Creates warm, inviting atmosphere.',
    application: 'Restaurants, resorts',
    maxSize: '144" × 60"', price: 50 },
  { id: 'desert-4', pattern: 'Desert Sunset', color: 'Warm', keywords: ['desert', 'abstract', 'artistic'],
    image: `${CLOUDINARY_BASE}/IzWQuibirwnFxWcm4KoFs_copy_kiypvi.png`,
    description: 'Abstract desert interpretation. Artistic, one-of-a-kind.',
    application: 'Art installations',
    maxSize: '144" × 60"', price: 50 },
  
  // Sand Dune / Curved
  { id: 'sanddune-curved', pattern: 'Sand Dune', color: 'Black', enhancement: 'Curvature', keywords: ['sand dune', 'curved', 'black', 'column', 'dramatic', 'sculptural', 'wrap'],
    image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`,
    description: 'Sand Dune pattern thermoformed around a column. Black Corian, sculptural presence.',
    application: 'Columns, curved walls',
    maxSize: '144" × 60"', price: 75 },
  { id: 'sanddune-blue', pattern: 'Sand Dune', color: 'White', enhancement: 'Backlighting', keywords: ['sand dune', 'blue', 'spa', 'backlit', 'wellness'],
    image: `${CLOUDINARY_BASE}/mr-render-1767992780170_ufyyef.png`,
    description: 'Sand Dune with blue backlighting. Organic ripples glow softly.',
    application: 'Spas, wellness centers',
    maxSize: '144" × 60"', price: 100 },
  { id: 'sanddune-3', pattern: 'Sand Dune', color: 'White', keywords: ['sand dune', 'wave', 'organic', 'natural'],
    image: `${CLOUDINARY_BASE}/mr-render-1767989995638_copy_vtszj0.png`,
    description: 'Sand Dune pattern — nature-inspired ripples like wind across sand.',
    application: 'Feature walls, hospitality',
    maxSize: '144" × 60"', price: 50 },
  
  // Lake
  { id: 'lake-1', pattern: 'Lake', color: 'White', keywords: ['lake', 'ripple', 'concentric', 'calm', 'water', 'zen', 'peaceful'],
    image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`,
    description: 'Lake pattern — concentric ripples radiating outward. Meditative, calming.',
    application: 'Meditation spaces, spas',
    maxSize: '144" × 60"', price: 50 },
];

// Mara's system prompt
const MARA_SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers find the perfect carved Corian wall surfaces.

PERSONALITY: Warm, knowledgeable, genuinely excited about design. Not salesy — you're a design partner.

CRITICAL RULES:
1. Keep responses under 50 words
2. ALWAYS suggest what to explore next
3. When showing images, briefly describe what makes each special
4. Ask ONE follow-up question to understand their project better

KNOWLEDGE:
- Material: DuPont Corian solid surface — non-porous, seamless, Class A fire rated
- Pricing: Base $50/SF, Backlighting +$50/SF, Water Feature +$20/SF, Curvature +$25/SF
- Lead time: 6-10 weeks from approval
- Panel sizes: Up to 144" × 60" max, seamless installation via InterlockPanel™ system
- We've done 1000+ projects: LAX, Wynn Casino, Mercedes F1, Cedars-Sinai

WHEN USER ASKS ABOUT:
- Healthcare: Mention non-porous surface, infection control, calming patterns
- Hospitality: Mention Instagram-worthy, durable for high traffic, brand storytelling
- Residential: Mention warmth, seamless showers, water features
- Corporate: Mention first impressions, talent attraction, brand identity

Remember: You're having a design conversation, not giving a sales pitch.`;

export default function MaraV7() {
  // Current displayed image
  const [currentImage, setCurrentImage] = useState(IMAGE_CATALOG[0]);
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // UI state
  const [showSpecs, setShowSpecs] = useState(false);
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Find images based on query
  const findImages = (query) => {
    const lower = query.toLowerCase();
    const words = lower.split(/\s+/);
    
    const scored = IMAGE_CATALOG.map(item => {
      let score = 0;
      
      for (const word of words) {
        for (const keyword of item.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 10;
          }
        }
        if (item.pattern.toLowerCase().includes(word)) score += 15;
        if (item.description.toLowerCase().includes(word)) score += 5;
        if (item.application.toLowerCase().includes(word)) score += 8;
      }
      
      return { ...item, score };
    });
    
    return scored.filter(i => i.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
  };

  // Send message to Mara
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    // Find relevant images
    const relevantImages = findImages(userMessage);
    
    try {
      const contextMessage = `User is currently viewing: ${currentImage.pattern} - ${currentImage.description}

User message: ${userMessage}

${relevantImages.length > 0 ? `I found ${relevantImages.length} relevant images to show: ${relevantImages.map(i => i.pattern + ' - ' + i.application).join(', ')}` : ''}`;
      
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
          max_tokens: 150,
          system: MARA_SYSTEM_PROMPT,
          messages: [
            ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: contextMessage }
          ]
        })
      });
      
      const data = await response.json();
      const maraText = data.content?.[0]?.text || "Let me show you some options...";
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: maraText,
        images: relevantImages.length > 0 ? relevantImages : null
      }]);
      
    } catch (error) {
      // Fallback response with images
      const fallbackText = relevantImages.length > 0 
        ? "Here's what I found — click any to see it full size:"
        : "Tell me more about your project — what sector, what feeling are you going for?";
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackText,
        images: relevantImages.length > 0 ? relevantImages : null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Select an image from Mara's suggestions
  const selectImage = (image) => {
    setCurrentImage(image);
  };

  // Quick prompts
  const quickPrompts = [
    "Show me something calming for healthcare",
    "I need a dramatic bar backdrop",
    "Water features for a pool area",
    "What works for a corporate lobby?"
  ];

  const getPrice = () => {
    let price = currentImage.price || 50;
    return price;
  };

  return (
    <div className="h-screen bg-black text-stone-100 flex flex-col" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Hero Image - Takes most of the screen */}
      <div className="flex-1 relative min-h-0">
        <img 
          src={currentImage.image} 
          alt={currentImage.pattern}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">M</span>
            </div>
            <span className="text-sm font-medium text-white/90">MakeReal</span>
          </div>
          <button 
            onClick={() => setShowSpecs(true)}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm rounded-lg transition-all border border-white/20"
          >
            Get Specs
          </button>
        </div>
        
        {/* Image info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-light text-white mb-2">{currentImage.pattern}</h1>
            <p className="text-stone-300 text-sm mb-3">{currentImage.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 rounded-full">{currentImage.application}</span>
              <span className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 rounded-full">{currentImage.maxSize}</span>
              <span className="text-xs px-3 py-1 bg-rose-500/80 backdrop-blur-sm text-white rounded-full">${getPrice()}/SF</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Section - Fixed at bottom */}
      <div className="flex-shrink-0 bg-stone-950 border-t border-stone-800">
        
        {/* Messages area - scrollable */}
        {messages.length > 0 && (
          <div className="max-h-[35vh] overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
                  {/* Message bubble */}
                  <div className={`rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user' 
                      ? 'bg-stone-700 text-white' 
                      : 'bg-stone-900 border border-stone-800 text-stone-200'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  
                  {/* Image grid from Mara */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {msg.images.map((img, j) => (
                        <button
                          key={j}
                          onClick={() => selectImage(img)}
                          className={`group relative rounded-lg overflow-hidden border-2 transition-all ${
                            currentImage.id === img.id 
                              ? 'border-rose-500' 
                              : 'border-stone-700 hover:border-stone-500'
                          }`}
                        >
                          <img src={img.image} alt={img.pattern} className="w-full h-20 object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-2">
                            <p className="text-[10px] font-medium text-white truncate">{img.pattern}</p>
                            <p className="text-[9px] text-stone-400 truncate">{img.application}</p>
                          </div>
                          {currentImage.id === img.id && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
                              <span className="text-[8px] text-white">✓</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-900 border border-stone-800 rounded-2xl px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
        
        {/* Quick prompts - show when no messages */}
        {messages.length === 0 && (
          <div className="p-4 pb-2">
            <p className="text-xs text-stone-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(prompt); }}
                  className="text-xs px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full transition-all border border-stone-800"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input area */}
        <div className="p-4 pt-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe what you're looking for..."
              className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-500"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
          <p className="text-[10px] text-stone-600 mt-2 text-center">
            Chat with Mara to explore 35+ carved wall patterns • MR Walls
          </p>
        </div>
      </div>
      
      {/* Specs Modal */}
      {showSpecs && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSpecs(false)}>
          <div className="bg-stone-950 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-stone-800" onClick={(e) => e.stopPropagation()}>
            
            {/* Header with image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img src={currentImage.image} alt={currentImage.pattern} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />
              <button 
                onClick={() => setShowSpecs(false)} 
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-light text-white">{currentImage.pattern}</h2>
                <p className="text-sm text-stone-400">{currentImage.application}</p>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Description */}
              <p className="text-sm text-stone-300">{currentImage.description}</p>
              
              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-900 rounded-xl p-3 border border-stone-800">
                  <p className="text-[10px] uppercase text-stone-500">Max Panel Size</p>
                  <p className="text-lg text-white font-light">{currentImage.maxSize}</p>
                </div>
                <div className="bg-stone-900 rounded-xl p-3 border border-stone-800">
                  <p className="text-[10px] uppercase text-stone-500">Material</p>
                  <p className="text-lg text-white font-light">{currentImage.color} Corian</p>
                </div>
                <div className="bg-stone-900 rounded-xl p-3 border border-stone-800">
                  <p className="text-[10px] uppercase text-stone-500">Lead Time</p>
                  <p className="text-lg text-white font-light">6-10 weeks</p>
                </div>
                <div className="bg-stone-900 rounded-xl p-3 border border-stone-800">
                  <p className="text-[10px] uppercase text-stone-500">System</p>
                  <p className="text-lg text-white font-light">InterlockPanel™</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-rose-950/50 border border-rose-900/50 rounded-xl p-4">
                <p className="text-[10px] uppercase text-rose-400/70 mb-2">Pricing</p>
                <div className="flex justify-between items-center">
                  <span className="text-stone-300">Base price</span>
                  <span className="text-2xl font-light text-rose-300">${getPrice()}/SF</span>
                </div>
                {currentImage.enhancement && (
                  <p className="text-xs text-stone-500 mt-1">Includes {currentImage.enhancement.toLowerCase()}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-100">
                  Download Spec Sheet
                </button>
                <button className="flex-1 py-3 bg-stone-800 text-stone-200 rounded-xl font-medium text-sm hover:bg-stone-700 border border-stone-700">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
