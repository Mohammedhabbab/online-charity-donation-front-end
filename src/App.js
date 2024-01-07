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
import CartHome from '../src/Components/Cart/CartHome';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Cart from './Components/Cart/Cart';
import { CartProvider } from 'react-use-cart';
function App() {

  
  return (
    <>
     <NavigationRouter />
      <CartProvider> 
        <CartHome />
        <Cart />
      </CartProvider>
    </>
  );
}

export default App;
