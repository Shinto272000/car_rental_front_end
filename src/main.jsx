import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from "./App.jsx"
import './index.css'
// import Signup from './components/user/UserSignup.jsx';
// import InSignup from './components/Instructor/InstructorSignup.jsx';
// import InSignin from './components/Instructor/InstructorSignin.jsx';
// import InsSignupPage from './Pages/instructor/InstructorSignupPage.jsx';
// import InsSigninPage from './Pages/instructor/InstructorSigninPage.jsx';
// import { ChakraProvider } from '@chakra-ui/react'
// import Table1 from './components/Table.jsx';
import HomeLayout from './Layout/HomeLayout.jsx';
import SignUpPage from './Pages/User/UserSignupPage.jsx';
import SigninPage from './Pages/User/UserSigninPage.jsx';
import DlsSignupPage from './Pages/Dealer/DealerSignupPage.jsx';
import DlsSigninPage from './Pages/Dealer/DealerSigninPage.jsx';
import UserLayout from './Layout/UserLayout.jsx';
import { ChakraProvider } from '@chakra-ui/react';
// import DealersList from './components/Dealer/DealersList.jsx';
import DealerRoutess from './Protected/DealerRoutess.jsx';
import Table1 from './components/User/Table.jsx';
import Cars from './components/User/Cars.jsx';
import { CarList } from './components/Dealer/CarList.jsx';
import CarAdd from './components/Dealer/CarAdd.jsx';
import AdminLayout from './Layout/AdminLayout.jsx';
import CarEdit from './components/Dealer/CarEdit.jsx';
import UserHome from './UserHome.jsx';
import { AvailableCar } from './components/User/AvailableCars.jsx';
import SingleCar from './components/User/SingleCar.jsx';
import UserRoutes from './Protected/UserRoutess.jsx';
import AdminRoute from './Protected/AdminRoutes.jsx';
import DealerLayout from './Layout/DealerLayout.jsx';
import DealerDashbord from './components/Dealer/DealerDashbord.jsx';
import OrderSummary from './components/User/OrderSummery.jsx';
import UserOrders from './components/User/UserOrders.jsx';
import UserReview from './components/User/UserReview.jsx';
import FrontendUserReview from './components/User/FrontendUserReview.jsx';
import AdminDashbord from './components/Dealer/AdminDashbord.jsx';
import DealersList from './components/Dealer/DealersList.jsx';
import AdminSigninPage from './Pages/Dealer/AdminSigninPage.jsx';


const router = createBrowserRouter([

  {
    element:<HomeLayout/>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/review",
        element: <FrontendUserReview/>,
      },

      // {
      //   path :"/table",
      //   element : <Table1/>
      // },

      {
        path: "/user/signup",
        element: <SignUpPage />
      },
      {
        path: "/user/signin",
        element: <SigninPage />
      },
      ]
  },
  {
    element:
    (<UserRoutes>
      <UserLayout/>
    </UserRoutes>)
    ,
    children : [{
      path: "/user/home",
        element: <UserHome/>
    },
    {
      path: "/user/cars",
        element: <Cars/>,
    },
    {
      path: "/user/available-cars",
        element: <AvailableCar/>,
    },
    {
      path: "/user/singlecar/:carId",
        element: <SingleCar/>,
    },
  {
    path :"/order-summary",
    element : <OrderSummary/>
  },
  {
    path :"/order-details",
    element : <UserOrders/>
  },
  {
    path :"/order-review",
    element : <UserReview/>
  }
]
  },
  // {
    
  //   element:
  //   (
  //     <AdminRoute>
  //     <AdminLayout/>
  //     </AdminRoute>),
  //   children : [
  //     {
  //     path: "/admin/add-cars",
  //     element:<CarAdd/>
  //   },
  //   {
  //     path: "/admin/carlist",
  //       element: <CarList/>,
  //   },

  //   {
  //     path: "/admin/cars/:id",
  //       element: <CarEdit/>,
  //   },]
  // },
  // {
    
  //   element:
  //   (
  //     <DealerRoutess>
  //     <DealerLayout/>
  //     </DealerRoutess>),
  //   children : [
  //     {
  //       path: "/admin/carlist",
  //         element: <AdminRoute><CarList/></AdminRoute>,
  //     },
  
  //     {
  //       path: "/admin/cars/:id",
  //         element: <AdminRoute><CarEdit/></AdminRoute>,
  //     },
  //     {
  //       path: "/admin/add-cars",
  //       element:<CarAdd/>
  //     }
   
  //   ]
  // },



    {
    
    element:
    (
      <AdminRoute>
      <AdminLayout/>
      </AdminRoute>),
    children : [
    //   {
    //   path: "/admin/add-cars",
    //   element:<CarAdd/>
    // },
    {
      path: "/admin/carlist",
        element: <CarList/>,
    },
    // {
    //   path: "/adminssss/add-cars",
    //   element:<CarAdd/>
    // },
    {
      path: "/admin/dashbord",
        element: <AdminDashbord/>,
    },
    {
      path: "/admin/dealersList",
        element: <DealersList/>,
    },

    {
      path: "/admin/cars/edit/:id",
        element: <CarEdit/>,
    },
    {
      path: "/admin/signin",
      element: <AdminSigninPage />
    }]
  },


  {
    
    element:
    (
      <DealerRoutess>
      <DealerLayout/>
      </DealerRoutess>),
    children : [
      {
      path: "/dealer/add-cars",
      element:<CarAdd/>
    },
    {
      path: "/dealer/dashbord",
      element:<DealerDashbord/>
    },
    {
      path: "/dealer/signup",
      element: <DlsSignupPage />
    },
    {
      path: "/dealer/signin",
      element: <DlsSigninPage />
    }
    // {
    //   path: "/admin/carlist",
    //     element: <CarList/>,
    // },

    // {
    //   path: "/admin/cars/:id",
    //     element: <CarEdit/>,
    // },
  ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider>
  
)
