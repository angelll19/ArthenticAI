
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_CARDS } from '../data/mockData';
import { CardData } from '../types';

interface LibraryViewProps {
  onBack: () => void;
  onSelectCard: (card: CardData) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ onBack, onSelectCard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const styles = ['Chic', 'Bold', 'Minimalist', 'Abstract'];
  const vibes = ['Calm', 'Focus', 'Energy', 'Intimate'];
  const mediums = ['Oil', 'Acrylic', 'Enamel', 'Tempera'];

  const filteredCards = useMemo(() => {
    return MOCK_CARDS.filter(card => {
      const matchesSearch = 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.medium.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(card.style);
      const matchesVibe = selectedVibes.length === 0 || selectedVibes.includes(card.vibe);
      const matchesMedium = selectedMediums.length === 0 || selectedMediums.some(m => card.medium.includes(m));

      return matchesSearch && matchesStyle && matchesVibe && matchesMedium;
    });
  }, [searchQuery, selectedStyles, selectedVibes, selectedMediums]);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const FilterSection = () => (
    <div className="space-y-10 md:space-y-12">
      <div>
        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
          Material DNA
        </h3>
        <div className="flex flex-col gap-3">
          {mediums.map(m => (
            <button 
              key={m}
              onClick={() => toggleFilter(selectedMediums, setSelectedMediums, m)}
              className={`flex items-center justify-between group transition-all ${selectedMediums.includes(m) ? 'text-amber-500' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">{m}</span>
              <div className={`w-3 h-3 rounded-sm border ${selectedMediums.includes(m) ? 'bg-amber-500 border-amber-500' : 'border-zinc-800'}`} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          Aesthetic Logic
        </h3>
        <div className="flex flex-col gap-3">
          {styles.map(s => (
            <button 
              key={s}
              onClick={() => toggleFilter(selectedStyles, setSelectedStyles, s)}
              className={`flex items-center justify-between group transition-all ${selectedStyles.includes(s) ? 'text-blue-500' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">{s}</span>
              <div className={`w-3 h-3 rounded-sm border ${selectedStyles.includes(s) ? 'bg-blue-500 border-blue-500' : 'border-zinc-800'}`} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
          Resonance Vibe
        </h3>
        <div className="flex flex-col gap-3">
          {vibes.map(v => (
            <button 
              key={v}
              onClick={() => toggleFilter(selectedVibes, setSelectedVibes, v)}
              className={`flex items-center justify-between group transition-all ${selectedVibes.includes(v) ? 'text-purple-500' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">{v}</span>
              <div className={`w-3 h-3 rounded-sm border ${selectedVibes.includes(v) ? 'bg-purple-500 border-purple-500' : 'border-zinc-800'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      {/* HEADER HUD */}
      <header className="py-4 md:py-6 px-4 md:px-10 border-b border-white/5 bg-zinc-950/80 backdrop-blur-3xl flex flex-col sm:flex-row justify-between items-center gap-4 z-20">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={onBack}
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl border border-white/10 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div>
              <h2 className="text-lg md:text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Neural Archive</h2>
              <p className="hidden md:block text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mt-1">Full Spectral Access Protocol</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-zinc-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
        </div>

        <div className="relative w-full max-w-xl">
          <input 
            type="text" 
            placeholder="Search artifacts or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-2 md:py-3 px-4 md:px-6 text-xs md:text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/50 transition-all font-mono"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-right">
          <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Status</p>
            <p className="text-sm font-black text-green-500 uppercase italic">Online</p>
          </div>
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-black font-black text-xs italic">DV</div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* DESKTOP LEFT FILTERS */}
        <aside className="w-72 bg-zinc-950 border-r border-white/5 p-10 overflow-y-auto hidden lg:block custom-scrollbar">
          <FilterSection />
          <div className="mt-20 pt-10 border-t border-white/5 text-[9px] font-black text-zinc-800 uppercase tracking-widest">
            {MOCK_CARDS.length} ENTITIES FOUND
          </div>
        </aside>

        {/* MOBILE FILTERS DRAWER */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-black/80 z-[110]" />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-[280px] bg-zinc-950 z-[120] p-8 border-l border-white/10 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                  <h4 className="text-white font-black uppercase text-xs tracking-widest">Filter Matrix</h4>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="text-zinc-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <FilterSection />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN GRID */}
        <main className="flex-1 p-4 md:p-10 overflow-y-auto custom-scrollbar bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {filteredCards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => onSelectCard(card)}
                  className="group relative cursor-pointer"
                >
                  <div className="aspect-[3/4] rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 relative group-hover:border-amber-500/30 transition-all duration-500">
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="px-2 py-0.5 bg-amber-500 rounded text-[7px] font-black text-black uppercase">{card.mbti}</div>
                    </div>

                    <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                      <p className="text-zinc-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 truncate">{card.artist}</p>
                      <h3 className="text-sm md:text-2xl font-black text-white italic tracking-tighter uppercase leading-tight truncate group-hover:text-amber-500 transition-colors">{card.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCards.length === 0 && (
              <div className="text-center py-40">
                <p className="text-xl md:text-3xl font-black text-zinc-800 italic tracking-tighter uppercase">No Matching DNA</p>
                <button onClick={() => {setSearchQuery(''); setSelectedStyles([]); setSelectedMediums([]); setSelectedVibes([]);}} className="mt-4 text-xs text-amber-500 font-bold uppercase underline">Clear All Filters</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default LibraryView;
