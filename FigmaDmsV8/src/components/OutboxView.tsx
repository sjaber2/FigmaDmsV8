import { FileText, User, Calendar, CheckCircle, Clock, AlertCircle, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface OutboxViewProps {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

export function OutboxView({ favorites, onToggleFavorite }: OutboxViewProps) {
  const outboxItems = [
    {
      id: 1,
      title: "Budget_Proposal_2024.xlsx",
      recipient: "Finance Team",
      date: "2024-01-15",
      status: "sent",
      deliveryStatus: "delivered",
      type: "Spreadsheet"
    },
    {
      id: 2,
      title: "Project_Requirements.docx",
      recipient: "Development Team",
      date: "2024-01-14",
      status: "pending",
      deliveryStatus: "processing",
      type: "Document"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="mb-6">
        <h2 className="mb-2">Document Outbox</h2>
        <p className="text-gray-600">Documents you've sent or are processing</p>
      </div>

      <div className="space-y-4">
        {outboxItems.map((item) => (
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
                        To: {item.recipient}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStatusColor(item.deliveryStatus)}>
                        <div className="flex items-center">
                          {getStatusIcon(item.deliveryStatus)}
                          <span className="ml-1">{item.deliveryStatus}</span>
                        </div>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onToggleFavorite(item.id)}
                    className={favorites.includes(item.id) ? "hover:bg-yellow-50" : ""}
                  >
                    <Star className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
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