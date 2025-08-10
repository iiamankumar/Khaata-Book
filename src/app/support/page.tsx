
"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createSupportTicket } from "./actions"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const supportTicketSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  category: z.enum(["billing", "technical", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type SupportTicketFormValues = z.infer<typeof supportTicketSchema>

export default function SupportPage() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [supportResponse, setSupportResponse] = useState<{ ticketId: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SupportTicketFormValues>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      subject: "",
      category: "general",
      message: "",
    },
  })

  const onSubmit = (data: SupportTicketFormValues) => {
    startTransition(async () => {
        setError(null);
        setSupportResponse(null);
        const result = await createSupportTicket(data)
        if (result.ticketId) {
            setSupportResponse(result)
            toast({
                title: "Support Ticket Created",
                description: `Your ticket #${result.ticketId} has been submitted.`,
            })
            form.reset();
        } else {
            setError("Failed to create support ticket. Please try again.")
        }
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Support</h2>
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Have an issue? Fill out the form below and we'll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Issue with expense tracking" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your issue in detail..."
                        className="resize-none"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Ticket
              </Button>
            </form>
          </Form>
            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {supportResponse && (
                <Alert className="mt-4">
                    <AlertTitle>Ticket Submitted!</AlertTitle>
                    <AlertDescription>
                        <p className="font-semibold">Ticket ID: {supportResponse.ticketId}</p>
                        <p>{supportResponse.message}</p>
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
      </Card>
    </div>
  )
}
