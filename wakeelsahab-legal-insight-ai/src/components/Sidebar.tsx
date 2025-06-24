
import React from 'react';
import { 
  Scale, 
  Home, 
  Search, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Search, label: 'Research', active: false },
    { icon: FileText, label: 'Cases', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help', active: false },
  ];

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-700" />
              <div className="ml-3">
                <div className="font-bold text-gray-900">WakeelSahab</div>
                <div className="text-xs text-gray-500">Your personal Wakeel</div>
              </div>
            </div>
          )}
          {collapsed && (
            <Scale className="h-8 w-8 text-blue-700 mx-auto" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1 hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="outline"
          onClick={handleBackToHome}
          className={`w-full justify-start text-gray-700 hover:bg-gray-100 border-gray-300 ${collapsed ? 'px-2' : 'px-3'}`}
        >
          <ArrowLeft className={`h-4 w-4 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && 'Back to Home'}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start ${
                  item.active 
                    ? 'bg-blue-700 text-white hover:bg-blue-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${collapsed ? 'px-2' : 'px-3'}`}
              >
                <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed && (
          <div className="text-xs text-gray-500 text-center">
            © 2024 WakeelSahab
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
