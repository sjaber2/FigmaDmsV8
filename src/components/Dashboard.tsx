import { Folder, FileText, Users, Activity, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DashboardProps {
  onNavigateToTree: () => void;
}

export function Dashboard({ onNavigateToTree }: DashboardProps) {
  const stats = [
    {
      title: "Total Documents",
      value: "12,847",
      change: "+12%",
      icon: FileText,
    },
    {
      title: "Storage Used",
      value: "2.4 TB",
      change: "+8%",
      icon: Folder,
    },
    {
      title: "Active Users",
      value: "156",
      change: "+5%",
      icon: Users,
    },
    {
      title: "Daily Activity",
      value: "342",
      change: "+18%",
      icon: Activity,
    },
  ];

  const recentActivity = [
    { action: "Document uploaded", user: "John Smith", time: "2 minutes ago", document: "Invoice_2024_001.pdf" },
    { action: "Document accessed", user: "Sarah Johnson", time: "5 minutes ago", document: "Contract_ABC_Corp.docx" },
    { action: "Document archived", user: "Mike Wilson", time: "10 minutes ago", document: "Report_Q3_2024.pdf" },
    { action: "Permission updated", user: "Admin", time: "15 minutes ago", document: "HR_Policy_v2.doc" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="mb-2">Document Management Dashboard</h1>
        <p className="text-gray-600">Overview of your document management system</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              onClick={onNavigateToTree}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--brand-light-5)' }}>
                  <Folder className="w-5 h-5" style={{ color: 'var(--brand-red)' }} />
                </div>
                <div>
                  <h3 className="font-medium">Browse Documents</h3>
                  <p className="text-sm text-gray-600">Navigate through document archives</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Upload Document</h3>
                  <p className="text-sm text-gray-600">Add new documents to the system</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--brand-red)' }}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 truncate">{activity.document}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}