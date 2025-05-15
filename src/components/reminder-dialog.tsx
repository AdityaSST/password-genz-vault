
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
import { Calendar } from 'lucide-react';

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
      <DialogContent className="glass-card border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Set Password Reminder</span>
          </DialogTitle>
          <DialogDescription>
            Set a reminder to change your password for "{passwordTitle}" periodically.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            defaultValue={reminderInterval.toString()} 
            onValueChange={(value) => setReminderInterval(parseInt(value))}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30" id="days-30" />
              <Label htmlFor="days-30" className="cursor-pointer">Every 30 days (Recommended)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60" id="days-60" />
              <Label htmlFor="days-60" className="cursor-pointer">Every 60 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="90" id="days-90" />
              <Label htmlFor="days-90" className="cursor-pointer">Every 90 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="180" id="days-180" />
              <Label htmlFor="days-180" className="cursor-pointer">Every 6 months</Label>
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="bg-white/5 hover:bg-white/10 border-white/10"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="btn-gradient text-primary-foreground"
          >
            Set Reminder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
