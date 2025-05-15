
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Copy, RefreshCw, Check, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PasswordGeneratorProps {
  onPasswordGenerate?: (password: string) => void;
}

export const PasswordGenerator = ({ onPasswordGenerate }: PasswordGeneratorProps) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Generate password when component mounts or settings change
  useEffect(() => {
    generatePassword();
  }, [length, useNumbers, useSymbols, useUppercase]);
  
  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase;
    if (useUppercase) chars += uppercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    
    setPassword(newPassword);
    setCopied(false);
    if (onPasswordGenerate) {
      onPasswordGenerate(newPassword);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast({
        title: "Password copied!",
        description: "Password has been copied to clipboard",
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Calculate password strength
  const getPasswordStrength = () => {
    let strength = 0;
    if (length >= 12) strength += 1;
    if (useUppercase) strength += 1;
    if (useNumbers) strength += 1;
    if (useSymbols) strength += 1;
    
    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    return 'strong';
  };
  
  const strength = getPasswordStrength();
  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const strengthEmojis = {
    weak: '😟',
    medium: '😐',
    strong: '😀',
  };
  
  return (
    <div className="w-full glass-card p-5 rounded-xl animate-fade-in shadow-lg border-white/10 border-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gradient flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Password Generator
        </h2>
        <span className="text-sm bg-white/10 py-1 px-3 rounded-full">
          {strengthEmojis[strength as keyof typeof strengthEmojis]} {strength}
        </span>
      </div>
      
      <div className="relative mb-6 bg-black/30 p-4 rounded-lg border border-white/10 transition-all hover:border-primary/50">
        <p className="text-lg font-mono break-all pr-10">{password}</p>
        <button 
          onClick={copyToClipboard}
          className="absolute top-4 right-4 text-primary hover:text-primary/80 transition-colors"
          aria-label="Copy password"
        >
          {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm">Password Length: {length}</label>
            <span className="text-sm capitalize">{strength}</span>
          </div>
          <div className="flex items-center gap-3">
            <Slider 
              value={[length]} 
              min={8} 
              max={32} 
              step={1}
              onValueChange={(vals) => setLength(vals[0])} 
              className="flex-1"
            />
            <div 
              className={`h-5 w-5 rounded-full ${strengthColors[strength as keyof typeof strengthColors]} animate-pulse`} 
              aria-label={`Password strength: ${strength}`}
            />
          </div>
        </div>
        
        <div className="space-y-4 bg-black/20 p-4 rounded-lg border border-white/5">
          <p className="text-sm text-white/70 mb-2">Password Options:</p>
          
          <div className="flex items-center justify-between">
            <label className="text-sm flex items-center gap-2">
              <span className="bg-primary/20 p-1 rounded">ABC</span>
              Include Uppercase
            </label>
            <Switch 
              checked={useUppercase} 
              onCheckedChange={setUseUppercase}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm flex items-center gap-2">
              <span className="bg-primary/20 p-1 rounded">123</span>
              Include Numbers
            </label>
            <Switch 
              checked={useNumbers} 
              onCheckedChange={setUseNumbers}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm flex items-center gap-2">
              <span className="bg-primary/20 p-1 rounded">!@#</span>
              Include Symbols
            </label>
            <Switch 
              checked={useSymbols} 
              onCheckedChange={setUseSymbols}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
        
        <Button 
          onClick={generatePassword}
          className="w-full gap-2 btn-gradient text-primary-foreground py-6 text-base font-medium"
        >
          <RefreshCw size={18} className="animate-pulse" />
          Generate New Password
        </Button>
      </div>
    </div>
  );
};
