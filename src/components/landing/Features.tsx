
import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Palette, 
  Settings, 
  Star, 
  Clock, 
  Download,
  CheckCircle2
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <div 
    className="flex flex-col p-8 glass-card rounded-xl transition-all duration-300 hover:shadow-xl animate-fade-in"
    style={{ animationDelay: delay }}
  >
    <div className="p-3 mb-5 inline-flex rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Suggestions",
      description: "Get personalized content suggestions based on your job role and industry.",
      delay: "0ms"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Templates",
      description: "Choose from a variety of elegant, ATS-friendly resume templates.",
      delay: "100ms"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Easy Customization",
      description: "Personalize colors, fonts, and layouts to match your personal brand.",
      delay: "200ms"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through applicant tracking systems with ease.",
      delay: "300ms"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Skills Highlighting",
      description: "Showcase your relevant skills with intelligent suggestions for improvement.",
      delay: "400ms"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast & Efficient",
      description: "Create a professional resume in minutes, not hours or days.",
      delay: "500ms"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multiple Export Options",
      description: "Download your resume in PDF, DOCX, or other formats suitable for any application.",
      delay: "600ms"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Step-by-Step Guidance",
      description: "Follow our intuitive process to ensure your resume is complete and polished.",
      delay: "700ms"
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 animate-fade-in">
            Features that make your resume stand out
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
            Our AI-powered resume builder provides everything you need to create a professional, 
            eye-catching resume that gets results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
