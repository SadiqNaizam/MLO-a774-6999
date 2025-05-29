import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label'; // Not explicitly used for checkbox label here
// import { Check } from 'lucide-react'; // Shadcn Checkbox handles its own icon

interface Question {
  id: string;
  text: string;
  subtext?: string; // Subtext is optional
}

const assessmentQuestions: Question[] = [
  { id: 'q1', text: "Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?", subtext: "(Looks for curiosity and initiative)" },
  { id: 'q2', text: "How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?", subtext: "(Assesses awareness and interest)" },
  { id: 'q3', text: "Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)", subtext: "(Gauges willingness to experiment)" },
  { id: 'q4', text: "Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?", subtext: "(Tests ability to identify practical AI opportunities)" },
  { id: 'q5', text: "Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?", subtext: "(Evaluates adaptability)" },
  { id: 'q6', text: "Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step", subtext: "(Demonstrates practical application skill)" }, // Added a plausible subtext
];

type QuestionRelevance = 'relevant' | 'non-relevant' | 'none';

interface QuestionRelevanceState {
  [questionId: string]: QuestionRelevance;
}

interface QuestionListProps {
  className?: string;
  onRelevanceChange?: (questionId: string, relevance: QuestionRelevance) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ className, onRelevanceChange }) => {
  const [relevance, setRelevance] = useState<QuestionRelevanceState>(() => {
    const initialState: QuestionRelevanceState = {};
    assessmentQuestions.forEach(q => {
      initialState[q.id] = 'none'; // Default to 'none'
    });
    return initialState;
  });

  const handleRelevanceSelection = useCallback((questionId: string, selectedType: 'relevant' | 'non-relevant') => {
    setRelevance(prev => {
      const currentStatus = prev[questionId];
      const newStatus = currentStatus === selectedType ? 'none' : selectedType;
      
      if (onRelevanceChange) {
        onRelevanceChange(questionId, newStatus);
      }
      return { ...prev, [questionId]: newStatus };
    });
  }, [onRelevanceChange]);

  return (
    <div className={cn("space-y-1", className)}> {/* gap-3 in mainContent.questionSection */} 
      <div className="flex justify-end items-center mb-3 pr-1 sm:pr-0"> {/* Adjust pr for alignment if needed */} 
        <div className="flex gap-x-4" style={{ paddingRight: 'calc( (1.5rem * 2 + 1rem) / 2 - (5rem / 2) + 5rem - 1.25rem )' }}> {/* Rough alignment hack based on w-20 (5rem) and checkbox size (1.5rem) */} 
          {/* A more robust alignment would use grid or ensure consistent widths and paddings. This is an attempt to match visual */} 
          <div className="w-20 text-center text-xs sm:text-sm font-medium text-muted-foreground">Relevant</div>
          <div className="w-20 text-center text-xs sm:text-sm font-medium text-muted-foreground">Non-Relevant</div>
        </div>
      </div>
      {assessmentQuestions.map((question, index) => (
        <div key={question.id} className="flex items-start sm:items-center justify-between gap-2 sm:gap-4 py-4 border-b border-border last:border-b-0">
          <div className="flex items-start gap-2 sm:gap-3 flex-grow">
            <span className="text-base sm:text-lg font-semibold text-primary pt-0.5 sm:pt-0 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <div className="flex-1">
              <p className="text-sm sm:text-base text-foreground">{question.text}</p>
              {question.subtext && <p className="text-xs sm:text-sm text-muted-foreground mt-1">{question.subtext}</p>}
            </div>
          </div>
          
          <div className="flex gap-x-4 shrink-0">
            <div className="w-20 flex justify-center items-center">
              <Checkbox
                id={`${question.id}-relevant`}
                checked={relevance[question.id] === 'relevant'}
                onCheckedChange={() => handleRelevanceSelection(question.id, 'relevant')}
                aria-label={`Mark question ${index + 1} as relevant`}
                className="h-5 w-5 sm:h-6 sm:w-6 rounded border-input data-[state=checked]:bg-transparent data-[state=checked]:text-accent data-[state=checked]:border-accent"
              />
            </div>
            <div className="w-20 flex justify-center items-center">
              <Checkbox
                id={`${question.id}-non-relevant`}
                checked={relevance[question.id] === 'non-relevant'}
                onCheckedChange={() => handleRelevanceSelection(question.id, 'non-relevant')}
                aria-label={`Mark question ${index + 1} as non-relevant`}
                className="h-5 w-5 sm:h-6 sm:w-6 rounded border-input data-[state=checked]:bg-transparent data-[state=checked]:text-accent data-[state=checked]:border-accent"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
