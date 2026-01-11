import { useState } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

// Full image catalog with keywords for matching
const IMAGE_CATALOG = [
  // Billow
  { id: 'billow-render', pattern: 'Billow', color: 'white', keywords: ['billow', 'wave', 'flowing', 'organic'], image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png` },
  { id: 'billow-strand', pattern: 'Billow', color: 'white', keywords: ['billow', 'restaurant', 'hospitality'], image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg` },
  { id: 'billow-black', pattern: 'Billow', color: 'black', keywords: ['billow', 'black', 'dark', 'dramatic'], image: `${CLOUDINARY_BASE}/Billow-person-black_copy_inkiga.jpg` },
  { id: 'billow-blue', pattern: 'Billow', color: 'white', enhancement: 'Backlighting', keywords: ['billow', 'blue', 'backlit', 'glow'], image: `${CLOUDINARY_BASE}/billow-backlight-blue-strand-5_copy_gtdcvx.jpg` },
  
  // Seattle
  { id: 'seattle-1', pattern: 'Seattle', color: 'white', keywords: ['seattle', 'tile', 'geometric', 'healthcare', 'hospital', 'clinical'], image: `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png` },
  { id: 'seattle-2', pattern: 'Seattle', color: 'white', keywords: ['seattle', 'tile', 'corridor', 'hallway'], image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png` },
  
  // Great Wave
  { id: 'greatwave-1', pattern: 'Great Wave', color: 'white', keywords: ['great wave', 'wave', 'ocean', 'japanese', 'hokusai', 'dramatic'], image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png` },
  { id: 'greatwave-shower', pattern: 'Great Wave', color: 'white', keywords: ['great wave', 'shower', 'bathroom', 'residential'], image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg` },
  { id: 'greatwave-2', pattern: 'Great Wave', color: 'white', keywords: ['great wave', 'exterior', 'facade'], image: `${CLOUDINARY_BASE}/Great_Wave_banana_20_copy_abzou8.png` },
  { id: 'greatwave-3', pattern: 'Great Wave', color: 'white', keywords: ['great wave', 'restaurant', 'hospitality'], image: `${CLOUDINARY_BASE}/Great_Wave_banana_09_copy_lcqfa0.png` },
  { id: 'greatwave-4', pattern: 'Great Wave', color: 'white', keywords: ['great wave', 'lobby', 'corporate'], image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png` },
  
  // Brick / Water Feature
  { id: 'brick-water-1', pattern: 'Brick', color: 'white', enhancement: 'Water Feature', keywords: ['brick', 'water', 'fountain', 'pool', 'waterfall'], image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png` },
  { id: 'brick-water-2', pattern: 'Brick', color: 'white', enhancement: 'Water Feature', keywords: ['brick', 'water', 'pool', 'outdoor'], image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png` },
  { id: 'brick-water-3', pattern: 'Brick', color: 'white', enhancement: 'Water Feature', keywords: ['brick', 'water', 'backlit'], image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png` },
  { id: 'brick-water-4', pattern: 'Brick', color: 'white', enhancement: 'Water Feature', keywords: ['brick', 'water', 'night'], image: `${CLOUDINARY_BASE}/Brick_waterfeature_27_copy_nxcqhx.png` },
  { id: 'brick-water-5', pattern: 'Brick', color: 'white', enhancement: 'Water Feature', keywords: ['brick', 'water', 'day'], image: `${CLOUDINARY_BASE}/Brick_waterfeature_12_copy_gdmjok.png` },
  
  // Buddha / Custom Portrait
  { id: 'buddha-1', pattern: 'Custom', color: 'white', keywords: ['buddha', 'zen', 'meditation', 'spiritual', 'calm', 'spa', 'wellness', 'peaceful', 'asian'], image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png` },
  { id: 'buddha-2', pattern: 'Custom', color: 'white', keywords: ['buddha', 'restaurant', 'asian', 'zen'], image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png` },
  
  // Marilyn / Custom Portrait  
  { id: 'marilyn-1', pattern: 'Custom', color: 'white', keywords: ['marilyn', 'portrait', 'hollywood', 'custom', 'branding'], image: `${CLOUDINARY_BASE}/Marilynn_sm_copy_gcvzcb.jpg` },
  { id: 'marilyn-2', pattern: 'Custom', color: 'white', keywords: ['marilyn', 'portrait', 'art'], image: `${CLOUDINARY_BASE}/Maryilynn2_c71acw.png` },
  
  // Fins
  { id: 'fins-exterior-1', pattern: 'Fins', color: 'white', keywords: ['fins', 'exterior', 'facade', 'corporate', 'modern'], image: `${CLOUDINARY_BASE}/Fins_exterior_white_gcccvq.jpg` },
  { id: 'fins-exterior-2', pattern: 'Fins', color: 'white', keywords: ['fins', 'exterior', 'patio', 'restaurant'], image: `${CLOUDINARY_BASE}/Fins_exterior2_lh1vlw.jpg` },
  
  // Flame
  { id: 'flame-1', pattern: 'Flame', color: 'white', keywords: ['flame', 'fire', 'warm', 'organic'], image: `${CLOUDINARY_BASE}/Flame-_qle4y3.jpg` },
  { id: 'flame-bed', pattern: 'Flame', color: 'white', keywords: ['flame', 'bedroom', 'headboard', 'residential'], image: `${CLOUDINARY_BASE}/Flamebed_yggqrp.jpg` },
  { id: 'flame-pink', pattern: 'Flame', color: 'white', enhancement: 'Backlighting', keywords: ['flame', 'pink', 'rgb', 'backlit', 'bedroom'], image: `${CLOUDINARY_BASE}/Flame_pink_obxnpm.jpg` },
  { id: 'flame-4', pattern: 'Flame', color: 'white', keywords: ['flame', 'lobby', 'feature'], image: `${CLOUDINARY_BASE}/Flames_qthl01.jpg` },
  
  // Desert Sunset / Custom
  { id: 'desert-1', pattern: 'Custom', color: 'warm', keywords: ['desert', 'sunset', 'arizona', 'southwest', 'warm', 'orange'], image: `${CLOUDINARY_BASE}/mr-render-1768082338412_copy_wqymkx.png` },
  { id: 'desert-2', pattern: 'Custom', color: 'warm', keywords: ['desert', 'mountain', 'landscape'], image: `${CLOUDINARY_BASE}/mr-render-1767989272197_copy_eka0g1.png` },
  { id: 'desert-3', pattern: 'Custom', color: 'warm', keywords: ['desert', 'sunset', 'hospitality'], image: `${CLOUDINARY_BASE}/mr-render-1768084337564_copy_k4ihhj.png` },
  { id: 'desert-4', pattern: 'Custom', color: 'warm', keywords: ['desert', 'abstract'], image: `${CLOUDINARY_BASE}/IzWQuibirwnFxWcm4KoFs_copy_kiypvi.png` },
  
  // Sand Dune / Curved
  { id: 'sanddune-curved', pattern: 'Sand Dune', color: 'black', enhancement: 'Curvature', keywords: ['sand dune', 'curved', 'black', 'column', 'dramatic'], image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png` },
  { id: 'sanddune-blue', pattern: 'Sand Dune', color: 'white', enhancement: 'Backlighting', keywords: ['sand dune', 'blue', 'spa', 'backlit'], image: `${CLOUDINARY_BASE}/mr-render-1767992780170_ufyyef.png` },
  { id: 'sanddune-3', pattern: 'Sand Dune', color: 'white', keywords: ['sand dune', 'wave', 'organic'], image: `${CLOUDINARY_BASE}/mr-render-1767989995638_copy_vtszj0.png` },
  
  // Lake
  { id: 'lake-1', pattern: 'Lake', color: 'white', keywords: ['lake', 'ripple', 'concentric', 'calm', 'water'], image: `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg` },
  
  // Install photos
  { id: 'install-1', pattern: 'Install', color: 'white', keywords: ['install', 'installation', 'mounting', 'process', 'how'], image: `${CLOUDINARY_BASE}/Seattle-V2-tile-02_bvcqwc.png` },
];

