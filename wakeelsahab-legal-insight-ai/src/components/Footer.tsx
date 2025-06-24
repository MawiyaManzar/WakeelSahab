
import { Scale, Shield, Award, Globe } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">WakeelSahab</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered legal research platform designed specifically for Indian legal professionals and clients.
            </p>
            <div className="flex flex-col space-y-2">
              <Badge className="bg-slate-800 text-slate-300 border-slate-600 w-fit">
                <Shield className="w-4 h-4 mr-1" />
                DPDP Compliant
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border-slate-600 w-fit">
                <Award className="w-4 h-4 mr-1" />
                ISO Certified
              </Badge>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Legal Research</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Analysis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Document Review</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collaboration Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Protection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 WakeelSahab. All rights reserved. Built for Indian legal professionals.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <span>Serving lawyers across India</span>
            <span>•</span>
            <span>10,000+ cases analyzed</span>
            <span>•</span>
            <span>95% accuracy rate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
