import { useState, useRef, useEffect } from 'react';

// Cloudinary base URL
const CLOUDINARY_BASE = "https://res.cloudinary.com/dtlodxxio/image/upload";

// Corian color definitions with hex approximations for swatches
const CORIAN_COLORS = {
  "Carbon Concrete": { hex: "#3a3a3a", description: "Dark shale grey with particles" },
  "Dove": { hex: "#9a9a9a", description: "Soft warm grey" },
  "Neutral Concrete": { hex: "#b8b5b0", description: "Light concrete grey" },
  "Artista Mist": { hex: "#c5c5c5", description: "Light grey with subtle movement" },
  "Laguna": { hex: "#1e3a5f", description: "Deep blue" },
  "Verdant": { hex: "#2d4a4a", description: "Deep teal green" }
};

// Pattern families - each pattern has multiple color variants
const PATTERN_FAMILIES = {
  "Industrial Brick": {
    description: "Textured brick pattern with carved depth",
    colors: {
      "Carbon Concrete": { cloudinaryId: "Carbon_Concrete-industrial_vxloqv", sector: "Aviation", application: "Airport Terminal" },
      "Dove": { cloudinaryId: "Dove_industrial_w6jvlx", sector: "Aviation", application: "Airport Terminal" },
      "Neutral Concrete": { cloudinaryId: "Neautral_concrete-industrial_v7gbel", sector: "Aviation", application: "Airport Terminal" },
      "Artista Mist": { cloudinaryId: "Artista_Mist_Industrial_zfaemp", sector: "Aviation", application: "Airport Terminal" },
      "Laguna": { cloudinaryId: "Laguna-blue-industrial_ksz6w7", sector: "Aviation", application: "Airport Terminal" },
      "Verdant": { cloudinaryId: "Verdant_Industrial_bmkodk", sector: "Aviation", application: "Airport Terminal" }
    }
  }
};

// Build flat asset list from pattern families
const buildAssets = () => {
  const assets = [];
  Object.entries(PATTERN_FAMILIES).forEach(([pattern, data]) => {
    Object.entries(data.colors).forEach(([color, colorData]) => {
      assets.push({
        id: `${pattern.toLowerCase().replace(/\s+/g, '_')}_${color.toLowerCase().replace(/\s+/g, '_')}`,
        pattern,
        corianColor: color,
        sector: colorData.sector,
        application: colorData.application,
        cloudinaryId: colorData.cloudinaryId,
        url: `${CLOUDINARY_BASE}/${colorData.cloudinaryId}.png`,
        patternDescription: data.description
      });
    });
  });
  return assets;
};

const ASSETS = buildAssets();

// Get all color variants for a pattern
const getColorVariants = (pattern) => {
  return ASSETS.filter(a => a.pattern === pattern);
};

// Specs for display
const SPECS = {
  maxPanel: '144" × 60"',
  material: "Corian® Solid Surface",
  leadTime: "6-10 weeks",
  system: "InterlockPanel™",
  price: "$25/SF"
};

