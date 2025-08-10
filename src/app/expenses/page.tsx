import { getExpenses } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpensesTable } from '@/components/expenses/expenses-table';
import { AddExpenseDialog } from '@/components/expenses/add-expense-dialog';

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Expense Tracker</CardTitle>
            <CardDescription>
              View and manage all your transactions.
            </CardDescription>
          </div>
          <AddExpenseDialog />
        </CardHeader>
        <CardContent>
          <ExpensesTable data={expenses} />
        </CardContent>
      </Card>
    </div>
  );
}
