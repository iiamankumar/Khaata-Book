"use client";

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { getPersonalizedSavingTips } from '@/app/actions';
import type { Expense } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function FinancialTips({ expenses }: { expenses: Expense[] }) {
  const [isPending, startTransition] = useTransition();
  const [tips, setTips] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetTips = () => {
    startTransition(async () => {
      setError(null);
      const spendingHabits = `The user has the following recent expenses:\n${expenses
        .slice(0, 10)
        .map(
          (e) => `- ${e.description} (${e.category}): ₹${e.amount}`
        )
        .join('\n')}`;
      
      const result = await getPersonalizedSavingTips({ spendingHabits });
      if (result.tips) {
        setTips(result.tips);
      } else {
        setError('Could not generate tips. Please try again.');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Personalized Finance Tips
        </CardTitle>
        <CardDescription>
          Get AI-driven tips for saving money based on your spending.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[10rem] flex items-center justify-center">
        {isPending ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        ) : tips ? (
          <div className="prose prose-sm max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: tips.replace(/\n/g, '<br />') }} />
        ) : error ? (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        ) : (
          <p className="text-sm text-muted-foreground">Click the button to generate your personalized tips!</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetTips} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Tips
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
