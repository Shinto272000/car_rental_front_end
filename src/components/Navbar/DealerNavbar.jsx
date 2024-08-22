import React from 'react'
import { Link } from 'react-router-dom'

const DealerNavbar = () => {
    const navLinks = [
    {
        path:"/dealer/add-cars",
        value:"Add Car"
    },
    {
        path:"/dealer/signup",
        value:"signout"
    },
    {
        path:"/dealer/dashbord",
        value:"dashbord"
    }
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

export default DealerNavbar