import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Globe, Lock } from 'lucide-react'

const features = [
  {
    title: 'Blazing Fast',
    description: 'Get your website up and running in seconds with our optimized infrastructure.',
    icon: Zap,
  },
  {
    title: 'Global Edge Network',
    description: 'Deploy your site to a global edge network for lightning-fast access worldwide.',
    icon: Globe,
  },
  {
    title: 'Secure by Default',
    description: 'Automatic HTTPS, always-on DDoS protection, and more to keep your site safe.',
    icon: Lock,
  },
]

export function Features() {
  return (
    <div className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Check out our latest work:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-muted">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/80">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

