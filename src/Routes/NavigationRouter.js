import React, { useState, useEffect } from 'react';
import {RouterProvider,createBrowserRouter,
createRoutesFromElements,Route} from 'react-router-dom';
import Home from '../Pages/Home';
import Services from '../Pages/Services';
import About from '../Pages/About';
import Contactus from '../Pages/Contactus';
import Sign from '../Pages/Sign';
import Adding from '../Pages/Adding';
import HeroAdd from '../Pages/HeroAdd';
import UrgentAdd from '../Pages/UrgentAdd';
import AddBenf from '../Pages/AddBenf';
import PersonCard from '../Components/Person/People'
import { RootPage } from '../Pages/Root';
import OrganizationProfile from '../Pages/Org Pages/OrganizationProfile';
import UserProfile from '../Pages/UserProfile';
import OrgNotifications from '../Pages/Org Pages/OrgNotifications';
import OrgManageAccount from '../Pages/Org Pages/OrgManageAccount';


function Routee() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_services');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const createDynamicRoutes = () => {
    const dynamicRoutes = services.flatMap((service) => {
     
      const pathsAndComponents = [
        {
          key: `org-profile/manage/${service.url}`,
          path: `org-profile/manage/:serviceUrl`,
          component: <DynamicOrgManageComponent service={service} />,
        },
        {
          key: `services/${service.url}`,
          path: `services/:serviceUrl`,
          component: <DynamicServicePageComponent service={service} />,
        },
        {
          key: `admin/manage/${service.url}`,
          path: `admin/manage/:serviceUrl`,
          component: <DynamicAdminPageComponent service={service} />,
        },
      
      ];

    
      return pathsAndComponents.map(({ key, path, component }) => (
        <Route key={key} path={path} element={component} />
      ));
    });

    return dynamicRoutes;
  };
  const DynamicServicePageComponent = ({ service }) => {
    const [dynamicComponentModule, setDynamicComponentModule] = useState(null);

    useEffect(() => {
      const importComponent = async () => {
        try {
          let shapeComponentModule;

          if (service.shape === 0) {
            shapeComponentModule = await import('../Pages/Service Pages/ServicePageShape1');
          } else if (service.shape === 1) {
            shapeComponentModule = await import('../Pages/Service Pages/ServicePageShape2');
          } else {
            shapeComponentModule = await import('../Pages/Service Pages/ServicePageShapeDefault');
          }

          setDynamicComponentModule(shapeComponentModule);
        } catch (error) {
          console.error('Failed to dynamically import shape component:', error);
        }
      };

      importComponent();
    }, [service.shape]);

    const DynamicComponent = dynamicComponentModule?.default || null;

    return DynamicComponent ? <DynamicComponent service={service} /> : null;
  };


  const DynamicOrgManageComponent = ({ service }) => {
    const [dynamicComponentModule, setDynamicComponentModule] = useState(null);

    useEffect(() => {
      const importComponent = async () => {
        try {
          let shapeComponentModule;

          if (service.shape === 0) {
            shapeComponentModule = await import('../Pages/Org Pages/OrgManageShape1');
          } else if (service.shape === 1) {
            shapeComponentModule = await import('../Pages/Org Pages/OrgManageShape2');
          } else {
            shapeComponentModule = await import('../Pages/Org Pages/OrgManageDefault');
          }

          setDynamicComponentModule(shapeComponentModule);
        } catch (error) {
          console.error('Failed to dynamically import shape component:', error);
        }
      };

      importComponent();
    }, [service.shape]);

   
    const DynamicComponent = dynamicComponentModule?.default || null;

   
    return DynamicComponent ? <DynamicComponent service={service} /> : null;
  };



  const DynamicAdminPageComponent = ({ service }) => {
    const [dynamicComponentModule, setDynamicComponentModule] = useState(null);

    useEffect(() => {
      const importComponent = async () => {
        try {
          let shapeComponentModule;

          if (service.shape === 0) {
            shapeComponentModule = await import('../Pages/Admin Pages/AdminServicePageShape1');
          } else if (service.shape === 1) {
            shapeComponentModule = await import('../Pages/Admin Pages/AdminServicePageShape2');
          } else {
            shapeComponentModule = await import('../Pages/Admin Pages/AdminServicePageShapeDefault');
          }

          setDynamicComponentModule(shapeComponentModule);
        } catch (error) {
          console.error('Failed to dynamically import shape component:', error);
        }
      };

      importComponent();
    }, [service.shape]);


    const DynamicComponent = dynamicComponentModule?.default || null;


    return DynamicComponent ? <DynamicComponent service={service} /> : null;
  };



  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<RootPage />}>
        <Route index element={<Home  />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="sign" element={<Sign />} />
        <Route path="Adding" element={<Adding />} />
        <Route path="AddingHero" element={<HeroAdd />} />
        <Route path="UrgentAdd" element={<UrgentAdd />} />
        <Route path="Addbenf" element={<AddBenf />} />
        <Route path="PersonCard" element={<PersonCard />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="org-profile" element={<OrganizationProfile />} />
        {createDynamicRoutes()}
        <Route path="org-notifications" element={<OrgNotifications />} />
        <Route path="org-manage-account" element={<OrgManageAccount />} />
      </Route>
    )
  );
    

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Routee;
