"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import ResumeForm from "@/components/resume-form"
import MinimalistTemplate from "@/components/templates/minimalist-template"
import ProfessionalTemplate from "@/components/templates/professional-template"
import CreativeTemplate from "@/components/templates/creative-template"
import type { ResumeData } from "@/types/resume"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { motion, AnimatePresence } from "framer-motion"

export default function ResumeBuilder() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [selectedTemplate, setSelectedTemplate] = useState("minimalist")
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: {
      name: "John Doe",
      title: "Software Engineer",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      summary: "Experienced software engineer with a passion for building user-friendly applications.",
    },
    education: [
      {
        id: "1",
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        date: "2015 - 2019",
        description:
          "Graduated with honors. Relevant coursework included Data Structures, Algorithms, and Software Engineering.",
      },
    ],
    experience: [
      {
        id: "1",
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        date: "2019 - Present",
        description: "Developed and maintained web applications using React and Node.js. Led a team of 5 developers.",
      },
      {
        id: "2",
        company: "Digital Innovations",
        position: "Junior Developer",
        date: "2017 - 2019",
        description:
          "Assisted in the development of mobile applications using React Native. Implemented UI components and fixed bugs.",
      },
    ],
    skills: [
      { id: "1", name: "JavaScript" },
      { id: "2", name: "React" },
      { id: "3", name: "Node.js" },
      { id: "4", name: "TypeScript" },
      { id: "5", name: "HTML/CSS" },
    ],
    projects: [
      {
        id: "1",
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB.",
        url: "https://github.com/johndoe/ecommerce",
      },
    ],
  })

  const handleFormChange = (newData: ResumeData) => {
    setResumeData(newData)
  }

  const exportToPDF = async () => {
    const resumeElement = document.getElementById("resume-preview")
    if (!resumeElement) return

    toast({
      title: "Preparing PDF...",
      description: "Please wait while we generate your resume",
    })

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save("smartsume-resume.pdf")

      toast({
        title: "Success!",
        description: "Your resume has been downloaded",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column - Form */}
      <motion.div
        className="w-full lg:w-2/5 bg-white/10 backdrop-blur-md rounded-lg shadow-glow p-6 border border-white/20"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Resume Details</h2>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>
        <ResumeForm data={resumeData} onChange={handleFormChange} />
      </motion.div>

      {/* Right Column - Preview */}
      <motion.div className="w-full lg:w-3/5" variants={itemVariants}>
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-glow p-6 mb-4 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Resume Preview</h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={exportToPDF}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white border-none shadow-glow-sm"
              >
                <Download className="mr-2 h-4 w-4" /> Export PDF
              </Button>
            </motion.div>
          </div>

          <Tabs defaultValue="minimalist" value={selectedTemplate} onValueChange={setSelectedTemplate} className="mb-4">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 p-1">
              <TabsTrigger
                value="minimalist"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                Minimalist
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                Professional
              </TabsTrigger>
              <TabsTrigger
                value="creative"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                Creative
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div
            className="bg-white rounded-lg shadow-glow overflow-hidden transition-all duration-300"
            id="resume-preview"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTemplate}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {selectedTemplate === "minimalist" && <MinimalistTemplate data={resumeData} />}
                {selectedTemplate === "professional" && <ProfessionalTemplate data={resumeData} />}
                {selectedTemplate === "creative" && <CreativeTemplate data={resumeData} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
