import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full", className)}>
      <div className="flex items-center">
        {/* In a real app, this might be an SVG logo or an Image component */}
        <span className="text-xl font-bold text-foreground">
          ASCENDION
        </span>
      </div>
    </header>
  );
};

export default Header;
