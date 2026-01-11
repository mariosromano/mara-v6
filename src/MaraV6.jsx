import { useState, useRef, useEffect } from 'react';

// ============================================
// MARA v6 - MR Walls Design Assistant
// Large image left, chat right, specs on click
// ============================================

const CLOUDINARY_BASE = "https://res.cloudinary.com/dtlodxxio/image/upload/";

const IMAGE_CATALOG = [
  {"id":"billow-texture-white-01","pattern":"Billow","sector":"General","application":"Texture Detail","lighting":"Natural","color":"Glacier White","mood":["organic","flowing","calming"],"keywords":["billow","texture","close-up","detail","white"],"rgb_options":false,"description":"Close-up of Billow pattern showing the flowing, organic wave texture carved into white Corian.","image_url":`${CLOUDINARY_BASE}Billow_-_Render-001_copy_ujsmd4.png`},
  {"id":"billow-strand-purple-01","pattern":"Billow","sector":"Hospitality","application":"Restaurant Feature","lighting":"Purple RGB Backlit","color":"Glacier White","mood":["dramatic","nightlife","organic"],"keywords":["billow","restaurant","purple","RGB","strand","staircase"],"rgb_options":true,"description":"The Strand House restaurant featuring Billow pattern with purple RGB backlighting, glass railings, and pendant lights.","image_url":`${CLOUDINARY_BASE}billow-strand-center_copy_scuayc.jpg`},
  {"id":"billow-black-gallery-01","pattern":"Billow","sector":"Cultural","application":"Art Installation","lighting":"Natural","color":"Deep Nocturne (Black)","mood":["artistic","dramatic","sculptural"],"keywords":["billow","black","gallery","art","scale","person"],"rgb_options":false,"description":"Monumental black Billow panel as gallery art piece — person for scale shows the dramatic 8-foot height.","image_url":`${CLOUDINARY_BASE}Billow-person-black_copy_inkiga.jpg`},
  {"id":"billow-strand-blue-01","pattern":"Billow","sector":"Hospitality","application":"Restaurant Feature","lighting":"Blue RGB Backlit","color":"Glacier White","mood":["dramatic","cool","aquatic"],"keywords":["billow","restaurant","blue","RGB","strand","staircase"],"rgb_options":true,"description":"The Strand House with blue RGB backlighting — same installation, different mood. Shows RGB versatility.","image_url":`${CLOUDINARY_BASE}billow-backlight-blue-strand-5_copy_gtdcvx.jpg`},
  {"id":"seattle-aviation-warm-01","pattern":"Seattle","sector":"Aviation","application":"Terminal Corridor","lighting":"Warm Ambient","color":"Mixed Gray/White","mood":["modern","clinical","wayfinding"],"keywords":["seattle","airport","corridor","modular","gray","aviation"],"rgb_options":false,"description":"Seattle modular tile system in an airport terminal corridor — mixed gray and white panels create visual rhythm.","image_url":`${CLOUDINARY_BASE}Seattle-V2-tile-08_copy_xeyhnc.png`},
  {"id":"seattle-healthcare-gray-01","pattern":"Seattle","sector":"Healthcare","application":"Elevator Lobby","lighting":"Ambient","color":"Dove Gray","mood":["calm","clinical","professional"],"keywords":["seattle","hospital","elevator","gray","healthcare"],"rgb_options":false,"description":"Seattle pattern in dove gray at a hospital elevator lobby — calming, professional, easy to maintain.","image_url":`${CLOUDINARY_BASE}Seattle-V2-tile-02_bvcqwc.png`},
  {"id":"seattle-corporate-gray-detail-01","pattern":"Seattle","sector":"Corporate","application":"Feature Wall","lighting":"Grazing Light","color":"Dove Gray","mood":["modern","textural","professional"],"keywords":["seattle","corporate","office","detail","gray"],"rgb_options":false,"description":"Detail shot of Seattle in corporate setting — grazing light reveals the carved texture depth.","image_url":`${CLOUDINARY_BASE}Seattle-V2-tile-02_bvcqwc.png`},
  {"id":"seattle-lab-black-01","pattern":"Seattle","sector":"Corporate","application":"Tech Corridor","lighting":"Cool Ambient","color":"Deep Nocturne (Black)","mood":["futuristic","tech","dramatic"],"keywords":["seattle","lab","tech","black","corridor"],"rgb_options":false,"description":"Seattle in black Corian for a tech lab corridor — futuristic, dramatic, high-contrast.","image_url":`${CLOUDINARY_BASE}Seattle-V2-tile-08_copy_xeyhnc.png`},
  {"id":"greatwave-restaurant-facade-01","pattern":"Great Wave","sector":"Hospitality","application":"Exterior Facade","lighting":"Evening Ambient","color":"Glacier White","mood":["iconic","artistic","dramatic"],"keywords":["great wave","facade","restaurant","exterior","evening"],"rgb_options":false,"description":"Great Wave pattern on restaurant exterior facade — evening light catches the dramatic vertical ribs.","image_url":`${CLOUDINARY_BASE}Great_Wave_banana_03_copy_herewl.png`},
  {"id":"greatwave-shower-white-01","pattern":"Great Wave","sector":"Residential","application":"Shower","lighting":"Natural","color":"Glacier White","mood":["luxurious","artistic","seamless"],"keywords":["great wave","shower","bathroom","residential","white"],"rgb_options":false,"description":"Great Wave in a luxury residential shower — seamless, no grout, dramatic yet functional.","image_url":`${CLOUDINARY_BASE}Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`},
  {"id":"greatwave-pool-exterior-01","pattern":"Great Wave","sector":"Residential","application":"Pool Wall","lighting":"Daylight","color":"Glacier White","mood":["resort","outdoor","dramatic"],"keywords":["great wave","pool","outdoor","exterior","UV"],"rgb_options":false,"description":"Great Wave as outdoor pool feature wall — UV-stable Corian handles full sun exposure.","image_url":`${CLOUDINARY_BASE}Great_Wave_banana_20_copy_abzou8.png`},
  {"id":"greatwave-indoor-pool-01","pattern":"Great Wave","sector":"Hospitality","application":"Indoor Pool","lighting":"Soft Ambient","color":"Glacier White","mood":["luxurious","calming","aquatic"],"keywords":["great wave","pool","indoor","spa","water"],"rgb_options":false,"description":"Great Wave at indoor hotel pool — soft lighting, water reflections play across the carved surface.","image_url":`${CLOUDINARY_BASE}Great_Wave_banana_09_copy_lcqfa0.png`},
  {"id":"greatwave-resort-beachfront-01","pattern":"Great Wave","sector":"Hospitality","application":"Resort Pool","lighting":"Daylight","color":"Glacier White","mood":["tropical","resort","luxurious"],"keywords":["great wave","resort","beach","pool","ocean"],"rgb_options":false,"description":"Great Wave at beachfront resort pool deck — ocean view beyond, the pattern echoing the waves.","image_url":`${CLOUDINARY_BASE}Great_Wave_banana_16_copy_ojsshm.png`},
  {"id":"brick-waterfeature-black-detail-01","pattern":"Brick","sector":"Residential","application":"Water Feature","lighting":"Natural Daylight","color":"Deep Nocturne (Black)","mood":["tropical","luxurious","textural"],"keywords":["brick","water feature","fountain","outdoor","black","tropical"],"rgb_options":false,"description":"Close detail of water cascading down Brick pattern in black — tropical poolside setting.","image_url":`${CLOUDINARY_BASE}Brick_waterfeature_05_copy_kewkyh.png`},
  {"id":"brick-waterfeature-black-goldenhour-01","pattern":"Brick","sector":"Residential","application":"Water Feature","lighting":"Golden Hour","color":"Deep Nocturne (Black)","mood":["warm","luxurious","serene"],"keywords":["brick","water feature","sunset","golden hour","black"],"rgb_options":false,"description":"Brick water feature at golden hour — sunlight catches the spray against black surface.","image_url":`${CLOUDINARY_BASE}Brick_waterfeature_18_copy_oce67r.png`},
  {"id":"brick-waterfeature-black-pool-01","pattern":"Brick","sector":"Residential","application":"Pool Water Feature","lighting":"Bright Daylight","color":"Deep Nocturne (Black)","mood":["resort","dramatic","tropical"],"keywords":["brick","pool","water feature","black","cabana"],"rgb_options":false,"description":"Monumental black Brick water feature anchoring a resort-style pool with cabanas.","image_url":`${CLOUDINARY_BASE}Brick_waterfeature_20_copy_ffh4px.png`},
  {"id":"brick-waterfeature-white-pool-01","pattern":"Brick","sector":"Residential","application":"Pool Water Feature","lighting":"Bright Daylight","color":"Glacier White","mood":["clean","modern","resort"],"keywords":["brick","pool","water feature","white","rooftop"],"rgb_options":false,"description":"Brick in white at rooftop pool — cleaner, brighter, more minimal than black version.","image_url":`${CLOUDINARY_BASE}Brick_waterfeature_27_copy_nxcqhx.png`},
  {"id":"brick-waterfeature-gray-lobby-01","pattern":"Brick","sector":"Hospitality","application":"Lobby Water Feature","lighting":"Warm Ambient + Cove","color":"Dove Gray","mood":["luxurious","sophisticated","calming"],"keywords":["brick","lobby","water feature","gray","hotel","velvet"],"rgb_options":false,"description":"Brick water feature in hotel lobby — dove gray with emerald velvet seating, brass accents.","image_url":`${CLOUDINARY_BASE}Brick_waterfeature_12_copy_gdmjok.png`},
  {"id":"marilyn-residential-living-01","pattern":"Custom Portrait","sector":"Residential","application":"Feature Wall","lighting":"Cool White Backlit","color":"Glacier White","mood":["iconic","artistic","luxurious","Hollywood"],"keywords":["portrait","custom","Marilyn","celebrity","art","backlit"],"rgb_options":true,"description":"Monumental Marilyn portrait carved into backlit Corian — floor to ceiling in luxury living room.","image_url":`${CLOUDINARY_BASE}Marilynn_sm_copy_gcvzcb.jpg`},
  {"id":"marilyn-lounge-warm-01","pattern":"Custom Portrait","sector":"Hospitality","application":"Bar/Lounge","lighting":"Warm RGB Backlit","color":"Glacier White","mood":["glamorous","nightlife","dramatic","Hollywood"],"keywords":["portrait","custom","Marilyn","bar","lounge","velvet"],"rgb_options":true,"description":"Marilyn portrait in moody lounge — warm amber backlighting, purple velvet banquettes.","image_url":`${CLOUDINARY_BASE}Maryilynn2_c71acw.png`},
  {"id":"buddha-spa-pool-warm-01","pattern":"Buddha Mandala","sector":"Hospitality","application":"Spa","lighting":"Warm Backlit","color":"Glacier White","mood":["spiritual","calming","zen","luxurious"],"keywords":["buddha","mandala","spa","pool","wellness","meditation"],"rgb_options":true,"description":"Buddha Mandala overlooking spa soaking pool — warm glow reflected in still water, teak decking.","image_url":`${CLOUDINARY_BASE}spa-_Buddha_2_zid08z.png`},
  {"id":"buddha-restaurant-rooftop-01","pattern":"Buddha Mandala","sector":"Hospitality","application":"Restaurant Patio","lighting":"Warm Backlit","color":"Glacier White","mood":["spiritual","elegant","outdoor","zen"],"keywords":["buddha","mandala","restaurant","rooftop","patio","skyline"],"rgb_options":true,"description":"Buddha Mandala at rooftop restaurant patio — city skyline beyond, string lights, dusk ambiance.","image_url":`${CLOUDINARY_BASE}Spa_Buddha_restaurant_yybtdi.png`},
  {"id":"fins-corporate-lobby-white-01","pattern":"Fins","sector":"Corporate","application":"Lobby Feature Wall","lighting":"Natural Daylight","color":"Glacier White","mood":["dynamic","modern","sculptural","organic"],"keywords":["fins","waves","lobby","corporate","reception","parametric"],"rgb_options":false,"description":"Fins at monumental lobby scale — horizontal waves, natural light casting shifting shadows throughout the day.","image_url":`${CLOUDINARY_BASE}Fins_exterior_white_gcccvq.jpg`},
  {"id":"fins-restaurant-patio-white-01","pattern":"Fins","sector":"Hospitality","application":"Restaurant Patio","lighting":"Ambient Evening","color":"Glacier White","mood":["warm","coastal","outdoor dining"],"keywords":["fins","restaurant","patio","outdoor","string lights"],"rgb_options":false,"description":"Fins on restaurant patio — deep horizontal waves catch evening light from string lights above.","image_url":`${CLOUDINARY_BASE}Fins_exterior2_lh1vlw.jpg`},
  {"id":"flame-lobby-golden-01","pattern":"Flame","sector":"Hospitality","application":"Lobby Feature Wall","lighting":"Golden Backlit","color":"Glacier White","mood":["dramatic","warm","organic","luxurious"],"keywords":["flame","lobby","backlit","golden","amber","vertical waves"],"rgb_options":true,"description":"Flame at monumental lobby scale — vertical flowing waves glowing golden amber, reflected in polished floor.","image_url":`${CLOUDINARY_BASE}Flame-_qle4y3.jpg`},
  {"id":"flame-bedroom-warm-01","pattern":"Flame","sector":"Residential","application":"Headboard Wall","lighting":"Warm White Backlit","color":"Glacier White","mood":["serene","organic","luxurious","calming"],"keywords":["flame","bedroom","headboard","backlit","residential"],"rgb_options":true,"description":"Flame as bedroom headboard wall — flowing vertical waves, warm white cove light, all-white bedding.","image_url":`${CLOUDINARY_BASE}Flamebed_yggqrp.jpg`},
  {"id":"flame-bedroom-pink-01","pattern":"Flame","sector":"Residential","application":"Headboard Wall","lighting":"Pink RGB Backlit","color":"Glacier White","mood":["romantic","playful","dramatic","nighttime"],"keywords":["flame","bedroom","headboard","pink","RGB"],"rgb_options":true,"description":"Flame headboard in pink RGB mode — same wall, completely different mood. Shows RGB versatility.","image_url":`${CLOUDINARY_BASE}Flame_pink_obxnpm.jpg`},
  {"id":"flame-bedroom-neutral-01","pattern":"Flame","sector":"Residential","application":"Headboard Wall","lighting":"Warm White Backlit","color":"Glacier White","mood":["serene","organic","natural","calming"],"keywords":["flame","bedroom","headboard","backlit","neutral"],"rgb_options":true,"description":"Flame headboard with neutral warm tones — earthier palette, sculptural mid-century lamp.","image_url":`${CLOUDINARY_BASE}Flames_qthl01.jpg`},
  {"id":"desert-sunset-product-01","pattern":"Custom Regional","sector":"General","application":"Product Display","lighting":"Warm Backlit","color":"Glacier White","mood":["southwestern","artistic","regional","custom"],"keywords":["cactus","desert","sunset","Arizona","Scottsdale","saguaro"],"rgb_options":true,"description":"Desert Sunset custom design — saguaro cactus silhouettes against radiating sunbeams. Regional storytelling.","image_url":`${CLOUDINARY_BASE}mr-render-1768082338412_copy_wqymkx.png`},
  {"id":"desert-sunset-resort-lobby-01","pattern":"Custom Regional","sector":"Hospitality","application":"Lobby Feature","lighting":"Warm Backlit","color":"Glacier White","mood":["southwestern","luxurious","regional","resort"],"keywords":["cactus","desert","hotel","lobby","Arizona","resort"],"rgb_options":true,"description":"Desert Sunset in Scottsdale-style resort lobby — connects guests to place before stepping outside.","image_url":`${CLOUDINARY_BASE}mr-render-1767989272197_copy_eka0g1.png`},
  {"id":"desert-sunset-lodge-reception-01","pattern":"Custom Regional","sector":"Hospitality","application":"Reception Wall","lighting":"Natural + Downlight","color":"Glacier White","mood":["southwestern","organic","welcoming","regional"],"keywords":["cactus","desert","reception","lodge","Arizona","succulents"],"rgb_options":false,"description":"Desert Sunset behind wooden reception desk — coffered ceiling, desert views through windows.","image_url":`${CLOUDINARY_BASE}mr-render-1768084337564_copy_k4ihhj.png`},
  {"id":"desert-sunset-museum-01","pattern":"Custom Regional","sector":"Cultural","application":"Art Installation","lighting":"Skylight","color":"Glacier White","mood":["artistic","monumental","sculptural","gallery"],"keywords":["museum","gallery","art","sculpture","desert","cactus"],"rgb_options":false,"description":"Desert Sunset as freestanding museum piece — visitors walk around, scale revealed by human figures.","image_url":`${CLOUDINARY_BASE}IzWQuibirwnFxWcm4KoFs_copy_kiypvi.png`},
  {"id":"sanddune-column-black-01","pattern":"Sand Dune","sector":"Hospitality","application":"Entry Column","lighting":"Golden Hour","color":"Deep Nocturne (Black)","mood":["sculptural","dramatic","tropical","luxurious"],"keywords":["column","curved","thermoformed","black","resort","entry"],"rgb_options":false,"description":"Sand Dune wrapped around resort entry column — black Corian thermoformed into cylinder, golden hour light.","image_url":`${CLOUDINARY_BASE}Fins_Sandune_texture_Curved_black_m1vtil.png`},
  {"id":"sanddune-onsen-waterfeature-01","pattern":"Sand Dune","sector":"Hospitality","application":"Spa Water Feature","lighting":"Natural Diffused","color":"Dove Gray","mood":["zen","calming","Japanese","organic"],"keywords":["onsen","spa","water feature","Japanese","bath","gray"],"rgb_options":false,"description":"Sand Dune water feature in Japanese onsen — water cascades down gray surface into soaking pool.","image_url":`${CLOUDINARY_BASE}mr-render-1767992780170_ufyyef.png`},
  {"id":"sanddune-spa-blue-01","pattern":"Sand Dune","sector":"Hospitality","application":"Spa Feature Wall","lighting":"Blue RGB Backlit","color":"Glacier White","mood":["calming","aquatic","luxurious","zen"],"keywords":["spa","backlit","blue","RGB","water","wellness"],"rgb_options":true,"description":"Sand Dune glowing blue in spa relaxation room — horizontal waves evoke ocean, river rocks at base.","image_url":`${CLOUDINARY_BASE}mr-render-1767989995638_copy_vtszj0.png`},
  {"id":"sanddune-spa-purple-01","pattern":"Sand Dune","sector":"Hospitality","application":"Spa Pool Wall","lighting":"Purple RGB Backlit","color":"Glacier White","mood":["luxurious","calming","dramatic","wellness"],"keywords":["spa","pool","backlit","purple","RGB","soaking"],"rgb_options":true,"description":"Sand Dune at spa pool edge — guest soaking while purple-lit waves glow behind. Shows human scale.","image_url":`${CLOUDINARY_BASE}mr-render-1767989995638_copy_vtszj0.png`}
];

