import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';


interface TransactionContextData{
  transactions: Transaction[];
  createTransaction: (transaction:TransactionInput)=>Promise<void>;
}


interface TransactionsProviderProps {
  children: ReactNode;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

export const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])


  // fazendo requst na api para trazer as infotmações do dashboard
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])



  // criando as transações/ fazendo requst na api com dados recebidos da gunc create que está no summary
  async function createTransaction(transactionInput:TransactionInput){
   const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
   const {transaction} = response.data;
   setTransactions([...transactions, transaction]);
  }


  return (
    <TransactionsContext.Provider value={{transactions,createTransaction}}  >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions(){
  const context = useContext(TransactionsContext);
  return context;
}