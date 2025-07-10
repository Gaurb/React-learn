import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import{ LogoutBtn,Container,Logo } from '../index';

function Header() {
  const authState = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to={"/"}>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => (
              !item.active ? null : (
                <li key={item.name} className='mx-2'>
                  <button onClick={()=> navigate(item.slug)} className='text-white hover:text-gray-200'>
                    {item.name}
                  </button>
                </li>
              )
            ))}
            {authState && (<li><LogoutBtn /></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header