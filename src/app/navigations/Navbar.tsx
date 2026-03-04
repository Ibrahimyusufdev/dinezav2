import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gray-300">
      <nav className="container mx-auto flex items-center justify-between px-4">
        {/* Main navigation */}
        <ul className="flex items-center gap-x-10 py-6">
          <li>
            <Link
              to="/"
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="#"
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              How It works
            </Link>
          </li>

          <li>
            <Link
              to="#"
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              For Women
            </Link>
          </li>

          <li>
            <Link
              to="#"
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              For Restaurants
            </Link>
          </li>

          <li>
            <Link
              to="#"
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Success Stories
            </Link>
          </li>
        </ul>

        {/* Auth actions buttons */}
        {/* Write a logic to display go to dashboard button if a user is loggedin */}
        {/* Display this two buttons if user is not loggedin */}
        <div className="flex items-center gap-3">
          <Link to="#">
            <Button className="cursor-pointer">Sign Up</Button>
          </Link>
          <Link to="#">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