const MARA_SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers explore carved Corian wall surfaces.

## WHO YOU ARE
You're warm, knowledgeable, and genuinely love design. You nerd out on both aesthetics AND construction details. You're not salesy — you're helpful and a little proud of the work.

## CRITICAL RULES

1. **ULTRA SHORT RESPONSES.** 2-3 sentences max. Say less, let them ask more.

2. **ALWAYS SHOW ONE IMAGE.** Every response must include exactly one [Image: id] tag selecting from the catalog. Pick the BEST match for what they're describing.

3. **ONE QUESTION MAX.** End with one specific follow-up question to narrow down their needs.

4. **AFTER 3-4 EXCHANGES** — Start offering specs: "Want the spec sheet?" or "I can pull pricing if you have dimensions."

5. **ONLY USE IMAGES FROM THE CATALOG.** Never invent image IDs. If nothing matches well, pick the closest and be honest.

## IMAGE SELECTION LOGIC
Match based on:
- Sector (healthcare, hospitality, corporate, residential, etc.)
- Application (lobby, spa, restaurant, shower, water feature, etc.)
- Mood (calming, dramatic, organic, zen, luxurious, etc.)
- Lighting preference (backlit, RGB, natural)
- Color (white, black, gray)
- Pattern preference if mentioned

## AVAILABLE PATTERNS
Billow, Seattle, Great Wave, Brick, Custom Portrait, Buddha Mandala, Fins, Flame, Desert Sunset (Custom Regional), Sand Dune

