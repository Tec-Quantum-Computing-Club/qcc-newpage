import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const topics = [
  "Self Improvement",
  "Writing",
  "Relationships",
  "Politics",
  "Productivity",
  "Money",
  "Python",
]

export function TopicsSidebar() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Recommended topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Badge
            key={topic}
            variant="secondary"
            className="rounded-full px-4 py-1 text-sm"
          >
            {topic}
          </Badge>
        ))}
      </div>
      <Button variant="link" className="px-0">
        See more topics
      </Button>
    </div>
  )
}

