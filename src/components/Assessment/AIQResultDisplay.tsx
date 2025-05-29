import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type AIQLevel = 'High' | 'Medium' | 'Low' | null;

interface AIQResultDisplayProps {
  className?: string;
  level: AIQLevel; 
}

const AIQResultDisplay: React.FC<AIQResultDisplayProps> = ({ className, level }) => {
  const levelsData: { value: Exclude<AIQLevel, null>; label: string }[] = [
    { value: 'High' as const, label: 'High' },
    { value: 'Medium' as const, label: 'Medium' },
    { value: 'Low' as const, label: 'Low' },
  ];

  return (
    <div className={cn("mt-4 sm:mt-6", className)}> 
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <span className="text-base sm:text-lg font-medium text-foreground mb-2 sm:mb-0">AIQ Level:</span>
        <div className="flex space-x-4 sm:space-x-6">
          {levelsData.map((lvlData) => {
            const isChecked = level === lvlData.value;
            let checkboxSpecificClass = "";
            let labelSpecificClass = "text-muted-foreground";

            if (isChecked) {
              if (lvlData.value === 'High') {
                checkboxSpecificClass = "border-accent data-[state=checked]:text-accent";
                labelSpecificClass = "text-accent font-semibold";
              } else if (lvlData.value === 'Medium') {
                checkboxSpecificClass = "border-yellow-400 data-[state=checked]:text-yellow-400";
                labelSpecificClass = "text-yellow-400 font-semibold";
              } else if (lvlData.value === 'Low') {
                checkboxSpecificClass = "border-destructive data-[state=checked]:text-destructive";
                labelSpecificClass = "text-destructive font-semibold";
              }
            }

            return (
              <div key={lvlData.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`aiq-${lvlData.value.toLowerCase()}`}
                  checked={isChecked}
                  aria-labelledby={`aiq-${lvlData.value.toLowerCase()}-label`}
                  disabled // These are for display, not interaction
                  className={cn(
                    "h-5 w-5 rounded border-input",
                    isChecked && "data-[state=checked]:bg-transparent",
                    checkboxSpecificClass
                  )}
                />
                <Label
                  htmlFor={`aiq-${lvlData.value.toLowerCase()}`}
                  id={`aiq-${lvlData.value.toLowerCase()}-label`}
                  className={cn("text-sm sm:text-base cursor-default", labelSpecificClass)}
                >
                  {lvlData.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-2">(Auto calculated using above inputs)</p>
    </div>
  );
};

export default AIQResultDisplay;
