import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight,
  BarChart3,
  TrendingUp,
  Activity,
  FileText,
  Database,
  Users,
  ArrowUpDown,
  Eye,
  Settings,
  PieChart,
  LineChart,
  Calendar
} from "lucide-react";
import { Button } from "./ui/button";

export function ReportsView() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Activity Reports']);

  const handleCategoryToggle = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const reportCategories = {
    "Activity Reports": [
      { name: "Productivity Report", icon: TrendingUp },
      { name: "Audit Instance Report", icon: FileText },
      { name: "Document Summary Report", icon: BarChart3 },
      { name: "Documents Age Report Report", icon: Calendar }
    ],
    "Transaction Reports": [
      { name: "Document Transaction Summary Report", icon: ArrowUpDown }
    ],
    "Log Reports": [
      { name: "Document Details Report", icon: Eye },
      { name: "System Report", icon: Settings }
    ],
    "Structure Reports": [
      { name: "Tree Information Report", icon: Database }
    ],
    "Route Reports": [
      { name: "Documents Route Report", icon: Users },
      { name: "Overdue Tasks Report", icon: PieChart }
    ]
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Activity Reports": return Activity;
      case "Transaction Reports": return ArrowUpDown;
      case "Log Reports": return FileText;
      case "Structure Reports": return Database;
      case "Route Reports": return Users;
      default: return BarChart3;
    }
  };

  return (
    <div className="flex flex-1 bg-white">
      {/* Reports Sidebar */}
      <div className="min-w-64 max-w-80 w-fit border-r border-gray-200 bg-gray-50">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-800 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" style={{ color: 'var(--brand-red)' }} />
            Reports
          </h2>
        </div>
        
        <div className="p-2">
          {Object.entries(reportCategories).map(([category, reports]) => {
            const isExpanded = expandedCategories.includes(category);
            const CategoryIcon = getCategoryIcon(category);
            
            return (
              <div key={category} className="mb-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-2 py-2 h-auto hover:bg-gray-100"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                  )}
                  <CategoryIcon className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-700">{category}</span>
                </Button>
                
                {isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {reports.map((report) => {
                      const ReportIcon = report.icon;
                      return (
                        <Button
                          key={report.name}
                          variant="ghost"
                          className="w-full justify-start px-2 py-1.5 h-auto text-left hover:bg-gray-100"
                          onClick={() => {
                            // Handle report selection
                            console.log(`Selected report: ${report.name}`);
                          }}
                        >
                          <ReportIcon className="w-3.5 h-3.5 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600 whitespace-normal leading-tight">{report.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Reports Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl text-gray-800 mb-2">Reports Dashboard</h1>
            <p className="text-gray-600">
              Generate and view various reports to analyze your document management system performance and usage.
            </p>
          </div>

          {/* Quick Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <TrendingUp className="w-6 h-6" style={{ color: 'var(--brand-red)' }} />
                </div>
                <span className="text-2xl text-gray-800">1,245</span>
              </div>
              <h3 className="text-lg text-gray-800 mb-1">Total Documents</h3>
              <p className="text-sm text-gray-600">Documents processed this month</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl text-gray-800">89</span>
              </div>
              <h3 className="text-lg text-gray-800 mb-1">Active Users</h3>
              <p className="text-sm text-gray-600">Users active in the last 30 days</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl text-gray-800">95%</span>
              </div>
              <h3 className="text-lg text-gray-800 mb-1">System Efficiency</h3>
              <p className="text-sm text-gray-600">Overall system performance</p>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl text-gray-800">Recent Reports</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-3 text-gray-500" />
                    <div>
                      <h4 className="text-sm text-gray-800">Monthly Productivity Report</h4>
                      <p className="text-xs text-gray-600">Generated 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-gray-500" />
                    <div>
                      <h4 className="text-sm text-gray-800">Document Summary Report</h4>
                      <p className="text-xs text-gray-600">Generated yesterday</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-gray-500" />
                    <div>
                      <h4 className="text-sm text-gray-800">User Activity Report</h4>
                      <p className="text-xs text-gray-600">Generated 3 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}