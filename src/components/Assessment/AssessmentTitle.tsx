import React from 'react';
import { cn } from '@/lib/utils';

interface AssessmentTitleProps {
  className?: string;
}

const AssessmentTitle: React.FC<AssessmentTitleProps> = ({ className }) => {
  const projectInfo = {
    name: "AI QUOTIENT (AIQ) ASSESSMENT",
    description: "SCREENING AI-FRIENDLY TALENT",
  };

  return (
    <div className={cn("text-center py-4", className)}> {/* Added padding for spacing from edges if needed */}
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
        {projectInfo.name.toUpperCase()}
      </h1>
      <p className="text-md sm:text-lg text-muted-foreground">
        {projectInfo.description}
      </p>
    </div>
  );
};

export default AssessmentTitle;
