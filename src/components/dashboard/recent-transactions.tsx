import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Expense } from "@/lib/data"
import { getCategoryIcon } from "@/lib/data"

export function RecentTransactions({ data }: { data: Expense[] }) {
  return (
    <div className="space-y-6">
      {data.map(expense => {
        const Icon = getCategoryIcon(expense.category);
        return (
          <div key={expense.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{expense.description}</p>
              <p className="text-sm text-muted-foreground">{expense.category}</p>
            </div>
            <div className="ml-auto font-medium">-₹{expense.amount.toLocaleString()}</div>
          </div>
        )
      })}
    </div>
  )
}
