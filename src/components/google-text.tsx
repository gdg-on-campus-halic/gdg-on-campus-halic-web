// src/components/google-text.tsx
import React from 'react';

interface GoogleTextProps {
  className?: string;
}

const GoogleText: React.FC<GoogleTextProps> = ({ className = "" }) => {
  return (
    <span className={className}>
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
};

export default GoogleText;