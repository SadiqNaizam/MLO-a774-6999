import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header'; // Relative path to Header component

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  // Based on Layout Requirements:
  // overall.definition: "flex-col items-center justify-center"
  // overall.sizing.container: "w-full h-screen bg-background"
  // overall.sizing.innerContent: "w-full max-w-[800px] p-6 bg-surface rounded shadow-md"
  // overall.sizing.mainSpacing: "gap-6"
  // bg-surface translates to bg-card based on CSS variables and Tailwind config.

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen w-full bg-background text-foreground p-4 sm:p-6",
        className
      )}
    >
      <div
        className={cn(
          "w-full max-w-[800px] flex flex-col",
          "gap-6" // This applies 'overall.sizing.mainSpacing' between Header and main content area
        )}
      >
        <Header />
        
        <main className="w-full p-6 bg-card rounded-lg shadow-md">
          {/* 
            The 'children' (e.g., AssessmentInterfaceTemplate) will be responsible for 
            implementing 'mainContent.layout: "flex flex-col gap-6"' for its internal structure.
          */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
