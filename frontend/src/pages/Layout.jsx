import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const {user} =  useUser();

  return user ? (
    <div>
     <nav className="w-full h-16 flex items-center justify-between border-b border-gray-200 px-8">
  <img
    src={assets.logo}
    alt="logo"
    className="h-25 w-32 sm:w-44 cursor-pointer"
    onClick={() => navigate('/')}
  />
  {sidebar ? (
    <X
      onClick={() => setSidebar(false)}
      className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
    />
  ) : (
    <Menu
      onClick={() => setSidebar(true)}
      className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
    />
  )}
</nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-[#F4F7FB]'>
           <Outlet/>
        </div>
      </div>

    </div>
  ) : 
  (
    <div className='flex items-center justify-center h-screen'>
      <SignIn/>
    </div>
  )
}

export default Layout