
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pb-20 pt-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      {/* Animated circles */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/3 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium animate-fade-in">
          <Sparkles className="h-4 w-4 mr-2" />
          <span>AI-powered resume builder</span>
        </div>
        
        <h1 className="text-balance font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          Create a professional resume <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            in minutes, not hours
          </span>
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Our AI-powered resume builder helps you craft a standout resume 
          tailored to your career goals with personalized suggestions and professionally designed templates.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Button 
            size="lg" 
            className="rounded-full px-8 shadow-lg" 
            onClick={() => navigate('/editor')}
          >
            Create Your Resume <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8" 
            onClick={() => navigate('/templates')}
          >
            View Templates
          </Button>
        </div>
      </div>
      
      {/* Preview image */}
      <div className="mt-24 w-full max-w-5xl mx-auto glass-card rounded-2xl overflow-hidden shadow-2xl animate-fade-in" style={{ animationDelay: '400ms' }}>
        <img 
          src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" 
          alt="Resume Builder Preview" 
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
