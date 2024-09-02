import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
    const navLinks = [{
        path:"/user/home",
        value:"Home"
    },
    // {
    //     path:"/user/cars",
    //     value:"BookNow"
    // },
    
    {
        path:"/user/available-cars",
        value:"CarList"
    },
    
    {
        path:"/order-details",
        value:"Order-details"
    },
    {
        path:"/order-review",
        value:"Review"
    },
    {
        path:"/",
        value:"signout"
    },
    

    
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

export default UserNavbar