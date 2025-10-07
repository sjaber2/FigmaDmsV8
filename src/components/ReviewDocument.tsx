import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ReviewDocumentProps {
  onBack: () => void;
  onSave: () => void;
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

export function ReviewDocument({ onBack, onSave, documentData }: ReviewDocumentProps) {
  return (
    <div className="flex-1 p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Indexing
            </Button>
            <div>
              <h2>Review Document</h2>
              <p className="text-gray-600">Verify all information before saving</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Document Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <label className="text-sm font-medium text-gray-600">Document Type</label>
                  <p className="mt-1">{documentData.documentType || "Not specified"}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Date</label>
                <p className="mt-1">{documentData.date || "Not specified"}</p>
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
                    <p className="text-gray-500 text-sm">No tags added</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="mt-1 text-sm">
                  {documentData.description || "No description provided"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* File Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                File Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">File Name</label>
                <p className="mt-1 break-all">{documentData.fileName}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">File Size</label>
                <p className="mt-1">{documentData.fileSize}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Upload Date</label>
                <p className="mt-1">{new Date().toLocaleDateString()}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-green-600 text-sm">Ready to save</span>
                </div>
              </div>

              {/* Document Preview Thumbnail */}
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-600 mb-2 block">Preview</label>
                <div className="border border-gray-200 rounded p-4 bg-gray-50 text-center">
                  <div className="w-16 h-20 bg-white border border-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                    <div className="w-8 h-10 rounded" style={{ backgroundColor: 'var(--brand-light-5)' }}></div>
                  </div>
                  <p className="text-xs text-gray-600">Document Preview</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Validation Checks */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
              Validation Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Required fields completed</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">File format supported</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">File size within limits</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Duplicate check passed</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Edit
          </Button>
          <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
            Save Document
          </Button>
        </div>
      </div>
    </div>
  );
}