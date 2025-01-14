import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/resources"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-foreground"
            )}
          >
            Articles
          </Link>
          <Link
            href="/workshops"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-muted-foreground"
            )}
          >
            Workshops
          </Link>
          <Link
            href="/blogpost"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-muted-foreground"
            )}
          >
            Blogpost
          </Link>
        </nav>
      </div>
    </header>
  )
}

