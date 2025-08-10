import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getBudgets, getExpenses, getGroups, getRecentExpenses } from '@/lib/data';
import { BudgetSummary } from '@/components/dashboard/budget-summary';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { FinancialTips } from '@/components/dashboard/financial-tips';

export default async function DashboardPage() {
  const expenses = await getExpenses();
  const recentExpenses = await getRecentExpenses(5);
  const budgets = await getBudgets();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BudgetSummary budgets={budgets} expenses={expenses} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Spending Insights</CardTitle>
            <CardDescription>
              A visual breakdown of your spending habits.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <SpendingChart data={expenses} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your last 5 transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions data={recentExpenses} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <FinancialTips expenses={expenses} />
      </div>
    </div>
  );
}
