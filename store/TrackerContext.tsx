import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  title: string;
  category: string;
  note: string;
  date: number;
  createdAt: number;
};

type NewTransaction = Omit<Transaction, 'id' | 'createdAt'>;
type Ctx = {
  transactions: Transaction[];
  loading: boolean;
  addTransaction: (t: NewTransaction) => void;
  deleteTransaction: (id: string) => void;
  clearAll: () => void;
};

const KEY = 'jarvis_tracker_transactions_v1';
const TrackerContext = createContext<Ctx | null>(null);

function parseTransactions(raw: string | null): Transaction[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item): item is Transaction =>
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        (item.type === 'income' || item.type === 'expense') &&
        Number.isFinite(item.amount) &&
        typeof item.category === 'string' &&
        Number.isFinite(item.date) &&
        Number.isFinite(item.createdAt),
    );
  } catch {
    return [];
  }
}

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (mounted) setTransactions(parseTransactions(raw));
      } catch {
        if (mounted) setTransactions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    AsyncStorage.setItem(KEY, JSON.stringify(transactions)).catch(() => {});
  }, [transactions, loading]);

  function addTransaction(t: NewTransaction) {
    const now = Date.now();
    setTransactions(prev => [
      {
        ...t,
        id: now.toString(36) + Math.random().toString(36).slice(2),
        createdAt: now,
      },
      ...prev,
    ]);
  }

  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  function clearAll() {
    setTransactions([]);
  }

  return (
    <TrackerContext.Provider value={{ transactions, loading, addTransaction, deleteTransaction, clearAll }}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) throw new Error('useTracker must be used inside TrackerProvider');
  return context;
}
