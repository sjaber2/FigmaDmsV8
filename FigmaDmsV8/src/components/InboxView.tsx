import { FileText, User, Calendar, Eye, Download, MoreHorizontal, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface InboxViewProps {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

export function InboxView({ favorites, onToggleFavorite }: InboxViewProps) {
  const inboxItems = [
    {
      id: 1,
      title: "Invoice_Q4_2024_Final.pdf",
      sender: "John Smith",
      department: "Accounting",
      date: "2024-01-15",
      status: "pending",
      type: "Invoice",
      priority: "high"
    },
    {
      id: 2,
      title: "Employee_Handbook_Update.docx",
      sender: "Sarah Johnson",
      department: "HR",
      date: "2024-01-14",
      status: "review",
      type: "Policy",
      priority: "medium"
    },
    {
      id: 3,
      title: "Contract_NewClient_2024.pdf",
      sender: "Mike Wilson",
      department: "Legal",
      date: "2024-01-13",
      status: "approved",
      type: "Contract",
      priority: "high"
    },
    {
      id: 4,
      title: "Marketing_Campaign_Proposal.pptx",
      sender: "Lisa Chen",
      department: "Marketing",
      date: "2024-01-12",
      status: "pending",
      type: "Presentation",
      priority: "low"
    },
    {
      id: 5,
      title: "Audit_Report_2024.xlsx",
      sender: "David Brown",
      department: "Finance",
      date: "2024-01-11",
      status: "review",
      type: "Report",
      priority: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'text-xs';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === 'review') {
      return {
        backgroundColor: 'var(--brand-light-5)',
        color: 'var(--brand-grey-cool)'
      };
    }
    return {};
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="mb-6">
        <h2 className="mb-2">Document Inbox</h2>
        <p className="text-gray-600">Documents waiting for your attention</p>
      </div>

      <div className="space-y-4">
        {inboxItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate mb-1">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {item.sender}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.date}
                      </div>
                      <span>{item.department}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStatusColor(item.status)} style={getStatusStyle(item.status)}>
                        {item.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(item.priority)}>
                        {item.priority} priority
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onToggleFavorite(item.id)}
                    className={favorites.includes(item.id) ? "hover:bg-yellow-50" : ""}
                  >
                    <Star className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}