## PRICING (only when asked)
- Linear Collection: $25/SF
- Custom Line: $50/SF  
- Backlighting: +$15/SF
- Water features: +$20/SF

## AVAILABLE IMAGE IDS
${IMAGE_CATALOG.map(img => img.id).join(', ')}

Remember: One image, short response, one question. Keep it moving.`;

export default function MaraV6() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [showSpecs, setShowSpecs] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  const extractImageId = (text) => {
    const match = text.match(/\[Image:\s*([^\]]+)\]/);
    return match ? match[1].trim() : null;
  };

  const cleanResponse = (text) => {
    return text.replace(/\[Image:\s*[^\]]+\]/g, '').trim();
  };

  const getImageData = (id) => {
    return IMAGE_CATALOG.find(img => img.id === id);
  };

  const callClaude = async (userMessage) => {
    const newHistory = [...conversationHistory, { role: 'user', content: userMessage }];
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: MARA_SYSTEM_PROMPT,
          messages: newHistory
        })
      });

      const data = await response.json();
      
      if (data.content?.[0]?.text) {
        const fullResponse = data.content[0].text;
        const imageId = extractImageId(fullResponse);
        const cleanText = cleanResponse(fullResponse);
        
        setConversationHistory([...newHistory, { role: 'assistant', content: fullResponse }]);
        
        return { text: cleanText, imageId };
      }
      throw new Error('Invalid response');
    } catch (error) {
      console.error('API Error:', error);
      return {
        text: "I'd love to help you explore our carved wall surfaces. What kind of space are you working on?",
        imageId: 'fins-corporate-lobby-white-01'
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const response = await callClaude(userMessage);
    
    if (response.imageId) {
      const imageData = getImageData(response.imageId);
      if (imageData) {
        setCurrentImage(imageData);
      }
    }

    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: response.text,
      imageId: response.imageId
    }]);
    
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickStarts = [
    "Something calming for a spa",
    "Dramatic hotel lobby",
    "White carved wall",
    "Water feature for pool"
  ];

  return (
    <div className="h-screen bg-[#0a0a0a] text-stone-100 flex overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Left: Large Image Panel */}
      <div className="w-1/2 h-full relative flex items-center justify-center p-6">
        {currentImage ? (
          <div 
            className="w-full h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 relative group"
            onClick={() => setShowSpecs(true)}
            style={{ 
              backgroundImage: `url(${currentImage.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">{currentImage.pattern}</span>
                <span className="text-xs px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">{currentImage.sector}</span>
                {currentImage.rgb_options && (
                  <span className="text-xs px-2.5 py-1 rounded-full border bg-purple-500/20 border-purple-400/40 text-purple-300">RGB</span>
                )}
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">{currentImage.description}</p>
              <p className="text-xs text-stone-500 mt-4 flex items-center gap-1">
                <span>Click for specs</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </p>
            </div>

            {/* Top info */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-white/90 drop-shadow-lg">{currentImage.pattern}</h2>
                <p className="text-sm text-white/60 mt-1 drop-shadow">{currentImage.application}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50 drop-shadow">{currentImage.color}</p>
                <p className="text-xs text-white/50 drop-shadow">{currentImage.lighting}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center border border-stone-700/50">
              <span className="text-2xl font-light text-stone-400">M</span>
            </div>
            <h1 className="text-xl font-light text-stone-400 mb-2">MR Walls</h1>
            <p className="text-sm text-stone-600">Start a conversation to explore</p>
          </div>
        )}
      </div>

      {/* Right: Chat Panel */}
      <div className="w-1/2 h-full flex flex-col border-l border-stone-800/50 bg-[#0c0c0c]">
        
        {/* Chat Header */}
        <div className="px-5 py-4 border-b border-stone-800/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-sm font-semibold text-white">M</span>
          </div>
          <div>
            <h2 className="text-sm font-medium text-stone-200">Mara</h2>
            <p className="text-xs text-stone-500">Design Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <p className="text-stone-400 text-center mb-6 max-w-[280px] text-sm leading-relaxed">
                Hey! I'm Mara. Tell me about your project — I'll show you what's possible.
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-xs">
                {quickStarts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="text-xs px-3 py-2.5 bg-stone-800/30 hover:bg-stone-800/60 text-stone-400 hover:text-stone-200 rounded-xl transition-all border border-stone-800/50 hover:border-stone-700/50 text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%]`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-stone-700/80 text-stone-100'
                      : 'bg-stone-800/40 border border-stone-700/30'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-stone-800/40 border border-stone-700/30 rounded-2xl px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-stone-800/50">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your project..."
              disabled={loading}
              className="flex-1 px-4 py-3 bg-stone-800/30 border border-stone-700/40 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600 focus:bg-stone-800/50 disabled:opacity-50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-3 bg-stone-100 text-stone-900 rounded-xl text-sm font-medium hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Specs Modal */}
      {showSpecs && currentImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowSpecs(false)}
        >
          <div 
            className="bg-[#111] rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-800/50 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-light text-stone-100">{currentImage.pattern}</h2>
                <p className="text-xs text-stone-500 mt-1">{currentImage.application} • {currentImage.sector}</p>
              </div>
              <button 
                onClick={() => setShowSpecs(false)}
                className="text-stone-500 hover:text-stone-300 transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5">
              <p className="text-sm text-stone-400 leading-relaxed">{currentImage.description}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-800/20 rounded-xl p-3 border border-stone-800/30">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">Material</p>
                  <p className="text-sm text-stone-300">{currentImage.color}</p>
                </div>
                <div className="bg-stone-800/20 rounded-xl p-3 border border-stone-800/30">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">Lighting</p>
                  <p className="text-sm text-stone-300">{currentImage.lighting}</p>
                </div>
                <div className="bg-stone-800/20 rounded-xl p-3 border border-stone-800/30">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">RGB Options</p>
                  <p className="text-sm text-stone-300">{currentImage.rgb_options ? 'Full spectrum' : 'Not available'}</p>
                </div>
                <div className="bg-stone-800/20 rounded-xl p-3 border border-stone-800/30">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-1">Sector</p>
                  <p className="text-sm text-stone-300">{currentImage.sector}</p>
                </div>
              </div>

              {/* Mood Tags */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-2">Mood</p>
                <div className="flex flex-wrap gap-1.5">
                  {currentImage.mood.map((m, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-stone-800/30 text-stone-400 rounded-full border border-stone-700/30">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-amber-950/30 border border-amber-900/30 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-amber-600/80 mb-1">Estimated Pricing</p>
                <p className="text-lg text-amber-200/90">
                  {currentImage.pattern === 'Custom Portrait' || currentImage.pattern === 'Custom Regional' || currentImage.pattern === 'Buddha Mandala'
                    ? '$50/SF'
                    : '$25/SF'
                  }
                  <span className="text-sm text-amber-200/50 ml-2">
                    {currentImage.pattern === 'Custom Portrait' || currentImage.pattern === 'Custom Regional' || currentImage.pattern === 'Buddha Mandala'
                      ? '(Custom Line)'
                      : '(Linear)'
                    }
                  </span>
                </p>
                {currentImage.rgb_options && (
                  <p className="text-xs text-amber-200/50 mt-1">+ $15/SF for backlighting</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button className="flex-1 py-2.5 bg-stone-100 text-stone-900 rounded-xl text-sm font-medium hover:bg-white transition-colors">
                  Download Specs
                </button>
                <button className="flex-1 py-2.5 bg-stone-800/50 text-stone-300 rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors border border-stone-700/50">
                  Request CAD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
