
import Urgent from '../Components/Home/Urgent'
// import img from '../Components/images/dmitry-ratushny-xsGApcVbojU-unsplash.jpg'
import '../Components/Home/Home.css'
import HeroSection from '../Components/Home/HeroSection'
import ServicesSection from '../Components/Home/ServicesSection'
import AboutusHomeSection from '../Components/Home/AboutusHomeSection'
import ContactusHomeSection from '../Components/Home/ContactusHomeSection'
const Home = () => {


  return (
    <>
      < >
        <Urgent />
      </>
      <>
        <HeroSection />
      </>
       {/* <div className='white-space'></div> */}
              
      
      <>
        <ServicesSection />
      </>
      {/* <div className='white-space'>   </div> */}
      <>
     <AboutusHomeSection />
      </>
            {/* <div className='white-space'>   </div>*/}
      <><ContactusHomeSection/></>
      </>
  )
}

export default Home