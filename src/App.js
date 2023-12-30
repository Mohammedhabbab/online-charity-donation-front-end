import './index.css';
// import Navbar from './Components/Navbar/Navbar'

// import { RouterProvider, createBrowserRouter,createRoutesFromElements, Route , Outlet } from 'react-router-dom'
// import Home from './Pages/Home'
// import About from './Pages/About'
// import Contactus from './Pages/Contactus'
// import Sign from './Pages/Sign'
// import ProfileU from './Pages/ProfileU'
// import ProfileO from './Pages/ProfileO'
// import '../src/Components/PagesStyles/Services.css'
// import Logo from '../images/Logo.jpg';
import NavigationRouter from './Routes/NavigationRouter'
import Card from './Components/PersonCard';
import '../src/Components/PersonCard.css' 

function App() {

  
  return (
    <>
     <NavigationRouter />
    </>
  );
}

export default App;
