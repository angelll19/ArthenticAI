
import React, { useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MOCK_CARDS } from './data/mockData';
import { AppMode, CardData, UserProfile } from './types';
import SwipeCard from './components/SwipeCard';
import CameraView from './components/CameraView';
import HistoryView from './components/HistoryView';
import LibraryView from './components/LibraryView';

const USER_PROFILE: UserProfile = {
  name: "Dante V.",
  age: 28,
  personality: "INFJ - The Mystic",
  experience: "Professional"
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('feed');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [isDone, setIsDone] = useState(false);
  const [selectedArtForTrial, setSelectedArtForTrial] = useState<CardData | undefined>(undefined);
  
  // UI State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVibe, setActiveVibe] = useState<string | null>(null);

  const filteredCards = useMemo(() => {
    return MOCK_CARDS.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           card.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVibe = activeVibe ? card.vibe === activeVibe : true;
      return matchesSearch && matchesVibe;
    });
  }, [searchQuery, activeVibe]);

  const currentCard = filteredCards[currentIndex];
  const isCurrentlyLiked = currentCard ? likedIds.has(currentCard.id) : false;

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'right') {
      setLikedIds(prev => new Set(prev).add(currentCard.id));
    } else {
      goToNext();
    }
  }, [currentCard, filteredCards]);

  const goToNext = () => {
    if (currentIndex + 1 < filteredCards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      if (isDone) setIsDone(false);
      else setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRoomTrial = () => {
    if (currentCard) {
      setSelectedArtForTrial(currentCard);
      setMode('camera');
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setLikedIds(new Set());
    setIsDone(false);
    setSearchQuery('');
    setActiveVibe(null);
  };

  const selectFromLibrary = (card: CardData) => {
    const cardIdx = filteredCards.findIndex(c => c.id === card.id);
    if (cardIdx !== -1) {
      setCurrentIndex(cardIdx);
      setMode('feed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-amber-500 selection:text-black font-sans relative overflow-hidden">
      
      {/* SIDEBAR FILTERING */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]"
            />
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed left-0 top-0 h-full w-full max-w-[320px] bg-zinc-950 border-r border-white/5 z-[80] p-6 md:p-10 flex flex-col"
            >
              <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] mb-8 md:mb-12">Curator Protocol</h3>
              
              <div className="space-y-8 md:space-y-12">
                <div>
                  <h4 className="text-white text-xs font-black uppercase mb-4 tracking-widest">Navigation</h4>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => {setMode('library'); setIsSidebarOpen(false);}} className="text-left text-sm text-amber-500 hover:text-white transition-colors py-2 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      Neural Archive
                    </button>
                    <button onClick={() => {setMode('feed'); setIsSidebarOpen(false);}} className="text-left text-sm text-zinc-500 hover:text-amber-500 transition-colors py-2"># Discovery Feed</button>
                    <button onClick={() => {setMode('history'); setIsSidebarOpen(false);}} className="text-left text-sm text-zinc-500 hover:text-amber-500 transition-colors py-2"># Curated Vault</button>
                  </div>
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase mb-4 tracking-widest">Aesthetic Style</h4>
                  <div className="flex flex-col gap-2">
                    {['Chic', 'Bold', 'Minimalist', 'Abstract'].map(s => (
                      <button key={s} className="text-left text-sm text-zinc-500 hover:text-amber-500 transition-colors py-2 group flex items-center gap-2">
                        <span className="w-1 h-1 bg-zinc-800 rounded-full group-hover:bg-amber-500" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="mt-auto py-4 border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Close Protocol
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* USER PROFILE HUB */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] max-w-md w-full shadow-[0_0_100px_rgba(245,158,11,0.1)] relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-6 md:top-10 right-6 md:right-10">
                <button onClick={() => setIsProfileOpen(false)} className="text-zinc-600 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="w-20 h-20 md:w-28 md:h-28 bg-amber-500 rounded-[1.5rem] md:rounded-[2.5rem] mx-auto mb-6 md:mb-8 flex items-center justify-center text-3xl md:text-4xl font-black italic shadow-2xl shadow-amber-500/20">D</div>
              
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-2 leading-none">{USER_PROFILE.name}</h2>
                <div className="flex justify-center items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{USER_PROFILE.personality}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4 text-left mb-10 md:mb-12">
                <div className="bg-white/5 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-white/5">
                  <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Age Span</span>
                  <span className="text-white text-sm md:text-base font-bold">{USER_PROFILE.age} Cycles</span>
                </div>
                <div className="bg-white/5 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-white/5">
                  <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Experience</span>
                  <span className="text-white text-sm md:text-base font-bold">{USER_PROFILE.experience}</span>
                </div>
              </div>
              
              <button onClick={() => setIsProfileOpen(false)} className="w-full py-4 md:py-6 bg-white text-black rounded-2xl md:rounded-3xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-amber-500 transition-all">Lock Neural ID</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Header */}
      <header className="py-4 md:py-6 px-4 md:px-12 flex justify-between items-center bg-black/60 backdrop-blur-3xl sticky top-0 z-[60] border-b border-white/5">
        <div className="flex items-center gap-4 md:gap-8">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsSidebarOpen(true)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-all hover:bg-amber-500/5"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </motion.button>
          <div>
            <h1 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none italic">Art<span className="text-amber-500">AI</span></h1>
          </div>
        </div>

        {/* UNIVERSAL SEARCH BAR TRIGGER - HIDDEN ON VERY SMALL SCREENS */}
        <div className="hidden sm:flex flex-col items-center gap-3 md:gap-4 flex-1 max-w-2xl px-6 md:px-12">
          <div 
            onClick={() => setMode('library')}
            className="w-full bg-zinc-900/40 border border-white/5 rounded-xl md:rounded-2xl py-2 md:py-3 px-4 md:px-6 text-[10px] md:text-xs text-zinc-600 flex items-center justify-between cursor-pointer hover:border-amber-500/30 transition-all font-medium"
          >
            <span className="truncate">Query Archive...</span>
            <div className="flex items-center gap-2">
               <span className="hidden md:block text-[8px] font-black border border-zinc-800 px-2 py-0.5 rounded">SEARCH</span>
               <svg className="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            {['Calm', 'Focus', 'Energy', 'Intimate'].map(v => (
              <button 
                key={v}
                onClick={() => setActiveVibe(activeVibe === v ? null : v)}
                className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] transition-all border ${activeVibe === v ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-zinc-600 border-white/5 hover:text-zinc-400'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
           <button 
             onClick={() => setMode('library')}
             className="sm:hidden w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-500"
           >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </button>
           <button 
             onClick={() => setMode('history')}
             className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-all relative"
           >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              {likedIds.size > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full text-black text-[8px] md:text-[10px] font-black flex items-center justify-center shadow-lg">{likedIds.size}</span>}
           </button>
        </div>
      </header>

      {/* Main Exp */}
      <main className="flex-1 flex flex-col items-center justify-center py-6 md:py-12 relative px-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === 'feed' ? (
            !isDone && currentCard ? (
              <motion.div
                key={currentCard?.id}
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                className="w-full flex flex-col items-center"
              >
                <SwipeCard card={currentCard} onSwipe={handleSwipe} isLiked={isCurrentlyLiked} />
                
                {/* Controls Cluster */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 md:mt-16 z-20">
                  <motion.button 
                    whileHover={{ scale: 1.1 }} onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="w-12 h-12 md:w-16 md:h-16 bg-zinc-950 text-zinc-600 rounded-full flex items-center justify-center border border-white/10 transition-all disabled:opacity-5 hover:text-white"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                  </motion.button>

                  <div className="flex items-center gap-3 md:gap-4 bg-zinc-950/60 backdrop-blur-xl p-2 md:p-3 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <motion.button 
                      whileHover={{ scale: 1.05 }} onClick={handleRoomTrial}
                      className="px-4 md:px-8 py-3 md:py-5 border border-amber-500/20 text-amber-500 rounded-xl md:rounded-2xl font-black uppercase text-[8px] md:text-[10px] italic transition-all flex items-center gap-2 md:gap-3 hover:bg-amber-500/5"
                    >
                      <span className="hidden sm:inline">Room Trial</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                    </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.05, x: 5 }} onClick={goToNext} 
                      className="px-6 md:px-12 py-3 md:py-5 bg-amber-500 text-black rounded-xl md:rounded-2xl font-black uppercase text-[8px] md:text-[10px] italic shadow-xl shadow-amber-500/10 flex items-center gap-2 md:gap-3 transition-all"
                    >
                      Next Asset
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setIsProfileOpen(true)}
                      className="w-12 h-12 md:w-16 md:h-16 bg-zinc-900 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500 transition-all shadow-xl"
                    >
                      <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setMode('library')}
                      className="w-12 h-12 md:w-16 md:h-16 bg-zinc-900 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-500 transition-all shadow-xl"
                    >
                      <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8 md:p-20 max-w-2xl bg-zinc-950/80 rounded-[3rem] md:rounded-[5rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-8 italic tracking-tighter uppercase leading-none">Spectrum Exhausted</h2>
                <p className="text-zinc-500 mb-8 md:mb-14 text-sm md:text-xl leading-relaxed font-light">The neural archive has no more matching assets for your signature.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={restart} className="w-full py-4 md:py-6 bg-amber-500 text-black rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all text-[10px] md:text-sm">Reset Link</button>
                  <button onClick={() => setMode('library')} className="w-full py-4 md:py-6 border border-white/10 text-white rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-[10px] md:text-sm">Open Archive</button>
                </div>
              </motion.div>
            )
          ) : null}
        </AnimatePresence>
      </main>

      {/* Views */}
      <AnimatePresence>
        {mode === 'camera' && <CameraView selectedArt={selectedArtForTrial} onClose={() => { setMode('feed'); setSelectedArtForTrial(undefined); }} />}
        {mode === 'history' && <HistoryView items={MOCK_CARDS.filter(c => likedIds.has(c.id))} onBack={() => setMode('feed')} />}
        {mode === 'library' && <LibraryView onBack={() => setMode('feed')} onSelectCard={selectFromLibrary} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
