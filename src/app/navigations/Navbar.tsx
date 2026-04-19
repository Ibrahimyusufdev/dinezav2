import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "./navbarConfig";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/shared/types/constants";

import { useCurrentUser } from "@/features/auth";

// Wire up dashboard by role
import { getUserRedirect } from "@/shared/helpers/getUserRedirect";
import { Logo } from "@/shared/components/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // get authUser from useAuthUser, react query
  const { authUser } = useCurrentUser();

  const navigate = useNavigate();

  //  Navigate authUser to their dashboard based on role
  const handleGoToDashboard = (): void => {
    navigate(getUserRedirect(authUser));
  };

  return (
    <header>
      <nav className="container mx-auto flex items-center justify-between px-8 py-6">
        {/* Logo, always visible always left */}
        <Logo />

        {/* Hamburger, visible on mobile, hidden on desktop */}

        <Button
          className="border-primary cursor-pointer border lg:hidden"
          variant="outline"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Nav links, hidden on mobile, visible on desktop */}
        <ul className="hidden items-center gap-x-8 text-base lg:flex">
          {navLinks.map((link) => (
            <li key={link.path} className="cursor-pointer">
              <Link
                to={link.path}
                className="text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons, hidden on mobile, visible on desktop */}
        {authUser && authUser.role ? (
          <Button onClick={handleGoToDashboard} className="hidden cursor-pointer lg:flex">
            My Dashboard
          </Button>
        ) : (
          <div className="hidden items-center gap-3 lg:flex">
            <Link to={ROUTES.REGISTER}>
              <Button variant="outline">Sign Up</Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button className="cursor-pointer">Login</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile dropdown, visible on mobile, hidden on desktop */}
      {isMenuOpen && (
        <div className="border-primary flex flex-col border px-4 pb-4 transition-all duration-300 ease-in-out lg:hidden">
          <ul className="flex flex-col items-center gap-y-3 p-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.path} className="cursor-pointer">
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
          {authUser && authUser.role ? (
            <Button onClick={handleGoToDashboard} className="mx-auto w-full max-w-xs">
              My Dashboard
            </Button>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-2">
              <Link to={ROUTES.REGISTER} onClick={closeMenu} className="w-full max-w-xs">
                <Button variant="outline" className="border-primary w-full cursor-pointer border">
                  Sign Up
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN} onClick={closeMenu} className="w-full max-w-xs">
                <Button className="w-full cursor-pointer">Login</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
