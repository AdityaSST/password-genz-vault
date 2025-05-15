
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Copy, Calendar, Trash, Edit } from 'lucide-react';
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
        return 'bg-red-500/20 text-red-300';
      case 'medium': 
        return 'bg-yellow-500/20 text-yellow-300';
      case 'strong': 
        return 'bg-green-500/20 text-green-300';
      default: 
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <>
      <Card className="glass-card border-white/5 overflow-hidden animate-fade-in">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-white text-lg">{password.title}</h3>
              <p className="text-sm text-gray-400">{password.username}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getStrengthBadgeStyle()}`}>
              {password.strength}
            </span>
          </div>

          <div className="bg-black/20 p-2 rounded flex items-center gap-2">
            <div className="flex-1 font-mono text-sm truncate">
              {showPassword ? password.password : '••••••••••••••••'}
            </div>
            <button 
              onClick={togglePasswordVisibility} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button 
              onClick={copyToClipboard} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Copy password"
            >
              <Copy size={18} />
            </button>
          </div>
          
          {password.website && (
            <p className="text-xs text-gray-400 truncate">
              {password.website}
            </p>
          )}
          
          {getReminderText() && (
            <div className="flex items-center gap-1 text-xs">
              <Calendar size={14} />
              {getReminderText()}
            </div>
          )}
          
          <div className="flex justify-between gap-2 pt-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1 flex-1 bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash size={14} />
              Delete
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1 flex-1 bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => onEdit(password)}
            >
              <Edit size={14} />
              Edit
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1 flex-1 bg-white/5 hover:bg-white/10 border-white/10"
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
