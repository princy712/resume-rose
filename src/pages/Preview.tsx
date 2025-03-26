
import React from "react";
import Header from "@/components/Header";
import ResumePreview from "@/components/preview/ResumePreview";

const Preview = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">Preview & Download</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Review your resume and download it when you're ready
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default Preview;
