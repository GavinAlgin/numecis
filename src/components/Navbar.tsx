import { useState } from 'react'
import LOGOIMG from '../assets/numecis_logoIconRM.png'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Company', href: '#' },
  { name: 'Support', href: '#' },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent border-b border-gray-800/20">
      <nav className="flex items-center justify-between py-3 px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="p-1">
            <span className="sr-only">Numecis</span>
            <img
              src={LOGOIMG}
              alt="Logo"
              className="h-9 w-auto"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-800"
          >
            <span className="sr-only">Toggle menu</span>

            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="#"
            className="text-[15px] font-semibold text-black hover:opacity-80 transition"
          >
            Download For Free →
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-5 border-t border-gray-800/20">
          <div className="space-y-4 pt-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-gray-800 hover:text-black transition"
              >
                {item.name}
              </a>
            ))}

            <a
              href="#"
              className="block text-base font-semibold text-black pt-4"
            >
              Download For Free →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
