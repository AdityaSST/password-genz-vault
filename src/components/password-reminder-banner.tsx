
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Password } from '@/types/password';

interface PasswordReminderBannerProps {
  passwords: Password[];
  onDismiss: () => void;
  onPasswordUpdate: (password: Password) => void;
}

export const PasswordReminderBanner = ({ 
  passwords, 
  onDismiss,
  onPasswordUpdate
}: PasswordReminderBannerProps) => {
  if (passwords.length === 0) return null;
  
  return (
    <div className="bg-gradient-to-r from-amber-500/80 to-orange-600/80 p-4 rounded-lg mb-4 animate-fade-in relative">
      <button 
        onClick={onDismiss} 
        className="absolute top-2 right-2 text-white/70 hover:text-white"
        aria-label="Close notification"
      >
        <X size={20} />
      </button>
      
      <h3 className="text-white font-semibold text-lg mb-1">
        Time to update {passwords.length} password{passwords.length > 1 ? 's' : ''}!
      </h3>
      
      <p className="text-white/90 text-sm mb-3">
        Your passwords for {passwords.map(p => p.title).join(', ')} are due for an update.
        Regular password changes help keep your accounts secure.
      </p>
      
      <div className="flex flex-wrap gap-2">
        {passwords.map(password => (
          <Button 
            key={password.id}
            size="sm" 
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => onPasswordUpdate(password)}
          >
            Update {password.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
