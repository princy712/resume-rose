
import React from "react";
import Header from "@/components/Header";
import ResumeForm from "@/components/editor/ResumeForm";

const Editor = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">Create Your Resume</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Fill in your details or use our AI assistant to help you craft the perfect resume
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <ResumeForm />
        </div>
      </div>
    </div>
  );
};

export default Editor;
