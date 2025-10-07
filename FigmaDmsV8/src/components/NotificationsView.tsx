import { Bell, FileText, User, Clock, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function NotificationsView() {
  const notifications = [
    {
      id: 1,
      type: "approval",
      title: "Document approval required",
      message: "Budget_Proposal_2024.xlsx requires your approval",
      sender: "John Smith",
      time: "5 minutes ago",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "update",
      title: "Document updated",
      message: "Employee_Handbook.docx has been updated with new policies",
      sender: "HR Department",
      time: "1 hour ago",
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      type: "completed",
      title: "Processing completed",
      message: "Your document scan has been processed and indexed",
      sender: "System",
      time: "2 hours ago",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      type: "reminder",
      title: "Document expiry reminder",
      message: "Contract_ABC_Corp.pdf expires in 30 days",
      sender: "System",
      time: "1 day ago",
      read: true,
      priority: "high"
    },
    {
      id: 5,
      type: "shared",
      title: "Document shared",
      message: "Project_Timeline.xlsx has been shared with you",
      sender: "Sarah Johnson",
      time: "2 days ago",
      read: true,
      priority: "medium"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'update': return <Info className="w-5 h-5" style={{ color: 'var(--brand-grey-cool)' }} />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'reminder': return <Clock className="w-5 h-5" style={{ color: 'var(--brand-red)' }} />;
      case 'shared': return <User className="w-5 h-5" style={{ color: 'var(--brand-grey-3)' }} />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string, read: boolean) => {
    const baseClasses = read ? 'bg-gray-100 text-gray-800' : '';
    switch (priority) {
      case 'high': return read ? baseClasses : 'bg-red-100 text-red-800';
      case 'medium': return read ? baseClasses : 'bg-yellow-100 text-yellow-800';
      case 'low': return read ? baseClasses : 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-2">Notifications</h2>
          <p className="text-gray-600">Stay updated with document activities</p>
        </div>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`hover:shadow-md transition-shadow ${
              !notification.read ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brand-red)' }}></div>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-2 ${!notification.read ? 'text-gray-700' : 'text-gray-500'}`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>From: {notification.sender}</span>
                      <span>{notification.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(notification.priority, notification.read)}`}
                      >
                        {notification.priority} priority
                      </Badge>
                      {!notification.read && (
                        <Button variant="outline" size="sm" className="text-xs">
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}