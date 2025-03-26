
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      
      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 animate-fade-in">
            Trusted by thousands of job seekers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The AI suggestions helped me highlight achievements I would have otherwise overlooked. I got interviews from 4 out of 6 jobs I applied to!",
                author: "Sarah M.",
                title: "Marketing Manager"
              },
              {
                quote: "The templates are beautiful and professional. I received multiple compliments on my resume design during interviews.",
                author: "David L.",
                title: "Software Engineer"
              },
              {
                quote: "This tool made updating my resume so much faster than traditional editors. The export options are fantastic too!",
                author: "Jessica K.",
                title: "Project Manager"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl glass-card animate-fade-in" 
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <p className="italic text-slate-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-slate-500">{testimonial.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/90 to-blue-500/90 text-white">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Ready to land your dream job?</h2>
          <p className="text-xl mb-8 text-white/80">
            Create a professional resume in minutes with our AI-powered builder.
          </p>
          <a 
            href="/editor" 
            className="inline-block px-8 py-3 bg-white text-primary font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-opacity-90"
          >
            Get Started – It's Free
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                resumeAI
              </h3>
              <p className="text-slate-400">
                Creating professional resumes with the power of AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="/editor" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="/preview" className="hover:text-white transition-colors">Preview</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} resumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