// Pattern data with sizes
const PATTERN_DATA = {
  'Billow': { maxSize: '144" × 60"', standardPanels: '48" × 96"', minOrder: '32 SF' },
  'Great Wave': { maxSize: '144" × 48"', standardPanels: '24" × 96"', minOrder: '24 SF' },
  'Fins': { maxSize: '120" × 60"', standardPanels: '30" × 120"', minOrder: '25 SF' },
  'Flame': { maxSize: '144" × 60"', standardPanels: '48" × 96"', minOrder: '32 SF' },
  'Seattle': { maxSize: '96" × 96"', standardPanels: '24" × 24" tiles', minOrder: '16 SF' },
  'Brick': { maxSize: '144" × 60"', standardPanels: '36" × 96"', minOrder: '24 SF' },
  'Sand Dune': { maxSize: '144" × 60"', standardPanels: '48" × 96"', minOrder: '32 SF' },
  'Lake': { maxSize: '144" × 60"', standardPanels: '48" × 96"', minOrder: '32 SF' },
  'Custom': { maxSize: '144" × 60"', standardPanels: 'Custom', minOrder: '50 SF' },
};

// Mara system prompt - now can show images!
const MARA_SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers explore carved Corian wall surfaces.

PERSONALITY: Warm, knowledgeable, brief. You love design AND specs. Not salesy - genuinely helpful.

CRITICAL: Keep responses under 60 words. 2-3 sentences max. Ask ONE follow-up question.

YOU CAN SHOW IMAGES! When user asks to see something, use [Image: keyword] tags. Examples:
- User asks "show me Buddha" → include [Image: buddha] in your response
- User asks "what about backlit?" → include [Image: backlit] 
- User asks "how does install work?" → include [Image: install]
- User asks "show me water features" → include [Image: water]

Available keywords: buddha, billow, flame, seattle, greatwave, brick, water, backlit, fins, desert, sanddune, install, spa, zen, bedroom, shower

KNOWLEDGE:
- Material: DuPont Corian solid surface, non-porous, Class A fire rated
- Pricing: Base $50/SF, Backlighting +$50/SF, Water Feature +$20/SF, Curvature +$25/SF
- Lead time: 6-10 weeks from approval
- Panel sizes: Up to 144" × 60" max
- Install: InterlockPanel™ puzzle-piece system, 1/32" tolerance, silicone up to 13', mechanical above

When they ask about what they're viewing, reference the pattern/enhancement they selected.`;

