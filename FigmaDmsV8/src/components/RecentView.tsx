import { FileText, Calendar, Eye, Download, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface RecentViewProps {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

export function RecentView({ favorites, onToggleFavorite }: RecentViewProps) {
  const recentItems = [
    {
      id: 1,
      title: "Q4_Financial_Report.pdf",
      department: "Accounting",
      lastViewed: "2 hours ago",
      viewCount: 15,
      type: "PDF",
      size: "2.3 MB",
      favorite: true
    },
    {
      id: 2,
      title: "Employee_Guidelines.docx",
      department: "HR",
      lastViewed: "1 day ago",
      viewCount: 8,
      type: "Word Document",
      size: "1.1 MB",
      favorite: false
    },
    {
      id: 3,
      title: "Project_Timeline.xlsx",
      department: "Operations",
      lastViewed: "2 days ago",
      viewCount: 12,
      type: "Spreadsheet",
      size: "856 KB",
      favorite: true
    },
    {
      id: 4,
      title: "Client_Presentation.pptx",
      department: "Sales",
      lastViewed: "3 days ago",
      viewCount: 6,
      type: "Presentation",
      size: "4.2 MB",
      favorite: false
    },
    {
      id: 5,
      title: "Legal_Contract_ABC.pdf",
      department: "Legal",
      lastViewed: "1 week ago",
      viewCount: 3,
      type: "PDF",
      size: "1.8 MB",
      favorite: false
    }
  ];

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="mb-6">
        <h2 className="mb-2">Recently Viewed Documents</h2>
        <p className="text-gray-600">Your recently accessed documents</p>
      </div>

      <div className="space-y-4">
        {recentItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.title}
                      </h3>
                      {favorites.includes(item.id) && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>{item.department}</span>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.lastViewed}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.viewCount} views
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.size}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
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