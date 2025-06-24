import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Scale, 
  FileText, 
  Search, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  Upload,
  Mic,
  Globe,
  Users,
  Shield,
  Star,
  Brain,
  BarChart3
} from 'lucide-react';
import StepInput from '@/components/StepInput';
import StepProgress from '@/components/StepProgress';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Sidebar from '@/components/Sidebar';
import DashboardMain from '@/components/DashboardMain';
import ResearchProcess from '@/components/ResearchProcess';
import Footer from '@/components/Footer';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'lawyer' | 'consumer' | null>(null);
  const [showApp, setShowApp] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const steps = [
    { id: 0, title: "Input Your Case", icon: FileText, description: "Describe your legal issue" },
    { id: 1, title: "Understand Problem", icon: Search, description: "AI analyzes your situation" },
    { id: 2, title: "Identify Legal Issues", icon: Scale, description: "Determine applicable laws" },
    { id: 3, title: "Find Right Laws", icon: BookOpen, description: "Locate relevant statutes" },
    { id: 4, title: "Search Cases", icon: FileText, description: "Find similar precedents" },
    { id: 5, title: "Understand Laws", icon: BookOpen, description: "Analyze findings" },
    { id: 6, title: "Organize Findings", icon: CheckCircle, description: "Generate final report" }
  ];

  const handleGetStarted = (type: 'lawyer' | 'consumer') => {
    setUserType(type);
    setShowApp(true);
  };

  const handleStartResearch = () => {
    setCurrentStep(1);
  };

  if (showApp) {
    // Show dashboard view for step 0, research process for steps 1-6
    if (currentStep === 0) {
      return (
        <div className="min-h-screen flex w-full bg-slate-50">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
          <DashboardMain 
            userType={userType} 
            onStartResearch={handleStartResearch}
          />
        </div>
      );
    }

    // Research process steps 1-6
    const CurrentStepIcon = steps[currentStep].icon;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userType={userType} currentStep={currentStep} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <StepProgress steps={steps} currentStep={currentStep} />
            
            <div className="mt-8">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                    <CurrentStepIcon className="w-7 h-7 text-blue-700" />
                    {steps[currentStep].title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{steps[currentStep].description}</p>
                </CardHeader>
                
                <CardContent>
                  {currentStep > 0 && currentStep < 6 && (
                    <div className="text-center py-12">
                      <div className="animate-pulse">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CurrentStepIcon className="w-8 h-8 text-blue-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Processing your legal research...
                        </h3>
                        <p className="text-gray-600 mb-6">
                          AI is working on {steps[currentStep].title.toLowerCase()}
                        </p>
                        <Progress value={(currentStep / 6) * 100} className="w-64 mx-auto mb-4" />
                        <Button 
                          onClick={() => setCurrentStep(currentStep + 1)}
                          className="bg-blue-700 hover:bg-blue-800"
                        >
                          Continue to Next Step <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 6 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Research Complete!
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Your comprehensive legal research report is ready with key findings, 
                        relevant laws, and winning arguments.
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button className="bg-blue-700 hover:bg-blue-800">
                          Download Report
                        </Button>
                        <Button variant="outline" onClick={() => setCurrentStep(0)}>
                          Start New Research
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <ResearchProcess />
      <Footer />
    </div>
  );
};

export default Index;
