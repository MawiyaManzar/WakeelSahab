
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload,
  Mic,
  Globe,
  FileText,
  BarChart3,
  Search,
  Brain,
  CheckCircle
} from 'lucide-react';

interface DashboardMainProps {
  userType: 'lawyer' | 'consumer' | null;
  onStartResearch: () => void;
}

const DashboardMain = ({ userType, onStartResearch }: DashboardMainProps) => {
  const [caseDescription, setCaseDescription] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200/60 px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Legal Research Platform</h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-4xl">
              Streamline your legal research with AI-powered analysis tailored for the Indian legal system. 
              From case discovery to argument validation, we help you build stronger cases efficiently.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>English</option>
                <option>हिंदी</option>
              </select>
            </div>
            <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 font-medium">
              Premium Account
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Case Description Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                Describe Your Case or Upload Documents
              </CardTitle>
              <p className="text-slate-600 text-lg">
                Start by telling us about your legal issue in simple words, or upload relevant documents
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                placeholder="Tell us your legal issue in simple words... (e.g., 'My landlord wants to evict me without proper notice' or 'Need to file a bail application for my client')"
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                className="min-h-[140px] text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
              
              <div className="flex items-center gap-6 pt-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2 border-slate-300 hover:bg-slate-50 text-slate-700">
                  <Upload className="w-4 h-4" />
                  Upload Documents
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 border-slate-300 hover:bg-slate-50 text-slate-700">
                  <Mic className="w-4 h-4" />
                  Voice Input
                </Button>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium">Language:</span>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>English</option>
                    <option>हिंदी</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Start New Research */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                Start New Research
              </CardTitle>
              <p className="text-slate-600 text-base leading-relaxed">
                Follow our comprehensive 6-step research process to identify legal issues, 
                find relevant laws, and discover supporting precedents for your case.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                  AI-powered legal issue identification
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                  Relevant statute and case law discovery
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                  Organized findings with winning arguments
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg mt-6"
                onClick={onStartResearch}
                disabled={!caseDescription.trim()}
              >
                Begin Research Process
              </Button>
            </CardContent>
          </Card>

          {/* Analyze My Findings */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                Analyze My Findings
              </CardTitle>
              <p className="text-slate-600 text-base leading-relaxed">
                Upload your existing research, notes, or draft arguments for AI-powered critique, 
                validation, and enhancement suggestions.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                  Accuracy validation and error detection
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                  Gap analysis and improvement suggestions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                  Enhanced research with additional sources
                </li>
              </ul>
              <Button variant="outline" className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3 rounded-lg mt-6">
                Upload for Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
