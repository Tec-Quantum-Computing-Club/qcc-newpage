import { ArticleCard } from "@/components/article-card"
import { TopicsSidebar } from "@/components/topics-sidebar"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <main className="flex-1 container py-24 px-16 md:px-23">
        <SiteHeader />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 mt-12">
        <div className="space-y-10">
          <ArticleCard
            author={{
              name: "Hector Javier Medel Cobaxin",
              image: "/placeholder.svg",
              verified: true,
            }}
            title="FISMAT 101 - Aprende a resolver problemas de física"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus et odio fermentum..."
            date="Sep 1, 2023"
            views={23000}
            comments={768}
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DST6wCcQrVIVgJ9EJP43jjNN0rFZyH.png"
          />
          <ArticleCard
            author={{
              name: "Dr. Felipe Gerardo Ramón Fox",
              image: "/placeholder.svg",
              verified: true,
            }}
            title="Lorem Ipsum: The Ultimate Guide"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus et odio fermentum..."
            date="1d ago"
            views={85}
            comments={3}
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DST6wCcQrVIVgJ9EJP43jjNN0rFZyH.png"
          />
          <ArticleCard
            author={{
              name: "The Coding Diaries",
              image: "/placeholder.svg",
            }}
            title="Why Experienced Programmers Fail Coding Interviews"
            description="A friend of mine recently joined a FAANG company as an engineering manager, and found themselves in the position of..."
            date="Nov 2, 2022"
            views={1100}
            comments={224}
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DST6wCcQrVIVgJ9EJP43jjNN0rFZyH.png"
          />
        </div>
        <aside className="hidden md:block">
          <TopicsSidebar />
        </aside>
      </div>
    </main>
  )
}

