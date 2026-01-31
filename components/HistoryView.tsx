
import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../types';

interface HistoryViewProps {
  items: CardData[];
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ items, onBack }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-zinc-950 overflow-y-auto custom-scrollbar"
    >
      <header className="p-10 border-b border-white/5 flex justify-between items-center sticky top-0 bg-zinc-950/90 backdrop-blur-3xl z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all group"
          >
            <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Curated Vault</h2>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mt-1.5">Asset Intelligence Archive</p>
          </div>
        </div>

        <div className="bg-white/5 px-6 py-2 rounded-2xl border border-white/10">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Storage Status</p>
          <p className="text-sm font-black text-amber-500">{items.length} Masterpieces Secured</p>
        </div>
      </header>

      <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {items.length === 0 ? (
          <div className="col-span-full text-center py-40">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
               <svg className="w-10 h-10 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <p className="text-2xl font-black text-zinc-500 italic tracking-tighter uppercase mb-4">The Archive is Empty</p>
            <p className="text-zinc-600 text-sm max-w-xs mx-auto font-medium">Swipe right on assets in the main scanner to secure them in this deep-storage vault.</p>
          </div>
        ) : (
          items.map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-[3rem] overflow-hidden border border-white/5 flex flex-col group hover:border-amber-500/30 transition-all duration-500"
            >
              <div className="h-64 w-full overflow-hidden relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
                <div className="absolute bottom-6 left-8">
                   <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{item.name}</h3>
                   <p className="text-amber-500 font-bold text-xs uppercase tracking-widest">{item.artist}</p>
                </div>
              </div>
              
              <div className="p-10">
                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Medium</p>
                      <p className="text-xs font-bold text-white">{item.medium}</p>
                   </div>
                   <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Year</p>
                      <p className="text-xs font-bold text-white">{item.year}</p>
                   </div>
                </div>

                <div className="bg-black/60 p-6 rounded-3xl border border-white/5 text-xs text-zinc-400 leading-relaxed italic mb-6">
                  <p className="font-black text-amber-500 mb-2 uppercase tracking-tighter flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full" />
                    Deep Intelligence Log:
                  </p>
                  "{item.fullDescription}"
                </div>

                <div className="flex items-center gap-3">
                   <span className="px-3 py-1 bg-zinc-800 rounded-full text-[9px] text-zinc-500 font-bold uppercase tracking-widest">#{item.mbti}_MATCH</span>
                   <span className="px-3 py-1 bg-zinc-800 rounded-full text-[9px] text-zinc-500 font-bold uppercase tracking-widest">#AUTHENTICATED</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default HistoryView;
