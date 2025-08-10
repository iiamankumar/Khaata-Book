"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Group } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

function AvatarStack({ users }: { users: Group['members'] }) {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {users.slice(0, 4).map((user) => (
        <Avatar key={user.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background" data-ai-hint="student avatar">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}


export function GroupList({ groups }: { groups: Group[] }) {
    
  // Simplified calculation for demo purposes
  const getOweStatus = (group: Group) => {
    const you = 'user-1';
    let totalOwedToYou = 0;
    let totalYouOwe = 0;

    group.expenses.forEach(expense => {
      if(expense.paidBy === you) {
        expense.split.forEach(s => {
          if(s.userId !== you) totalOwedToYou += s.amount;
        });
      } else {
        const yourShare = expense.split.find(s => s.userId === you);
        if (yourShare) {
            totalYouOwe += yourShare.amount;
        }
      }
    });

    const balance = totalOwedToYou - totalYouOwe;
    if (balance > 0) return { text: `You are owed ₹${balance.toFixed(2)}`, color: 'text-green-600' };
    if (balance < 0) return { text: `You owe ₹${Math.abs(balance).toFixed(2)}`, color: 'text-red-600' };
    return { text: 'All settled up', color: 'text-muted-foreground' };
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => {
        const totalExpenses = group.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const oweStatus = getOweStatus(group);
        return (
          <Card key={group.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <AvatarStack users={group.members} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total group spending</p>
                <Separator className="my-4" />
                <p className={`text-sm font-medium ${oweStatus.color}`}>{oweStatus.text}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">View Details</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
