"use client"
import Navbar from "@/components/LandingPage/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [prompt]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create {}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9494] to-[#FFD1D1]">
                forms
              </span>
            </h1>
            <h4 className="scroll-m-20 text-xl font-normal tracking-tight">
            Describe the form you want to create and let our AI build it for you. 
            </h4>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-12">
            <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="form-prompt" className="block text-sm ml-1 font-semibold text-gray-700">
                  Describe your form
                </label>
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    id="form-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Create a customer feedback form with name, email, rating from 1-5, and comments section. Make the rating required and email optional."
                    className="w-full min-h-[120px] max-h-[400px] resize-none border-2 border-gray-200 rounded-xl px-4 py-4 text-base leading-relaxed focus:border-[#FF9494] focus:ring-4 focus:ring-[#FF9494]/10 transition-all duration-200 placeholder:text-gray-400"
                    rows={4}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {prompt.length}/1000
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Be specific about the fields you want, their types, and any requirements.
                </p>
              </div>

              {/* Button Section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-[#FF9494] to-[#FFD1D1] hover:from-[#FF8A8A] hover:to-[#FFC7C7] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating your form...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>✨ Create Form</span>
                    </div>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setPrompt("")}
                  disabled={!prompt.trim()}
                  className="px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}