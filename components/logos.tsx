import Image from 'next/image'

const logos = [
  { name: 'ITESM', src: '/ITESM.svg?height=40&width=120' },
  { name: 'IBM', src: '/ibm.svg?height=40&width=120' },
  { name: 'MIT', src: '/mit.svg?height=40&width=120' },
  { name: 'Microsoft', src: '/microsoft.svg?height=40&width=120' },
  { name: 'IEEE', src: '/ieee.svg?height=40&width=120' },
]

export function Logos() {
  return (
    <div className="bg-muted py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-foreground/80 mb-8">Trusted by world leader companies and institutions around the world.</p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {logos.map((logo) => (
            <Image 
              key={logo.name} 
              src={logo.src} 
              alt={logo.name} 
              width={80} 
              height={40} 
              className="opacity-70"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
