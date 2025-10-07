import { Upload, Scan } from "lucide-react";
import { Button } from "./ui/button";

interface UploadSelectionProps {
  onChooseFile: () => void;
  onScanFile: () => void;
  selectedDepartment: string;
  selectedSubDepartment: string;
}

export function UploadSelection({ 
  onChooseFile, 
  onScanFile, 
  selectedDepartment, 
  selectedSubDepartment 
}: UploadSelectionProps) {
  return (
    <div className="flex-1 p-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-2">Upload Document</h2>
          <p className="text-gray-600">
            Selected: {selectedDepartment} › {selectedSubDepartment}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Choose File Option */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors"
            style={{ borderColor: 'var(--brand-light-3)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-red)';
              e.currentTarget.style.backgroundColor = '#fef5f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-light-3)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="mb-2">Choose File</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Select documents from your computer to upload
            </p>
            <Button 
              onClick={onChooseFile}
              className="text-white"
              style={{ backgroundColor: 'var(--brand-red)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c11a2d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-red)'}
            >
              Browse Files
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Supported: PDF, DOC, DOCX, JPG, PNG, TIFF
            </p>
          </div>

          {/* Scan File Option */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 hover:bg-green-50 transition-colors">
            <Scan className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="mb-2">Scan Document</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Scan physical documents using connected scanner
            </p>
            <Button onClick={onScanFile} className="bg-green-600 hover:bg-green-700">
              Start Scanning
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Connect your scanner and click to begin
            </p>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Upload Guidelines</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Maximum file size: 50MB per document</li>
            <li>• Multiple files can be uploaded simultaneously</li>
            <li>• Ensure documents are clearly readable</li>
            <li>• Remove any sensitive information if not required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}