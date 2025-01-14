import Link from 'next/link'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-muted text-foreground py-6">
        <div className="mt-12 border-t border-primary/20 pt-8">
          <div className="flex justify-between items-center px-6">
            <div className="text-foreground/60 text-sm">
              &copy; 2025 Quantum Computing Club. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="https://linkedin.com" target="_blank" className="hover:text-primary">
                <FaLinkedin size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-primary">
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
        </div>
    </footer>
  )
}
