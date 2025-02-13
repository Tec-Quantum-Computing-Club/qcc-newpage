"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SubmissionPage() {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [driveLink, setDriveLink] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the logic to submit the project
    console.log({ projectName, projectDescription, githubLink, driveLink, file })
    // Reset form after submission
    setProjectName("")
    setProjectDescription("")
    setGithubLink("")
    setDriveLink("")
    setFile(null)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Project Submission
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-1">
              Project Name
            </label>
            <Input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-gray-800 border-purple-500/50"
              required
            />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300 mb-1">
              Project Description
            </label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="bg-gray-800 border-purple-500/50"
              required
            />
          </div>
          <div>
            <label htmlFor="githubLink" className="block text-sm font-medium text-gray-300 mb-1">
              GitHub Link
            </label>
            <Input
              id="githubLink"
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="bg-gray-800 border-purple-500/50"
            />
          </div>
          <div>
            <label htmlFor="driveLink" className="block text-sm font-medium text-gray-300 mb-1">
              Google Drive/OneDrive Link
            </label>
            <Input
              id="driveLink"
              type="url"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              className="bg-gray-800 border-purple-500/50"
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-1">
              Upload PDF (optional)
            </label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="bg-gray-800 border-purple-500/50"
            />
          </div>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Submit Project
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}

