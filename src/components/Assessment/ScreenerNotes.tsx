import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ScreenerNotesProps {
  className?: string;
  initialNotes?: string;
  onNotesChange?: (notes: string) => void;
}

const ScreenerNotes: React.FC<ScreenerNotesProps> = ({ className, initialNotes = "", onNotesChange }) => {
  const [notes, setNotes] = useState<string>(initialNotes);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    if (onNotesChange) {
      onNotesChange(newNotes);
    }
  }, [onNotesChange]);

  return (
    <div className={cn("w-full mt-4 sm:mt-6", className)}> 
      <Label htmlFor="screener-notes" className="text-base sm:text-lg font-medium text-foreground mb-2 block">
        Screener Notes / Comments:
      </Label>
      <Textarea
        id="screener-notes"
        value={notes}
        onChange={handleChange}
        placeholder="Enter qualitative feedback and observations here..."
        className="min-h-[100px] sm:min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        rows={5} 
      />
    </div>
  );
};

export default ScreenerNotes;
