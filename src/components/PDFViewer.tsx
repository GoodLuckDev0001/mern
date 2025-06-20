import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
  className?: string;
  children: React.ReactNode;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, className = '', children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Get the base URL from the current window location
    const baseUrl = window.location.origin;
    // Construct the full URL
    const fullUrl = `${baseUrl}${pdfUrl}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <a
      href={pdfUrl}
      onClick={handleClick}
      className={`text-blue-600 hover:text-blue-800 underline ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}; 