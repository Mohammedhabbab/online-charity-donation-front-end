import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import '../Components/PagesStyles/Services.css';
import ServicesSearchbar from '../Components/ServicesSearchbar';
import ServicesResults from '../Components/ServicesResults';
import ServicesCard from '../Components/ServicesCard'; 
import '../Components/ServicesCard.css'; 
import orphanImage from '../images/orphan.jpg';
import MedicalImage from '../images/Medical.jpg';
import studentsImage from '../images/students.jpg';
import stuffImage from '../images/stuff.jpg';

const Services = () => {
  const [results, setResults] = useState([
    {
      title: 'كفالة يتيم',
      description: '<قال رسول الله ﷺ: <أنا وكافل اليتيم في الجنة هكذا',
      imageUrl: orphanImage
    },
    {
      title: 'طالب علم',
      description: ' قال النبي صلى الله عليه وسلم: الدال على الخير كفاعله.',
      imageUrl: studentsImage
    },
    {
      title: 'مستلزمات مدرسية',
      description: 'قال صلى الله عليه وسلم: من أفضل الأعمال إدخال السرور على المؤمن، تقضي له دينا، تقضي له حاجة، تنفس له كربة',
      imageUrl: stuffImage
    },
    {
      title: ' رعاية طبية',
      description: 'قال رسول الله ﷺ: مثل المؤمنين في توادهم وتراحمهم وتعاطفهم مثل الجسد إذا اشتكى منه عضو تداعى له سائر الجسد بالسهر والحمى',
      imageUrl: MedicalImage
    }
  ]);

  const handleSearch = (query) => {
    if (query.trim() === '') {
     
    } else {
      const filteredResults = results.filter(result =>
        result.title.includes(query) || result.description.includes(query)
      );
      setResults(filteredResults);
    }
  };

  return (
    <>
      <Navbar />
        <p className='Sernav'>المشاريع العامة</p>
        <ServicesSearchbar handleSearch={handleSearch} />
   <div className='ServiceContainer'>
      <div className='Services'>
        <div className="services-grid">
          {results.map((result, index) => (
            <ServicesCard
              key={index}
              title={result.title}
              description={result.description}
              imageUrl={result.imageUrl}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Services
