import React, { useState, useRef, useEffect } from 'react';

// ============================================
// MARA V15 - MR WALLS AI DESIGN ASSISTANT
// ============================================
// "The only AI that shows you what you can actually build."

// ⚠️ FAL API KEY
const FAL_API_KEY = "3e417ede-cd4b-4b81-8116-2684760b5a70:2e1ad6ff3d9d2a171a31d6ebc2612073";

// LoRA Models Configuration
const LORA_MODELS = {
  lake: {
    name: 'Lake',
    trigger: 'mrlake',
    url: 'https://v3.fal.media/files/b/0a87e361/Tc4UZShpbQ9FmneXxjoc4_pytorch_lora_weights.safetensors',
    scale: 1.0,
    status: 'ready', // Production ready
    description: 'Concentric ripples radiating outward, horizontal wave ridges',
    reliability: 'High — 1-3 generations',
    patternDescription: 'carved white Corian horizontal wave ridges'
  },
  flame: {
    name: 'Flame',
    trigger: 'mrflame',
    url: 'https://v3.fal.media/files/b/0a883628/Iyraeb6tJunafTQ8q_i5N_pytorch_lora_weights.safetensors',
    scale: 1.3,
    status: 'internal', // Internal only
    description: 'Flowing vertical waves that interweave and cross, varying widths',
    reliability: 'Low — ~15 generations needed',
    patternDescription: 'carved white Corian flowing vertical waves interweaving'
  },
  fins: {
    name: 'Fins',
    trigger: 'fnptrn',
    url: 'https://v3.fal.media/files/b/0a87f1e6/mBUGXAbUMaM1wWFhzhI9g_pytorch_lora_weights.safetensors',
    scale: 1.0,
    status: 'untested', // Needs testing
    description: 'Diamond chevron fins with radiating parallel ridges',
    reliability: 'Unknown — untested',
    patternDescription: 'carved white Corian diamond chevron fins'
  }
};

// Sectors and Applications
const SECTORS = {
  healthcare: {
    name: 'Healthcare',
    applications: ['Lobby', 'Elevator Lobby', 'Patient Room', 'Meditation Room', 'MRI Suite']
  },
  corporate: {
    name: 'Corporate',
    applications: ['Reception', 'Elevator Lobby', 'Boardroom', 'Executive Office']
  },
  hospitality: {
    name: 'Hospitality',
    applications: ['Hotel Lobby', 'Restaurant', 'Bar', 'Spa', 'Casino']
  },
  residential: {
    name: 'Residential',
    applications: ['Living Room', 'Bathroom', 'Fireplace', 'Water Feature', 'Shower']
  }
};

