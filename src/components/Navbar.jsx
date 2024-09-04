import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const navLinks = [{
        path:"/",
        value:"Home"
    },
    {
        path:"/user/signup",
        value:"User"
    },
    {
        path:"/dealer/signup",
        value:"Dealer"
    },
    // {
    //     path:"/admin/signin",
    //     value:"Admin"
    // },
]
  return (
    <div>
        <ul className='flex justify-between shadow-lg p-5'>
            {
                navLinks.map((link,i)=>
                (<Link key={i} to={link.path}>
                    <li>{link.value}</li>
                  </Link>))
            }
        </ul>
    </div>
  )
}

export default Navbar