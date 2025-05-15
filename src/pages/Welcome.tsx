
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 text-center">
        {/* Logo and Branding */}
        <div className="mb-8">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg mx-auto">
            <ShieldCheck className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-4">
          Secure Vault
        </h1>
        
        <p className="text-lg text-white/70 max-w-md mb-10">
          Your personal password manager with military-grade encryption and seamless access across all your devices.
        </p>
        
        {/* Mobile App Showcase */}
        <div className="relative mb-16 mt-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent blur-xl opacity-50 rounded-full"></div>
          <div className="flex justify-center space-x-8 relative">
            <div className="w-[200px] h-[400px] rounded-[30px] border-[8px] border-gray-800 bg-black overflow-hidden shadow-xl transform -rotate-6">
              <div className="h-full w-full bg-gradient-to-b from-gray-900 to-black p-3">
                <div className="flex justify-center pt-6 pb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 rounded-lg bg-white/5 p-2">
                      <div className="h-4 w-20 bg-white/10 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[200px] h-[400px] rounded-[30px] border-[8px] border-gray-800 bg-black overflow-hidden shadow-xl transform rotate-6 hidden md:block">
              <div className="h-full w-full bg-gradient-to-b from-gray-900 to-black p-3">
                <div className="flex justify-between items-center pt-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/60"></div>
                  <div className="h-4 w-16 bg-white/10 rounded"></div>
                </div>
                <div className="pt-6">
                  <div className="h-32 rounded-lg bg-white/5 mb-3"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-12 rounded-lg bg-white/5"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <Button 
            className="btn-gradient text-primary-foreground py-6 gap-2 text-lg font-medium"
            onClick={() => navigate('/features')}
          >
            Explore Features
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/5 hover:bg-white/10 border-white/10 text-white py-6"
            onClick={() => navigate('/')}
          >
            Access Vault
          </Button>
        </div>
      </div>
      
      <footer className="py-6 px-4 text-center text-white/40 text-sm">
        <p>Your passwords are securely stored on your device</p>
      </footer>
    </div>
  );
};

export default Welcome;
