
export interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  reminderDate?: Date;
  reminderInterval?: number; // days
  favorite: boolean;
  strength: 'weak' | 'medium' | 'strong';
}

export interface PasswordCategory {
  id: string;
  name: string;
  color: string;
}
