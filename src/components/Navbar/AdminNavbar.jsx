import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    const navLinks = [
    
    {
        path:"/admin/dashbord",
        value:"Dashbord"
    },
    {
        path:"/adminssss/add-cars",
        value:"Add car"
    },
    {
        path:"/admin/carlist",
        value:"Carlist"
    },
    {
        path:"/admin/dealersList",
        value:"Dealers List"
    },
    {
        path:"/admin/allordersss",
        value:"All Orders"
    },

    
    
    {
        path:"/dealer/signup",
        value:"signout"
    }]
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

export default AdminNavbar