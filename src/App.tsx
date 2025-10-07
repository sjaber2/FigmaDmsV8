import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Toolbar";
import { Dashboard } from "./components/Dashboard";
import { InboxView } from "./components/InboxView";
import { OutboxView } from "./components/OutboxView";
import { RecentView } from "./components/RecentView";
import { FavoritesView } from "./components/FavoritesView";
import { NotificationsView } from "./components/NotificationsView";
import { UploadSelection } from "./components/UploadSelection";
import { IndexingForm } from "./components/IndexingForm";
import { DocumentPreview } from "./components/DocumentPreview";
import { ActionButtons } from "./components/ActionButtons";
import { ReviewDocument } from "./components/ReviewDocument";
import { DocumentInstance } from "./components/DocumentInstance";
import { ReportsView } from "./components/ReportsView";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type ViewType = 'dashboard' | 'inbox' | 'outbox' | 'favorites' | 'trees' | 'recent' | 'notifications' | 'reports' | 'tree-selection' | 'upload-selection' | 'indexing' | 'review' | 'instance';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTree, setSelectedTree] = useState('');
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedSubDepartment, setSelectedSubDepartment] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [favorites, setFavorites] = useState<number[]>([1, 3]); // Pre-populate with some favorites
  const [documentData, setDocumentData] = useState({
    title: '',
    category: '',
    documentType: '',
    date: '',
    tags: [] as string[],
    description: '',
    fileName: '',
    fileSize: ''
  });

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        toast.success('Removed from favorites');
        return prev.filter(favId => favId !== id);
      } else {
        toast.success('Added to favorites');
        return [...prev, id];
      }
    });
  };

  const handleNavigateToTree = () => {
    setCurrentView('tree-selection');
    setSelectedSection('trees');
  };

  const handleNavigateHome = () => {
    setCurrentView('dashboard');
    setSelectedSection('');
    setSelectedTree('');
    setExpandedDepartments([]);
    setSelectedDepartment(null);
    setSelectedSubDepartment(null);
    setUploadedFiles([]);
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setCurrentView(section as ViewType);
    
    // Reset tree-related state when not in trees section
    if (section !== 'trees') {
      setSelectedTree('');
      setExpandedDepartments([]);
      setSelectedDepartment(null);
      setSelectedSubDepartment(null);
    }
  };

  const handleTreeChange = (tree: string) => {
    setSelectedTree(tree);
    setExpandedDepartments([]);
    setSelectedDepartment(null);
    setSelectedSubDepartment(null);
  };

  const handleDepartmentToggle = (dept: string) => {
    setExpandedDepartments(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const handleDepartmentSelect = (dept: string) => {
    setSelectedDepartment(dept);
    setSelectedSubDepartment(null);
  };

  const handleSubDepartmentSelect = (subDept: string) => {
    setSelectedSubDepartment(subDept);
    setCurrentView('upload-selection');
  };

  const handleChooseFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        setUploadedFiles(files);
        setDocumentData(prev => ({
          ...prev,
          fileName: files[0].name,
          fileSize: `${Math.round(files[0].size / 1024)} KB`,
          title: files[0].name.replace(/\.[^/.]+$/, ""),
          category: selectedDepartment || ''
        }));
        setCurrentView('indexing');
        toast.success(`${files.length} file(s) uploaded successfully`);
      }
    };
    input.click();
  };

  const handleScanFile = () => {
    // Simulate scanning
    toast.success('Scanning initiated...');
    setTimeout(() => {
      const mockFile = new File(['mock content'], 'scanned_document.pdf', { type: 'application/pdf' });
      setUploadedFiles([mockFile]);
      setDocumentData(prev => ({
        ...prev,
        fileName: 'scanned_document.pdf',
        fileSize: '245 KB',
        title: 'Scanned Document',
        category: selectedDepartment || ''
      }));
      setCurrentView('indexing');
      toast.success('Document scanned successfully');
    }, 2000);
  };

  const handleNext = () => {
    setCurrentView('review');
  };

  const handleReviewBack = () => {
    setCurrentView('indexing');
  };

  const handleSave = () => {
    setCurrentView('instance');
    toast.success('Document saved successfully');
  };

  const handleNewDocument = () => {
    setCurrentView('upload-selection');
    setUploadedFiles([]);
    setDocumentData({
      title: '',
      category: '',
      documentType: '',
      date: '',
      tags: [],
      description: '',
      fileName: '',
      fileSize: ''
    });
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <Dashboard onNavigateToTree={handleNavigateToTree} />
          </div>
        );
      
      case 'inbox':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <InboxView favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          </div>
        );

      case 'outbox':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <OutboxView favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          </div>
        );

      case 'favorites':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <FavoritesView favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          </div>
        );

      case 'recent':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <RecentView favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          </div>
        );

      case 'notifications':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <NotificationsView />
          </div>
        );
      
      case 'trees':
      case 'tree-selection':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <div className="flex-1 p-6 bg-white flex items-center justify-center">
              <div className="text-center text-gray-500">
                <h3 className="mb-2">Document Trees</h3>
                <p>Select a tree from the sidebar and choose a department to view subdepartments</p>
              </div>
            </div>
          </div>
        );

      case 'upload-selection':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <UploadSelection 
              onChooseFile={handleChooseFile}
              onScanFile={handleScanFile}
              selectedDepartment={selectedDepartment || ''}
              selectedSubDepartment={selectedSubDepartment || ''}
            />
          </div>
        );

      case 'indexing':
        return (
          <div className="flex flex-1">
            <div className="w-1/2 border-r border-gray-200">
              <IndexingForm />
            </div>
            <div className="w-1/2">
              <DocumentPreview />
            </div>
          </div>
        );

      case 'review':
        return (
          <ReviewDocument 
            onBack={handleReviewBack}
            onSave={handleSave}
            documentData={documentData}
          />
        );

      case 'reports':
        return (
          <div className="flex flex-1">
            <Sidebar 
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
              selectedTree={selectedTree}
              onTreeChange={handleTreeChange}
              expandedDepartments={expandedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              selectedSubDepartment={selectedSubDepartment}
              onSubDepartmentSelect={handleSubDepartmentSelect}
              onNavigateHome={handleNavigateHome}
            />
            <ReportsView />
          </div>
        );

      case 'instance':
        return (
          <DocumentInstance 
            onNewDocument={handleNewDocument}
            documentData={documentData}
          />
        );

      default:
        return <Dashboard onNavigateToTree={handleNavigateToTree} />;
    }
  };

  const renderActionButtons = () => {
    if (currentView === 'indexing') {
      return <ActionButtons onNext={handleNext} />;
    }
    return null;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header 
        currentView={currentView}
        selectedDepartment={selectedDepartment || undefined}
        selectedSubDepartment={selectedSubDepartment || undefined}
        onNavigateHome={handleNavigateHome}
      />
      
      {/* Toolbar */}
      {currentView !== 'dashboard' && <Toolbar />}
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {renderMainContent()}
      </div>
      
      {/* Action Buttons */}
      {renderActionButtons()}
      
      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}