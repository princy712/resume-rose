
import React from "react";
import Header from "@/components/Header";
import TemplateList from "@/components/templates/TemplateList";

const Templates = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">Resume Templates</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from our professionally designed templates to showcase your experience
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <TemplateList />
        </div>
      </div>
    </div>
  );
};

export default Templates;
