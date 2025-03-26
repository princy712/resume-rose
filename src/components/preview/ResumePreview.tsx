
import React, { useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import html2pdf from "html2pdf.js";
import { Download, Mail, Link as LinkIcon, Phone, MapPin, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownload = () => {
    if (!resumeRef.current) return;

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${resumeData.personalInfo.fullName || "Your"}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Add a class temporarily for PDF export
    resumeRef.current.classList.add("print-mode");

    // Generate PDF
    html2pdf()
      .from(resumeRef.current)
      .set(opt)
      .save()
      .then(() => {
        // Remove the temporary class
        resumeRef?.current?.classList.remove("print-mode");
        toast({
          title: "Resume Downloaded",
          description: "Your resume has been saved as a PDF file.",
        });
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        resumeRef?.current?.classList.remove("print-mode");
        toast({
          title: "Download Failed",
          description: "There was an error generating your PDF. Please try again.",
          variant: "destructive",
        });
      });
  };

  // Template-specific rendering functions
  const renderMinimalTemplate = () => (
    <div className="p-8 font-sans" style={{ color: "#333" }}>
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {resumeData.personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg mb-4">
          {resumeData.personalInfo.jobTitle || "Professional Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
          {resumeData.personalInfo.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: resumeData.color }}>
            Professional Summary
          </h2>
          <p className="text-sm">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ borderColor: resumeData.color }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-medium">{exp.position}</h3>
                    <h4 className="text-sm">{exp.company}</h4>
                  </div>
                  <div className="text-sm text-right">
                    <div>{exp.startDate} - {exp.endDate}</div>
                    {exp.location && <div>{exp.location}</div>}
                  </div>
                </div>
                {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="text-sm space-y-1 pl-5 list-disc">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ borderColor: resumeData.color }}>
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-medium">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                    <h4 className="text-sm">{edu.institution}</h4>
                  </div>
                  <div className="text-sm text-right">
                    <div>{edu.startDate} - {edu.endDate}</div>
                    {edu.location && <div>{edu.location}</div>}
                  </div>
                </div>
                {edu.description && <p className="text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ borderColor: resumeData.color }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-block px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: `${resumeData.color}20` }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderProfessionalTemplate = () => (
    <div className="p-8 font-sans" style={{ color: "#333" }}>
      {/* Header with colored background */}
      <header 
        className="mb-8 p-6 rounded-lg text-white" 
        style={{ backgroundColor: resumeData.color }}
      >
        <h1 className="text-3xl font-bold mb-2">
          {resumeData.personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-xl mb-4">
          {resumeData.personalInfo.jobTitle || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-6 text-sm">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>

      {/* Two column layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column */}
        <div className="md:w-2/3 space-y-6">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: resumeData.color }}>
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm">{resumeData.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4" style={{ color: resumeData.color }}>
                WORK EXPERIENCE
              </h2>
              <div className="space-y-5">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-semibold">{exp.position}</h3>
                        <h4 className="text-sm font-medium">{exp.company}</h4>
                      </div>
                      <div className="text-sm text-right">
                        <div className="font-medium">{exp.startDate} - {exp.endDate}</div>
                        {exp.location && <div>{exp.location}</div>}
                      </div>
                    </div>
                    {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
                    {exp.achievements.length > 0 && (
                      <ul className="text-sm space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: resumeData.color }} />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="md:w-1/3 space-y-6">
          {/* Education */}
          {resumeData.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4" style={{ color: resumeData.color }}>
                EDUCATION
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    {edu.fieldOfStudy && (
                      <p className="text-sm font-medium">{edu.fieldOfStudy}</p>
                    )}
                    <p className="text-sm">{edu.institution}</p>
                    <p className="text-sm">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.location && <p className="text-sm">{edu.location}</p>}
                    {edu.description && (
                      <p className="text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4" style={{ color: resumeData.color }}>
                SKILLS
              </h2>
              <div className="space-y-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: resumeData.color }}
                    ></div>
                    <span className="text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Links */}
          {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin) && (
            <section>
              <h2 className="text-lg font-bold mb-4" style={{ color: resumeData.color }}>
                LINKS
              </h2>
              <div className="space-y-2">
                {resumeData.personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" style={{ color: resumeData.color }} />
                    <span className="text-sm">{resumeData.personalInfo.website}</span>
                  </div>
                )}
                {resumeData.personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" style={{ color: resumeData.color }} />
                    <span className="text-sm">{resumeData.personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="font-sans" style={{ color: "#333" }}>
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row">
        <div 
          className="md:w-1/3 p-8 text-white"
          style={{ backgroundColor: resumeData.color }}
        >
          <div className="sticky top-8">
            {/* Profile */}
            <div className="mb-10 text-center">
              <div className="w-32 h-32 mx-auto bg-white/20 rounded-full mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {resumeData.personalInfo.fullName
                    ? resumeData.personalInfo.fullName.split(' ').map(n => n[0]).join('')
                    : "YN"}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-1">
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
              <p className="text-lg opacity-90 mb-4">
                {resumeData.personalInfo.jobTitle || "Professional Title"}
              </p>
            </div>

            {/* Contact Info */}
            <div className="mb-10 space-y-3">
              <h2 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">
                CONTACT
              </h2>
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">{resumeData.personalInfo.email}</span>
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span className="text-sm">{resumeData.personalInfo.phone}</span>
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">{resumeData.personalInfo.location}</span>
                </div>
              )}
              {resumeData.personalInfo.website && (
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-5 w-5" />
                  <span className="text-sm">{resumeData.personalInfo.website}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">
                  SKILLS
                </h2>
                <div className="space-y-3">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{skill.name}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div 
                          className="bg-white h-1.5 rounded-full" 
                          style={{ width: `${(skill.level || 3) * 20}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 p-8">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <section className="mb-10">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ borderColor: `${resumeData.color}40`, color: resumeData.color }}>
                ABOUT ME
              </h2>
              <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold mb-6 pb-2 border-b" style={{ borderColor: `${resumeData.color}40`, color: resumeData.color }}>
                EXPERIENCE
              </h2>
              <div className="space-y-8">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-10">
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-0 top-1.5 w-4 h-4 rounded-full z-10"
                      style={{ backgroundColor: resumeData.color }}
                    ></div>
                    {/* Timeline line */}
                    <div 
                      className="absolute left-2 top-5 w-0.5 h-full -z-10"
                      style={{ backgroundColor: `${resumeData.color}30` }}
                    ></div>
                    
                    <div className="mb-2">
                      <h3 className="text-base font-semibold">{exp.position}</h3>
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">{exp.company}</h4>
                        <span className="text-sm text-gray-500">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="text-sm text-gray-500">{exp.location}</div>
                      )}
                    </div>
                    
                    {exp.description && <p className="text-sm mb-3">{exp.description}</p>}
                    
                    {exp.achievements.length > 0 && (
                      <ul className="text-sm space-y-2">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span 
                              className="font-bold text-xl leading-none mt-0.5"
                              style={{ color: resumeData.color }}
                            >
                              ·
                            </span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-6 pb-2 border-b" style={{ borderColor: `${resumeData.color}40`, color: resumeData.color }}>
                EDUCATION
              </h2>
              <div className="space-y-6">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="flex">
                    <Briefcase className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" style={{ color: resumeData.color }} />
                    <div>
                      <h3 className="text-base font-semibold">{edu.degree}</h3>
                      {edu.fieldOfStudy && (
                        <p className="text-sm font-medium">{edu.fieldOfStudy}</p>
                      )}
                      <p className="text-sm">
                        {edu.institution}, {edu.startDate} - {edu.endDate}
                      </p>
                      {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
                      {edu.description && (
                        <p className="text-sm mt-2">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderModernTemplate = () => (
    <div className="font-sans" style={{ color: "#333" }}>
      {/* Header */}
      <header className="p-8 pb-6 border-b-4" style={{ borderColor: resumeData.color }}>
        <h1 className="text-4xl font-bold mb-1">
          {resumeData.personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-xl mb-6" style={{ color: resumeData.color }}>
          {resumeData.personalInfo.jobTitle || "Professional Title"}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
          {resumeData.personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.website}</span>
            </div>
          )}
          {resumeData.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-4 w-4" style={{ color: resumeData.color }} />
              <span>{resumeData.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {/* Left Column (1/3) */}
        <div className="space-y-8">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: resumeData.color }}>
                <div className="w-6 h-1" style={{ backgroundColor: resumeData.color }}></div>
                PROFILE
              </h2>
              <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
            </section>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: resumeData.color }}>
                <div className="w-6 h-1" style={{ backgroundColor: resumeData.color }}></div>
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-block px-3 py-1 rounded-md text-sm"
                    style={{ 
                      backgroundColor: `${resumeData.color}10`,
                      border: `1px solid ${resumeData.color}30` 
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: resumeData.color }}>
                <div className="w-6 h-1" style={{ backgroundColor: resumeData.color }}></div>
                EDUCATION
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    {edu.fieldOfStudy && (
                      <p className="text-sm" style={{ color: resumeData.color }}>{edu.fieldOfStudy}</p>
                    )}
                    <p className="text-sm font-medium">{edu.institution}</p>
                    <p className="text-sm">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.location && <p className="text-sm">{edu.location}</p>}
                    {edu.description && (
                      <p className="text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (2/3) - Experience */}
        <div className="md:col-span-2">
          {resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: resumeData.color }}>
                <div className="w-6 h-1" style={{ backgroundColor: resumeData.color }}></div>
                EXPERIENCE
              </h2>
              <div className="space-y-8">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold">{exp.position}</h3>
                        <h4 className="text-base" style={{ color: resumeData.color }}>{exp.company}</h4>
                      </div>
                      <div className="text-sm">
                        <div className="md:text-right font-medium">
                          {exp.startDate} - {exp.endDate}
                        </div>
                        {exp.location && (
                          <div className="md:text-right">{exp.location}</div>
                        )}
                      </div>
                    </div>
                    
                    {exp.description && <p className="text-sm mb-3">{exp.description}</p>}
                    
                    {exp.achievements.length > 0 && (
                      <ul className="text-sm space-y-2 pl-5 list-disc">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // Render the selected template
  const renderTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case "minimal":
        return renderMinimalTemplate();
      case "professional":
        return renderProfessionalTemplate();
      case "creative":
        return renderCreativeTemplate();
      case "modern":
        return renderModernTemplate();
      default:
        return renderMinimalTemplate();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Preview Your Resume</h2>
          <p className="text-slate-600">Make sure everything looks good before downloading</p>
        </div>
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="shadow-lg overflow-hidden bg-white">
        <div ref={resumeRef} className="w-full">
          {renderTemplate()}
        </div>
      </Card>
    </div>
  );
};

export default ResumePreview;
