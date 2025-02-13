import Link from "next/link"
import { Home, FileText, Users, Upload } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: FileText, label: "Blog Posts", href: "/dashboard/blog" },
  { icon: Users, label: "Teams", href: "/dashboard/teams" },
  { icon: Upload, label: "Submission", href: "/dashboard/submission" },
]

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-background border-r border-border fixed left-0 top-16 -z-10">
      <div className="h-16 px-6 flex items-center border-b border-border">
        
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center p-2 rounded-md text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