export default function MakeRealV6() {
  const [stage, setStage] = useState('configure');
  const [pattern, setPattern] = useState(null);
  const [color, setColor] = useState(null);
  const [enhancement, setEnhancement] = useState(null);
  const [space, setSpace] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [showSpecs, setShowSpecs] = useState(false);
  const [showMara, setShowMara] = useState(false);
  const [maraInput, setMaraInput] = useState('');
  const [maraMessages, setMaraMessages] = useState([]);
  const [maraLoading, setMaraLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [matchedItem, setMatchedItem] = useState(null);

  const patterns = ['Billow', 'Great Wave', 'Fins', 'Flame', 'Seattle', 'Brick', 'Sand Dune', 'Lake'];
  
  const colors = [
    { name: 'Glacier White', hex: '#f5f5f5' },
    { name: 'Deep Nocturne', hex: '#1a1a1a' },
    { name: 'Dove Gray', hex: '#9ca3af' },
    { name: 'Concrete', hex: '#78716c' },
    { name: 'Marble', hex: '#e7e5e4' },
  ];
  
  const enhancements = [
    { name: 'Backlighting' },
    { name: 'Curvature' },
    { name: 'Branding' },
    { name: 'Water Feature' },
  ];
  
  const spaces = ['Hotel Lobby', 'Spa / Wellness', 'Restaurant', 'Bedroom', 'Shower', 'Pool', 'Corporate Lobby', 'Exterior / Facade'];

  // Find image by keyword for Mara
  const findImageByKeyword = (keyword) => {
    const lower = keyword.toLowerCase();
    for (const item of IMAGE_CATALOG) {
      for (const kw of item.keywords) {
        if (kw.includes(lower) || lower.includes(kw)) {
          return item;
        }
      }
    }
    return null;
  };

  // Parse Mara response for image tags
  const parseMaraImages = (text) => {
    const imageMatches = text.match(/\[Image:\s*([^\]]+)\]/g) || [];
    const images = [];
    for (const match of imageMatches) {
      const keyword = match.match(/\[Image:\s*([^\]]+)\]/)[1].trim();
      const found = findImageByKeyword(keyword);
      if (found) images.push(found);
    }
    return images;
  };

  const cleanMaraText = (text) => {
    return text.replace(/\[Image:\s*[^\]]+\]/g, '').trim();
  };

  // Smart image matching
  const findBestImage = () => {
    const searchTerms = [];
    
    if (prompt) {
      searchTerms.push(...prompt.toLowerCase().split(/\s+/));
    }
    
    if (pattern) searchTerms.push(pattern.toLowerCase());
    if (color === 'Deep Nocturne') searchTerms.push('black', 'dark');
    if (color === 'Glacier White') searchTerms.push('white');
    if (enhancement) searchTerms.push(enhancement.toLowerCase().replace(' ', ''));
    if (space) {
      const spaceWords = space.toLowerCase().split(/[\s\/]+/);
      searchTerms.push(...spaceWords);
    }
    
    let bestMatch = IMAGE_CATALOG[0];
    let bestScore = 0;
    
    for (const item of IMAGE_CATALOG) {
      let score = 0;
      
      for (const term of searchTerms) {
        for (const keyword of item.keywords) {
          if (keyword.includes(term) || term.includes(keyword)) {
            score += 10;
          }
        }
        
        if (item.pattern && item.pattern.toLowerCase().includes(term)) {
          score += 15;
        }
        
        if (item.color && item.color.toLowerCase().includes(term)) {
          score += 8;
        }
        
        if (item.enhancement && item.enhancement.toLowerCase().includes(term)) {
          score += 12;
        }
      }
      
      if (pattern && item.pattern === pattern) {
        score += 20;
      }
      
      if (color === 'Deep Nocturne' && item.color === 'black') {
        score += 15;
      }
      
      if (enhancement && item.enhancement === enhancement) {
        score += 15;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
    
    return bestMatch;
  };

  const handleGenerate = () => {
    const match = findBestImage();
    setMatchedItem(match);
    setResultImage(match.image);
    setStage('generating');
    setTimeout(() => setStage('result'), 2200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canGenerate) {
      handleGenerate();
    }
  };

  const handleReset = () => {
    setStage('configure');
    setPattern(null);
    setColor(null);
    setEnhancement(null);
    setSpace(null);
    setPrompt('');
    setResultImage(null);
    setMatchedItem(null);
    setMaraMessages([]);
  };

  const handleIterate = (change) => {
    if (change === 'backlight') setEnhancement('Backlighting');
    if (change === 'black') setColor('Deep Nocturne');
    if (change === 'curved') setEnhancement('Curvature');
    if (change === 'exterior') setSpace('Exterior / Facade');
    
    setTimeout(() => {
      const match = findBestImage();
      setMatchedItem(match);
      setResultImage(match.image);
    }, 100);
    
    setStage('generating');
    setTimeout(() => setStage('result'), 1500);
  };

  // Mara API call
  const sendToMara = async () => {
    if (!maraInput.trim() || maraLoading) return;
    
    const userMessage = maraInput.trim();
    setMaraInput('');
    setMaraMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMaraLoading(true);
    
    try {
      const contextMessage = `User is viewing: ${matchedItem?.pattern || pattern || 'Custom Design'}${enhancement ? ` with ${enhancement}` : ''}${color ? ` in ${color}` : ''}${space ? ` for ${space}` : ''}.`;
      
      const messages = [
        ...maraMessages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: `${contextMessage}\n\nUser question: ${userMessage}` }
      ];
      
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
          max_tokens: 200,
          system: MARA_SYSTEM_PROMPT,
          messages
        })
      });
      
      const data = await response.json();
      if (data.content?.[0]?.text) {
        const fullText = data.content[0].text;
        const images = parseMaraImages(fullText);
        const cleanText = cleanMaraText(fullText);
        setMaraMessages(prev => [...prev, { role: 'assistant', content: cleanText, images }]);
      }
    } catch (error) {
      setMaraMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Try again in a moment." }]);
    } finally {
      setMaraLoading(false);
    }
  };

  const canGenerate = pattern || color || enhancement || space || prompt.length > 2;

  const getPrice = () => {
    let base = 50;
    if (enhancement === 'Backlighting') base += 50;
    if (enhancement === 'Water Feature') base += 20;
    if (enhancement === 'Curvature') base += 25;
    return base;
  };

  const getPatternData = () => {
    const p = matchedItem?.pattern || pattern || 'Custom';
    return PATTERN_DATA[p] || PATTERN_DATA['Custom'];
  };

  // Configure Stage
  if (stage === 'configure') {
    return (
      <div className="h-screen bg-black text-stone-100 flex flex-col overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        
        {/* Header */}
        <header className="flex-shrink-0 px-8 py-3 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <div>
              <span className="font-medium text-stone-100">MakeReal</span>
              <span className="text-stone-500 text-sm ml-2">by MR Walls</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="flex-shrink-0 px-8 py-6 text-center border-b border-stone-900">
          <h1 className="text-3xl font-light text-white mb-2">
            The only AI that shows you what you can <span className="text-rose-400">actually build</span>.
          </h1>
          <p className="text-stone-300 text-sm max-w-2xl mx-auto">
            MR Walls creates seamless carved Corian surfaces. Every image is real — CNC files, shop drawings, pricing.
          </p>
        </div>

        {/* Main - scrollable if needed */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl mx-auto">
          
            {/* Prompt Input */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your wall... zen spa, dramatic lobby, backlit bedroom (press Enter)"
                  className="w-full px-5 py-4 bg-stone-900 border-2 border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-rose-500 text-sm"
                />
                {prompt.length > 2 && (
                  <button 
                    onClick={handleGenerate}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-400 transition-colors"
                  >
                    Generate
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-600 mt-2 text-center">— or configure below —</p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 block font-medium">Pattern</label>
                  <div className="flex flex-wrap gap-1.5">
                    {patterns.map(p => (
                      <button
                        key={p}
                        onClick={() => setPattern(pattern === p ? null : p)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                          pattern === p 
                            ? 'bg-white text-black font-medium' 
                            : 'bg-stone-900 text-stone-400 border border-stone-800 hover:bg-stone-800'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 block font-medium">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setColor(color === c.name ? null : c.name)}
                        className="relative group"
                      >
                        <div 
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            color === c.name 
                              ? 'border-rose-500 ring-2 ring-rose-500/30' 
                              : 'border-stone-800 hover:border-stone-600'
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 block font-medium">Enhancement</label>
                  <div className="flex flex-wrap gap-1.5">
                    {enhancements.map(e => (
                      <button
                        key={e.name}
                        onClick={() => setEnhancement(enhancement === e.name ? null : e.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                          enhancement === e.name 
                            ? 'bg-white text-black font-medium' 
                            : 'bg-stone-900 text-stone-400 border border-stone-800 hover:bg-stone-800'
                        }`}
                      >
                        {e.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 block font-medium">Environment</label>
                  <div className="flex flex-wrap gap-1.5">
                    {spaces.map(s => (
                      <button
                        key={s}
                        onClick={() => setSpace(space === s ? null : s)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                          space === s 
                            ? 'bg-white text-black font-medium' 
                            : 'bg-stone-900 text-stone-400 border border-stone-800 hover:bg-stone-800'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected + Generate */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {pattern && <span className="text-xs px-2.5 py-1 bg-white text-black rounded-full font-medium">{pattern}</span>}
                {color && <span className="text-xs px-2.5 py-1 bg-white text-black rounded-full font-medium">{color}</span>}
                {enhancement && <span className="text-xs px-2.5 py-1 bg-white text-black rounded-full font-medium">{enhancement}</span>}
                {space && <span className="text-xs px-2.5 py-1 bg-white text-black rounded-full font-medium">{space}</span>}
                {!pattern && !color && !enhancement && !space && <span className="text-xs text-stone-600">Select options to begin</span>}
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  canGenerate
                    ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-400 hover:to-rose-500'
                    : 'bg-stone-900 text-stone-600 cursor-not-allowed border border-stone-800'
                }`}
              >
                Generate
              </button>
            </div>
          </div>
        </main>

      </div>
    );
  }

  // Generating Stage
  if (stage === 'generating') {
    return (
      <div className="h-screen bg-black text-stone-100 flex items-center justify-center" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-stone-800" />
            <div className="absolute inset-0 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-stone-400 text-sm mb-3">Generating your wall...</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-xs">
            {pattern && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{pattern}</span>}
            {color && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{color}</span>}
            {enhancement && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{enhancement}</span>}
            {space && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{space}</span>}
          </div>
        </div>
      </div>
    );
  }

  // Result Stage - FIXED: proper frame, no dark overlay, fits viewport
  if (stage === 'result') {
    const patternData = getPatternData();
    const price = getPrice();
    const displayPattern = matchedItem?.pattern || pattern || 'Custom Design';
    
    return (
      <div className="h-screen bg-black text-stone-100 flex flex-col overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        
        {/* Header */}
        <header className="flex-shrink-0 px-4 py-3 flex items-center justify-between border-b border-stone-800">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            New design
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">M</span>
          </div>
        </header>
        
        {/* Main Content - Fixed height, no overflow */}
        <main className="flex-1 p-4 flex flex-col min-h-0">
          
          {/* Image Container - FIXED: contained box, no dark overlay */}
          <div className="flex-1 min-h-0 relative rounded-xl overflow-hidden border-2 border-stone-800 bg-stone-950">
            <img 
              src={resultImage} 
              alt={displayPattern}
              className="w-full h-full object-cover"
            />
            
            {/* Bottom info - always visible, no hover needed */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-2xl font-light text-white mb-1">{displayPattern}</h1>
                  <div className="flex flex-wrap gap-1.5">
                    {color && <span className="text-[10px] px-2 py-1 bg-white/20 backdrop-blur text-white rounded-full">{color}</span>}
                    {enhancement && <span className="text-[10px] px-2 py-1 bg-white/20 backdrop-blur text-white rounded-full">{enhancement}</span>}
                    {space && <span className="text-[10px] px-2 py-1 bg-white/20 backdrop-blur text-white rounded-full">{space}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-stone-400">Max Panel</p>
                  <p className="text-lg text-white font-light">{patternData.maxSize}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Controls - Fixed height */}
          <div className="flex-shrink-0 mt-3 space-y-3">
            {/* Iteration chips */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs text-stone-600 mr-1">Try:</span>
              <button onClick={() => handleIterate('backlight')} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full text-xs transition-all border border-stone-800">
                + Backlighting
              </button>
              <button onClick={() => handleIterate('black')} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full text-xs transition-all border border-stone-800">
                Try black
              </button>
              <button onClick={() => handleIterate('curved')} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full text-xs transition-all border border-stone-800">
                + Curvature
              </button>
              <button onClick={handleReset} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full text-xs transition-all border border-stone-800">
                Different pattern
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={() => setShowSpecs(true)} className="flex-1 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-stone-100 transition-colors">
                📐 Get Specs
              </button>
              <button onClick={() => { setShowMara(true); setMaraMessages([]); }} className="flex-1 py-2.5 bg-stone-900 text-stone-200 rounded-lg font-medium text-sm hover:bg-stone-800 transition-colors border border-stone-700">
                💬 Ask Mara
              </button>
              <button className="py-2.5 px-4 bg-stone-900 text-stone-500 rounded-lg text-sm hover:text-rose-400 transition-colors border border-stone-800">
                ♥
              </button>
            </div>
          </div>
        </main>

        {/* Specs Modal */}
        {showSpecs && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSpecs(false)}>
            <div className="bg-stone-950 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-stone-800" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-stone-800 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-light text-stone-100">{displayPattern}</h2>
                  <p className="text-xs text-stone-500">{space || 'Feature Wall'}</p>
                </div>
                <button onClick={() => setShowSpecs(false)} className="text-stone-500 hover:text-stone-300 p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="bg-stone-900 rounded-xl p-3 border border-stone-800">
                  <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">Panel Sizes</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] text-stone-500">Max Size</p>
                      <p className="text-sm text-white font-medium">{patternData.maxSize}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-500">Standard</p>
                      <p className="text-sm text-white font-medium">{patternData.standardPanels}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-500">Min Order</p>
                      <p className="text-sm text-white font-medium">{patternData.minOrder}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                    <p className="text-[10px] uppercase text-stone-600">Material</p>
                    <p className="text-sm text-stone-200">{color || 'Glacier White'}</p>
                  </div>
                  <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                    <p className="text-[10px] uppercase text-stone-600">Enhancement</p>
                    <p className="text-sm text-stone-200">{enhancement || 'Standard'}</p>
                  </div>
                  <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                    <p className="text-[10px] uppercase text-stone-600">Lead Time</p>
                    <p className="text-sm text-stone-200">6-10 weeks</p>
                  </div>
                  <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                    <p className="text-[10px] uppercase text-stone-600">System</p>
                    <p className="text-sm text-stone-200">InterlockPanel™</p>
                  </div>
                </div>

                <div className="bg-rose-950/40 border border-rose-900/40 rounded-xl p-3">
                  <p className="text-[10px] uppercase text-rose-400/70 mb-2">Pricing</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-stone-400">Base</span><span className="text-stone-200">$50/SF</span></div>
                    {enhancement === 'Backlighting' && <div className="flex justify-between"><span className="text-stone-400">Backlighting</span><span className="text-stone-200">+$50/SF</span></div>}
                    {enhancement === 'Water Feature' && <div className="flex justify-between"><span className="text-stone-400">Water Feature</span><span className="text-stone-200">+$20/SF</span></div>}
                    {enhancement === 'Curvature' && <div className="flex justify-between"><span className="text-stone-400">Curvature</span><span className="text-stone-200">+$25/SF</span></div>}
                    <div className="flex justify-between pt-2 border-t border-stone-800">
                      <span className="text-stone-300 font-medium">Total</span>
                      <span className="text-rose-300 font-medium">${price}/SF</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-white text-black rounded-lg text-sm font-medium">Download Spec Sheet</button>
                  <button className="flex-1 py-2.5 bg-stone-800 text-stone-200 rounded-lg text-sm font-medium border border-stone-700">Request Custom Size</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mara Modal - CAN SHOW IMAGES */}
        {showMara && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-end justify-center p-4" onClick={() => setShowMara(false)}>
            <div className="bg-stone-950 rounded-2xl w-full max-w-2xl border border-stone-800 overflow-hidden max-h-[70vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex-shrink-0 p-3 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-100">Mara</p>
                    <p className="text-[10px] text-stone-500">MR Walls Design Assistant</p>
                  </div>
                </div>
                <button onClick={() => setShowMara(false)} className="text-stone-500 hover:text-stone-300 p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {/* Initial greeting */}
                <div className="bg-stone-900 rounded-xl p-3 border border-stone-800 max-w-[85%]">
                  <p className="text-sm text-stone-300">
                    Hey! I see you're looking at {displayPattern}{enhancement ? ` with ${enhancement.toLowerCase()}` : ''}.
                    Ask me anything — specs, sizing, alternatives, or say "show me" to see other options!
                  </p>
                </div>
                
                {/* Chat messages */}
                {maraMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
                      <div className={`rounded-xl p-3 ${msg.role === 'user' ? 'bg-stone-800 text-stone-100' : 'bg-stone-900 border border-stone-800 text-stone-300'}`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      {/* Show images Mara returned */}
                      {msg.images && msg.images.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {msg.images.map((img, j) => (
                            <div key={j} className="rounded-lg overflow-hidden border border-stone-800">
                              <img src={img.image} alt={img.pattern} className="w-full h-24 object-cover" />
                              <div className="p-2 bg-stone-900">
                                <p className="text-[10px] text-stone-400">{img.pattern}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {maraLoading && (
                  <div className="bg-stone-900 rounded-xl p-3 border border-stone-800 max-w-[85%]">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 p-3 border-t border-stone-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={maraInput}
                    onChange={(e) => setMaraInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendToMara()}
                    placeholder="Ask about specs, install, or 'show me water features'..."
                    className="flex-1 px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600"
                  />
                  <button onClick={sendToMara} disabled={maraLoading} className="px-4 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-stone-100 disabled:opacity-50">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}

      
      // Boost for color match from selector
      if (color === 'Deep Nocturne' && item.color === 'black') {
        score += 15;
      }
      
      // Boost for enhancement match from selector
      if (enhancement && item.enhancement === enhancement) {
        score += 15;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
    
    return bestMatch;
  };

  const handleGenerate = () => {
    const match = findBestImage();
    setMatchedItem(match);
    setResultImage(match.image);
    setStage('generating');
    setTimeout(() => setStage('result'), 2200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canGenerate) {
      handleGenerate();
    }
  };

  const handleReset = () => {
    setStage('configure');
    setPattern(null);
    setColor(null);
    setEnhancement(null);
    setSpace(null);
    setPrompt('');
    setResultImage(null);
    setMatchedItem(null);
    setMaraMessages([]);
  };

  const handleIterate = (change) => {
    if (change === 'backlight') setEnhancement('Backlighting');
    if (change === 'black') setColor('Deep Nocturne');
    if (change === 'curved') setEnhancement('Curvature');
    if (change === 'exterior') setSpace('Exterior / Facade');
    
    // Re-match with new criteria
    setTimeout(() => {
      const match = findBestImage();
      setMatchedItem(match);
      setResultImage(match.image);
    }, 100);
    
    setStage('generating');
    setTimeout(() => setStage('result'), 1500);
  };

  // Mara API call
  const sendToMara = async () => {
    if (!maraInput.trim() || maraLoading) return;
    
    const userMessage = maraInput.trim();
    setMaraInput('');
    setMaraMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMaraLoading(true);
    
    try {
      const contextMessage = `User is viewing: ${matchedItem?.pattern || pattern || 'Custom Design'}${enhancement ? ` with ${enhancement}` : ''}${color ? ` in ${color}` : ''}${space ? ` for ${space}` : ''}.`;
      
      const messages = [
        ...maraMessages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: `${contextMessage}\n\nUser question: ${userMessage}` }
      ];
      
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
          messages
        })
      });
      
      const data = await response.json();
      if (data.content?.[0]?.text) {
        setMaraMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
      }
    } catch (error) {
      setMaraMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Try again in a moment." }]);
    } finally {
      setMaraLoading(false);
    }
  };

  const canGenerate = pattern || color || enhancement || space || prompt.length > 2;

  const getPrice = () => {
    let base = 50;
    if (enhancement === 'Backlighting') base += 50;
    if (enhancement === 'Water Feature') base += 20;
    if (enhancement === 'Curvature') base += 25;
    return base;
  };

  const getPatternData = () => {
    const p = matchedItem?.pattern || pattern || 'Custom';
    return PATTERN_DATA[p] || PATTERN_DATA['Custom'];
  };

  // Configure Stage
  if (stage === 'configure') {
    return (
      <div className="min-h-screen bg-black text-stone-100 flex flex-col" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        
        {/* Header */}
        <header className="px-8 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <div>
              <span className="font-medium text-stone-100">MakeReal</span>
              <span className="text-stone-500 text-sm ml-2">by MR Walls</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="px-8 py-12 text-center border-b border-stone-900">
          <h1 className="text-4xl font-light text-white mb-4">
            The only AI that shows you what you can <span className="text-rose-400">actually build</span>.
          </h1>
          <p className="text-white text-sm max-w-2xl mx-auto leading-relaxed">
            MR Walls creates seamless carved Corian surfaces for architecture. Every image here is real — 
            CNC files, shop drawings, pricing. Configure your wall and see it instantly.
          </p>
        </div>

        {/* Main */}
        <main className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full">
          
          {/* Prompt Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your wall or just a vibe word... (press Enter to generate)"
                className="w-full px-6 py-5 bg-stone-900 border-2 border-stone-700 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-rose-500 text-base"
              />
              {prompt.length > 2 && (
                <button 
                  onClick={handleGenerate}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-400 transition-colors"
                >
                  Generate
                </button>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-3 text-center">— or build it below —</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-3 block font-medium">Pattern</label>
                <div className="flex flex-wrap gap-2">
                  {patterns.map(p => (
                    <button
                      key={p}
                      onClick={() => setPattern(pattern === p ? null : p)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        pattern === p 
                          ? 'bg-white text-black font-medium' 
                          : 'bg-stone-900 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-stone-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-3 block font-medium">Corian Color</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setColor(color === c.name ? null : c.name)}
                      className="relative group"
                    >
                      <div 
                        className={`w-14 h-14 rounded-xl border-2 transition-all ${
                          color === c.name 
                            ? 'border-rose-500 ring-2 ring-rose-500/30' 
                            : 'border-stone-800 hover:border-stone-600'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                      <p className={`text-[10px] mt-1.5 text-center transition-colors ${color === c.name ? 'text-stone-200' : 'text-stone-600'}`}>
                        {c.name.split(' ')[0]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-3 block font-medium">Enhancement</label>
                <div className="flex flex-wrap gap-2">
                  {enhancements.map(e => (
                    <button
                      key={e.name}
                      onClick={() => setEnhancement(enhancement === e.name ? null : e.name)}
                      className={`px-4 py-2.5 rounded-lg text-sm transition-all ${
                        enhancement === e.name 
                          ? 'bg-white text-black font-medium' 
                          : 'bg-stone-900 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-stone-200'
                      }`}
                    >
                      {e.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-3 block font-medium">Environment</label>
                <div className="flex flex-wrap gap-2">
                  {spaces.map(s => (
                    <button
                      key={s}
                      onClick={() => setSpace(space === s ? null : s)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        space === s 
                          ? 'bg-white text-black font-medium' 
                          : 'bg-stone-900 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-stone-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Tags + Generate */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {pattern && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{pattern}</span>}
              {color && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{color}</span>}
              {enhancement && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{enhancement}</span>}
              {space && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{space}</span>}
              {!pattern && !color && !enhancement && !space && <span className="text-xs text-stone-600">Select any options to begin</span>}
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${
                canGenerate
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-400 hover:to-rose-500 shadow-lg shadow-rose-500/25'
                  : 'bg-stone-900 text-stone-600 cursor-not-allowed border border-stone-800'
              }`}
            >
              Generate
            </button>
          </div>

        </main>

      </div>
    );
  }

  // Generating Stage
  if (stage === 'generating') {
    return (
      <div className="min-h-screen bg-black text-stone-100 flex items-center justify-center" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-2 border-stone-800" />
            <div className="absolute inset-0 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-stone-300 text-sm mb-3">Generating your wall...</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-xs">
            {pattern && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{pattern}</span>}
            {color && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{color}</span>}
            {enhancement && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{enhancement}</span>}
            {space && <span className="text-xs px-2 py-1 bg-white text-black rounded-full">{space}</span>}
          </div>
        </div>
      </div>
    );
  }

  // Result Stage - FRAMED IMAGE
  if (stage === 'result') {
    const patternData = getPatternData();
    const price = getPrice();
    const displayPattern = matchedItem?.pattern || pattern || 'Custom Design';
    
    return (
      <div className="min-h-screen bg-black text-stone-100 flex flex-col" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            New design
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">M</span>
          </div>
        </header>
        
        {/* Main Content - Framed */}
        <main className="flex-1 p-6 flex flex-col">
          
          {/* Image Container - Framed, not bleeding */}
          <div 
            className="flex-1 relative rounded-2xl overflow-hidden border border-stone-800 cursor-pointer group"
            onClick={() => setShowSpecs(true)}
          >
            <img 
              src={resultImage} 
              alt={displayPattern}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
              <div className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-stone-600">
                <span className="text-sm text-white">Click for specs & details</span>
              </div>
            </div>
            
            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-light text-white mb-2">{displayPattern}</h1>
                  <div className="flex flex-wrap gap-2">
                    {color && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{color}</span>}
                    {enhancement && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{enhancement}</span>}
                    {space && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{space}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-400 mb-1">Max Panel Size</p>
                  <p className="text-xl text-white font-light">{patternData.maxSize}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Iteration chips */}
          <div className="mt-5">
            <p className="text-xs text-stone-500 mb-3">Not quite? Try:</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleIterate('backlight')} className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800">
                Add backlighting
              </button>
              <button onClick={() => handleIterate('black')} className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800">
                Try black
              </button>
              <button onClick={() => handleIterate('curved')} className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800">
                Add curvature
              </button>
              <button onClick={() => handleIterate('exterior')} className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800">
                Exterior version
              </button>
              <button onClick={handleReset} className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800">
                Different pattern
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-5">
            <button onClick={() => setShowSpecs(true)} className="flex-1 py-3.5 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-100 transition-colors flex items-center justify-center gap-2">
              <span>📐</span> Get Specs
            </button>
            <button onClick={() => { setShowMara(true); setMaraMessages([]); }} className="flex-1 py-3.5 bg-stone-900 text-stone-200 rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors border border-stone-800 flex items-center justify-center gap-2">
              <span>💬</span> Ask Mara
            </button>
            <button className="py-3.5 px-5 bg-stone-900 text-stone-400 rounded-xl text-sm hover:bg-stone-800 hover:text-rose-400 transition-colors border border-stone-800">
              ♥
            </button>
          </div>

        </main>

        {/* Specs Modal */}
        {showSpecs && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowSpecs(false)}>
            <div className="bg-stone-950 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-stone-800" onClick={(e) => e.stopPropagation()}>
              <div className="p-5 border-b border-stone-800 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-light text-stone-100">{displayPattern}</h2>
                  <p className="text-xs text-stone-500 mt-1">{space || 'Feature Wall'}</p>
                </div>
                <button onClick={() => setShowSpecs(false)} className="text-stone-500 hover:text-stone-300 transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-5 space-y-5">
                <div className="bg-stone-900 rounded-xl p-4 border border-stone-800">
                  <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3">Panel Sizes</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-stone-500 mb-1">Max Size</p>
                      <p className="text-sm text-white font-medium">{patternData.maxSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-1">Standard</p>
                      <p className="text-sm text-white font-medium">{patternData.standardPanels}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-1">Min Order</p>
                      <p className="text-sm text-white font-medium">{patternData.minOrder}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-900 rounded-xl p-4 border border-stone-800">
                    <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">Material</p>
                    <p className="text-sm text-stone-200">{color || 'Glacier White'}</p>
                  </div>
                  <div className="bg-stone-900 rounded-xl p-4 border border-stone-800">
                    <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">Enhancement</p>
                    <p className="text-sm text-stone-200">{enhancement || 'Standard'}</p>
                  </div>
                  <div className="bg-stone-900 rounded-xl p-4 border border-stone-800">
                    <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">Lead Time</p>
                    <p className="text-sm text-stone-200">6-10 weeks</p>
                  </div>
                  <div className="bg-stone-900 rounded-xl p-4 border border-stone-800">
                    <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">Install System</p>
                    <p className="text-sm text-stone-200">InterlockPanel™</p>
                  </div>
                </div>

                <div className="bg-stone-900/50 rounded-xl p-4 border border-stone-800">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-3">Technical</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-stone-500">Material</span><span className="text-stone-300">DuPont Corian®</span></div>
                    <div className="flex justify-between"><span className="text-stone-500">Fire Rating</span><span className="text-stone-300">Class A</span></div>
                    <div className="flex justify-between"><span className="text-stone-500">Seam Tolerance</span><span className="text-stone-300">1/32"</span></div>
                    <div className="flex justify-between"><span className="text-stone-500">Thickness</span><span className="text-stone-300">12mm</span></div>
                  </div>
                </div>

                <div className="bg-rose-950/40 border border-rose-900/40 rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-wider text-rose-400/70 mb-2">Pricing</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm"><span className="text-stone-400">Base ({color || 'Glacier White'})</span><span className="text-stone-200">$50/SF</span></div>
                    {enhancement === 'Backlighting' && <div className="flex justify-between text-sm"><span className="text-stone-400">Backlighting</span><span className="text-stone-200">+$50/SF</span></div>}
                    {enhancement === 'Water Feature' && <div className="flex justify-between text-sm"><span className="text-stone-400">Water Feature</span><span className="text-stone-200">+$20/SF</span></div>}
                    {enhancement === 'Curvature' && <div className="flex justify-between text-sm"><span className="text-stone-400">Curvature</span><span className="text-stone-200">+$25/SF</span></div>}
                    <div className="flex justify-between text-sm pt-2 border-t border-stone-800 mt-2">
                      <span className="text-stone-300 font-medium">Total</span>
                      <span className="text-rose-300 font-medium">${price}/SF</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-stone-100 transition-colors">Download Spec Sheet</button>
                  <button className="flex-1 py-3 bg-stone-800 text-stone-200 rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors border border-stone-700">Request Custom Size</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mara Modal - WORKING */}
        {showMara && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-end justify-center p-6" onClick={() => setShowMara(false)}>
            <div className="bg-stone-950 rounded-2xl w-full max-w-2xl border border-stone-800 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-100">Mara</p>
                    <p className="text-xs text-stone-500">MR Walls Design Assistant</p>
                  </div>
                </div>
                <button onClick={() => setShowMara(false)} className="text-stone-500 hover:text-stone-300 transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 min-h-[250px] max-h-[400px] overflow-y-auto space-y-3">
                {/* Initial greeting */}
                <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 max-w-[85%]">
                  <p className="text-sm text-stone-300">
                    Hey! I see you're looking at {displayPattern}{enhancement ? ` with ${enhancement.toLowerCase()}` : ''}.
                    What can I help with? Specs, sizing, pricing, alternatives?
                  </p>
                </div>
                
                {/* Chat messages */}
                {maraMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-xl p-4 max-w-[85%] ${msg.role === 'user' ? 'bg-stone-800 text-stone-100' : 'bg-stone-900 border border-stone-800 text-stone-300'}`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                
                {maraLoading && (
                  <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 max-w-[85%]">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-stone-800">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={maraInput}
                    onChange={(e) => setMaraInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendToMara()}
                    placeholder="Ask about specs, sizing, alternatives..."
                    className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600"
                  />
                  <button onClick={sendToMara} disabled={maraLoading} className="px-5 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-100 transition-colors disabled:opacity-50">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}
