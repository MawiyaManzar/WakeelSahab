
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  FileCheck, 
  TrendingUp,
  Award
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Confidential",
      description: "End-to-end encryption ensures your legal data remains private and secure, compliant with India's DPDP Act.",
      color: "text-blue-600"
    },
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Advanced NLP models trained on Indian legal databases provide accurate and contextual legal research.",
      color: "text-indigo-600"
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Invite team members, share findings, and collaborate on cases with built-in commenting and review features.",
      color: "text-purple-600"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Research in English and Hindi, with support for regional languages coming soon.",
      color: "text-green-600"
    },
    {
      icon: FileCheck,
      title: "Comprehensive Reports",
      description: "Generate detailed reports with case summaries, legal precedents, and winning strategies.",
      color: "text-yellow-600"
    },
    {
      icon: TrendingUp,
      title: "Success Probability",
      description: "Get AI-powered insights into your case strength and likelihood of success based on historical data.",
      color: "text-red-600"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose WakeelSahab?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for Indian legal professionals, our platform combines cutting-edge AI 
            with deep understanding of the Indian legal system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-0">
              <CardContent className="p-0">
                <div className={`${feature.color} mb-4`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-lg text-gray-700 italic mb-4">
                "WakeelSahab has revolutionized how we conduct legal research. What used to take days 
                now takes hours, and the accuracy is remarkable. It's become an essential tool for our practice."
              </p>
              <div className="text-sm text-gray-600">
                <div className="font-semibold">Advocate Priya Sharma</div>
                <div>Senior Partner, Sharma & Associates</div>
                <div>Delhi High Court</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
