
import React from "react";
import { useResume, TemplateType } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Check, Palette } from "lucide-react";

interface TemplateCardProps {
  id: TemplateType;
  name: string;
  description: string;
  imageSrc: string;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  description,
  imageSrc,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? "ring-2 ring-primary ring-offset-2"
          : "hover:border-slate-300"
      }`}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Button
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          onClick={onSelect}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Selected
            </>
          ) : (
            "Use Template"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const TemplateList: React.FC = () => {
  const { resumeData, setTemplate, setColor } = useResume();
  
  const templates = [
    {
      id: "minimal" as TemplateType,
      name: "Minimal",
      description: "Clean and straightforward design perfect for traditional industries",
      imageSrc: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    },
    {
      id: "professional" as TemplateType,
      name: "Professional",
      description: "Refined layout with elegant typography and balanced sections",
      imageSrc: "https://images.unsplash.com/photo-1600267204091-5c1e8a5e94e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    },
    {
      id: "creative" as TemplateType,
      name: "Creative",
      description: "Bold design with visual elements for creative professionals",
      imageSrc: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
    },
    {
      id: "modern" as TemplateType,
      name: "Modern",
      description: "Contemporary design with a minimalist aesthetic and unique layout",
      imageSrc: "https://images.unsplash.com/photo-1544177812-078376ead49d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Choose a Template</h2>
          <p className="text-slate-600">
            Select a template that best showcases your professional experience
          </p>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border border-slate-200"
                style={{ backgroundColor: resumeData.color }}
              />
              <Palette className="h-4 w-4" />
              <span>Accent Color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Choose Primary Color</Label>
                <HexColorPicker
                  color={resumeData.color}
                  onChange={setColor}
                  className="!w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="h-8 w-8 rounded-full border border-slate-200"
                  style={{ backgroundColor: resumeData.color }}
                />
                <HexColorInput
                  color={resumeData.color}
                  onChange={setColor}
                  prefixed
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">Recommended Colors</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#3B82F6", // Blue
                    "#8B5CF6", // Purple
                    "#EC4899", // Pink
                    "#10B981", // Green
                    "#F59E0B", // Amber
                    "#EF4444", // Red
                    "#171717", // Almost Black
                    "#6B7280", // Gray
                  ].map((color) => (
                    <button
                      key={color}
                      className="h-6 w-6 rounded-full border border-slate-200 transition-all hover:scale-110 hover:shadow-md"
                      style={{ backgroundColor: color }}
                      onClick={() => setColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            name={template.name}
            description={template.description}
            imageSrc={template.imageSrc}
            isSelected={resumeData.selectedTemplate === template.id}
            onSelect={() => setTemplate(template.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateList;
