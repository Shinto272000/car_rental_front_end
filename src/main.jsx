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



const router = createBrowserRouter([

  {
    element: <HomeLayout/>,
    children: [
      {
        path: "/",
        element: <App />,
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
      {
        path: "/dealer/signup",
        element: <DlsSignupPage />
      },
      {
        path: "/dealer/signin",
        element: <DlsSigninPage />
      }]
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  {/* <ChakraProvider> */}
    <RouterProvider router={router} />
    {/* </ChakraProvider> */}
  </React.StrictMode>
)
