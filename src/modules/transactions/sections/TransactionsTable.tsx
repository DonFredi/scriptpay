"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionWrapper from "@/shared/components/shared/SectionWrapper";
import type Transaction from "@/types";

interface TransactionsTableProps {
  transactions: Transaction[];
  loading: boolean;
}

const formatDate = (timestamp: any) => {
  if (!timestamp?.toDate) return "-";
  return timestamp.toDate().toLocaleString();
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "success":
      return "text-green-600 font-medium";
    case "failed":
      return "text-red-600 font-medium";
    default:
      return "text-yellow-600 font-medium";
  }
};

const TransactionsTable = ({ transactions, loading }: TransactionsTableProps) => {
  if (loading) {
    return <div>Loading Transactions...</div>;
  }
  console.log(transactions);
  return (
    <SectionWrapper>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">ID</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium"> {transaction.id.slice(0, 10)}...</TableCell>
                <TableCell>{transaction.phone}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell className="text-right">{formatDate(transaction.createdAt)} </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </SectionWrapper>
  );
};
export default TransactionsTable;
