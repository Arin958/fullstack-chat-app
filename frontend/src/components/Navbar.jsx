import React from "react";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Lightbulb, LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useTheme } from '../ThemeContext'

const Navbar = () => {
  const { logout, authUser } = useAuthStore();


  return (
    <header className="bg-gray-200 border-b fixed w-full top-0 z-40 backdrop-blur-lg ">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center dark:bg-white">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1>Chatty</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/setting" className="">
              <Settings className="w-4 h-4" />
              <span className="hidden">Settings</span>
            </Link>

            {authUser && ( 
              <>
              <Link to={'/profile'} className="">
              <User className="size-5"/>
              <span className="hidden">Profile</span>
              </Link>

              <button className="flex gap-2 items-center" onClick={logout}>
                <LogOut className="size-5"/>
              </button>

              
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
