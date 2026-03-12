import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { navLinks } from "./navbarConfig";
import { Menu, X } from "lucide-react";
import { logo } from "@/assets";
import { ROUTES } from "@/shared/types/constants";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <nav className="container mx-auto flex items-center justify-between px-8 py-6">
        {/* Logo — always visible */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <img src={logo} width={20} height={20} alt="Dineza Logo" className="h-5 w-5" />
          <p className="font-bold">Dineza</p>
        </Link>

        {/* Hamburger — visible on mobile, hidden on desktop */}
        <button
          className="border-primary cursor-pointer rounded-lg border p-1 lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav links — hidden on mobile, visible on desktop */}
        <ul className="hidden items-center gap-x-8 text-base text-black lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons — hidden on mobile, visible on desktop */}
        {/* TODO: Show "Go to Dashboard" if user is logged in, else show Sign Up + Login */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="#">
            <Button className="cursor-pointer">Sign Up</Button>
          </Link>
          <Link to="#">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile dropdown — visible on mobile, hidden on desktop */}
      {isMenuOpen && (
        <div className="border-primary flex flex-col border px-4 pb-4 transition-all duration-300 ease-in-out lg:hidden">
          <ul className="flex flex-col items-center gap-y-3 p-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className="block text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth actions buttons visible on mobile */}
          {/* Write a logic to display go to dashboard button if a user is loggedin */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <Link to="#" onClick={closeMenu}>
              <Button className="w-full cursor-pointer">Sign Up</Button>
            </Link>
            <Link to="#" onClick={closeMenu}>
              <Button className="w-full cursor-pointer">Login</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
