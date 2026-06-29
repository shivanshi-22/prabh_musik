import { localUsers, logActivity } from './db';
import { User } from '../types/admin';

export async function getUsers(): Promise<User[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...localUsers];
}

export async function getUserById(id: string): Promise<User | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return localUsers.find(user => user.id === id);
}

export async function blockUser(id: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const user = localUsers.find(u => u.id === id);
  if (!user) {
    throw new Error(`Customer with ID ${id} not found`);
  }

  user.status = 'BLOCKED';
  logActivity(`Customer ${user.name} was BLOCKED by administrator`, 'system');
  
  return user;
}

export async function unblockUser(id: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const user = localUsers.find(u => u.id === id);
  if (!user) {
    throw new Error(`Customer with ID ${id} not found`);
  }

  user.status = 'ACTIVE';
  logActivity(`Customer ${user.name} was UNBLOCKED by administrator`, 'system');
  
  return user;
}
