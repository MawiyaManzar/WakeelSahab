
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, FileText, Scale, Users } from 'lucide-react';

interface HeroProps {
  onGetStarted: (type: 'lawyer' | 'consumer') => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your Trusted Legal Assistant
              <span className="text-blue-700 block">Wakeel Sahab</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline your legal research with our intelligent 6-step process. From case input to organized findings, 
              we help lawyers and clients navigate India's legal landscape with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => onGetStarted('lawyer')}
                className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold flex items-center justify-center"
              >
                Start Legal Research
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">10K+</div>
                <div className="text-sm text-gray-600">Cases Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">500+</div>
                <div className="text-sm text-gray-600">Legal Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-700 mr-3" />
                  <span className="text-sm text-gray-700">Input: Landlord eviction notice</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <Search className="h-5 w-5 text-green-700 mr-3" />
                  <span className="text-sm text-gray-700">Analyzing: Delhi Rent Control Act</span>
                </div>
                <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                  <Scale className="h-5 w-5 text-amber-700 mr-3" />
                  <span className="text-sm text-gray-700">Found: 12 relevant precedents</span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-700 mr-3" />
                  <span className="text-sm text-gray-700">Strength: 85% chance of success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
