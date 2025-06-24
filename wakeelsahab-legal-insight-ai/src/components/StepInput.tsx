
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Mic, 
  FileText, 
  ArrowRight, 
  Globe,
  MicIcon,
  PaperclipIcon
} from 'lucide-react';

interface StepInputProps {
  userType: 'lawyer' | 'consumer' | null;
  onNext: () => void;
}

const StepInput = ({ userType, onNext }: StepInputProps) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const placeholderText = userType === 'lawyer' 
    ? "Describe the legal matter you're researching. Include relevant facts, jurisdiction, and specific legal questions..."
    : "Describe your legal issue in simple words. For example: 'My landlord wants to evict me without proper notice' or 'I need to understand my employment contract'...";

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-blue-100 text-blue-800">
          {userType === 'lawyer' ? 'Legal Professional Mode' : 'Consumer Mode'}
        </Badge>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          {userType === 'lawyer' 
            ? 'Describe Your Legal Research Query' 
            : 'Tell Us About Your Legal Issue'
          }
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {userType === 'lawyer'
            ? 'Provide detailed information about the case or legal matter you need to research. Our AI will guide you through comprehensive legal analysis.'
            : 'Explain your situation in simple terms. Our AI will help you understand the legal aspects and find relevant solutions.'
          }
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Input Area */}
        <Card className="border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors">
          <CardContent className="p-6">
            <Textarea
              placeholder={placeholderText}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] border-0 focus:ring-0 resize-none text-base"
            />
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleRecording}
                  className={`${isRecording ? 'text-red-600 bg-red-50' : 'text-slate-600'}`}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isRecording ? 'Stop Recording' : 'Voice Input'}
                </Button>
                
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <Globe className="w-4 h-4 mr-2" />
                  English
                </Button>
              </div>
              
              <div className="text-sm text-slate-500">
                {input.length} characters
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Upload Area */}
        <Card 
          className={`border-2 border-dashed transition-all duration-300 ${
            dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">
              Upload Supporting Documents
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Drag and drop files or click to browse. Supports PDF, Word, and images.
            </p>
            <Button variant="outline" size="sm">
              <PaperclipIcon className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6">
          <div className="text-sm text-slate-500">
            Your data is encrypted and secure. Learn more about our privacy policy.
          </div>
          
          <Button 
            onClick={onNext}
            disabled={!input.trim()}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            Start Research
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepInput;
