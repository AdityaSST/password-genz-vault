
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, Lock, Database, Eye, EyeOff, 
  ChevronRight, Star, Users, Zap, Globe,
  Check, ArrowRight, Play
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Zero-Knowledge Encryption",
      description: "Your data is encrypted locally before it ever leaves your device. We can't see it, even if we wanted to."
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Local-First Storage",
      description: "Everything works offline. Your passwords are stored locally and synced securely across your devices."
    },
    {
      icon: <EyeOff className="h-8 w-8 text-primary" />,
      title: "We Don't Store Your Data",
      description: "We never see your passwords. All encryption happens on your device using your master password."
    }
  ];

  const benefits = [
    "End-to-end encrypted",
    "Works completely offline",
    "Cross-platform sync",
    "Open source security",
    "No data collection",
    "Military-grade protection"
  ];

  const stats = [
    { number: "256-bit", label: "AES Encryption" },
    { number: "100%", label: "Privacy Guaranteed" },
    { number: "0", label: "Data Breaches" },
    { number: "∞", label: "Passwords Stored" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Secure Vault</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => navigate('/features')}
                className="text-white/70 hover:text-white transition-colors"
              >
                Features
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                Security
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                Privacy
              </button>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                className="btn-gradient"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Lock className="h-4 w-4 text-primary mr-2" />
              <span className="text-primary font-medium">Zero-Knowledge Security</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Your Passwords,
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Your Control
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
            The only password manager that doesn't know your passwords. 
            <span className="text-primary"> Zero-knowledge encryption</span> means your data stays yours, forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="btn-gradient text-lg px-8 py-6 group"
              onClick={() => navigate('/signup')}
            >
              Start Securing Now
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/5 hover:bg-white/10 border-white/20 text-white text-lg px-8 py-6"
              onClick={() => navigate('/features')}
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy by <span className="text-gradient">Design</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We built Secure Vault on three core principles: your data belongs to you, 
              encryption happens locally, and we never see your passwords.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 group">
                <div className="mb-6 p-4 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Security Guarantee */}
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-cyan-500/5 border border-primary/20">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan-500 mb-8">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Security Promise
              </h3>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                "We can't read your passwords, even if we wanted to. Your master password never leaves your device, 
                and all encryption happens locally. This isn't just a feature—it's our fundamental architecture."
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white/90">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Join thousands who trust Secure Vault to protect their digital lives without compromising privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-gradient text-lg px-8 py-6"
              onClick={() => navigate('/signup')}
            >
              Create Your Vault
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => navigate('/welcome')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Secure Vault</span>
            </div>
            <div className="flex space-x-6 text-white/60">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/40">
            <p>© 2024 Secure Vault. Your privacy is our priority.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
