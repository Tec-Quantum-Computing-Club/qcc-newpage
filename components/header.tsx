import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background bg-opacity-90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-primary font-bold text-xl">
              <img src="/logo1.svg" alt="QCC Logo" className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
            <Link href="/" className="text-foreground hover:text-primary">Home</Link>
              <Link href="#" className="text-foreground hover:text-primary">About us</Link>
              <Link href="/resources" className="text-foreground hover:text-primary">Resources</Link>
              <Link href="#" className="text-foreground hover:text-primary">Contact</Link>

               <Link 
                  href="/hack"
                  className="text-foreground hover:text-primary"
                >
                  {('Hackathon')}
                  <span className="absolute -right-6.5 -translate-y-2 bg-red-600 text-white text-[9px] px-1 py-1 rounded-full">
                    {('new')}
                  </span>
                </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

