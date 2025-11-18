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

  const fullName = `${member.firstName} ${member.lastName}`;
  const age = member.dateOfBirth
    ? Math.floor((Date.now() - new Date(member.dateOfBirth).getTime()) / 31557600000)
    : 'Unknown';
  const familyStatus = member.maritalStatus?.replace(/_/g, ' ') || 'Not specified';
  const interests = member.interests || [];

  // Prepare member data string for AI
  const memberDataString = `Name: ${fullName}, Age: ${age}, Interests: ${interests.join(', ')}, Family Status: ${familyStatus}`;
  // TODO: Fetch available groups from API
  const availableGroupsString = 'Sample groups data - to be fetched from API';

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
            <span className="font-headline text-primary">{fullName}</span>
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
                <strong>Age:</strong> {age}
              </p>
              <p>
                <strong>Family Status:</strong> {familyStatus}
              </p>
              <div>
                <strong>Interests:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {interests.length > 0 ? (
                    interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No interests listed</span>
                  )}
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
            <input type="hidden" name="memberData" value={memberDataString} />
            <input type="hidden" name="availableGroups" value={availableGroupsString} />
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
