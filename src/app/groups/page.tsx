import { getGroups } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GroupList } from '@/components/groups/group-list';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Group Expenses</h2>
          <p className="text-muted-foreground">
            Split bills with friends and track who owes whom.
          </p>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Create Group
        </Button>
      </div>
      <GroupList groups={groups} />
    </div>
  );
}