// Prompt Templates
const PROMPT_TEMPLATES = {
  healthcare: {
    'Lobby': 'Grand modern hospital atrium lobby with double height glass curtain walls, sweeping curved reception desk, monumental floor to ceiling backlit feature wall with {pattern}, warm white translucent glow, polished concrete floors, indoor trees, natural daylight flooding in, Cedars-Sinai scale, hyperrealistic healthcare architecture photography',
    'Elevator Lobby': 'Hospital elevator lobby with curved thermoformed walls wrapping around two elevator doors with bronze frames, {pattern}, warm amber wash lighting, LED cove light strip following curved ceiling line, polished stone floor, immersive sculptural healthcare interior, architectural photography',
    'Patient Room': 'Upscale hospital patient suite with comfortable bed, backlit headboard wall with {pattern}, soft warm glow, boutique hotel aesthetic, wood grain accents, armchair for visitors, large window with garden view, natural daylight, healing hospitality design',
    'Meditation Room': 'Hospital meditation and prayer room, floor to ceiling backlit feature wall with {pattern}, soft warm amber glow, wooden bench seating, peaceful spiritual atmosphere, healthcare wellness design',
    'MRI Suite': 'Modern MRI suite with calming backlit feature wall featuring {pattern}, soft blue-white glow, metal-free construction, patient-focused healing environment'
  },
  corporate: {
    'Reception': 'Modern corporate headquarters lobby with floor to ceiling feature wall featuring {pattern}, grazing light revealing sculptural depth, polished concrete floor, reception desk, architectural photography',
    'Elevator Lobby': 'Corporate elevator lobby with stainless steel elevator doors, floor to ceiling backlit translucent wall with {pattern} glowing from behind, RGB LED backlighting transitioning colors, commercial office interior photography',
    'Boardroom': 'Executive boardroom with dramatic feature wall of {pattern}, warm ambient lighting, polished conference table, leather chairs, sophisticated corporate interior',
    'Executive Office': 'Corner executive office with floor to ceiling windows, accent wall featuring {pattern} with subtle grazing light, modern desk, city views'
  },
  hospitality: {
    'Hotel Lobby': 'Luxury hotel lobby with soaring ceilings, monumental backlit feature wall with {pattern}, warm golden glow, marble floors, designer furniture, dramatic arrival experience',
    'Restaurant': 'Upscale restaurant interior with feature wall of {pattern}, warm ambient lighting, intimate dining atmosphere, fine dining setting',
    'Bar': 'High-end bar with dramatic backlit wall featuring {pattern}, RGB color-changing lighting, polished bar top, moody sophisticated atmosphere',
    'Spa': 'Luxury spa reception with calming feature wall of {pattern}, soft diffused backlighting, tranquil wellness environment, natural materials',
    'Casino': 'Casino interior with dramatic wall installation featuring {pattern}, dynamic RGB backlighting, high-energy entertainment environment'
  },
  residential: {
    'Living Room': 'Contemporary living room with floor to ceiling backlit feature wall featuring {pattern} surrounding linear gas fireplace, warm amber glow, sectional sofa, hardwood floors, residential interior design',
    'Bathroom': 'Luxury residential primary bathroom with seamless {pattern} walls, frameless glass enclosure, freestanding soaking tub, natural daylight from skylight, marble floor, spa-like atmosphere',
    'Fireplace': 'Modern fireplace surround with dramatic {pattern}, subtle grazing light, contemporary living space, warm intimate atmosphere',
    'Water Feature': 'Luxury residential backyard with carved Corian water feature wall, {pattern} with water cascading down surface, LED backlighting glowing through water, pool reflection, landscape architecture',
    'Shower': 'Seamless luxury shower with {pattern} walls, frameless glass, rainfall showerhead, spa-like residential bathroom'
  }
};

// Backlight Colors
const BACKLIGHT_COLORS = {
  warm: { name: 'Warm Golden', phrase: 'warm golden LED backlighting' },
  cool: { name: 'Cool White', phrase: 'cool white LED backlighting' },
  pink: { name: 'Pink', phrase: 'pink LED backlighting' },
  blue: { name: 'Blue', phrase: 'cool blue LED backlighting' },
  cyan: { name: 'Cyan', phrase: 'cyan LED backlighting' },
  purple: { name: 'Purple', phrase: 'purple LED backlighting' }
};

