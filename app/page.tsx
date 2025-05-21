import ResumeBuilder from "@/components/resume-builder"
import { NeonBackground } from "@/components/neon-background"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <NeonBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-glow">Smartsume</h1>
          <p className="mt-2 text-gray-200">Build your professional resume in minutes</p>
        </header>
        <ResumeBuilder />
      </div>
    </main>
  )
}
