import ResumeClientPage from "./ResumeClientPage"
import resumeData from "@/data/resume-data"

export const metadata = {
  title: "About",
  description: `Conheça ${resumeData.personalInfo.name}, ${resumeData.personalInfo.title}.`,
}

export default function ResumePage() {
  return <ResumeClientPage />
}
