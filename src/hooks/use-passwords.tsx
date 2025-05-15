
import { useState, useEffect } from 'react';
import { Password } from '@/types/password';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

// Local storage key
const STORAGE_KEY = 'password_manager_data';

export function usePasswords() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load passwords from local storage
  useEffect(() => {
    const storedPasswords = localStorage.getItem(STORAGE_KEY);
    if (storedPasswords) {
      try {
        const parsed = JSON.parse(storedPasswords);
        // Convert date strings back to Date objects
        const passwordsWithDates = parsed.map((pwd: any) => ({
          ...pwd,
          createdAt: new Date(pwd.createdAt),
          updatedAt: new Date(pwd.updatedAt),
          reminderDate: pwd.reminderDate ? new Date(pwd.reminderDate) : undefined,
        }));
        setPasswords(passwordsWithDates);
      } catch (error) {
        console.error('Failed to parse passwords', error);
        toast({
          title: "Error loading passwords",
          description: "There was a problem loading your saved passwords.",
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  }, [toast]);

  // Save passwords to local storage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
    }
  }, [passwords, loading]);

  // Add new password
  const addPassword = (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPassword: Password = {
      ...passwordData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      favorite: passwordData.favorite || false,
    };

    setPasswords(prev => [...prev, newPassword]);
    toast({
      title: "Password saved",
      description: `${newPassword.title} has been added to your vault.`,
    });
    
    return newPassword;
  };

  // Update existing password
  const updatePassword = (id: string, passwordData: Partial<Password>) => {
    setPasswords(prev => prev.map(pwd => 
      pwd.id === id 
        ? { ...pwd, ...passwordData, updatedAt: new Date() } 
        : pwd
    ));
    toast({
      title: "Password updated",
      description: "Your changes have been saved.",
    });
  };

  // Delete password
  const deletePassword = (id: string) => {
    const pwd = passwords.find(p => p.id === id);
    setPasswords(prev => prev.filter(pwd => pwd.id !== id));
    toast({
      title: "Password deleted",
      description: pwd?.title ? `${pwd.title} has been deleted.` : "Password has been deleted.",
    });
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setPasswords(prev => prev.map(pwd => 
      pwd.id === id 
        ? { ...pwd, favorite: !pwd.favorite, updatedAt: new Date() } 
        : pwd
    ));
  };

  // Set password reminder
  const setPasswordReminder = (id: string, intervalDays: number) => {
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + intervalDays);
    
    setPasswords(prev => prev.map(pwd => 
      pwd.id === id 
        ? { 
            ...pwd, 
            reminderDate, 
            reminderInterval: intervalDays,
            updatedAt: new Date() 
          } 
        : pwd
    ));

    toast({
      title: "Reminder set",
      description: `You'll be reminded to change this password in ${intervalDays} days.`,
    });
  };

  // Get passwords that need to be changed
  const getPasswordsToChange = () => {
    const today = new Date();
    return passwords.filter(pwd => 
      pwd.reminderDate && new Date(pwd.reminderDate) <= today
    );
  };

  return {
    passwords,
    loading,
    addPassword,
    updatePassword,
    deletePassword,
    toggleFavorite,
    setPasswordReminder,
    getPasswordsToChange
  };
}
