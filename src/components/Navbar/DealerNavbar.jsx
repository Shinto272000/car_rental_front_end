import React from 'react'
import { Link } from 'react-router-dom'

const DealerNavbar = () => {
    const navLinks = [
    {
        path:"/dealer/dashbord",
        value:"dashbord"
    },     
    // {
    //     path:"/dealer/add-cars",
    //     value:"Add Car"
    // },
    
    {
      path:"/dealer/garagge",
      value:"Garagge"
  },
  {
    path:"/dealer/orderd-vehicle",
    value:"Orders"
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

export default DealerNavbar