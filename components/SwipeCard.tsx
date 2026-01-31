
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { CardData } from '../types';

interface SwipeCardProps {
  card: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  isLiked: boolean;
}

const TechnicalDNANode: React.FC<{ label: string; value: string; delay: number }> = ({ label, value, delay }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [main, bracketInfo] = value.split('(');
  const hiddenInfo = bracketInfo ? bracketInfo.replace(')', '') : '';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={(e) => {
        e.stopPropagation();
        setIsRevealed(!isRevealed);
      }}
      className={`relative p-4 md:p-5 rounded-xl md:rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-center min-h-[80px] md:min-h-[100px] ${
        isRevealed ? 'bg-amber-500 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'bg-black/80 border-white/10 hover:border-amber-500/50'
      }`}
    >
      <div className="relative z-10">
        <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2 block ${isRevealed ? 'text-black/60' : 'text-zinc-600'}`}>
          {label}
        </span>
        
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.p 
              key="main"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-[10px] md:text-xs font-bold text-white uppercase leading-tight"
            >
              {main.trim()}
            </motion.p>
          ) : (
            <motion.div
              key="hidden"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="text-black"
            >
              <p className="text-[9px] md:text-[10px] font-black uppercase leading-tight italic">
                {hiddenInfo.trim()}
              </p>
              <div className="mt-1 md:mt-2 text-[6px] md:text-[7px] font-black tracking-widest uppercase opacity-40">AI Insight Active</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isRevealed && hiddenInfo && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 md:w-1.5 h-1 md:h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,1)]"
          />
        </div>
      )}
    </motion.div>
  );
};

const SwipeCard: React.FC<SwipeCardProps> = ({ card, onSwipe, isLiked }) => {
  const [isXRayActive, setIsXRayActive] = useState(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-8, 8]);
  const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);
  
  const likeLabelOpacity = useTransform(x, [50, 150], [0, 1]);
  const passLabelOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isLiked) return;
    const threshold = 100;
    if (info.offset.x > threshold) onSwipe('right');
    else if (info.offset.x < -threshold) onSwipe('left');
  };

  const toggleXRay = () => {
    setIsXRayActive(!isXRayActive);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 md:px-4 perspective-2000">
      <motion.div
        style={{ x, rotate, opacity }}
        drag={isLiked ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className={`bg-zinc-950 rounded-[2.5rem] md:rounded-[4.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] md:shadow-[0_80px_160px_rgba(0,0,0,0.8)] overflow-hidden border border-white/5 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${
          isLiked ? 'min-h-[90vh] md:min-h-[900px] md:flex-row w-full' : 'h-[60vh] md:h-[650px] w-full max-w-sm md:max-w-md mx-auto cursor-grab active:cursor-grabbing'
        }`}
      >
        {/* ACTION OVERLAYS */}
        <motion.div style={{ opacity: likeLabelOpacity }} className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
           <span className="text-4xl md:text-8xl font-black text-amber-500 uppercase italic tracking-tighter border-[8px] md:border-[16px] border-amber-500 px-6 md:px-12 py-3 md:py-6 rounded-2xl md:rounded-[4rem] -rotate-12 bg-black/60 backdrop-blur-md">SECURE</span>
        </motion.div>
        <motion.div style={{ opacity: passLabelOpacity }} className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
           <span className="text-4xl md:text-8xl font-black text-zinc-500 uppercase italic tracking-tighter border-[8px] md:border-[16px] border-zinc-500 px-6 md:px-12 py-3 md:py-6 rounded-2xl md:rounded-[4rem] rotate-12 bg-black/60 backdrop-blur-md">SKIP</span>
        </motion.div>

        {/* VISUAL CORE & NEURAL X-RAY */}
        <div 
          onClick={toggleXRay}
          className={`relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-crosshair group ${isLiked ? 'h-[40vh] md:h-full md:w-[45%]' : 'w-full h-full'}`}
        >
          <motion.img 
            layoutId={`img-${card.id}`}
            src={card.imageUrl} 
            alt={card.name} 
            animate={{ 
              filter: isXRayActive ? 'grayscale(0.8) invert(1) brightness(0.4) contrast(1.2) sepia(1)' : 'grayscale(0) invert(0) brightness(0.9)',
              scale: isXRayActive ? 1.05 : 1
            }}
            className="w-full h-full object-cover select-none pointer-events-none transition-all duration-1000"
          />
          
          <AnimatePresence>
            {isXRayActive && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className="absolute inset-0 z-20 flex flex-col p-4 md:p-10 justify-center"
              >
                <motion.div 
                  initial={{ top: '-100%' }} animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[1px] md:h-[2px] bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,1)] z-10"
                />

                <div className="grid grid-cols-2 gap-2 md:gap-3 relative z-30 overflow-y-auto max-h-full py-4 px-1 custom-scrollbar">
                  <TechnicalDNANode label="Medium" value={card.medium} delay={0.05} />
                  <TechnicalDNANode label="Substrate" value={card.substrate} delay={0.1} />
                  <TechnicalDNANode label="Pigment Quality" value={card.pigmentQuality} delay={0.15} />
                  <TechnicalDNANode label="Surface Shine" value={card.surfaceShine} delay={0.2} />
                  <TechnicalDNANode label="Physical Health" value={card.physicalHealth} delay={0.25} />
                  <TechnicalDNANode label="Artist's Ghost" value={card.hiddenDetails} delay={0.3} />
                  <TechnicalDNANode label="Best Placement" value={card.placementSuggestion} delay={0.35} />
                  <TechnicalDNANode label="Artistic MBTI" value={card.mbtiTrait} delay={0.4} />
                </div>

                <div className="absolute bottom-4 left-0 w-full text-center">
                   <p className="text-[7px] md:text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] md:tracking-[0.5em] animate-pulse">
                     Tap Nodes to Reveal DNA Insights
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12 pointer-events-none">
            {!isLiked && !isXRayActive && (
              <>
                <div className="flex items-center gap-2 mb-2 md:mb-4">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/50 italic">Tap to Scan DNA</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter leading-none uppercase truncate">{card.name}</h2>
                <p className="text-zinc-400 font-bold text-xs md:text-sm tracking-[0.2em] md:tracking-[0.4em] uppercase mt-1 md:mt-3 truncate">{card.artist}</p>
              </>
            )}
          </div>
        </div>

        {/* DATA ARCHIVE (REVEALED ON SECURE) */}
        {isLiked && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 p-8 md:p-20 flex flex-col bg-zinc-950 text-white border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto custom-scrollbar relative"
          >
            <div className="mb-10 md:mb-14">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <div className="px-3 md:px-5 py-1.5 md:py-2.5 bg-amber-500/10 text-amber-500 text-[8px] md:text-[10px] font-black rounded-xl uppercase tracking-[0.1em] md:tracking-[0.2em] border border-amber-500/20">
                  {card.mbti} ({card.vibe})
                </div>
                <div className="px-3 md:px-5 py-1.5 md:py-2.5 bg-white/5 text-zinc-500 text-[8px] md:text-[10px] font-black rounded-xl uppercase tracking-[0.1em] md:tracking-[0.2em] border border-white/5">
                  {card.style}
                </div>
              </div>
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.8] mb-4 md:mb-6 text-white uppercase">{card.name}</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
                 <span className="text-amber-500 text-lg md:text-xl font-black uppercase tracking-widest italic">{card.artist}</span>
                 <div className="hidden md:block w-2 h-2 bg-zinc-800 rounded-full" />
                 <span className="text-zinc-600 text-[9px] md:text-sm font-black uppercase tracking-widest leading-none">{card.totalAcquisitions} ACQUISITIONS</span>
              </div>
            </div>

            <div className="mb-12 md:mb-20">
               <p className="text-zinc-600 text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-4 md:mb-8">Asset Intelligence Summary</p>
               <p className="text-zinc-300 text-xl md:text-3xl font-light leading-snug italic tracking-tight mb-8 md:mb-12">
                  "{card.fullDescription}"
               </p>
               <div className="bg-white/[0.03] p-6 md:p-10 rounded-2xl md:rounded-[4rem] border border-white/5">
                  <p className="text-amber-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-3 md:mb-4">Savvy Personality Breakdown</p>
                  <p className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed italic">
                    {card.mbtiSavvyInfo}
                  </p>
               </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="mt-auto pt-8 md:pt-14 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6 md:gap-8"
            >
               <button 
                 onClick={() => onSwipe('left')}
                 className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-6 border border-white/10 rounded-2xl md:rounded-3xl text-zinc-500 hover:text-white transition-all text-[9px] md:text-[11px] font-black uppercase tracking-widest hover:bg-white/5"
               >
                 Eject Archive
               </button>
               <div className="hidden sm:block flex-1 h-[1px] bg-white/5" />
               <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                  <span className="text-zinc-800 text-[8px] md:text-[10px] font-mono tracking-tighter leading-none mb-1 uppercase italic">Protocol_v.9.9.2</span>
                  <span className="text-zinc-900 text-[7px] md:text-[8px] font-mono tracking-tighter uppercase leading-none italic">Verified via Gemini Neural Link</span>
               </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SwipeCard;
