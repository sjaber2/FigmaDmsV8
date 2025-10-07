import { Calendar, CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useState } from "react";

export function IndexingForm() {
  const [tags, setTags] = useState(["Q3", "budget"]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Indexing</h2>
      
      <div className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            defaultValue="User-Document-Priv-Ar (2)"
            className="mt-1"
            required
          />
        </div>

        {/* Category and Document Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select defaultValue="accounting">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accounting">Accounting</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="document-type" className="text-sm font-medium text-gray-700">
              Document Type <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="report">Report</SelectItem>
                <SelectItem value="memo">Memo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date and Tags */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </Label>
            <div className="relative mt-1">
              <Input
                id="date"
                type="date"
                className="pr-10"
                required
              />
              <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Tags</Label>
            <div className="mt-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs px-2 py-1"
                    style={{
                      backgroundColor: 'var(--brand-light-5)',
                      color: 'var(--brand-grey-cool)'
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1"
                      style={{ color: 'var(--brand-red)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#c11a2d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--brand-red)'}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTag}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Optional description..."
            className="mt-1 min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
}