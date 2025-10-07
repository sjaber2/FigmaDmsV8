import { ChevronRight, HelpCircle, User, Home } from "lucide-react";
import diwanLogo from 'figma:asset/2bbdf2da9cb0968580cb29dd9bf8aa7b090ce483.png';
import { Button } from "./ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";

interface HeaderProps {
  currentView: string;
  selectedDepartment?: string;
  selectedSubDepartment?: string;
  onNavigateHome: () => void;
}

export function Header({ currentView, selectedDepartment, selectedSubDepartment, onNavigateHome }: HeaderProps) {
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-900">Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        );
      case 'inbox':
        return (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={onNavigateHome} className="text-gray-500 hover:text-gray-700">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">Document Inbox</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        );
      case 'outbox':
        return (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={onNavigateHome} className="text-gray-500 hover:text-gray-700">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">Document Outbox</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        );
      case 'recent':
        return (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={onNavigateHome} className="text-gray-500 hover:text-gray-700">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">Recently Viewed</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        );
      case 'notifications':
        return (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={onNavigateHome} className="text-gray-500 hover:text-gray-700">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">Notifications</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        );
      case 'trees':
      case 'tree-selection':
        return (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={onNavigateHome} className="text-gray-500 hover:text-gray-700">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">Document Trees</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        );
      case 'upload-selection':
        return (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={onNavigateHome} className="text-gray-500 hover:text-gray-700">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-gray-500 hover:text-gray-700">
                Document Archive
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">
                {selectedDepartment} › {selectedSubDepartment}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        );
      case 'indexing':
      case 'review':
      case 'instance':
        return (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={onNavigateHome} className="text-gray-500 hover:text-gray-700">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-gray-500 hover:text-gray-700">
                Document Archive
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">
                {currentView === 'indexing' ? 'Upload & Index' : 
                 currentView === 'review' ? 'Review Document' : 
                 'Document Saved'}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        );
      default:
        return (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-900">Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        );
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center cursor-pointer" onClick={onNavigateHome}>
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--brand-red)' }}>
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="ml-2 text-lg text-gray-900" style={{ fontWeight: 600 }}>
                IMAGE<span style={{ color: 'var(--brand-red)' }}>LINKS</span>
              </span>
            </div>
          </div>

          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              {getBreadcrumbs()}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <img 
            src={diwanLogo} 
            alt="Diwan Document Management System" 
            className="h-6"
          />

        </div>
      </div>
    </header>
  );
}