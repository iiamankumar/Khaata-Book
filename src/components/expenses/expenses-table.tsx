"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Expense } from '@/lib/data';
import { getCategoryIcon } from '@/lib/data';

export function ExpensesTable({ data }: { data: Expense[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((expense) => {
            const Icon = getCategoryIcon(expense.category);
            return (
          <TableRow key={expense.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                {expense.category}
              </div>
            </TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell className="text-right font-medium">₹{expense.amount.toLocaleString()}</TableCell>
            <TableCell>{expense.date.toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant="outline">{expense.type}</Badge>
            </TableCell>
          </TableRow>
        )})}
      </TableBody>
    </Table>
  );
}
