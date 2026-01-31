
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GeminiService } from '../services/geminiService';
import { CardData } from '../types';

interface CameraViewProps {
  onClose: () => void;
  selectedArt?: CardData;
}

type FrameStyle = 'none' | 'minimal' | 'museum' | 'gilded' | 'industrial';

const FRAMES = [
  { id: 'none' as FrameStyle, label: 'Float', desc: 'No border' },
  { id: 'minimal' as FrameStyle, label: 'Modern', desc: 'Sleek wood' },
  { id: 'museum' as FrameStyle, label: 'Gallery', desc: 'Deep black' },
  { id: 'gilded' as FrameStyle, label: 'Classic', desc: 'Gold leaf' },
  { id: 'industrial' as FrameStyle, label: 'Studio', desc: 'Steel' },
];

const CameraView: React.FC<CameraViewProps> = ({ onClose, selectedArt }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState<'wall' | 'art'>('wall');
  
  // High-performance Motion Values for Zero-Lag Interaction
  const mZoom = useMotionValue(1);
  const mFrameThickness = useMotionValue(4);
  const mMatteWidth = useMotionValue(0);
  
  // Springs for smooth but responsive feel
  const springZoom = useSpring(mZoom, { stiffness: 300, damping: 30 });
  const springThickness = useSpring(mFrameThickness, { stiffness: 300, damping: 30 });
  const springMatte = useSpring(mMatteWidth, { stiffness: 300, damping: 30 });

  const [frameStyle, setFrameStyle] = useState<FrameStyle>('minimal');
  const [activeControl, setActiveControl] = useState<'frame' | 'matte' | 'scale'>('scale');

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } } 
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        alert("Camera access required for AR trial.");
        onClose();
      }
    }
    startCamera();
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsScanning(true);
    setAnalysis("Processing spatial depth and lux levels...");

    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);

    const base64 = canvasRef.current.toDataURL('image/jpeg', 0.8).split(',')[1];
    
    try {
      const result = scanType === 'wall' 
        ? await GeminiService.analyzeWallSuitability(base64, 'image/jpeg')
        : await GeminiService.analyzeArtAuthenticity(base64, 'image/jpeg');
      setAnalysis(result || "Analysis complete.");
    } catch (err) {
      setAnalysis("Cloud sync interrupted.");
    } finally {
      setIsScanning(false);
    }
  };

  // Dynamic style calculation for the AR frame
  const frameStyleObject = useMemo(() => {
    switch(frameStyle) {
      case 'none': return { border: '0px solid transparent', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' };
      case 'minimal': return { border: 'solid #18181b', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' };
      case 'museum': return { border: 'solid #000', outline: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' };
      case 'gilded': return { border: 'solid #d97706', outline: '2px solid #f59e0b', boxShadow: '0 40px 90px rgba(0,0,0,0.4)', background: 'linear-gradient(45deg, #d97706, #b45309)' };
      case 'industrial': return { border: 'solid #71717a', background: 'linear-gradient(45deg, #52525b, #3f3f46)', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' };
      default: return {};
    }
  }, [frameStyle]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col touch-none select-none"
    >
      <div className="relative flex-1 overflow-hidden">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale-[0.05]" />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* ENHANCED AR OVERLAY - Zero Lag Performance */}
        {selectedArt && (
          <motion.div 
            drag 
            dragMomentum={false}
            style={{ 
              scale: springZoom,
              // We manually map the motion values to the border/padding for smooth updates
              borderWidth: frameStyle === 'none' ? 0 : springThickness,
              ...frameStyleObject
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing will-change-transform"
          >
            <motion.div 
              style={{ padding: springMatte }}
              className="bg-white flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-40 md:w-80 h-auto aspect-auto pointer-events-none">
                <img 
                  src={selectedArt.imageUrl} 
                  alt="AR Trial" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
            
            {/* Status Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2 items-center bg-black/80 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 whitespace-nowrap shadow-2xl">
              <span className="text-[9px] font-black text-amber-500 tracking-widest uppercase">AR Trial Active</span>
              <div className="w-1 h-1 bg-zinc-700 rounded-full" />
              <span className="text-[9px] font-black text-zinc-400 tracking-widest uppercase">{frameStyle}</span>
            </div>
          </motion.div>
        )}

        {/* GUIDELINES HUD */}
        <div className="absolute inset-0 border border-white/5 m-10 pointer-events-none opacity-30">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500" />
          
          {isScanning && (
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-amber-500 shadow-[0_0_25px_rgba(245,158,11,1)]"
            />
          )}
        </div>

        {/* NOTIFICATIONS */}
        <AnimatePresence>
          {analysis && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-64 left-6 right-6 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-50 max-h-[40%] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                   <h4 className="font-black uppercase tracking-[0.3em] text-amber-500 text-[10px]">Neural Intel Report</h4>
                 </div>
                 <button onClick={() => setAnalysis(null)} className="text-zinc-500 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="text-zinc-300 text-sm md:text-base font-medium leading-relaxed italic">{analysis}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AR PRECISION CONTROLS */}
      <div className="bg-zinc-950 px-6 py-8 md:p-12 flex flex-col gap-8 border-t border-white/10 z-[60]">
        
        {selectedArt && (
          <div className="space-y-8">
            {/* Control Tabs */}
            <div className="flex justify-center gap-1.5 bg-white/5 p-1 rounded-2xl w-fit mx-auto border border-white/5">
              {[
                { id: 'scale', label: 'Scale' },
                { id: 'frame', label: 'Frame' },
                { id: 'matte', label: 'Matte' }
              ].map(t => (
                <button 
                  key={t.id}
                  onClick={() => setActiveControl(t.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeControl === t.id ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Slider / Option Area */}
            <div className="h-16 flex flex-col justify-center">
              {activeControl === 'scale' && (
                <div className="flex items-center gap-6 px-4">
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest w-16">Dimension</span>
                  <input 
                    type="range" min="0.3" max="3.5" step="0.01" 
                    defaultValue={mZoom.get()}
                    onChange={(e) => mZoom.set(parseFloat(e.target.value))}
                    className="flex-1 accent-amber-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              )}

              {activeControl === 'frame' && (
                <div className="flex flex-col gap-6">
                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-4">
                    {FRAMES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFrameStyle(f.id)}
                        className={`flex-shrink-0 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          frameStyle === f.id ? 'bg-white text-black border-white' : 'bg-zinc-900/50 text-zinc-500 border-white/5'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  {frameStyle !== 'none' && (
                    <div className="flex items-center gap-6 px-4">
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest w-16">Thickness</span>
                      <input 
                        type="range" min="1" max="24" step="0.5" 
                        defaultValue={mFrameThickness.get()}
                        onChange={(e) => mFrameThickness.set(parseFloat(e.target.value))}
                        className="flex-1 accent-white h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeControl === 'matte' && (
                <div className="flex items-center gap-6 px-4">
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest w-16">Matte Edge</span>
                  <input 
                    type="range" min="0" max="60" step="1" 
                    defaultValue={mMatteWidth.get()}
                    onChange={(e) => mMatteWidth.set(parseInt(e.target.value))}
                    className="flex-1 accent-zinc-300 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRIMARY ACTIONS */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t border-white/5">
          <button 
            onClick={onClose} 
            className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-all bg-white/5"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          
          <div className="flex bg-zinc-900 rounded-[2rem] p-1.5 gap-1 border border-white/5 shadow-inner">
            <button 
              onClick={() => setScanType('wall')} 
              className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${scanType === 'wall' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Env Scan
            </button>
            <button 
              onClick={() => setScanType('art')} 
              className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${scanType === 'art' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              DNA Check
            </button>
          </div>

          <button 
            onClick={captureAndAnalyze} 
            disabled={isScanning} 
            className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition disabled:opacity-20"
          >
            <div className={`w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center ${isScanning ? 'animate-pulse' : ''}`}>
               <div className="w-6 h-6 rounded-full border-2 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraView;
