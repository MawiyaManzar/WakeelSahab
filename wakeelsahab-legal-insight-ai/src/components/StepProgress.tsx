
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: any;
  description: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

const StepProgress = ({ steps, currentStep }: StepProgressProps) => {
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Research Progress</h2>
        <span className="text-sm text-slate-600">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>
      
      <Progress value={progressValue} className="mb-6" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              index <= currentStep
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-slate-50 border border-slate-200'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span
              className={`text-xs font-medium text-center leading-tight ${
                index <= currentStep ? 'text-slate-800' : 'text-slate-500'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
