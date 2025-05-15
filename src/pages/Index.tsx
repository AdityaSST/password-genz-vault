
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Key, Search } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col p-4 md:p-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
            <Key className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-gradient">Secure Vault</h1>
        </div>
        
        <Button 
          onClick={() => {
            setEditingPassword(undefined);
            setShowAddPasswordForm(true);
          }}
          className="w-full md:w-auto btn-gradient text-primary-foreground gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Password
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search passwords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-white/10"
        />
      </div>
      
      {filteredPasswords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="flex flex-col items-center justify-center py-12">
          {passwords.length > 0 ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-400">No passwords match your search</p>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Key className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">No passwords yet</h2>
              <p className="text-gray-400 mb-6">Start by adding your first password to secure vault</p>
              <Button 
                onClick={() => setShowAddPasswordForm(true)}
                className="btn-gradient text-primary-foreground"
              >
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
