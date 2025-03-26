
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Trash2,
  Plus,
} from "lucide-react";
import AIGenerator from "./AIGenerator";

const ResumeForm: React.FC = () => {
  const {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    updateSkill,
    removeSkill,
  } = useResume();

  const [newSkill, setNewSkill] = useState("");
  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill({ name: newSkill.trim() });
      setNewSkill("");
    }
  };

  const handleAddExperience = () => {
    addExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      achievements: [""],
    });
  };

  const handleAddEducation = () => {
    addEducation({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
  };

  const handleUpdateExperienceAchievement = (
    expIndex: number,
    achievementIndex: number,
    value: string
  ) => {
    const experience = resumeData.experience[expIndex];
    const newAchievements = [...experience.achievements];
    newAchievements[achievementIndex] = value;
    
    updateExperience(experience.id, { achievements: newAchievements });
  };

  const handleAddAchievement = (expIndex: number) => {
    const experience = resumeData.experience[expIndex];
    const newAchievements = [...experience.achievements, ""];
    
    updateExperience(experience.id, { achievements: newAchievements });
  };

  const handleRemoveAchievement = (expIndex: number, achievementIndex: number) => {
    const experience = resumeData.experience[expIndex];
    const newAchievements = experience.achievements.filter(
      (_, i) => i !== achievementIndex
    );
    
    updateExperience(experience.id, { achievements: newAchievements });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="personal" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
          </TabsList>
          
          <AIGenerator />
        </div>

        <TabsContent value="personal" className="animate-fade-in">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    updatePersonalInfo({ fullName: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={resumeData.personalInfo.jobTitle}
                  onChange={(e) =>
                    updatePersonalInfo({ jobTitle: e.target.value })
                  }
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    updatePersonalInfo({ location: e.target.value })
                  }
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) =>
                    updatePersonalInfo({ website: e.target.value })
                  }
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    updatePersonalInfo({ linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                rows={4}
                value={resumeData.personalInfo.summary}
                onChange={(e) =>
                  updatePersonalInfo({ summary: e.target.value })
                }
                placeholder="A brief summary of your professional background and career goals..."
                className="resize-none"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="animate-fade-in">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Work Experience</h3>
              <Button
                onClick={handleAddExperience}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Experience
              </Button>
            </div>

            {resumeData.experience.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No work experience added yet. Click "Add Experience" to get started.
              </div>
            ) : (
              <div className="space-y-8">
                {resumeData.experience.map((exp, expIndex) => (
                  <div key={exp.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(exp.id)}
                      className="absolute right-0 top-0 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, { company: e.target.value })
                          }
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${exp.id}`}>Position</Label>
                        <Input
                          id={`position-${exp.id}`}
                          value={exp.position}
                          onChange={(e) =>
                            updateExperience(exp.id, { position: e.target.value })
                          }
                          placeholder="Job Title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${exp.id}`}
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(exp.id, { startDate: e.target.value })
                          }
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${exp.id}`}
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, { endDate: e.target.value })
                          }
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${exp.id}`}>Location (Optional)</Label>
                        <Input
                          id={`location-${exp.id}`}
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(exp.id, { location: e.target.value })
                          }
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(exp.id, { description: e.target.value })
                        }
                        placeholder="Brief description of your role and responsibilities"
                        className="resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Key Achievements</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddAchievement(expIndex)}
                          className="h-8 text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      </div>

                      {exp.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start gap-2">
                          <Input
                            value={achievement}
                            onChange={(e) =>
                              handleUpdateExperienceAchievement(
                                expIndex,
                                achievementIndex,
                                e.target.value
                              )
                            }
                            placeholder="e.g., Increased sales by 20% within 3 months"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveAchievement(expIndex, achievementIndex)
                            }
                            disabled={exp.achievements.length <= 1}
                            className="h-10 w-10 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {expIndex < resumeData.experience.length - 1 && (
                      <Separator className="mt-8" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="education" className="animate-fade-in">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Education</h3>
              <Button
                onClick={handleAddEducation}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Education
              </Button>
            </div>

            {resumeData.education.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No education added yet. Click "Add Education" to get started.
              </div>
            ) : (
              <div className="space-y-8">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(edu.id)}
                      className="absolute right-0 top-0 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(edu.id, { institution: e.target.value })
                          }
                          placeholder="University or School Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, { degree: e.target.value })
                          }
                          placeholder="e.g., Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`fieldOfStudy-${edu.id}`}>Field of Study</Label>
                        <Input
                          id={`fieldOfStudy-${edu.id}`}
                          value={edu.fieldOfStudy}
                          onChange={(e) =>
                            updateEducation(edu.id, { fieldOfStudy: e.target.value })
                          }
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${edu.id}`}>Location (Optional)</Label>
                        <Input
                          id={`location-${edu.id}`}
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(edu.id, { location: e.target.value })
                          }
                          placeholder="City, State"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${edu.id}`}
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(edu.id, { startDate: e.target.value })
                          }
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${edu.id}`}
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(edu.id, { endDate: e.target.value })
                          }
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor={`description-${edu.id}`}>
                        Description (Optional)
                      </Label>
                      <Textarea
                        id={`description-${edu.id}`}
                        value={edu.description}
                        onChange={(e) =>
                          updateEducation(edu.id, { description: e.target.value })
                        }
                        placeholder="Relevant coursework, honors, or activities"
                        className="resize-none"
                        rows={3}
                      />
                    </div>

                    {index < resumeData.education.length - 1 && (
                      <Separator className="mt-8" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="animate-fade-in">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            
            <div className="flex items-center gap-2 mb-6">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., Python, Project Management)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button onClick={handleAddSkill} className="flex-shrink-0">
                Add Skill
              </Button>
            </div>

            {resumeData.skills.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No skills added yet. Type a skill and click "Add Skill".
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm"
                  >
                    {skill.name}
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
