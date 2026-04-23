import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "./navbarConfig";
import {} from "lucide-react";
import { ROUTES } from "@/shared/types/constants";
import { ArrowRight, UtensilsCrossed, Menu, X } from "lucide-react";

import { useCurrentUser } from "@/features/auth";

// Wire up dashboard by role
import { getUserRedirect } from "@/shared/helpers/getUserRedirect";

const NavBar = () => {
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
    <header className="bg-foreground fixed top-0 right-0 left-0 z-50 backdrop-blur-md">
      <nav className="container mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        {/* Logo, always visible always left */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <div className="from-primary flex h-8 w-8 items-center justify-center rounded-2xl bg-linear-to-tr via-orange-500 to-amber-400">
            <UtensilsCrossed size={16} className="text-white" strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Dineza</span>
        </Link>

        {/* Hamburger, visible on mobile, hidden on desktop */}

        <button
          className="cursor-pointer bg-none lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <Menu size={22} className="text-white" />
          )}
        </button>

        {/* Nav links, hidden on mobile, visible on desktop */}
        <ul className="hidden items-center gap-x-8 text-base text-white lg:flex">
          {navLinks.map((link) => (
            <li key={link.path} className="cursor-pointer">
              <Link
                to={link.path}
                className="hover:text-primary focus:ring-primary focus:ring-2 focus:outline-none"
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
            <Link to={ROUTES.REGISTER} className="text-white">
              Log in
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button className="bg-primary cursor-pointer gap-1.5">
                Get Started
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile dropdown, visible on mobile, hidden on desktop */}
      {isMenuOpen && (
        <div className="flex flex-col px-5 py-4 text-sm transition-all duration-300 ease-in-out lg:hidden">
          <ul className="flex flex-col gap-y-4 p-4 pb-4 text-white">
            {navLinks.map((link) => (
              <li key={link.path} className="cursor-pointer">
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className="hover:text-primary focus:ring-primary block focus:ring-2 focus:outline-none"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth actions buttons visible on mobile */}
          {authUser && authUser.role ? (
            <Button onClick={handleGoToDashboard} className="mx-auto w-full">
              My Dashboard
            </Button>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-2">
              <Link to={ROUTES.LOGIN} onClick={closeMenu} className="w-full">
                <Button className="w-full cursor-pointer gap-1.5">
                  Get Started
                  <ArrowRight size={14} />
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER} onClick={closeMenu} className="w-full">
                <Button variant="outline" className="text-primary w-full cursor-pointer border">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