// Design Knowledge for Mara
const DESIGN_KNOWLEDGE = {
  collections: {
    organic: { 
      name: 'Organic', 
      patterns: ['Billow', 'Lake', 'Reeds', 'Nazare', 'Feathers', 'Miami'],
      description: 'Flowing, nature-inspired forms — evokes water, wind, natural movement'
    },
    calm: { 
      name: 'Calm', 
      patterns: ['Clouds', 'Palisades', 'Lake', 'Mountain'],
      description: 'Subtle, meditative textures that create serenity'
    },
    geometric: { 
      name: 'Geometric', 
      patterns: ['Topo', 'Honey', 'Herringbone', 'Chicago'],
      description: 'Structured patterns with mathematical precision'
    },
    futuristic: { 
      name: 'Futuristic', 
      patterns: ['Custom', 'Silverstone', 'Matrix'],
      description: 'Bold, innovative designs for forward-thinking spaces'
    },
    biophilic: { 
      name: 'Biophilic', 
      patterns: ['Honey', 'Reeds', 'Billow', 'Feathers'],
      description: 'Nature-connected patterns supporting wellness design'
    },
    classic: { 
      name: 'Classic', 
      patterns: ['Herringbone', 'Topo', 'Feathers', 'Reeds'],
      description: 'Timeless patterns with enduring appeal'
    }
  },
  pricing: {
    linear: '$25/SF',
    custom: '$50/SF',
    backlighting: '+$15/SF',
    waterFeature: '+$20/SF',
    volumeDiscount: '~15% off for 2000+ SF'
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function MaraV15() {
  // Navigation state
  const [currentView, setCurrentView] = useState('intro'); // intro, chat, library, generate
  const [showMara, setShowMara] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // AI Generate state
  const [selectedPattern, setSelectedPattern] = useState('lake');
  const [selectedSector, setSelectedSector] = useState('healthcare');
  const [selectedApplication, setSelectedApplication] = useState('Lobby');
  const [selectedBacklight, setSelectedBacklight] = useState('warm');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generationError, setGenerationError] = useState(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // ============================================
  // AI IMAGE GENERATION
  // ============================================
  
  const buildPrompt = () => {
    const model = LORA_MODELS[selectedPattern];
    const template = PROMPT_TEMPLATES[selectedSector]?.[selectedApplication];
    const backlight = BACKLIGHT_COLORS[selectedBacklight];
    
    if (customPrompt.trim()) {
      // User provided custom prompt - append trigger word
      return `${customPrompt.trim()}, ${model.trigger}`;
    }
    
    if (template) {
      // Use template with pattern and backlight
      let prompt = template.replace('{pattern}', model.patternDescription);
      prompt = `${prompt}, ${backlight.phrase}, ${model.trigger}`;
      return prompt;
    }
    
    // Fallback basic prompt
    return `Architectural interior with floor to ceiling feature wall featuring ${model.patternDescription}, ${backlight.phrase}, professional architecture photography, ${model.trigger}`;
  };
  
  const generateImage = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImage(null);
    
    const model = LORA_MODELS[selectedPattern];
    const prompt = buildPrompt();
    
    console.log('Generating with prompt:', prompt);
    console.log('Using LoRA:', model.name, model.url);
    
    try {
      const response = await fetch('https://queue.fal.run/fal-ai/flux-2/lora', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${FAL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
          loras: [
            {
              path: model.url,
              scale: model.scale
            }
          ],
          image_size: 'landscape_16_9',
          num_images: 1,
          output_format: 'jpeg',
          guidance_scale: 2.5,
          num_inference_steps: 28,
          enable_safety_checker: false
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.images && result.images.length > 0) {
        setGeneratedImage({
          url: result.images[0].url,
          prompt: prompt,
          pattern: model.name,
          sector: selectedSector,
          application: selectedApplication
        });
      } else {
        throw new Error('No image returned from API');
      }
    } catch (error) {
      console.error('Generation error:', error);
      setGenerationError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // ============================================
  // MARA CHAT RESPONSES
  // ============================================
  
  const getMaraResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Greetings
    if (msg.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
      return "Hello! I'm Mara, your MR Walls design guide. Everything I show you — we can build. Shop drawings, CNC files, production-ready.\n\nWhat brings you here today? Are you exploring ideas for a specific project, or just seeing what's possible?";
    }
    
    // What is MR Walls
    if (msg.includes('what is mr walls') || msg.includes('who is mr walls') || msg.includes('tell me about mr walls')) {
      return "MR Walls is DuPont Corian's exclusive North American partner for architectural wall surfaces. We've completed over 1,000 projects — LAX, Wynn Casino, Mercedes F1 HQ, Cedars-Sinai, SpaceX.\n\nWhat makes us different: our patented InterlockPanel™ system creates truly seamless walls at any scale. No grout lines. No visible joints. And they can be backlit.\n\nAre you working on a project, or exploring what's possible?";
    }
    
    // Pricing
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('pricing')) {
      return "Our pricing framework:\n\n• **Linear Collection**: $25/SF — repeatable patterns, installs like tile\n• **Custom Line**: $50/SF — non-repetitive sculptural surfaces, includes shop drawings\n• **Backlighting**: +$15/SF\n• **Water features**: +$20/SF\n• **Volume (2000+ SF)**: ~15% discount\n\nFor context, premium tile systems often reach $40-60/SF installed when you factor substrate, waterproofing, grouting, and ongoing maintenance. We're competitive — and zero maintenance.\n\nWhat size wall are you thinking about?";
    }
    
    // Collections
    if (msg.includes('collection') || msg.includes('patterns') || msg.includes('designs')) {
      return "We organize our patterns into collections based on feeling:\n\n• **Organic** — Billow, Lake, Reeds, Nazare, Feathers. Flowing, nature-inspired forms.\n• **Calm** — Clouds, Palisades, Mountain. Subtle, meditative textures.\n• **Geometric** — Topo, Honey, Herringbone. Mathematical precision.\n• **Biophilic** — Honey, Reeds, Billow. Nature-connected wellness design.\n• **Classic** — Herringbone, Topo, Feathers. Timeless appeal.\n\nWhat feeling are you going for in your space?";
    }
    
    // Backlighting
    if (msg.includes('backlight') || msg.includes('back light') || msg.includes('glow') || msg.includes('illuminat')) {
      return "Backlighting is our signature capability — the carved surface becomes luminous.\n\n**How it works:** LED strips mount 3\" behind the panel. Light transmits through the thinner carved areas. Deeper cuts = more light = brighter glow.\n\n**Options:**\n• Static white\n• Tunable CCT (2700K-6500K)\n• RGB color-changing\n• Programmable scenes\n\n**Best patterns for backlighting:** Billow, Lake, Clouds, Palisades, Honey, Feathers.\n\nWant to see what backlit Lake looks like in your sector? Try the AI Generate feature.";
    }
    
    // Healthcare
    if (msg.includes('healthcare') || msg.includes('hospital') || msg.includes('medical') || msg.includes('clinic')) {
      return "Healthcare is where we shine — over 40 projects, including Cedars-Sinai, Jefferson Health, Toronto General, and Hoag Hospital.\n\n**Why architects specify us for healthcare:**\n• Non-porous Corian meets infection control standards\n• No grout lines = nothing to harbor bacteria\n• Cleanable with hospital disinfectants\n• Metal-free options for MRI suites\n• Therapeutic aesthetics support healing\n\n**Popular patterns:** Clouds for patient rooms, Mountain for lobbies, Palisades for behavioral health.\n\nWhat type of healthcare space are you designing?";
    }
    
    // Lake pattern
    if (msg.includes('lake')) {
      return "Lake is one of our most popular patterns — concentric ripples radiating outward, like a stone dropped in still water.\n\n• **Carve depth:** 1/4\"\n• **Backlight rating:** Excellent — the rings glow beautifully\n• **Best at:** 6'+ width to show full ripple pattern\n• **Perfect for:** Focal walls, water features, meditation spaces\n\nLake is also our most reliable AI-trained pattern. Want to generate a visualization of Lake in your space? Try the AI Generate feature — it's ready for client presentations.";
    }
    
    // AI Generate
    if (msg.includes('generate') || msg.includes('visualiz') || msg.includes('render') || msg.includes('ai image')) {
      return "Our AI Generate feature uses custom-trained models to show you what we can actually build. Unlike Midjourney or DALL-E, every image has CNC files behind it.\n\n**Currently available:**\n• **Lake** ✅ — Production ready, client-facing quality\n• **Flame** ⚠️ — Internal concepting only\n• **Fins** 🔄 — Being tested\n\nTry it now — select AI Generate in the navigation above. No email required. Generate as many as you want.";
    }
    
    // Technical / InterlockPanel
    if (msg.includes('interlock') || msg.includes('technical') || msg.includes('install') || msg.includes('spec')) {
      return "**InterlockPanel™ Technology** (US Patent 11,899,418 B2)\n\nOur patented puzzle-piece joining system:\n• Panels interlock with CNC precision (±1/64\")\n• Seams filled with color-matched adhesive (1/32\")\n• Overall tolerance: ±1/16\" across full installation\n• Install rate: ~300 SF/day — 40% faster than tile\n• Zero field cutting — panels arrive ready to fit\n\n**Mounting options:**\n• 100% silicone: Up to 13' height\n• Concealed screws: Over 13'\n• French cleat: Exterior/facade\n\n**Clearances:** 3\" minimum for backlighting\n\nWant me to go deeper on any specs?";
    }
    
    // Default response
    return "I'm here to help you explore MR Walls for your project. I can discuss:\n\n• **Patterns & Collections** — what feeling fits your space\n• **Backlighting** — how we make walls glow\n• **Technical specs** — InterlockPanel system, materials, durability\n• **Sector guidance** — healthcare, hospitality, corporate, residential\n• **Pricing** — when you're ready\n\nOr try our **AI Generate** feature to see patterns in architectural contexts. What interests you?";
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate thinking delay
    setTimeout(() => {
      const response = getMaraResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };
  
  // ============================================
  // RENDER FUNCTIONS
  // ============================================
  
  // Intro Screen - Centered Mara Opening
  const renderIntro = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col items-center justify-center px-6">
      {/* Mara Avatar */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-8 shadow-lg">
        <span className="text-white text-3xl font-light">M</span>
      </div>
      
      {/* Opening Message */}
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-light text-stone-800 mb-4">
          I'm Mara, your MR Walls design guide.
        </h1>
        <p className="text-lg text-stone-600 mb-2">
          Everything I show you — we can build.
        </p>
        <p className="text-stone-500 mb-8">
          Shop drawings. CNC files. Production-ready.
        </p>
        
        {/* Tagline */}
        <p className="text-sm text-amber-600 font-medium mb-12">
          The only AI that shows you what you can actually build.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setCurrentView('chat');
              setMessages([{
                role: 'assistant',
                content: "Hello! I'm Mara. What kind of project are you working on? I can help you explore patterns, discuss applications, or visualize ideas."
              }]);
            }}
            className="px-8 py-4 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
          >
            Chat with Mara
          </button>
          <button
            onClick={() => setCurrentView('generate')}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            AI Generate
          </button>
          <button
            onClick={() => setCurrentView('library')}
            className="px-8 py-4 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
          >
            Ready to Spec
          </button>
        </div>
      </div>
      
      {/* Subtle scroll hint */}
      <div className="absolute bottom-8 text-stone-400 text-sm">
        Powered by MR Walls • DuPont Corian Partner
      </div>
    </div>
  );
  
  // Navigation Header
  const renderHeader = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => setCurrentView('intro')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">M</span>
          </div>
          <span className="font-semibold text-stone-800">MR Walls</span>
        </button>
        
        {/* Nav */}
        <nav className="flex gap-1">
          <button
            onClick={() => {
              setCurrentView('chat');
              if (messages.length === 0) {
                setMessages([{
                  role: 'assistant',
                  content: "Hello! I'm Mara. What kind of project are you working on?"
                }]);
              }
            }}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'chat' 
                ? 'bg-stone-100 text-stone-900' 
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setCurrentView('library')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'library' 
                ? 'bg-stone-100 text-stone-900' 
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Ready to Spec
          </button>
          <button
            onClick={() => setCurrentView('generate')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'generate' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                : 'text-amber-600 hover:bg-amber-50'
            }`}
          >
            ✨ AI Generate
          </button>
        </nav>
        
        {/* Mara Toggle */}
        <button
          onClick={() => setShowMara(!showMara)}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
            showMara 
              ? 'border-amber-400 bg-amber-50 text-amber-700' 
              : 'border-stone-200 text-stone-600 hover:border-stone-300'
          }`}
        >
          {showMara ? 'Hide Mara' : 'Ask Mara'}
        </button>
      </div>
    </header>
  );
  
  // Chat View
  const renderChat = () => (
    <div className="pt-16 min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Messages */}
        <div className="space-y-6 pb-32">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-medium">M</span>
                </div>
              )}
              <div className={`max-w-xl rounded-2xl px-4 py-3 ${
                msg.role === 'user' 
                  ? 'bg-stone-800 text-white' 
                  : 'bg-white border border-stone-200 text-stone-800'
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content.split('**').map((part, j) => 
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-3">
                <span className="text-white text-xs font-medium">M</span>
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4">
          <div className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Mara about patterns, pricing, applications..."
              className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-stone-800 text-white rounded-xl hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Ready to Spec Library (placeholder)
  const renderLibrary = () => (
    <div className="pt-16 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-stone-800 mb-4">Ready to Spec</h2>
          <p className="text-stone-600">Pre-designed panels. Instant pricing. Shop drawings included.</p>
        </div>
        
        {/* Placeholder for library */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Lake', 'Billow', 'Clouds', 'Topo', 'Honey', 'Reeds'].map((pattern) => (
            <div key={pattern} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                <span className="text-stone-400 text-lg">{pattern} Preview</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-stone-800 mb-1">{pattern}</h3>
                <p className="text-sm text-stone-500 mb-3">Linear Collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-600 font-medium">$25/SF</span>
                  <button className="text-sm text-stone-600 hover:text-stone-900">View Sizes →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-stone-500 mb-4">Full library coming soon with 30+ patterns and instant quotes.</p>
          <button 
            onClick={() => setCurrentView('generate')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600"
          >
            Try AI Generate Instead →
          </button>
        </div>
      </div>
    </div>
  );
  
  // AI Generate View
  const renderGenerate = () => (
    <div className="pt-16 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-stone-800 mb-2">AI Generate</h2>
          <p className="text-stone-600">See MR Walls patterns in your context. Every image is buildable.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h3 className="font-medium text-stone-800 mb-6">Configure Your Visualization</h3>
            
            {/* Pattern Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">Pattern</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(LORA_MODELS).map(([key, model]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPattern(key)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      selectedPattern === key
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs mt-1 text-stone-500">
                      {model.status === 'ready' && '✅ Ready'}
                      {model.status === 'internal' && '⚠️ Internal'}
                      {model.status === 'untested' && '🔄 Testing'}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-2">{LORA_MODELS[selectedPattern].description}</p>
            </div>
            
            {/* Sector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">Sector</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(SECTORS).map(([key, sector]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedSector(key);
                      setSelectedApplication(sector.applications[0]);
                    }}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      selectedSector === key
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {sector.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Application */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">Application</label>
              <select
                value={selectedApplication}
                onChange={(e) => setSelectedApplication(e.target.value)}
                className="w-full p-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {SECTORS[selectedSector].applications.map((app) => (
                  <option key={app} value={app}>{app}</option>
                ))}
              </select>
            </div>
            
            {/* Backlight Color */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">Backlight Color</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(BACKLIGHT_COLORS).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedBacklight(key)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                      selectedBacklight === key
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Custom Prompt (Advanced) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Custom Prompt <span className="text-stone-400 font-normal">(optional - overrides presets)</span>
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe your vision... or leave blank to use preset."
                className="w-full p-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400 h-24 resize-none"
              />
            </div>
            
            {/* Generate Button */}
            <button
              onClick={generateImage}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Generating...
                </span>
              ) : (
                '✨ Generate Image'
              )}
            </button>
          </div>
          
          {/* Preview/Result */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h3 className="font-medium text-stone-800 mb-4">Preview</h3>
            
            {generationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700 text-sm">{generationError}</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="aspect-video bg-stone-100 rounded-lg flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-stone-500">Generating your visualization...</p>
                <p className="text-xs text-stone-400 mt-1">This takes about 10-20 seconds</p>
              </div>
            )}
            
            {!isGenerating && !generatedImage && (
              <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <p className="text-stone-500">Configure settings and click Generate</p>
                <p className="text-xs text-stone-400 mt-1">
                  {LORA_MODELS[selectedPattern].name} • {SECTORS[selectedSector].name} • {selectedApplication}
                </p>
              </div>
            )}
            
            {generatedImage && !isGenerating && (
              <div>
                <div className="relative aspect-video bg-stone-100 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={generatedImage.url} 
                    alt="Generated visualization"
                    className="w-full h-full object-cover"
                  />
                  {/* Watermark */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded">
                    MR Walls • Buildable
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={generatedImage.url}
                    download={`mrwalls-${generatedImage.pattern}-${Date.now()}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 border border-stone-200 rounded-lg text-center text-stone-700 hover:bg-stone-50 transition-colors"
                  >
                    Download
                  </a>
                  <button
                    onClick={generateImage}
                    className="flex-1 py-3 border border-amber-400 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    Generate Again
                  </button>
                </div>
                
                {/* Details */}
                <div className="mt-4 p-4 bg-stone-50 rounded-lg text-sm">
                  <p className="font-medium text-stone-700 mb-2">Generation Details</p>
                  <p className="text-stone-500">Pattern: {generatedImage.pattern}</p>
                  <p className="text-stone-500">Context: {SECTORS[generatedImage.sector].name} — {generatedImage.application}</p>
                </div>
                
                {/* CTA */}
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 font-medium mb-1">Ready to build this?</p>
                  <p className="text-amber-700 text-sm">Every image has CNC files behind it. Contact us for shop drawings and pricing.</p>
                  <button className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm">
                    Request Quote
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Help from Mara */}
        <div className="mt-8 text-center">
          <p className="text-stone-500 text-sm">
            Questions about AI generation? The images you create are buildable.{' '}
            <button 
              onClick={() => {
                setCurrentView('chat');
                setMessages([{
                  role: 'assistant',
                  content: "I see you're exploring AI Generate! These aren't just pretty pictures — every visualization has CNC files behind it. What would you like to know about the patterns or how we can build them for your project?"
                }]);
              }}
              className="text-amber-600 hover:underline"
            >
              Ask Mara
            </button>
          </p>
        </div>
      </div>
    </div>
  );
  
  // Floating Mara (when showMara is true on other views)
  const renderFloatingMara = () => {
    if (!showMara || currentView === 'intro' || currentView === 'chat') return null;
    
    return (
      <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-stone-200 z-50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-sm font-medium">M</span>
            </div>
            <span className="text-white font-medium">Mara</span>
          </div>
          <button 
            onClick={() => setShowMara(false)}
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {/* Mini Chat */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-stone-500 text-sm">
              Ask me anything about MR Walls, patterns, pricing, or your project.
            </div>
          ) : (
            messages.slice(-4).map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block rounded-lg px-3 py-2 max-w-xs ${
                  msg.role === 'user' 
                    ? 'bg-stone-800 text-white' 
                    : 'bg-stone-100 text-stone-800'
                }`}>
                  {msg.content.substring(0, 150)}{msg.content.length > 150 ? '...' : ''}
                </div>
              </div>
            ))
          )}
          {isTyping && (
            <div className="flex gap-1 px-3 py-2 bg-stone-100 rounded-lg w-16">
              <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{animationDelay:'150ms'}}></div>
              <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{animationDelay:'300ms'}}></div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="border-t border-stone-200 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Mara..."
              className="flex-1 px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-3 py-2 bg-stone-800 text-white rounded-lg text-sm disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // ============================================
  // MAIN RENDER
  // ============================================
  
  return (
    <div className="font-sans antialiased">
      {currentView !== 'intro' && renderHeader()}
      
      {currentView === 'intro' && renderIntro()}
      {currentView === 'chat' && renderChat()}
      {currentView === 'library' && renderLibrary()}
      {currentView === 'generate' && renderGenerate()}
      
      {renderFloatingMara()}
    </div>
  );
}
