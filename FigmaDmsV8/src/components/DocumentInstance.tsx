import { CheckCircle, FileText, Download, Share2, Edit, Trash2, Eye, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface DocumentInstanceProps {
  onNewDocument: () => void;
  documentData: {
    title: string;
    category: string;
    documentType: string;
    date: string;
    tags: string[];
    description: string;
    fileName: string;
    fileSize: string;
  };
}

export function DocumentInstance({ onNewDocument, documentData }: DocumentInstanceProps) {
  const documentId = "DOC-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  return (
    <div className="flex-1 p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-green-800 mb-2">Document Successfully Saved</h2>
          <p className="text-gray-600">
            Your document has been indexed and stored in the system
          </p>
        </div>

        {/* Document Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Document Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Document ID</label>
                  <p className="mt-1 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {documentId}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Title</label>
                  <p className="mt-1">{documentData.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Category</label>
                    <p className="mt-1">{documentData.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p className="mt-1">{documentData.documentType || "General"}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Tags</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {documentData.tags.length > 0 ? (
                      documentData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No tags</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">File Information</label>
                  <div className="mt-1 space-y-2">
                    <p className="text-sm"><span className="font-medium">Name:</span> {documentData.fileName}</p>
                    <p className="text-sm"><span className="font-medium">Size:</span> {documentData.fileSize}</p>
                    <p className="text-sm"><span className="font-medium">Created:</span> {new Date().toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Access Information</label>
                  <div className="mt-1 space-y-2">
                    <p className="text-sm"><span className="font-medium">Created by:</span> Current User</p>
                    <p className="text-sm"><span className="font-medium">Permissions:</span> Read/Write</p>
                    <p className="text-sm"><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Button variant="outline" className="flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            View Document
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit Metadata
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Document created and indexed</p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--brand-red)' }}></div>
                <div className="flex-1">
                  <p className="text-sm">File uploaded successfully</p>
                  <p className="text-xs text-gray-500">{new Date(Date.now() - 60000).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Metadata validation completed</p>
                  <p className="text-xs text-gray-500">{new Date(Date.now() - 120000).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Button 
                onClick={onNewDocument} 
                className="text-white h-auto py-4"
                style={{ backgroundColor: 'var(--brand-red)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c11a2d'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-red)'}
              >
                <div className="text-center">
                  <FileText className="w-6 h-6 mx-auto mb-2" />
                  <div>Upload Another Document</div>
                  <div className="text-xs opacity-90">Continue adding documents</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4"
              >
                <div className="text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <div>Browse All Documents</div>
                  <div className="text-xs text-gray-600">View your document library</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}