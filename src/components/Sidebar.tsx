import { 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Folder, 
  FolderOpen, 
  Inbox, 
  Send, 
  FolderTree, 
  Clock, 
  Bell,
  Badge,
  Star,
  LayoutGrid,
  BarChart3,
  User,
  Menu,
  X,
  Settings,
  Globe,
  LogOut
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

interface SidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
  selectedTree: string;
  onTreeChange: (tree: string) => void;
  expandedDepartments: string[];
  onDepartmentToggle: (dept: string) => void;
  selectedDepartment: string | null;
  onDepartmentSelect: (dept: string) => void;
  selectedSubDepartment: string | null;
  onSubDepartmentSelect: (subDept: string) => void;
  onNavigateHome: () => void;
}

export function Sidebar({
  selectedSection,
  onSectionChange,
  selectedTree,
  onTreeChange,
  expandedDepartments,
  onDepartmentToggle,
  selectedDepartment,
  onDepartmentSelect,
  selectedSubDepartment,
  onSubDepartmentSelect,
  onNavigateHome
}: SidebarProps) {
  const [showTreePanel, setShowTreePanel] = useState(false);
  const [isTreePanelCollapsed, setIsTreePanelCollapsed] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const departments = {
    "Accounting": ["Accounts Payable", "Accounts Receivable", "Tax Documents", "Financial Reports"],
    "Administration": ["Policies", "Procedures", "Office Management", "Facilities"],
    "HR": ["Employee Records", "Payroll", "Benefits", "Training"],
    "Legal": ["Contracts", "Compliance", "Litigation", "Corporate"],
    "Marketing": ["Campaigns", "Brand Assets", "Analytics", "Content"],
    "Operations": ["SOPs", "Quality", "Vendor Management", "Logistics"],
    "Sales": ["Proposals", "Presentations", "Customer Records", "Territories"]
  };

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, count: null, color: 'red' },
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 5, color: 'default' },
    { id: 'outbox', label: 'Outbox', icon: Send, count: 2, color: 'default' },
  { id: 'trees', label: 'Document Trees', icon: FolderTree, count: null, color: 'default' },
    { id: 'recent', label: 'Recently Viewed', icon: Clock, count: null, color: 'default' },
    { id: 'notifications', label: 'Notifications', icon: User, count: 3, color: 'default' },
    { id: 'favorites', label: 'Favorites', icon: Star, count: null, color: 'default' },
    { id: 'reports', label: 'Reports', icon: BarChart3, count: null, color: 'default' },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'dashboard') {
      onNavigateHome();
      setShowTreePanel(false);
    } else if (sectionId === 'trees') {
      onSectionChange(sectionId);
      setShowTreePanel(true);
    } else {
      onSectionChange(sectionId);
      setShowTreePanel(false);
    }
  };

  return (
    <div className="flex">
      {/* Main Sidebar */}
      <div className={`border-r py-4 flex flex-col transition-all duration-300 ${
        isSidebarExpanded ? 'w-52' : 'w-20'
      }`} style={{ backgroundColor: '#f3f3f5', borderColor: 'var(--brand-light-3)' }}>
        {/* Toggle Button */}
        <div className={`flex ${isSidebarExpanded ? 'justify-end px-4' : 'justify-center'} mb-4`}>
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: 'var(--brand-dark-2)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-light-5)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isSidebarExpanded ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className={`flex flex-col ${isSidebarExpanded ? 'px-3' : 'items-center'} space-y-3`}>
          <TooltipProvider>
            {sections.map((section) => (
              <Tooltip key={section.id} delayDuration={isSidebarExpanded ? 999999 : 300}>
                <TooltipTrigger asChild>
                  <button
                    className={`relative rounded-xl flex items-center transition-all ${
                      isSidebarExpanded ? 'w-full px-4 py-3 justify-start' : 'w-12 h-12 justify-center'
                    }`}
                    style={{
                      backgroundColor: section.id === 'dashboard' && selectedSection === ''
                        ? 'var(--brand-red)'
                        : selectedSection === section.id
                        ? 'var(--brand-light-5)'
                        : 'transparent',
                      color: section.id === 'dashboard' && selectedSection === ''
                        ? 'var(--brand-white)'
                        : selectedSection === section.id
                        ? 'var(--brand-dark-2)'
                        : 'var(--brand-grey-cool)'
                    }}
                    onClick={() => handleSectionClick(section.id)}
                    onMouseEnter={(e) => {
                      if (!(section.id === 'dashboard' && selectedSection === '') && selectedSection !== section.id) {
                        e.currentTarget.style.backgroundColor = 'var(--brand-light-5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(section.id === 'dashboard' && selectedSection === '') && selectedSection !== section.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <section.icon className="w-5 h-5 flex-shrink-0" />
                    {isSidebarExpanded && (
                      <span className="ml-3 text-sm truncate">{section.label}</span>
                    )}
                    {section.count && (
                      <span className={`${
                        isSidebarExpanded ? 'ml-auto' : 'absolute -top-1 -right-1'
                      } w-5 h-5 text-xs rounded-full flex items-center justify-center`}
                      style={{
                        backgroundColor: 'var(--brand-red)',
                        color: 'var(--brand-white)'
                      }}>
                        {section.count}
                      </span>
                    )}
                  </button>
                </TooltipTrigger>
                {!isSidebarExpanded && (
                  <TooltipContent side="right">
                    <p>{section.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        
        {/* User Profile Button at Bottom */}
        <div className={`mt-auto border-t ${isSidebarExpanded ? 'px-3 py-4' : 'py-4 flex justify-center'}`} style={{ borderColor: 'var(--brand-light-3)' }}>
          <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`transition-all ${
                  isSidebarExpanded ? 'w-full justify-start px-4' : 'w-12 h-12 justify-center p-0'
                }`}
                style={{ color: 'var(--brand-grey-cool)' }}
              >
                <User className={`flex-shrink-0 ${isSidebarExpanded ? 'w-4 h-4 mr-2' : 'w-5 h-5'}`} />
                {isSidebarExpanded && <span className="text-sm">Profile (S)</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-56 p-2" 
              align="start" 
              side="top"
              style={{ 
                backgroundColor: 'var(--brand-white)',
                borderColor: 'var(--brand-light-3)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-gray-50"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-sm text-gray-700">Account settings</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-3 hover:bg-gray-50"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-3 text-gray-600" />
                    <span className="text-sm text-gray-700">Language</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-gray-50"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <LogOut className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-sm text-gray-700">Logout</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Expandable Tree Panel */}
      {showTreePanel && selectedSection === 'trees' && (
        <div className={`relative border-r transition-all duration-300 ${
          isTreePanelCollapsed ? 'w-3' : 'w-64 p-4'
        }`} style={{ backgroundColor: '#f3f3f5', borderColor: 'var(--brand-light-3)' }}>
          {/* Collapse/Expand Arrow Button */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-12 border rounded-lg shadow-sm transition-colors flex items-center justify-center z-10"
            style={{ 
              backgroundColor: 'var(--brand-white)', 
              borderColor: 'var(--brand-light-3)',
              color: 'var(--brand-grey-cool)'
            }}
            onClick={() => setIsTreePanelCollapsed(!isTreePanelCollapsed)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-light-5)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-white)'}
          >
            {isTreePanelCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>

          {!isTreePanelCollapsed && (
            <>
              <div className="mb-4">
                <h3 className="text-sm mb-3" style={{ color: 'var(--brand-dark-2)' }}>DOCUMENT TREES</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--brand-grey-cool)' }}>Select tree</label>
                  <Select value={selectedTree} onValueChange={onTreeChange}>
                    <SelectTrigger className="w-full bg-white" style={{ borderColor: 'var(--brand-light-3)' }}>
                      <SelectValue placeholder="Choose tree..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="departments">Departments</SelectItem>
                      <SelectItem value="projects">Projects</SelectItem>
                      <SelectItem value="clients">Clients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedTree && (
                  <div className="space-y-1">
                    {Object.keys(departments).map((dept) => (
                      <div key={dept}>
                        <div
                          className="flex items-center px-2 py-2 text-sm cursor-pointer rounded transition-colors"
                          style={{
                            backgroundColor: selectedDepartment === dept ? '#fce8eb' : 'transparent',
                            color: selectedDepartment === dept ? 'var(--brand-red)' : 'var(--brand-dark-2)'
                          }}
                          onClick={() => {
                            onDepartmentToggle(dept);
                            onDepartmentSelect(dept);
                          }}
                          onMouseEnter={(e) => {
                            if (selectedDepartment !== dept) {
                              e.currentTarget.style.backgroundColor = 'var(--brand-light-5)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedDepartment !== dept) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {expandedDepartments.includes(dept) ? (
                            <ChevronDown className="w-4 h-4 mr-1" />
                          ) : (
                            <ChevronRight className="w-4 h-4 mr-1" />
                          )}
                          {expandedDepartments.includes(dept) ? (
                            <FolderOpen className="w-4 h-4 mr-2" />
                          ) : (
                            <Folder className="w-4 h-4 mr-2" />
                          )}
                          {dept}
                        </div>
                        
                        {expandedDepartments.includes(dept) && (
                          <div className="ml-6 space-y-1 mt-1">
                            {departments[dept as keyof typeof departments].map((subDept) => (
                              <div
                                key={subDept}
                                className="px-2 py-1 text-sm cursor-pointer rounded transition-colors"
                                style={{
                                  backgroundColor: selectedSubDepartment === subDept ? '#fce8eb' : 'transparent',
                                  color: selectedSubDepartment === subDept ? 'var(--brand-red)' : 'var(--brand-grey-cool)'
                                }}
                                onClick={() => onSubDepartmentSelect(subDept)}
                                onMouseEnter={(e) => {
                                  if (selectedSubDepartment !== subDept) {
                                    e.currentTarget.style.backgroundColor = 'var(--brand-light-5)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedSubDepartment !== subDept) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }
                                }}
                              >
                                <div className="flex items-center">
                                  <Folder className="w-3 h-3 mr-2" />
                                  {subDept}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}