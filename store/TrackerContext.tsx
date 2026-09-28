import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Transaction = {
  id:string;
  type:'income'|'expense';
  amount:number;
  title:string;
  category:string;
  note:string;
  date:number;
  createdAt:number;
};

type NewTransaction = Omit<Transaction,'id'|'createdAt'>;
type Ctx={transactions:Transaction[];loading:boolean;addTransaction:(t:NewTransaction)=>void;deleteTransaction:(id:string)=>void;clearAll:()=>void};

const KEY='jarvis_tracker_transactions_v1';
const TrackerContext=createContext<Ctx|null>(null);

export function TrackerProvider({children}:{children:ReactNode}){
 const [transactions,setTransactions]=useState<Transaction[]>([]);
 const [loading,setLoading]=useState(true);

 useEffect(()=>{(async()=>{try{const raw=await AsyncStorage.getItem(KEY);if(raw)setTransactions(JSON.parse(raw));}finally{setLoading(false)}})()},[]);
 useEffect(()=>{if(!loading)AsyncStorage.setItem(KEY,JSON.stringify(transactions))},[transactions,loading]);

 function addTransaction(t:NewTransaction){setTransactions(prev=>[{...t,id:Date.now().toString(36)+Math.random().toString(36).slice(2),createdAt:Date.now()},...prev])}
 function deleteTransaction(id:string){setTransactions(prev=>prev.filter(t=>t.id!==id))}
 function clearAll(){setTransactions([])}
 return <TrackerContext.Provider value={{transactions,loading,addTransaction,deleteTransaction,clearAll}}>{children}</TrackerContext.Provider>
}
export function useTracker(){const c=useContext(TrackerContext);if(!c)throw new Error('useTracker must be used inside TrackerProvider');return c;}
