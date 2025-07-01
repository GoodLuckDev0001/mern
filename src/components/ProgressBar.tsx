import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export const ProgressBar: React.FC = () => {
  const { currentStep } = useSelector((state: RootState) => state.form);
  
  const progress = (typeof currentStep === 'number' && currentStep > 0) ? (currentStep / 14) * 100 : 0;

  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8 overflow-hidden">
      <div
        id="progress"
        className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      >
      </div>
    </div>
  )
}