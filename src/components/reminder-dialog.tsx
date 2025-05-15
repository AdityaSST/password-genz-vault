
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Check } from 'lucide-react';

interface ReminderDialogProps {
  passwordId: string;
  passwordTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetReminder: (id: string, days: number) => void;
}

export const ReminderDialog = ({
  passwordId,
  passwordTitle,
  open,
  onOpenChange,
  onSetReminder
}: ReminderDialogProps) => {
  const [reminderInterval, setReminderInterval] = useState<number>(30);
  
  const handleSave = () => {
    onSetReminder(passwordId, reminderInterval);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 max-w-md">
        <DialogHeader>
          <div className="bg-primary/20 w-fit p-2 rounded-full mx-auto mb-2">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Set Password Reminder</DialogTitle>
          <DialogDescription className="text-center">
            We'll remind you when it's time to change your password for<br />
            <span className="font-medium text-white">{passwordTitle}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            defaultValue={reminderInterval.toString()} 
            onValueChange={(value) => setReminderInterval(parseInt(value))}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
              <RadioGroupItem value="30" id="days-30" className="text-primary" />
              <Label htmlFor="days-30" className="cursor-pointer flex items-center w-full justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>Every 30 days</span>
                </div>
                <span className="text-xs bg-primary/20 py-1 px-2 rounded-full text-primary">Recommended</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
              <RadioGroupItem value="60" id="days-60" className="text-primary" />
              <Label htmlFor="days-60" className="cursor-pointer flex items-center gap-2 w-full">
                <Clock size={16} />
                <span>Every 60 days</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
              <RadioGroupItem value="90" id="days-90" className="text-primary" />
              <Label htmlFor="days-90" className="cursor-pointer flex items-center gap-2 w-full">
                <Clock size={16} />
                <span>Every 90 days</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
              <RadioGroupItem value="180" id="days-180" className="text-primary" />
              <Label htmlFor="days-180" className="cursor-pointer flex items-center gap-2 w-full">
                <Clock size={16} />
                <span>Every 6 months</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="bg-white/5 hover:bg-white/10 border-white/10 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="btn-gradient text-primary-foreground gap-2 w-full sm:w-auto"
          >
            <Check size={16} />
            Set Reminder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
