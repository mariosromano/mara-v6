import { useState } from 'react';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload/v1768111229';

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
};

export default function MakeRealV6() {
  const [stage, setStage] = useState('configure'); // configure | generating | result
  const [pattern, setPattern] = useState(null);
  const [color, setColor] = useState(null);
  const [enhancement, setEnhancement] = useState(null);
  const [space, setSpace] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [showSpecs, setShowSpecs] = useState(false);
  const [showMara, setShowMara] = useState(false);
  const [maraInput, setMaraInput] = useState('');
  const [resultImage, setResultImage] = useState(null);

  const patterns = ['Billow', 'Great Wave', 'Fins', 'Flame', 'Seattle', 'Brick', 'Sand Dune', 'Lake'];
  
  const colors = [
    { name: 'Glacier White', hex: '#f5f5f5' },
    { name: 'Deep Nocturne', hex: '#1a1a1a' },
    { name: 'Dove Gray', hex: '#9ca3af' },
    { name: 'Concrete', hex: '#78716c' },
    { name: 'Marble', hex: '#e7e5e4' },
  ];
  
  const enhancements = [
    { name: 'Backlighting', image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png` },
    { name: 'Curvature', image: `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png` },
    { name: 'Branding', image: null },
    { name: 'Water Feature', image: `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png` },
  ];
  
  const spaces = ['Hotel Lobby', 'Spa / Wellness', 'Restaurant', 'Bedroom', 'Shower', 'Pool', 'Corporate Lobby', 'Exterior / Facade'];

  // Image mapping based on selections
  const getResultImage = () => {
    if (enhancement === 'Curvature') return `${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`;
    if (enhancement === 'Water Feature' || pattern === 'Brick') return `${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png`;
    if (pattern === 'Billow') return `${CLOUDINARY_BASE}/billow-strand-center_copy_scuayc.jpg`;
    if (pattern === 'Great Wave') return `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`;
    if (pattern === 'Flame') return `${CLOUDINARY_BASE}/Flame_pink_obxnpm.jpg`;
    if (pattern === 'Seattle') return `${CLOUDINARY_BASE}/Seattle-V2-tile-08_copy_xeyhnc.png`;
    if (pattern === 'Fins') return `${CLOUDINARY_BASE}/Fins_exterior_white_gcccvq.jpg`;
    if (pattern === 'Sand Dune') return `${CLOUDINARY_BASE}/mr-render-1767989995638_copy_vtszj0.png`;
    return `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`;
  };

  const handleGenerate = () => {
    setStage('generating');
    setResultImage(getResultImage());
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
  };

  const handleIterate = (change) => {
    if (change === 'backlight') {
      setEnhancement('Backlighting');
      setResultImage(`${CLOUDINARY_BASE}/Brick_waterfeature_18_copy_oce67r.png`);
    }
    if (change === 'black') {
      setColor('Deep Nocturne');
      setResultImage(`${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`);
    }
    if (change === 'curved') {
      setEnhancement('Curvature');
      setResultImage(`${CLOUDINARY_BASE}/Fins_Sandune_texture_Curved_black_m1vtil.png`);
    }
    if (change === 'exterior') setSpace('Exterior / Facade');
    setStage('generating');
    setTimeout(() => setStage('result'), 1500);
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
    return PATTERN_DATA[pattern] || { maxSize: '144" × 60"', standardPanels: '48" × 96"', minOrder: '32 SF' };
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

        {/* Main - Full Width */}
        <main className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full">
          
          {/* Prompt Input - More Visible */}
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

          {/* Options Grid - Better Use of Width */}
          <div className="grid grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Pattern */}
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

              {/* Color */}
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
              {/* Enhancement */}
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

              {/* Space */}
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

  // Result Stage - NO PRICE shown here
  if (stage === 'result') {
    const patternData = getPatternData();
    const price = getPrice();
    
    return (
      <div className="min-h-screen bg-black text-stone-100 flex flex-col" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        
        {/* Full Image - Clickable */}
        <div 
          className="flex-1 relative cursor-pointer group"
          style={{ minHeight: '65vh' }}
          onClick={() => setShowSpecs(true)}
        >
          {/* Real image */}
          <div className="absolute inset-0">
            <img 
              src={resultImage} 
              alt={pattern || 'Generated wall'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </div>
          
          {/* Click hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <div className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-stone-700">
              <span className="text-sm text-stone-200">Click for specs & details</span>
            </div>
          </div>
          
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start">
            <button 
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              className="flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-stone-700/50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              New design
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">M</span>
            </div>
          </div>

          {/* Bottom info overlay - NO PRICE */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-light text-white mb-3">{pattern || 'Custom Design'}</h1>
                <div className="flex flex-wrap gap-2">
                  {color && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{color}</span>}
                  {enhancement && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{enhancement}</span>}
                  {space && <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">{space}</span>}
                </div>
              </div>
              {/* Size info instead of price - feels buildable */}
              <div className="text-right">
                <p className="text-xs text-stone-500 mb-1">Max Panel Size</p>
                <p className="text-xl text-white font-light">{patternData.maxSize}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-stone-900">
          
          {/* Iteration chips */}
          <div className="mb-5">
            <p className="text-xs text-stone-500 mb-3">Not quite? Try:</p>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleIterate('backlight')}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800"
              >
                Add backlighting
              </button>
              <button 
                onClick={() => handleIterate('black')}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800"
              >
                Try black
              </button>
              <button 
                onClick={() => handleIterate('curved')}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800"
              >
                Add curvature
              </button>
              <button 
                onClick={() => handleIterate('exterior')}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800"
              >
                Exterior version
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-800"
              >
                Different pattern
              </button>
            </div>
          </div>

          {/* Main actions */}
          <div className="flex gap-3">
            <button 
              onClick={() => setShowSpecs(true)}
              className="flex-1 py-3.5 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
            >
              <span>📐</span> Get Specs
            </button>
            <button 
              onClick={() => setShowMara(true)}
              className="flex-1 py-3.5 bg-stone-900 text-stone-200 rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors border border-stone-800 flex items-center justify-center gap-2"
            >
              <span>💬</span> Ask Mara
            </button>
            <button className="py-3.5 px-5 bg-stone-900 text-stone-400 rounded-xl text-sm hover:bg-stone-800 hover:text-rose-400 transition-colors border border-stone-800">
              ♥
            </button>
          </div>

        </div>

        {/* Specs Modal - WITH SIZES */}
        {showSpecs && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowSpecs(false)}
          >
            <div 
              className="bg-stone-950 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-stone-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-stone-800 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-light text-stone-100">{pattern || 'Custom Design'}</h2>
                  <p className="text-xs text-stone-500 mt-1">{space || 'Feature Wall'}</p>
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
                
                {/* Size Specs - NEW */}
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

                {/* Specs Grid */}
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

                {/* Technical Specs */}
                <div className="bg-stone-900/50 rounded-xl p-4 border border-stone-800">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600 mb-3">Technical</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Material</span>
                      <span className="text-stone-300">DuPont Corian®</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Fire Rating</span>
                      <span className="text-stone-300">Class A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Seam Tolerance</span>
                      <span className="text-stone-300">1/32"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Thickness</span>
                      <span className="text-stone-300">12mm</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-rose-950/40 border border-rose-900/40 rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-wider text-rose-400/70 mb-2">Pricing</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-400">Base ({color || 'Glacier White'})</span>
                      <span className="text-stone-200">$50/SF</span>
                    </div>
                    {enhancement === 'Backlighting' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Backlighting</span>
                        <span className="text-stone-200">+$50/SF</span>
                      </div>
                    )}
                    {enhancement === 'Water Feature' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Water Feature</span>
                        <span className="text-stone-200">+$20/SF</span>
                      </div>
                    )}
                    {enhancement === 'Curvature' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Curvature</span>
                        <span className="text-stone-200">+$25/SF</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-2 border-t border-stone-800 mt-2">
                      <span className="text-stone-300 font-medium">Total</span>
                      <span className="text-rose-300 font-medium">${price}/SF</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-stone-100 transition-colors">
                    Download Spec Sheet
                  </button>
                  <button className="flex-1 py-3 bg-stone-800 text-stone-200 rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors border border-stone-700">
                    Request Custom Size
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ask Mara Modal */}
        {showMara && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-end justify-center p-6"
            onClick={() => setShowMara(false)}
          >
            <div 
              className="bg-stone-950 rounded-2xl w-full max-w-2xl border border-stone-800 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mara Header */}
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
                <button 
                  onClick={() => setShowMara(false)}
                  className="text-stone-500 hover:text-stone-300 transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Area */}
              <div className="p-4 min-h-[200px]">
                <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 max-w-[80%]">
                  <p className="text-sm text-stone-300">
                    Hey! I see you're looking at {pattern || 'a custom design'}{enhancement ? ` with ${enhancement.toLowerCase()}` : ''}.
                    What questions do you have? I can help with technical specs, custom sizes, lead times, or design alternatives.
                  </p>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-stone-800">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={maraInput}
                    onChange={(e) => setMaraInput(e.target.value)}
                    placeholder="Ask about specs, sizing, alternatives..."
                    className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600"
                  />
                  <button className="px-5 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-stone-100 transition-colors">
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
