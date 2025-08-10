"use client";

import { useMemo } from 'react';
import type { Budget, Expense } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getCategoryIcon } from '@/lib/data';
import { cn } from '@/lib/utils';

export function BudgetTracker({ budgets, expenses }: { budgets: Budget[]; expenses: Expense[] }) {
  const budgetStatus = useMemo(() => {
    return budgets.map(budget => {
      const spent = expenses
        .filter(e => e.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0);
      const remaining = budget.amount - spent;
      const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
      return { ...budget, spent, remaining, percentage };
    });
  }, [budgets, expenses]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgetStatus.map(budget => {
        const Icon = getCategoryIcon(budget.category);
        const isOverBudget = budget.percentage > 100;
        return (
          <Card key={budget.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                {budget.category}
              </CardTitle>
              <CardDescription>
                Target: ₹{budget.amount.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={Math.min(budget.percentage, 100)} className={cn(isOverBudget && '[&>div]:bg-destructive')} />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>Spent: ₹{budget.spent.toLocaleString()}</span>
                <span className={cn(isOverBudget ? 'text-destructive font-bold' : 'text-green-600 font-medium')}>
                    {isOverBudget 
                        ? `Over by ₹${Math.abs(budget.remaining).toLocaleString()}` 
                        : `₹${budget.remaining.toLocaleString()} left`
                    }
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
