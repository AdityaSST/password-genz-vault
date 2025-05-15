
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Key, Lock, Mail, User } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate and create an account in your backend
    if (name && email && password && agreeTerms) {
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      navigate('/login');
    } else {
      toast({
        title: "Signup failed",
        description: "Please fill in all required fields and accept the terms.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg mx-auto">
            <Key className="h-12 w-12 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-sm text-white/70">
            Start managing your passwords securely
          </p>
        </div>
        
        <div className="glass-card rounded-xl p-6 md:p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full name</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/50" />
                </div>
                <Input 
                  id="name" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10 bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/50" />
                </div>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-10 bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Create password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/50" />
                </div>
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/50" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/50" />
                  )}
                </button>
              </div>
              <p className="text-xs text-white/50 mt-1">Password must be at least 8 characters</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm text-white/80">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            
            <Button type="submit" className="w-full py-6 btn-gradient">
              Create account
            </Button>
            
            <div className="text-center text-sm text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
