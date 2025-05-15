
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Clock, ShieldAlert } from 'lucide-react';
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
    <div className="bg-gradient-to-r from-amber-500/80 to-orange-600/80 p-5 rounded-xl mb-6 animate-fade-in relative shadow-lg">
      <button 
        onClick={onDismiss} 
        className="absolute top-3 right-3 text-white/70 hover:text-white bg-white/10 rounded-full p-1"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
      
      <div className="flex items-start gap-4">
        <div className="bg-white/20 p-2 rounded-full">
          <ShieldAlert className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">
            Time to update {passwords.length} password{passwords.length > 1 ? 's' : ''}!
          </h3>
          
          <p className="text-white/90 text-sm mb-4">
            Your passwords for {passwords.slice(0, 3).map(p => p.title).join(', ')}
            {passwords.length > 3 ? ` and ${passwords.length - 3} more` : ''} are due for an update.
            Regular password changes help keep your accounts secure.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {passwords.map(password => (
              <Button 
                key={password.id}
                size="sm" 
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white gap-1"
                onClick={() => onPasswordUpdate(password)}
              >
                <Clock size={14} />
                Update {password.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
