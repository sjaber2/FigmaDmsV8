import { Button } from "./ui/button";
import { Save, ArrowRight, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ActionButtonsProps {
  onNext: () => void;
}

export function ActionButtons({ onNext }: ActionButtonsProps) {
  const handleSave = () => {
    toast.success("Document saved successfully");
  };

  const handleCancel = () => {
    toast.info("Operation cancelled");
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleSave}
            className="text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button
            onClick={onNext}
            className="text-white"
            style={{
              backgroundColor: 'var(--brand-red)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c11a2d'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-red)'}
          >
            Next: Review Document
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}