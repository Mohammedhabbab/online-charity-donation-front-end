import './PersonCard.css'; 
import MaleImg from '../Assets/Male.png'
import FemaleImg from '../Assets/Female.png'

function Card({ id, full_name, address, age, gender, charity_id, status }) {
  return (
   
      <div className="card" style={{
        backgroundColor: 'white'
        , borderRadius: '20px'
        , borderTopRightRadius: '80px 80px'
        , boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        , width: '250px'
        , height: '300px'
        , margin: '50px'
        , top: '-7rem'
        , padding: '1rem'
        , fontFamily: 'Arial, sans-serif'
        , position: 'relative'
       
       
      }}>
        {status === 0 ? (
          <>
            <div className="card-header">
              {gender === 'ذكر' ? (
                <>
                  <img src={MaleImg} alt="Avatar" className="avatar" />
                
                  <div className="name-and-check">
                    <h3 className="name" style={{ color:'#c7b492'}}>{full_name}</h3>

                    <span className="status-check"></span>
                  </div>

                </>
              ) : (
                  <>
                  <img src={FemaleImg} alt="Avatar" className="avatar" /> 
              
              <div className="name-and-check">
                    <h3 className="name" style={{color:'black'}}>{full_name}</h3>
                 
              <span className="status-check"></span>
                  </div>
                  
                  </>
                )}
           
                
                <p className="location">{address}<ion-icon name="location-sharp"></ion-icon></p>
             
            </div>
            
            <div className="card-stats">
              <div className="stat">
                <span className="stat-value">{age}</span>
                <span className="stat-label">العمر</span>
              </div>
              <div className="stat">
                <span className="stat-value">{gender}</span>
                <span className="stat-label">الجنس</span>
              </div>
              <div className="stat">
                <span className="stat-value">{charity_id}</span>
                <span className="stat-label">Charity</span>
              </div>
            </div>
            {gender === 'ذكر' ? (
              <button className="About-button" style={{ backgroundColor: 'black', color:'#c7b492'}}>التفاصيل</button>) : (
                <button className="About-button" style={{ backgroundColor: '#c7b492',color:'black' }}>التفاصيل</button>
            )}
    
          </>
            

        ) : (
          <>
            <div className="card-header">
                {gender === 'ذكر' ? (
                  <>
                    <img src={MaleImg} alt="Avatar" className="avatar" />

                    <div className="name-and-check">
                      <h3 className="name" style={{ color: '#c7b492' }}>{full_name}</h3>

                      <span className="status-check"> ✔ تم التبرع </span>
                    </div>

                  </>
                ) : (
                  <>
                    <img src={FemaleImg} alt="Avatar" className="avatar" />

                    <div className="name-and-check">
                      <h3 className="name" style={{ color: 'black' }}>{full_name}</h3>

                        <span className="status-check"> ✔ تم التبرع </span>
                    </div>

                  </>
                )}
                <p className="location">{address}<ion-icon name="location-sharp"></ion-icon></p>
            </div>

            <div className="card-stats">
              <div className="stat">
                <span className="stat-value">{age}</span>
                <span className="stat-label">العمر</span>
              </div>
              <div className="stat">
                <span className="stat-value">{gender}</span>
                <span className="stat-label">الجنس</span>
              </div>
              <div className="stat">
                <span className="stat-value">{charity_id}</span>
                <span className="stat-label">Charity</span>
              </div>
            </div>
            {gender === 'ذكر' ? (
              <button className="About-button" style={{ backgroundColor: 'black', color:'#c7b492'}}>التفاصيل</button>) : (
                <button className="About-button" style={{ backgroundColor: '#c7b492',color:'black' }}>التفاصيل</button>
            )}

          </>
              
        )}
          </div>
   
  );
}

export default Card;