export default function MaraCorian() {
  const [msgs, setMsgs] = useState([{
    role: 'a',
    text: "Hey! I'm Mara from MR Walls. I'm excited to show you our carved Corian surfaces — available in a range of beautiful colors.",
    results: [ASSETS.find(a => a.corianColor === "Carbon Concrete"), ASSETS.find(a => a.corianColor === "Laguna")].filter(Boolean)
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const ref = useRef(null);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  // Handle image click - open family modal
  const handleImageClick = (asset) => {
    setSelectedImage(asset);
    setActiveColor(asset.corianColor);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    setActiveColor(null);
  };

  // Get current display image based on active color
  const getCurrentImage = () => {
    if (!selectedImage) return null;
    if (activeColor === selectedImage.corianColor) return selectedImage;
    const variant = ASSETS.find(a => a.pattern === selectedImage.pattern && a.corianColor === activeColor);
    return variant || selectedImage;
  };

  // Simple response logic
  const generateResponse = (userMsg) => {
    const lower = userMsg.toLowerCase();
    
    if (lower.includes('color') || lower.includes('grey') || lower.includes('gray') || lower.includes('blue') || lower.includes('green')) {
      return {
        text: "We have a range of Corian colors — from warm greys to bold blues. Tap any image to see all color options.",
        results: [
          ASSETS.find(a => a.corianColor === "Dove"),
          ASSETS.find(a => a.corianColor === "Laguna"),
          ASSETS.find(a => a.corianColor === "Carbon Concrete"),
          ASSETS.find(a => a.corianColor === "Verdant")
        ].filter(Boolean)
      };
    }
    
    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
      return {
        text: `Industrial Brick starts at ${SPECS.price}. That includes precision CNC carving and our InterlockPanel™ system — panels arrive ready to install.`,
        results: []
      };
    }

    if (lower.includes('spec') || lower.includes('technical') || lower.includes('detail')) {
      return {
        text: `Quick specs: Max panel ${SPECS.maxPanel}, ${SPECS.material}, ${SPECS.leadTime} lead time. Want me to send the full spec package?`,
        results: []
      };
    }

    if (lower.includes('dark') || lower.includes('dramatic') || lower.includes('bold')) {
      return {
        text: "For drama, Carbon Concrete or Laguna make a statement. The deep tones really show off the carved texture.",
        results: [
          ASSETS.find(a => a.corianColor === "Carbon Concrete"),
          ASSETS.find(a => a.corianColor === "Laguna")
        ].filter(Boolean)
      };
    }

    if (lower.includes('light') || lower.includes('neutral') || lower.includes('soft')) {
      return {
        text: "For softer looks, Dove and Neutral Concrete are beautiful — warm without being stark white.",
        results: [
          ASSETS.find(a => a.corianColor === "Dove"),
          ASSETS.find(a => a.corianColor === "Neutral Concrete")
        ].filter(Boolean)
      };
    }

    // Default
    return {
      text: "Here's Industrial Brick in different Corian colors. Tap any to explore the full range.",
      results: ASSETS.slice(0, 4)
    };
  };

  const send = async (t) => {
    if (!t?.trim() || loading) return;
    setInput('');
    setMsgs(m => [...m, { role: 'u', text: t }]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 500 + Math.random() * 500));

    const response = generateResponse(t);
    setMsgs(m => [...m, { role: 'a', ...response }]);
    setLoading(false);
  };

  const currentImage = getCurrentImage();
  const colorVariants = selectedImage ? getColorVariants(selectedImage.pattern) : [];

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-stone-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center text-sm font-medium">M</div>
        <div>
          <div className="font-medium">Mara</div>
          <div className="text-xs text-stone-500">MR Walls × Corian® Design</div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === 'u' ? 'flex justify-end' : 'flex justify-start'}>
            <div className="max-w-[90%]">
              <div className={`rounded-2xl px-4 py-3 ${m.role === 'u' ? 'bg-stone-700' : 'bg-stone-900 border border-stone-800'}`}>
                <div className="text-sm leading-relaxed">{m.text}</div>
              </div>
              
              {/* 2x larger images */}
              {m.results && m.results.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {m.results.map((r, j) => (
                    <button
                      key={j}
                      onClick={() => handleImageClick(r)}
                      className="block bg-stone-900 rounded-xl border border-stone-800 overflow-hidden hover:border-stone-600 hover:scale-[1.02] transition-all text-left"
                    >
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={r.url} 
                          alt={`${r.pattern} in ${r.corianColor}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-medium">{r.pattern}</div>
                        <div className="text-xs text-stone-400 mt-0.5">{r.corianColor}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div 
                            className="w-3 h-3 rounded-full border border-stone-600"
                            style={{ backgroundColor: CORIAN_COLORS[r.corianColor]?.hex }}
                          />
                          <span className="text-[10px] text-stone-500">{r.sector}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={ref} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-stone-800 flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask about colors, pricing, specs..."
          disabled={loading}
          className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm focus:outline-none focus:border-stone-500 disabled:opacity-50"
        />
        <button 
          onClick={() => send(input)} 
          disabled={loading || !input.trim()} 
          className="px-5 py-3 bg-stone-100 text-stone-900 rounded-xl font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>

      {/* Family Modal */}
      {selectedImage && currentImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div 
            className="bg-stone-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-stone-800 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Hero Image */}
            <div className="relative aspect-[16/9] bg-stone-900">
              <img 
                src={currentImage.url}
                alt={`${currentImage.pattern} in ${currentImage.corianColor}`}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-lg font-medium">{currentImage.pattern}</div>
                <div className="text-sm text-stone-300">{currentImage.corianColor}</div>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="p-4 border-b border-stone-800">
              <div className="text-xs text-stone-500 mb-3">CORIAN® COLORS</div>
              <div className="flex gap-2">
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
                      style={{ backgroundColor: CORIAN_COLORS[variant.corianColor]?.hex }}
                    />
                    <span className="text-[10px] text-stone-400 whitespace-nowrap">{variant.corianColor}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mara Panel + Specs */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 flex gap-4">
                {/* Mara guidance */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center text-xs font-medium shrink-0">M</div>
                    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3">
                      <p className="text-sm text-stone-300">
                        {activeColor === "Laguna" && "Laguna is bold — makes a real statement. Great for branding moments."}
                        {activeColor === "Carbon Concrete" && "Carbon Concrete has that industrial edge. The texture really pops against the dark background."}
                        {activeColor === "Dove" && "Dove is versatile — warm enough to feel inviting, neutral enough to work anywhere."}
                        {activeColor === "Neutral Concrete" && "Neutral Concrete reads as honest material. Architects love it."}
                        {activeColor === "Artista Mist" && "Artista Mist has subtle movement — more interesting than flat grey."}
                        {activeColor === "Verdant" && "Verdant brings nature in. The deep teal is surprisingly calming."}
                      </p>
                      <p className="text-sm text-stone-400 mt-2">See one you like? I can send specs or show you different patterns.</p>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-3 flex gap-2 ml-11">
                    <button className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-sm border border-stone-700">
                      Download Specs
                    </button>
                    <button className="px-4 py-2 bg-stone-100 text-stone-900 hover:bg-white rounded-lg text-sm font-medium">
                      Request Quote
                    </button>
                  </div>
                </div>

                {/* Specs panel */}
                <div className="w-64 shrink-0">
                  <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
                    <div className="text-xs text-stone-500 mb-3">SPECIFICATIONS</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Pattern</span>
                        <span className="text-stone-200">{currentImage.pattern}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Color</span>
                        <span className="text-stone-200">{currentImage.corianColor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Material</span>
                        <span className="text-stone-200">Corian®</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Max Panel</span>
                        <span className="text-stone-200">{SPECS.maxPanel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Lead Time</span>
                        <span className="text-stone-200">{SPECS.leadTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">System</span>
                        <span className="text-stone-200">{SPECS.system}</span>
                      </div>
                      <div className="border-t border-stone-700 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Starting</span>
                          <span className="text-lg font-medium text-stone-100">{SPECS.price}</span>
                        </div>
                      </div>
                    </div>
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
