interface User {}
export default interface Transaction {
  id: string;
  clientId: string;
  receipt?: string;
  resultDesc: string;
  phone?: string;
  amount?: number;
  isTest: boolean;
  fee?: number;
  netAmount?: number;
  transactionType?: string;
  status: "pending" | "success" | "failed";
  merchantRequestId?: string;
  createdAt: any; // Firestore Timestamp
  completedAt: any;
  updatedAt?: any;
}
