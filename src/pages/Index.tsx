
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Key, Search, ShieldCheck, Lock, PlusCircle } from 'lucide-react';
import { usePasswords } from '@/hooks/use-passwords';
import { PasswordCard } from '@/components/password-card';
import { PasswordForm } from '@/components/password-form';
import { ReminderDialog } from '@/components/reminder-dialog';
import { PasswordReminderBanner } from '@/components/password-reminder-banner';
import { Password } from '@/types/password';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { 
    passwords, 
    addPassword, 
    updatePassword, 
    deletePassword,
    setPasswordReminder,
    getPasswordsToChange
  } = usePasswords();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddPasswordForm, setShowAddPasswordForm] = useState(false);
  const [editingPassword, setEditingPassword] = useState<Password | undefined>(undefined);
  const [reminderPassword, setReminderPassword] = useState<{ id: string, title: string } | null>(null);
  const [showReminders, setShowReminders] = useState(true);
  const { toast } = useToast();

  // Filter passwords based on search query
  const filteredPasswords = passwords.filter(password => {
    const query = searchQuery.toLowerCase();
    return (
      password.title.toLowerCase().includes(query) ||
      password.username.toLowerCase().includes(query) ||
      (password.website && password.website.toLowerCase().includes(query))
    );
  });

  // Handle saving a new password
  const handleSavePassword = (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    addPassword(passwordData);
  };
  
  // Handle editing a password
  const handleEditPassword = (password: Password) => {
    setEditingPassword(password);
    setShowAddPasswordForm(true);
  };
  
  // Handle updating an existing password
  const handleUpdatePassword = (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPassword) {
      updatePassword(editingPassword.id, passwordData);
    }
  };
  
  // Handle setting a reminder
  const handleSetReminder = (passwordId: string, title: string) => {
    setReminderPassword({ id: passwordId, title });
  };
  
  // Get passwords that need to be changed
  const passwordsToChange = getPasswordsToChange();
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">Secure Vault</h1>
            <p className="text-xs text-white/60">Your personal password manager</p>
          </div>
        </div>
        
        <Button 
          onClick={() => {
            setEditingPassword(undefined);
            setShowAddPasswordForm(true);
          }}
          className="w-full md:w-auto btn-gradient text-primary-foreground gap-2 py-6 px-5"
        >
          <Plus className="h-5 w-5" />
          Add New Password
        </Button>
      </header>
      
      {showReminders && passwordsToChange.length > 0 && (
        <PasswordReminderBanner 
          passwords={passwordsToChange}
          onDismiss={() => setShowReminders(false)}
          onPasswordUpdate={handleEditPassword}
        />
      )}
      
      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Search by title, username or website..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 py-6 text-base"
        />
      </div>

      <div className="py-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock className="h-5 w-5" />
          {searchQuery ? `Search Results (${filteredPasswords.length})` : `Your Passwords (${passwords.length})`}
        </h2>
      </div>
      
      {filteredPasswords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPasswords.map((password) => (
            <PasswordCard
              key={password.id}
              password={password}
              onDelete={deletePassword}
              onEdit={handleEditPassword}
              onReminderSet={(id) => handleSetReminder(id, password.title)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-black/20 rounded-xl border border-white/5">
          {passwords.length > 0 ? (
            <div className="text-center px-4">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 mx-auto">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-lg font-semibold text-gray-300">No passwords match your search</p>
              <p className="text-gray-500 mb-6">Try different keywords or clear your search</p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="bg-white/5 hover:bg-white/10 border-white/10"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="text-center px-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-5 mx-auto border border-white/10">
                <Key className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No passwords yet</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Your passwords are safely stored and encrypted on this device. Start by adding your first password to secure vault.</p>
              <Button 
                onClick={() => setShowAddPasswordForm(true)}
                className="btn-gradient text-primary-foreground gap-2 py-6 px-6"
              >
                <PlusCircle className="h-5 w-5" />
                Add Your First Password
              </Button>
            </div>
          )}
        </div>
      )}
      
      <PasswordForm
        open={showAddPasswordForm}
        onOpenChange={setShowAddPasswordForm}
        onSave={editingPassword ? handleUpdatePassword : handleSavePassword}
        editPassword={editingPassword}
        title={editingPassword ? 'Edit Password' : 'Add New Password'}
      />
      
      {reminderPassword && (
        <ReminderDialog
          passwordId={reminderPassword.id}
          passwordTitle={reminderPassword.title}
          open={!!reminderPassword}
          onOpenChange={() => setReminderPassword(null)}
          onSetReminder={setPasswordReminder}
        />
      )}
    </div>
  );
};

export default Index;
