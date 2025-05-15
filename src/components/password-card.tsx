
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Copy, Calendar, Trash, Edit, CheckCircle, Lock } from 'lucide-react';
import { Password } from '@/types/password';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PasswordCardProps {
  password: Password;
  onDelete: (id: string) => void;
  onEdit: (password: Password) => void;
  onReminderSet: (id: string, days: number) => void;
}

export const PasswordCard = ({ 
  password, 
  onDelete, 
  onEdit,
  onReminderSet
}: PasswordCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password.password);
    toast({
      title: "Password copied",
      description: "Password copied to clipboard",
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getReminderText = () => {
    if (!password.reminderDate) return null;
    
    const now = new Date();
    const reminderDate = new Date(password.reminderDate);
    const diffTime = reminderDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return <span className="text-red-500">Password change overdue</span>;
    }
    
    return <span>Change in {diffDays} day{diffDays !== 1 ? 's' : ''}</span>;
  };

  // Different style for different strength
  const getStrengthBadgeStyle = () => {
    switch (password.strength) {
      case 'weak': 
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': 
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'strong': 
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: 
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <>
      <Card className="glass-card border-white/5 overflow-hidden animate-fade-in hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className="bg-primary/20 p-2 rounded-full">
                <Lock size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">{password.title}</h3>
                <p className="text-sm text-gray-400">{password.username}</p>
              </div>
            </div>
            <span className={`text-xs px-3 py-1.5 rounded-full border ${getStrengthBadgeStyle()}`}>
              {password.strength}
            </span>
          </div>

          <div className="bg-black/30 p-3 rounded-lg flex items-center gap-3 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex-1 font-mono text-sm truncate">
              {showPassword ? password.password : '••••••••••••••••'}
            </div>
            <button 
              onClick={togglePasswordVisibility} 
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button 
              onClick={copyToClipboard} 
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Copy password"
            >
              {copied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>
          
          {password.website && (
            <p className="text-xs text-gray-400 truncate bg-white/5 p-2 rounded">
              {password.website}
            </p>
          )}
          
          {getReminderText() && (
            <div className="flex items-center gap-2 text-xs bg-primary/10 p-2 rounded">
              <Calendar size={14} className="text-primary" />
              {getReminderText()}
            </div>
          )}
          
          <div className="flex justify-between gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1 flex-1 bg-white/5 hover:bg-red-500/20 hover:text-red-300 border-white/10"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash size={14} />
              Delete
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1 flex-1 bg-white/5 hover:bg-primary/20 hover:text-primary border-white/10"
              onClick={() => onEdit(password)}
            >
              <Edit size={14} />
              Edit
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1 flex-1 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border-white/10"
              onClick={() => onReminderSet(password.id, 30)}
            >
              <Calendar size={14} />
              Remind
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="glass-card border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Password</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{password.title}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 hover:bg-white/10 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => onDelete(password.id)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
