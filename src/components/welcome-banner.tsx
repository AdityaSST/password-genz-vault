
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-white/10 p-4 md:p-6 mb-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg mb-1 text-white">Welcome to Secure Vault</h3>
          <p className="text-sm text-white/70">
            Discover how our password manager can help protect your digital identity.
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="bg-white/10 hover:bg-white/20 border-white/10"
            onClick={() => setIsVisible(false)}
          >
            Dismiss
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 gap-2"
            asChild
          >
            <Link to="/welcome">
              Learn More
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
