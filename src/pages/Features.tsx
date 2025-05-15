
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Smartphone, Lock, 
  ShieldCheck, Key, Globe, Tablet 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      title: "Mobile Access Anywhere",
      description: "Take your passwords with you everywhere. Our responsive design works perfectly on any device, with dedicated mobile apps coming soon.",
      icon: <Smartphone className="h-16 w-16 text-primary" />,
      image: "/feature-mobile.png",
      color: "from-violet-500 to-indigo-600"
    },
    {
      title: "Military-Grade Encryption",
      description: "Your passwords are secured with end-to-end encryption, ensuring only you can access your sensitive information.",
      icon: <Lock className="h-16 w-16 text-primary" />,
      image: "/feature-encryption.png",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Password Health Monitoring",
      description: "Get alerts about weak, reused, or compromised passwords. Keep your digital identity safe with regular security checks.",
      icon: <ShieldCheck className="h-16 w-16 text-primary" />,
      image: "/feature-health.png",
      color: "from-rose-500 to-pink-600"
    },
    {
      title: "One-Click Password Generation",
      description: "Create strong, unique passwords with just one click. No more struggling to come up with secure combinations.",
      icon: <Key className="h-16 w-16 text-primary" />,
      image: "/feature-generator.png",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Cross-Platform Sync",
      description: "Access your password vault from any device. Your data automatically syncs across all your devices.",
      icon: <Globe className="h-16 w-16 text-primary" />,
      image: "/feature-sync.png",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToHome = () => {
    navigate('/');
  };

  const feature = features[currentFeature];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Feature Navigation */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white/70 hover:text-white"
          onClick={goToHome}
        >
          Skip
        </Button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 my-6">
        {features.map((_, index) => (
          <div 
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentFeature 
                ? 'w-8 bg-primary' 
                : 'w-3 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Feature Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-12 py-8 max-w-4xl mx-auto">
        <div 
          className={`w-full p-6 md:p-10 rounded-2xl bg-gradient-to-br ${feature.color} 
            glass-morphism transition-all duration-500 flex flex-col md:flex-row items-center gap-8`}
        >
          <div className="bg-black/20 p-8 rounded-full">
            {feature.icon}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {feature.title}
            </h2>
            <p className="text-sm md:text-base text-white/80 mb-6">
              {feature.description}
            </p>
            
            {currentFeature === 0 && (
              <div className="flex flex-wrap gap-4">
                <div className="bg-black/30 py-2 px-4 rounded-full flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">iOS App</span>
                </div>
                <div className="bg-black/30 py-2 px-4 rounded-full flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">Android App</span>
                </div>
                <div className="bg-black/30 py-2 px-4 rounded-full flex items-center gap-2">
                  <Tablet className="h-4 w-4" />
                  <span className="text-sm">Responsive Web</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Device Mockup for Mobile Feature */}
        {currentFeature === 0 && (
          <div className="mt-8 relative">
            <div className="w-[280px] h-[580px] rounded-[40px] border-[10px] border-gray-800 bg-black overflow-hidden shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 rounded-b-lg bg-gray-800"></div>
              <div className="h-full w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden">
                <div className="pt-8 px-4 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg mb-2">
                    <ShieldCheck className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-white">Secure Vault</h3>
                  
                  <div className="mt-6 w-full">
                    <div className="h-10 w-full bg-white/5 rounded-lg mb-3"></div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-20 w-full bg-white/5 rounded-lg mb-3 p-3">
                        <div className="flex justify-between">
                          <div className="h-5 w-24 bg-white/10 rounded"></div>
                          <div className="h-5 w-5 bg-white/10 rounded-full"></div>
                        </div>
                        <div className="mt-2 h-4 w-32 bg-white/10 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center px-6 py-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 hover:bg-white/20"
          onClick={prevFeature}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={currentFeature === features.length - 1 ? goToHome : nextFeature}
        >
          {currentFeature === features.length - 1 ? "Get Started" : "Next Feature"}
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 hover:bg-white/20"
          onClick={nextFeature}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Features;
