import { 
  Download, 
  RotateCcw, 
  Search, 
  Filter,
  Database,
  FileText,
  BarChart3,
  PieChart,
  Mail,
  Route,
  Printer,
  Key,
  Shield,
  ClipboardList
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Toolbar() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center space-x-2">
        {/* File Operations */}
        <Button variant="outline" size="sm" className="text-gray-700">
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
        
        <Button variant="outline" size="sm" className="text-gray-700">
          <RotateCcw className="w-4 h-4 mr-1" />
          Replace
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Search Operations */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-gray-700">
              <Search className="w-4 h-4 mr-1" />
              Search
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Search className="w-4 h-4 mr-2" />
              Quick Search
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Filter className="w-4 h-4 mr-2" />
              Advanced Search
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Database className="w-4 h-4 mr-2" />
              Metadata Search
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Reports */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-gray-700">
              <FileText className="w-4 h-4 mr-1" />
              Reports
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <BarChart3 className="w-4 h-4 mr-2" />
              Usage Report
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PieChart className="w-4 h-4 mr-2" />
              Storage Report
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ClipboardList className="w-4 h-4 mr-2" />
              Audit Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        {/* Communication */}
        <Button variant="outline" size="sm" className="text-gray-700">
          <Mail className="w-4 h-4 mr-1" />
          Email
        </Button>

        <Button variant="outline" size="sm" className="text-gray-700">
          <Route className="w-4 h-4 mr-1" />
          Route
        </Button>

        <Button variant="outline" size="sm" className="text-gray-700">
          <Printer className="w-4 h-4 mr-1" />
          Print
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Security & Admin */}
        <Button variant="outline" size="sm" className="text-gray-700">
          <Key className="w-4 h-4 mr-1" />
          Access
        </Button>

        <Button variant="outline" size="sm" className="text-gray-700">
          <Shield className="w-4 h-4 mr-1" />
          Watermark
        </Button>

        <Button variant="outline" size="sm" className="text-gray-700">
          <ClipboardList className="w-4 h-4 mr-1" />
          Audit
        </Button>
      </div>
    </div>
  );
}