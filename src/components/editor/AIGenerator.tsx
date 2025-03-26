
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AIGenerator: React.FC = () => {
  const { updatePersonalInfo, addExperience, addEducation, addSkill } = useResume();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [contentType, setContentType] = useState<"summary" | "experience" | "education" | "skills">("summary");

  const handleGenerate = () => {
    if (!jobTitle) {
      toast.error("Please enter a job title");
      return;
    }

    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let content = "";
      
      switch (contentType) {
        case "summary":
          content = generateSummary(jobTitle);
          break;
        case "experience":
          content = generateExperience(jobTitle);
          break;
        case "education":
          content = generateEducation(jobTitle);
          break;
        case "skills":
          content = generateSkills(jobTitle);
          break;
      }
      
      setGeneratedContent(content);
      setLoading(false);
    }, 1500);
  };

  const handleApply = () => {
    if (!generatedContent) return;

    switch (contentType) {
      case "summary":
        updatePersonalInfo({ summary: generatedContent });
        toast.success("Professional summary applied to your resume");
        break;
      case "experience":
        addExperience({
          company: "AI Generated Company",
          position: jobTitle,
          startDate: "01/2023",
          endDate: "Present",
          location: "Remote",
          description: generatedContent.split("\n\n")[0] || "",
          achievements: generatedContent.split("\n\n")[1]?.split("\n").filter(Boolean) || [""],
        });
        toast.success("Experience added to your resume");
        break;
      case "education":
        const [degree, institution] = generatedContent.split(" from ");
        addEducation({
          institution: institution || "University",
          degree: degree || "Degree",
          fieldOfStudy: jobTitle,
          startDate: "09/2018",
          endDate: "06/2022",
          location: "University Location",
          description: "",
        });
        toast.success("Education added to your resume");
        break;
      case "skills":
        generatedContent.split(", ").forEach(skill => {
          addSkill({ name: skill });
        });
        toast.success("Skills added to your resume");
        break;
    }

    setOpen(false);
    setGeneratedContent("");
  };

  // Mock AI generation functions
  const generateSummary = (title: string) => {
    const summaries = [
      `Innovative and detail-oriented ${title} with 5+ years of experience designing and developing user-centered digital products. Proficient in collaborating with cross-functional teams to define, design, and ship new features. Passionate about creating intuitive, accessible, and responsive designs that enhance user experience.`,
      `Results-driven ${title} with a proven track record of increasing efficiency and productivity through strategic process improvements. Adept at analyzing complex data to identify opportunities for optimization and growth. Known for clear communication and the ability to translate technical concepts to non-technical stakeholders.`,
      `Creative and analytical ${title} with expertise in developing comprehensive solutions that align with business objectives. Skilled in managing projects from conception to completion, ensuring deliverables meet quality standards and deadlines. Enthusiastic about leveraging emerging technologies to solve challenging problems.`
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const generateExperience = (title: string) => {
    const experiences = [
      `Led a team of 5 professionals in developing and implementing strategic initiatives that increased departmental efficiency by 25%. Collaborated with cross-functional teams to ensure alignment with organizational goals and objectives.\n\n• Spearheaded the development of a new project management system that reduced project completion time by 30%\n• Conducted regular performance reviews and provided mentorship to team members\n• Presented quarterly progress reports to executive leadership\n• Managed a budget of $500,000 and consistently came in under budget`,
      `Designed and executed comprehensive marketing campaigns that resulted in a 40% increase in customer engagement and a 20% growth in revenue. Utilized data analytics to inform strategy adjustments and optimize performance metrics.\n\n• Created and implemented a social media strategy that increased follower count by 15,000 in 6 months\n• Developed compelling content for various platforms, resulting in a 35% increase in conversion rates\n• Collaborated with the sales team to align marketing initiatives with sales goals\n• Conducted market research to identify emerging trends and opportunities`,
      `Developed and maintained complex software applications using cutting-edge technologies and best practices. Worked closely with product managers and designers to translate requirements into functional features that enhanced user experience.\n\n• Reduced application load time by 40% through code optimization and refactoring\n• Implemented automated testing protocols that caught 95% of bugs before production\n• Mentored junior developers in code reviews and pair programming sessions\n• Contributed to open-source projects and represented the company at industry conferences`
    ];
    
    return experiences[Math.floor(Math.random() * experiences.length)];
  };

  const generateEducation = (title: string) => {
    const educations = [
      `Bachelor of Science in Computer Science from Massachusetts Institute of Technology`,
      `Master of Business Administration from Harvard Business School`,
      `Bachelor of Arts in Communication from Stanford University`,
      `Master of Science in Data Analytics from University of California, Berkeley`
    ];
    
    return educations[Math.floor(Math.random() * educations.length)];
  };

  const generateSkills = (title: string) => {
    const skillSets = {
      "Software Engineer": "JavaScript, TypeScript, React, Node.js, Python, SQL, Git, CI/CD, Cloud Architecture, Problem-Solving",
      "Product Manager": "Product Strategy, Agile Methodologies, User Research, Data Analysis, Roadmapping, Stakeholder Management, A/B Testing, Wireframing",
      "Data Scientist": "Python, R, SQL, Machine Learning, Statistical Analysis, Data Visualization, Big Data, TensorFlow, PyTorch, Tableau",
      "Marketing Manager": "Digital Marketing, Content Strategy, SEO/SEM, Social Media Management, Analytics, Campaign Management, Brand Development",
      "UX Designer": "User Research, Wireframing, Prototyping, Figma, Adobe Creative Suite, Interaction Design, Usability Testing, Information Architecture",
      "Project Manager": "Agile, Scrum, JIRA, Project Planning, Risk Management, Stakeholder Communication, Budgeting, Resource Allocation"
    };
    
    // Default to Software Engineer if the title doesn't match any predefined sets
    const defaultTitle = Object.keys(skillSets).find(key => title.toLowerCase().includes(key.toLowerCase())) || "Software Engineer";
    return skillSets[defaultTitle as keyof typeof skillSets];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <Sparkles className="h-4 w-4" /> AI Assist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> AI Resume Assistant
          </DialogTitle>
          <DialogDescription>
            Generate professional content for your resume based on your target job.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Target Job Title</Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Software Engineer, Product Manager"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description (Optional)</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here for more tailored suggestions..."
              className="resize-none"
              rows={3}
            />
          </div>
          
          <Tabs defaultValue="summary" onValueChange={(value) => setContentType(value as any)}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="pt-3">
              Generate a professional summary that highlights your expertise.
            </TabsContent>
            <TabsContent value="experience" className="pt-3">
              Create a job experience entry with key achievements.
            </TabsContent>
            <TabsContent value="education" className="pt-3">
              Suggest relevant education for your target position.
            </TabsContent>
            <TabsContent value="skills" className="pt-3">
              Generate a list of in-demand skills for your field.
            </TabsContent>
          </Tabs>
          
          {generatedContent && (
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
              <h4 className="font-medium text-sm text-slate-700 mb-2">Generated Content:</h4>
              <div className="text-sm whitespace-pre-line">{generatedContent}</div>
            </div>
          )}
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => setGeneratedContent("")}
            disabled={!generatedContent || loading}
            className="hidden sm:inline-flex"
          >
            Clear
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={!jobTitle || loading}
              variant="outline"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
            <Button 
              onClick={handleApply}
              disabled={!generatedContent || loading}
            >
              Apply to Resume
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIGenerator;
