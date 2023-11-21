import './index.css';
import NavigationRouter from './Routes/NavigationRouter'
// import Navbar from './Components/Navbar/Navbar'
  import Footer from './Components/Footer/Footer'
// import { RouterProvider, createBrowserRouter,createRoutesFromElements, Route , Outlet } from 'react-router-dom'
// import Home from './Pages/Home'
// import About from './Pages/About'
// import Contactus from './Pages/Contactus'
// import Sign from './Pages/Sign'
// import ProfileU from './Pages/ProfileU'
// import ProfileO from './Pages/ProfileO'
import '../src/Components/PagesStyles/Services.css'
// import Logo from '../images/Logo.jpg';


function App() {
  return (<>
     
    <div className="Full">
     <NavigationRouter />
      

     
      <Footer/>
    </div>
    
    </>
  );
}

export default App;
