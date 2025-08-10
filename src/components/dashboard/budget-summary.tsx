"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Budget, Expense } from '@/lib/data';
import { useMemo } from 'react';
import { DollarSign } from 'lucide-react';

export function BudgetSummary({ budgets, expenses }: { budgets: Budget[], expenses: Expense[] }) {
  const { totalBudget, totalSpent, remaining, percentageSpent } = useMemo(() => {
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const remaining = totalBudget - totalSpent;
    const percentageSpent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    return { totalBudget, totalSpent, remaining, percentageSpent };
  }, [budgets, expenses]);

  return (
    <Card className="lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">
          ₹{remaining.toLocaleString()} remaining
        </p>
        <Progress value={percentageSpent} className="mt-4" />
      </CardContent>
    </Card>
  );
}
