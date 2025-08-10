import { getBudgets, getExpenses } from '@/lib/data';
import { BudgetTracker } from '@/components/budget/budget-tracker';

export default async function BudgetPage() {
  const budgets = await getBudgets();
  const expenses = await getExpenses();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Budgeting Tool</h2>
          <p className="text-muted-foreground">
            Set spending goals and stay on track.
          </p>
        </div>
      </div>
      <BudgetTracker budgets={budgets} expenses={expenses} />
    </div>
  );
}
