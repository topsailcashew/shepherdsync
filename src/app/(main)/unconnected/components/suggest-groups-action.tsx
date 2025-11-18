'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { generateSuggestion } from '../actions';
import type { UnconnectedMember } from '../data/schema';
import { WandSparkles, Loader, AlertTriangle, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <WandSparkles className="mr-2 h-4 w-4" />
          Generate Suggestions
        </>
      )}
    </Button>
  );
}

export function SuggestGroupsAction({ member }: { member: UnconnectedMember }) {
  const initialState = { message: '', error: false };
  const [state, formAction] = useFormState(generateSuggestion, initialState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <WandSparkles className="mr-2 h-4 w-4" />
          Suggest Groups
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            AI Group Suggestions for{' '}
            <span className="font-headline text-primary">{member.name}</span>
          </DialogTitle>
          <DialogDescription>
            Use AI to find the best-fit connect groups for this member based on
            their profile.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Member Profile</h4>
            <div className="text-sm space-y-2">
              <p>
                <strong>Age:</strong> {member.age}
              </p>
              <p>
                <strong>Family Status:</strong> {member.familyStatus}
              </p>
              <div>
                <strong>Interests:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {member.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            {state.suggestion ? (
              <div className="space-y-4">
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Suggested Groups</AlertTitle>
                  <AlertDescription className="font-bold text-lg text-primary">
                    {state.suggestion.suggestedGroups}
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <h4 className="font-semibold">Reasoning</h4>
                  <ScrollArea className="h-32 rounded-md border p-4 bg-muted/50">
                    <p className="text-sm">{state.suggestion.reasoning}</p>
                  </ScrollArea>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-muted/50 rounded-lg p-8">
                <div className="text-center">
                  <WandSparkles className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Click "Generate Suggestions" to get AI-powered recommendations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {state.error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <form action={formAction} className="flex gap-2">
            <input type="hidden" name="memberId" value={member.id} />
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <SubmitButton />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
