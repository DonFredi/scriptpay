"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where, Query } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import type Transaction from "@/types";

interface UseTransactionsProps {
  clientId?: string;
  isAdmin?: boolean;
}

export const useTransactions = ({ clientId, isAdmin = false }: UseTransactionsProps = {}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let transactionsQuery: Query;

    if (isAdmin) {
      transactionsQuery = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
    } else {
      if (!clientId) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      transactionsQuery = query(
        collection(db, "transactions"),
        where("clientId", "==", clientId),
        orderBy("createdAt", "desc"),
      );
    }

    const unsubscribe = onSnapshot(
      transactionsQuery,
      (snapshot) => {
        const data: Transaction[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Transaction, "id">),
        }));

        setTransactions(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [clientId, isAdmin]);

  return {
    transactions,
    loading,
    error,
  };
};
