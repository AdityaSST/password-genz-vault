
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Copy, RefreshCw } from 'lucide-react';
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
  
  return (
    <div className="w-full glass-card p-4 rounded-xl animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-gradient">Generate a Strong Password</h2>
      
      <div className="relative mb-6 bg-black/20 p-4 rounded-lg">
        <p className="text-lg font-mono break-all pr-10">{password}</p>
        <button 
          onClick={copyToClipboard}
          className="absolute top-4 right-4 text-primary hover:text-primary/80 transition-colors"
          aria-label="Copy password"
        >
          <Copy size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm">Password Length: {length}</label>
            <span className="text-sm">{strength}</span>
          </div>
          <div className="flex items-center gap-2">
            <Slider 
              value={[length]} 
              min={8} 
              max={32} 
              step={1}
              onValueChange={(vals) => setLength(vals[0])} 
              className="flex-1"
            />
            <div 
              className={`h-4 w-4 rounded-full ${strengthColors[strength as keyof typeof strengthColors]}`} 
              aria-label={`Password strength: ${strength}`}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm">Include Uppercase</label>
            <Switch checked={useUppercase} onCheckedChange={setUseUppercase} />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm">Include Numbers</label>
            <Switch checked={useNumbers} onCheckedChange={setUseNumbers} />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm">Include Symbols</label>
            <Switch checked={useSymbols} onCheckedChange={setUseSymbols} />
          </div>
        </div>
        
        <Button 
          onClick={generatePassword}
          className="w-full gap-2 btn-gradient text-primary-foreground"
        >
          <RefreshCw size={18} />
          Generate New Password
        </Button>
      </div>
    </div>
  );
};
