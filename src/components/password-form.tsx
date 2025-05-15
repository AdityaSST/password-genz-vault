
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PasswordGenerator } from './password-generator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Password } from '@/types/password';

interface PasswordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editPassword?: Password;
  title?: string;
}

export const PasswordForm = ({
  open,
  onOpenChange,
  onSave,
  editPassword,
  title = 'Add New Password'
}: PasswordFormProps) => {
  const [formData, setFormData] = useState<Omit<Password, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    username: '',
    password: '',
    website: '',
    notes: '',
    favorite: false,
    strength: 'medium'
  });

  // Reset form when modal opens or editPassword changes
  useEffect(() => {
    if (editPassword) {
      setFormData({
        title: editPassword.title,
        username: editPassword.username,
        password: editPassword.password,
        website: editPassword.website || '',
        notes: editPassword.notes || '',
        favorite: editPassword.favorite,
        strength: editPassword.strength,
        reminderDate: editPassword.reminderDate,
        reminderInterval: editPassword.reminderInterval,
      });
    } else if (open) {
      setFormData({
        title: '',
        username: '',
        password: '',
        website: '',
        notes: '',
        favorite: false,
        strength: 'medium'
      });
    }
  }, [open, editPassword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordGenerated = (password: string) => {
    setFormData(prev => ({ 
      ...prev, 
      password,
      strength: getPasswordStrength(password)
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  // Calculate password strength
  const getPasswordStrength = (password: string) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    let strength = 0;
    if (password.length >= 12) strength += 1;
    if (hasLower && hasUpper) strength += 1;
    if (hasNumber) strength += 1;
    if (hasSymbol) strength += 1;
    
    if (strength <= 1) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 max-w-lg w-[95%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Gmail, Netflix, Bank Account"
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username / Email</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="username or email@example.com"
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="text" // Use text instead of password to see what's typed
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add notes or additional info"
                className="h-20 bg-white/5 border-white/10"
              />
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-400 mb-2">Need a strong password? Generate one below:</p>
            <PasswordGenerator onPasswordGenerate={handlePasswordGenerated} />
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="bg-white/5 hover:bg-white/10 border-white/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="btn-gradient text-primary-foreground"
            >
              {editPassword ? 'Update Password' : 'Save Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
