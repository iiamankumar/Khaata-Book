import { Utensils, Bus, ShoppingCart, Tv, BookOpen, Shirt, Landmark, Fuel } from 'lucide-react';

// Types
export interface Expense {
  id: string;
  category: 'Food' | 'Transport' | 'Shopping' | 'Entertainment' | 'Education' | 'Other';
  description: string;
  amount: number;
  date: Date;
  type: 'UPI' | 'Cash' | 'Card';
}

export interface Budget {
  category: Expense['category'];
  amount: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  expenses: GroupExpense[];
}

export interface GroupExpense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // User ID
  split: { userId: string; amount: number }[];
}


// Mock Data
const users: User[] = [
  { id: 'user-1', name: 'You', avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 'user-2', name: 'Rohan', avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 'user-3', name: 'Priya', avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 'user-4', name: 'Amit', avatarUrl: 'https://placehold.co/40x40.png' },
];

const expenses: Expense[] = [
  { id: 'exp-1', category: 'Food', description: 'Canteen Lunch', amount: 80, date: new Date('2024-07-22'), type: 'UPI' },
  { id: 'exp-2', category: 'Transport', description: 'Bus to College', amount: 20, date: new Date('2024-07-22'), type: 'Cash' },
  { id: 'exp-3', category: 'Education', description: 'Photocopy Notes', amount: 50, date: new Date('2024-07-21'), type: 'UPI' },
  { id: 'exp-4', category: 'Entertainment', description: 'Movie Ticket', amount: 250, date: new Date('2024-07-20'), type: 'Card' },
  { id: 'exp-5', category: 'Food', description: 'Evening Snacks', amount: 60, date: new Date('2024-07-20'), type: 'UPI' },
  { id: 'exp-6', category: 'Shopping', description: 'New T-shirt', amount: 500, date: new Date('2024-07-19'), type: 'Card' },
  { id: 'exp-7', category: 'Other', description: 'Rent Contribution', amount: 3000, date: new Date('2024-07-18'), type: 'UPI' },
  { id: 'exp-8', category: 'Food', description: 'Pizza with friends', amount: 400, date: new Date('2024-07-18'), type: 'UPI' },
  { id: 'exp-9', category: 'Transport', description: 'Auto to market', amount: 100, date: new Date('2024-07-17'), type: 'Cash' },
  { id: 'exp-10', category: 'Education', description: 'New Notebook', amount: 120, date: new Date('2024-07-16'), type: 'Card' },
];

const budgets: Budget[] = [
    { category: 'Food', amount: 3000 },
    { category: 'Transport', amount: 500 },
    { category: 'Shopping', amount: 1500 },
    { category: 'Entertainment', amount: 1000 },
    { category: 'Education', amount: 500 },
    { category: 'Other', amount: 3500 },
];

const groups: Group[] = [
  {
    id: 'group-1',
    name: 'Hostel Mates',
    members: users.slice(0, 3),
    expenses: [
      { id: 'gexp-1', description: 'Weekend Dinner', amount: 1200, paidBy: 'user-2', split: [{ userId: 'user-1', amount: 400 }, { userId: 'user-2', amount: 400 }, { userId: 'user-3', amount: 400 }] },
      { id: 'gexp-2', description: 'Netflix Subscription', amount: 199, paidBy: 'user-3', split: [{ userId: 'user-1', amount: 66.33 }, { userId: 'user-2', amount: 66.33 }, { userId: 'user-3', amount: 66.34 }] },
    ]
  },
  {
    id: 'group-2',
    name: 'Trek Buddies',
    members: [users[0], users[3]],
    expenses: [
      { id: 'gexp-3', description: 'Travel to Lonavala', amount: 800, paidBy: 'user-1', split: [{ userId: 'user-1', amount: 400 }, { userId: 'user-4', amount: 400 }] }
    ]
  }
];

export const getCategoryIcon = (category: Expense['category']) => {
  switch (category) {
    case 'Food': return Utensils;
    case 'Transport': return Bus;
    case 'Shopping': return ShoppingCart;
    case 'Entertainment': return Tv;
    case 'Education': return BookOpen;
    default: return Landmark;
  }
};


// API-like functions
export async function getExpenses(): Promise<Expense[]> {
  return new Promise(resolve => setTimeout(() => resolve(expenses.sort((a,b) => b.date.getTime() - a.date.getTime())), 50));
}

export async function getRecentExpenses(count: number): Promise<Expense[]> {
  return new Promise(resolve => setTimeout(() => resolve(expenses.sort((a,b) => b.date.getTime() - a.date.getTime()).slice(0, count)), 50));
}

export async function getBudgets(): Promise<Budget[]> {
  return new Promise(resolve => setTimeout(() => resolve(budgets), 50));
}

export async function getGroups(): Promise<Group[]> {
    return new Promise(resolve => setTimeout(() => resolve(groups), 50));
}
