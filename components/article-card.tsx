import Image from "next/image"
import Link from "next/link"
import { MessageSquare } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ArticleCardProps {
  author: {
    name: string
    image: string
    verified?: boolean
  }
  title: string
  description: string
  date: string
  views: number
  comments: number
  image?: string
  featured?: boolean
}

export function ArticleCard({
  author,
  title,
  description,
  date,
  views,
  comments,
  image,
  featured,
}: ArticleCardProps) {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.image} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{author.name}</span>
            {author.verified && (
              <Badge variant="secondary" className="h-5 w-5 rounded-full p-0.5">
                ✓
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex gap-4 p-0">
        <div className="flex-1 space-y-2">
          <CardTitle className="text-2xl font-bold leading-tight">
            <Link href="#" className="hover:underline">
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{date}</span>
            <span>{views.toLocaleString()} views</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {comments}
            </span>
          </div>
        </div>
        {image && (
          <div className="relative h-32 w-32 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

