
import React, { createContext, useContext, useState, ReactNode } from "react";

// Template types
export type TemplateType = "minimal" | "professional" | "creative" | "modern";

// Resume data types
export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate: string;
  location?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level?: number; // 1-5
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  selectedTemplate: TemplateType;
  color: string;
}

// Initial resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  selectedTemplate: "minimal",
  color: "#3B82F6",
};

// Context type
interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setTemplate: (template: TemplateType) => void;
  setColor: (color: string) => void;
  resetResume: () => void;
}

// Create context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Provider component
export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addEducation = (education: Omit<Education, "id">) => {
    const newEducation: Education = { ...education, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, ...education } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id),
    }));
  };

  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience: Experience = { ...experience, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item => 
        item.id === id ? { ...item, ...experience } : item
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill: Skill = { ...skill, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item => 
        item.id === id ? { ...item, ...skill } : item
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id),
    }));
  };

  const setTemplate = (template: TemplateType) => {
    setResumeData(prev => ({
      ...prev,
      selectedTemplate: template,
    }));
  };

  const setColor = (color: string) => {
    setResumeData(prev => ({
      ...prev,
      color,
    }));
  };

  const resetResume = () => {
    setResumeData(defaultResumeData);
  };

  return (
    <ResumeContext.Provider value={{
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
      setTemplate,
      setColor,
      resetResume,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use the resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
