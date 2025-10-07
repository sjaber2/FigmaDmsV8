import { Download, Printer, MoreHorizontal, Upload, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useCallback } from "react";
import { toast } from "sonner@2.0.3";

export function DocumentPreview() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [zoom, setZoom] = useState(100);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(files);
      toast.success(`${files.length} file(s) uploaded successfully`);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(files);
      toast.success(`${files.length} file(s) uploaded successfully`);
    }
  };

  return (
    <div className="flex-1 bg-white border-l border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Document Preview</h2>
          
          {uploadedFiles.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">{zoom}%</span>
              <Button variant="outline" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {uploadedFiles.length === 0 ? (
          /* Upload Area */
          <div
            className="border-2 border-dashed rounded-lg p-12 text-center transition-colors"
            style={{
              borderColor: dragActive ? 'var(--brand-red)' : 'var(--brand-light-3)',
              backgroundColor: dragActive ? '#fef5f6' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (!dragActive) e.currentTarget.style.borderColor = 'var(--brand-light-1)';
            }}
            onMouseLeave={(e) => {
              if (!dragActive) e.currentTarget.style.borderColor = 'var(--brand-light-3)';
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Document</h3>
            <p className="text-gray-600 mb-6">
              Drag a file here or click the button to browse your files
            </p>
            
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
              />
              <Button 
                className="text-white"
                style={{ backgroundColor: 'var(--brand-red)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c11a2d'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-red)'}
              >
                Choose File
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: PDF, DOC, DOCX, JPG, PNG, TIFF
            </p>
          </div>
        ) : (
          /* Document Preview Area */
          <div className="space-y-4">
            {/* Document Viewer */}
            <div className="border border-gray-200 rounded-lg bg-gray-50 min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-20 bg-white border border-gray-300 rounded mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-10 rounded" style={{ backgroundColor: 'var(--brand-light-5)' }}></div>
                </div>
                <p className="text-sm text-gray-600">
                  {uploadedFiles[0]?.name || "Document Preview"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {uploadedFiles[0]?.size ? `${Math.round(uploadedFiles[0].size / 1024)} KB` : ""}
                </p>
              </div>
            </div>

            {/* Page Thumbnails */}
            {uploadedFiles.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-16 h-20 border border-gray-300 rounded bg-white cursor-pointer transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--brand-red)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--brand-light-3)'}
                  >
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload More Files */}
            <div className="border border-dashed border-gray-300 rounded p-4 text-center">
              <div className="relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
                />
                <p className="text-sm text-gray-600">
                  <span 
                    className="cursor-pointer"
                    style={{ color: 'var(--brand-red)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#c11a2d'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--brand-red)'}
                  >
                    Click to upload more files
                  </span> or drag and drop
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}