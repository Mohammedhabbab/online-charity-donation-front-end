import React from 'react'
import './Home.css'
import svg from '../Assets/Asset 14.svg';
import handimg from '../Assets/Asset 8.svg';

const AboutusHomeSection = () => {
  return (
      <section className='Aboutus'>
          <img src={svg} alt='background' />
          <div className='Aboutus-Container'>
          <h2>من نحن؟</h2>
              <img src={handimg} alt='handimage'/>
              <p>نحن مشروع إنساني يهدف إلى تقديم الكفالة والأمان لليتيم على أكمل نطاق ضمن خطة مدروسة تشمل جميع مقومات الحياة بالإضافة لقديم الرعاية و الخدمات المتنوعة للمستفيدين للوصول إلى مجتمع نبيل أخلاقياً يساهم في مساعدة الأخرين.</p>
      </div>
      </section>
  )
}

export default AboutusHomeSection