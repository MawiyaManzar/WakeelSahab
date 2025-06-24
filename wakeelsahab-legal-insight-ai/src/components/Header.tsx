
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Menu, X, User, Settings } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  userType?: 'lawyer' | 'consumer' | null;
  currentStep?: number;
}

const Header = ({ userType, currentStep }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Scale className="h-8 w-8 text-blue-700" />
            <span className="ml-2 text-xl font-bold text-gray-900">WakeelSahab</span>
          </div>

          {/* Desktop Navigation */}
          {userType && (
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Research
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Cases
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Analysis
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Resources
              </a>
            </nav>
          )}

          {/* Step Progress (when in research mode) */}
          {currentStep !== undefined && (
            <div className="hidden lg:flex items-center space-x-2">
              <span className="text-sm text-gray-600">Step {currentStep} of 6</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-700 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {userType && (
              <>
                <Badge variant="outline" className="capitalize">
                  {userType}
                </Badge>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-700">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button className="bg-blue-700 text-white hover:bg-blue-800 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </>
            )}

            {!userType && (
              <>
                <Button variant="ghost" className="text-gray-700 hover:text-blue-700">
                  Sign In
                </Button>
                <Button className="bg-blue-700 text-white hover:bg-blue-800">
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && userType && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Research
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Cases
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Analysis
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Resources
              </a>
              <Button className="bg-blue-700 text-white hover:bg-blue-800 mt-4">
                Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
