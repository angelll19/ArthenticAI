
import React, { useState, useRef } from 'react'; 
//React= Building the UI//
//useState= Allow data changes over time//
//useRef = //
import { GeminiService } from '../services/geminiService';


interface AISuiteProps {
  imageUrl: string;
}

const AISuite: React.FC<AISuiteProps> = ({ imageUrl }) => {
  const [analysis, setAnalysis] = useState<string | null>(null); //store the result of the AI image analysis//
  const [videoUrl, setVideoUrl] = useState<string | null>(null); //stores the generated video URL//
  const [isAnalyzing, setIsAnalyzing] = useState(false); //show loading state when analzing an image//
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false); //show loading state when loading state//
  const [videoPrompt, setVideoPrompt] = useState('Animate the background of this photo with cinematic movement'); //text the AI uses to generate a video//
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getBase64 = async (url: string): Promise<{ data: string, mimeType: string }> => {
    const res = await fetch(url); //download the image from the web//
    const blob = await res.blob(); //converts the image to a blob//
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({ data: base64, mimeType: blob.type });
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const { data, mimeType } = await getBase64(imageUrl);
      const result = await GeminiService.analyzeImage(data, mimeType);
      setAnalysis(result);
    } catch (err) {
      alert("Failed to analyze image. Ensure API key is valid.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateVideo = async () => {
    setIsGeneratingVideo(true);
    try {
      const { data, mimeType } = await getBase64(imageUrl);
      const url = await GeminiService.generateVeoVideo(data, mimeType, videoPrompt);
      setVideoUrl(url);
    } catch (err) {
      alert("Failed to generate video. Check if you have selected a Veo-enabled API key.");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleCustomFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setIsAnalyzing(true);
      try {
        const res = await GeminiService.analyzeImage(base64, file.type);
        setAnalysis(res);
      } catch (err) {
        alert("Upload analysis failed.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-white/10 rounded-2xl">
            <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Companion Tools</h2>
            <p className="text-indigo-200 text-sm">Analyze personality or animate moments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Analysis Section */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Gemini Vision Analysis
            </h3>
            {analysis ? (
              <div className="bg-white/10 rounded-xl p-4 text-sm leading-relaxed text-indigo-50 border border-white/5">
                {analysis}
                <button onClick={() => setAnalysis(null)} className="mt-4 text-xs text-indigo-300 hover:text-white underline block">Reset</button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-indigo-200">Get an AI-powered personality breakdown of this profile.</p>
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-800 transition rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span> : null}
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Current Profile'}
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-indigo-900 px-2 text-indigo-400">Or Upload Yours</span></div>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border border-indigo-500/50 hover:bg-white/5 transition rounded-xl font-semibold text-sm"
                >
                  Upload a Photo
                </button>
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleCustomFileUpload} accept="image/*" />
              </div>
            )}
          </div>

          {/* Veo Video Section */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Veo Cinematic Motion
            </h3>
            {videoUrl ? (
              <div className="space-y-4">
                <video src={videoUrl} controls autoPlay loop className="w-full rounded-xl shadow-lg border border-white/10" />
                <button onClick={() => setVideoUrl(null)} className="text-xs text-purple-300 hover:text-white underline">Generate Another</button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-indigo-200">Animate this static photo into a cinematic landscape video.</p>
                <textarea
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={2}
                />
                <button 
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 disabled:bg-purple-800 transition rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                >
                  {isGeneratingVideo ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span> : null}
                  {isGeneratingVideo ? 'Creating Video (Takes ~60s)...' : 'Generate Veo Video'}
                </button>
                {isGeneratingVideo && (
                   <p className="text-[10px] text-center text-purple-300 animate-pulse">Our AI is dreaming up your video. Please stay on this page.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuite;
