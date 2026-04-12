import { useState } from 'react'
import LOGOIMG from '../assets/numecis_logoIconRM.png'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Company', href: '/aboutus' },
  { name: 'Support', href: '/contact' },
  { name: 'Pricing', href: '/pricing' },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-200">
      <nav className="flex items-center justify-between py-3 px-6 lg:px-8">

        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="p-1">
            <span className="sr-only">Numecis</span>
            <img src={LOGOIMG} alt="Logo" className="h-9 w-auto" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-800 hover:bg-gray-100 transition">
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-[15px] font-semibold text-black hover:text-[#1B2BB8] transition">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-4">
          <Link
            to="/login"
            className="text-[15px] font-semibold text-gray-700 hover:text-black transition">
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-[#1B2BB8] text-white text-sm font-semibold hover:bg-gray-800 transition">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-6 border-t border-gray-200 bg-[#F3F3F3] rounded-b-md">
          <div className="space-y-4 pt-4">

            {/* Nav Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-base font-medium text-gray-800 hover:text-[#1B2BB8]"
                onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t pt-4 space-y-3">

              <Link
                to="/login"
                className="block text-center w-full py-2 rounded-md font-semibold border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
                onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>

              <Link
                to="/signup"
                className="block text-center w-full py-2 rounded-md bg-[#1B2BB8] text-white font-semibold hover:bg-gray-800 transition"
                onClick={() => setMobileMenuOpen(false)}>
                Join Now
              </Link>

            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar