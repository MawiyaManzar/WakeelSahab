
import React, { useState } from 'react';
import { 
  Upload, 
  Mic, 
  FileText, 
  Image, 
  ArrowRight, 
  X,
  CheckCircle,
  Globe,
  Brain, 
  SearchCode, 
  Scale, 
  BookOpen, 
  FolderOpen 
} from 'lucide-react';

const ResearchProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState('en');

  const steps = [
    {
      id: 0,
      title: "Input Your Case",
      description: "Describe your legal issue in plain language, upload documents, or use voice input.",
      icon: Upload,
      color: "bg-blue-500",
      features: ["Text input", "File upload", "Voice recognition", "Multi-language support"]
    },
    {
      id: 1,
      title: "Understand the Problem",
      description: "AI analyzes your input and asks clarifying questions to understand the full context.",
      icon: Brain,
      color: "bg-indigo-500",
      features: ["AI analysis", "Follow-up questions", "Context clarification", "Fact summarization"]
    },
    {
      id: 2,
      title: "Identify Legal Issues",
      description: "System identifies relevant legal issues and categorizes your case type.",
      icon: SearchCode,
      color: "bg-purple-500",
      features: ["Issue identification", "Legal categorization", "Visual flowcharts", "User confirmation"]
    },
    {
      id: 3,
      title: "Find Relevant Laws",
      description: "Discover applicable Indian statutes, acts, and regulations for your case.",
      icon: Scale,
      color: "bg-green-500",
      features: ["Statute search", "Jurisdiction filters", "Relevance scoring", "Law explanations"]
    },
    {
      id: 4,
      title: "Search Case Precedents",
      description: "Find similar cases and precedents from Indian courts and legal databases.",
      icon: BookOpen,
      color: "bg-yellow-500",
      features: ["Case database search", "Precedent analysis", "Citation format", "Judgment summaries"]
    },
    {
      id: 5,
      title: "Organize Findings",
      description: "Compile research into a comprehensive report with key insights and recommendations.",
      icon: FolderOpen,
      color: "bg-red-500",
      features: ["Automated reports", "Success probability", "Key winning points", "Export options"]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = () => {
    setIsRecording(true);
    // Voice recording logic would go here
    setTimeout(() => setIsRecording(false), 3000); // Demo
  };

  const handleSubmit = () => {
    if (inputText.trim() || uploadedFiles.length > 0) {
      console.log('Starting research with:', { inputText, uploadedFiles, language });
      setCurrentStep(1);
    }
  };

  const renderCaseInput = () => (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Legal Research
          </h2>
          <p className="text-lg text-gray-600">
            Describe your case in simple words, upload relevant documents, or use voice input to begin.
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg">
          {/* Language Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Language:</span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Step 0 of 6
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Describe your legal issue
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Example: My landlord wants to evict me without proper notice. I have been paying rent on time and have a valid lease agreement..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {inputText.length} characters
              </span>
              <button
                onClick={startRecording}
                className={`flex items-center px-3 py-1 rounded-md text-sm transition-colors ${
                  isRecording 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Mic className={`w-4 h-4 mr-1 ${isRecording ? 'animate-pulse' : ''}`} />
                {isRecording ? 'Recording...' : 'Voice Input'}
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Upload relevant documents (optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files here, or{' '}
                <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold">
                  browse
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500">
                Supports PDF, Word documents, and images
              </p>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Uploaded Files ({uploadedFiles.length})
              </h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {file.type.includes('image') ? (
                        <Image className="w-5 h-5 text-blue-600 mr-3" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-600 mr-3" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        <div className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Your data is encrypted and secure
            </div>
            <button
              onClick={handleSubmit}
              disabled={!inputText.trim() && uploadedFiles.length === 0}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Research
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Quick Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Property dispute with neighbor over boundary",
              "Employment termination without notice",
              "Consumer complaint against service provider"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setInputText(example)}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group"
              >
                <div className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">
                  {example}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessSteps = () => (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            6-Step Legal Research Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered system guides you through a comprehensive legal research process, 
            from initial case input to organized findings and recommendations.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-16 bg-gray-200 hidden lg:block"></div>
              )}
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors">
                {/* Step Icon */}
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-semibold text-gray-500 mr-4">
                      STEP {step.id}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-lg">
                    {step.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Number */}
                <div className="hidden lg:block text-6xl font-bold text-gray-100">
                  {step.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setCurrentStep(0)}
            className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold text-lg"
          >
            Start Your Legal Research
          </button>
        </div>
      </div>
    </div>
  );

  if (currentStep === 0) {
    return renderCaseInput();
  }

  return renderProcessSteps();
};

export default ResearchProcess;
