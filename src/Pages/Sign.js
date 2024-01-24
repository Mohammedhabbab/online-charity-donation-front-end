import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

import * as Components from '../Components/styledcomponents/Sign';

function Sign() {
  const [mode, setMode] = useState('user');
  const [signIn, toggle] = useState(true);
 const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpAddress, setSignUpAddress] = useState('');
  const [signUpStatus, setSignUpStatus] = useState('0');
  const [orgsignUpStatus, setOrgSignUpStatus] = useState('0');
 
  const [orgsignUpTelephoneNumber, setOrgSignUpTelephoneNumber] = useState('');
  const [orgsignUpTypesOfExistingDonations, setOrgSignUpTypesOfExistingDonations] = useState('');
  const [orgsignInEmail, setOrgSignInEmail] = useState('');
  const [orgsignInPassword, setOrgSignInPassword] = useState('');
  const [orgsignUpName, setOrgSignUpName] = useState('');
  const [orgsignUpEmail, setOrgSignUpEmail] = useState('');
  const [orgsignUpPassword, setOrgSignUpPassword] = useState('');
  const [orgsignUpPhone, setOrgSignUpPhone] = useState('');
  const [orgsignUpAddress, setOrgSignUpAddress] = useState('');

  const [signUpGender, setSignUpGender] = useState('');
  const [orgsignUpGender, setOrgSignUpGender] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');

 
  const validatePassword = (password) => {
    

    return password.length >= 7;

  };
  const validateMobileNumber = (mobileNumber) => {
  
    return /^\d+$/.test(mobileNumber);
  };

  const validateEmail = (email) => {
   
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
   
    setToken(localStorage.getItem('authToken') || '');
  }, [token]);

  const navigate = useNavigate();
  const location = useLocation();
  const handleModeSwitch = () => {
    const newMode = mode === 'user' ? 'charity' : 'user';
    console.log('Switching Mode:', newMode);
    setMode(newMode);
    console.log(mode);
  };


  
  const handleSignIn = (e) => {
    e.preventDefault();

    if (!validatePassword(mode === 'user' ? signInPassword : orgsignInPassword)) {
      console.log('Password should have at least 8 characters.');
      return;
    }

    
    if (!validateEmail(mode === 'user' ? signInEmail : orgsignInEmail)) {
      console.log('Please enter a valid email address.');
      return;
    }

 
    if ((mode === 'user') && (!signInEmail || !signInPassword)) {
      console.log('Please fill in both email and password.');
      return;
    } else if ((mode === 'charity') && (!orgsignInEmail || !orgsignInPassword)) {
      console.log('Please fill in both email and password.');
      return;
    }

    const signInBody = mode === 'user'
      ? { email: signInEmail, password: signInPassword, type_of_user: mode }
      : { email: orgsignInEmail, password: orgsignInPassword, type_of_user: mode };

    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          
          localStorage.setItem('authToken', data.access_token);

         
          setIsUserSignedIn(true);
          navigate('/', { replace: true, state: { isUserSignedIn: true } });
        } else {
          setLoginStatus('Invalid login. Please try again.');
        }
      })
      .catch(() => {
        setLoginStatus('An error occurred. Please try again.');
      });
  };


 const handleSignUp = (e) => {
  e.preventDefault();
  console.log('Sign up button clicked');

  
   
   const signUpBody = mode === 'user'
     ? {
       full_name: signUpName,
       mobile_number: signUpPhone,
       email: signUpEmail,
       password: signUpPassword,
       address: signUpAddress,
       gender: signUpGender,
       status: signUpStatus,
       type_of_user: mode,
      types_of_existing_donations:"",
       telephone_number:''
     }
     : {
       full_name: orgsignUpName,
       mobile_number: orgsignUpPhone,
       email: orgsignUpEmail,
       password: orgsignUpPassword,
       address: orgsignUpAddress,
       telephone_number:orgsignUpTelephoneNumber,
       type_of_user: mode,
       types_of_existing_donations:orgsignUpTypesOfExistingDonations,
       status: orgsignUpStatus,
       gender:''
   
       
     };
 
  if  (mode === 'user' &&(!signUpName || !signUpEmail || !signUpPassword || !signUpPhone || !signUpAddress)) {
    console.log('Please fill in all required fields.');
    return;
  }
 if (mode === 'organization' && (!orgsignUpName || !orgsignUpEmail || !orgsignUpPassword || !orgsignUpPhone || !orgsignUpAddress) ){
    console.log('Please fill in all required fields.');
    return;
   }
   if (!validatePassword(mode === 'user' ? signUpPassword : orgsignUpPassword)) {
    console.log('Password should have at least 8 characters.');
    return;
  }

 
  if (!validateMobileNumber(mode === 'user' ? signUpPhone : orgsignUpPhone)) {
    console.log('Please enter a valid mobile number.');
    return;
  }

 
  if (!validateEmail(mode === 'user' ? signUpEmail : orgsignUpEmail)) {
    console.log('Please enter a valid email address.');
    return;
  }
  if (mode === 'user') {
    
    if (!signUpGender) {
      console.log('Please select a gender.');
      return;
    }
  }

    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpBody),
    })

  .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          
          localStorage.setItem('authToken', data.access_token);

          setToken(data.access_token);
          setIsUserSignedIn(true);
            setMode(data.mode); 
          setFormSubmitted(true);

          setTimeout(() => {
          navigate('/', { replace: true, state: { isUserSignedIn } });
          }, 10000);
        } else {
          setLoginStatus('Sign Up failed. Please try again.');
        }
      })
      .catch((error) => {
        setLoginStatus('An error occurred. Please try again.');
      });
  };


 


  return (
  
<>
      <div style={{ height:'60rem',backgroundColor: '#c7b492' , marginBottom:'10rem'}} >
        <body style={{
          backgroundColor: '#c7b492'
          
}}>
 <Components.SwitchButton onClick={handleModeSwitch}>
        Switch to {mode === 'user' ? 'charity' : 'user'}
      </Components.SwitchButton>
      {mode === 'user' ? (
        <Components.Container>
          <Components.SignUpContainer signIn={signIn}>
            <Components.Form>
              {formSubmitted ? (
                <p>Your form was added. Please wait for approval.</p>
              ) : (
                <>
                  <Components.Title>انشاء حساب</Components.Title>
                  <Components.Input
                      type='text'
                      id='full_name'
                    placeholder='Name'
                   value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                  />
                  <Components.Input
                      type='email'
                      id='email'
                    placeholder='Email'
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                  />
                  <Components.Input
                      type='password'
                      id='password'
                    placeholder='Password'
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                  />
                  <Components.Input
                      type='text'
                        id='mobile_number'
                    placeholder='Mobile Number'
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                  />

                  <Components.Input
                      type='text'
                      id='address'
                    placeholder='Address'
                    value={signUpAddress}
                    onChange={(e) => setSignUpAddress(e.target.value)}
                  />
                  <Components.RadioContainer>
                    <label style={{ marginRight: '22.5rem'}}>Gender:</label>
                    <Components.RadioInput 
                      type="radio"
                          id='gender'
                        
                      value="male"
                      checked={signUpGender === "male"}
                      onChange={() => setSignUpGender("male")}
                      onClick={() => setSignUpGender("male")}
                    />
                    <Components.RadioLabel onClick={() => setSignUpGender("male")}>Male</Components.RadioLabel>

                    <Components.RadioInput
                      type="radio"
                      id='gender'
                      value="female"
                      checked={signUpGender === "female"}
                      onChange={() => setSignUpGender("female")}
                      onClick={() => setSignUpGender("female")}
                    />
                    <Components.RadioLabel onClick={() => setSignUpGender("female")}>Female</Components.RadioLabel>
                      </Components.RadioContainer>
                     
                  <Components.Button onClick={handleSignUp}>انشاء الحساب</Components.Button>
                </>
              )}
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signIn={signIn}>
            <Components.Form>
              <Components.Title>تسجيل الدخول</Components.Title>
              <Components.Input
                type='email'
                placeholder='Email'
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
              <Components.Input
                type='password'
                placeholder='Password'
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
          

              <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
              <Components.Button onClick={handleSignIn}>تسجيل الدخول</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signIn={signIn}>
            <Components.Overlay signIn={signIn}>
              <Components.LeftOverlayPanel signIn={signIn}>
                <Components.Title>اهلاً بعودتك</Components.Title>
                <Components.Paragraph>
                  .سجل الدخول من هنا
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  تسجيل الدخول
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signIn={signIn}>
                <Components.Title>مرحبا</Components.Title>
                <Components.Paragraph>Enter Your personal details</Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  انشاء حساب
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>

          {loginStatus && <p>{loginStatus}</p>}
        </Components.Container>
      ) : (
          //orgamiazation
          <Components.Container>   
            <Components.SignUpContainer signIn={signIn}>
              <Components.Form>
                {formSubmitted ? (
                  <p>Your form was added. Please wait for approval.</p>
                ) : (
                  <>
                    <Components.Title>انشاء حساب</Components.Title>
                    <Components.Input
                      type='text'
                      placeholder='Name'
                      value={orgsignUpName}
                      onChange={(e) => setOrgSignUpName(e.target.value)}
                    />
                    <Components.Input
                      type='email'
                      placeholder='Email'
                      value={orgsignUpEmail}
                      onChange={(e) => setOrgSignUpEmail(e.target.value)}
                    />
                    <Components.Input
                      type='password'
                      placeholder='Password'
                      value={orgsignUpPassword}
                      onChange={(e) => setOrgSignUpPassword(e.target.value)}
                    />
                    <Components.Input
                      type='text'
                      placeholder='Phone Number'
                      value={orgsignUpPhone}
                      onChange={(e) => setOrgSignUpPhone(e.target.value)}
                    />
                        <Components.Input
                          type='text'
                          placeholder='Telephone Number'
                          value={orgsignUpTelephoneNumber}
                          onChange={(e) => setOrgSignUpTelephoneNumber(e.target.value)}
                        />
                    <Components.Input
                      type='text'
                      placeholder='Address'
                      value={orgsignUpAddress}
                      onChange={(e) => setOrgSignUpAddress(e.target.value)}
                        />
                        <Components.Input
                          type='text'
                          placeholder='types of services'
                          value={orgsignUpTypesOfExistingDonations}
                          onChange={(e) => setOrgSignUpTypesOfExistingDonations(e.target.value)}
                        />
                        
                    <Components.Button onClick={handleSignUp}>التسجيل</Components.Button>
                  </>
                )}
              </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signIn={signIn}>
              <Components.Form>
                <Components.Title>Login To Your Organization</Components.Title>
                <Components.Input
                  type='email'
                  placeholder='Email'
                  value={orgsignInEmail}
                  onChange={(e) => setOrgSignInEmail(e.target.value)}
                />
                <Components.Input
                  type='password'
                  placeholder='Password'
                  value={orgsignInPassword}
                  onChange={(e) => setOrgSignInPassword(e.target.value)}
                />
          

                <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
              </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signIn={signIn}>
              <Components.Overlay signIn={signIn}>
                <Components.LeftOverlayPanel signIn={signIn}>
                  <Components.Title>اهلاً بعودتك</Components.Title>
                  <Components.Paragraph>
                    Login to Your Organization From Here
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(true)}>
                    تسجيل الدخول
                  </Components.GhostButton>
                </Components.LeftOverlayPanel>

                <Components.RightOverlayPanel signIn={signIn}>
                  <Components.Title>مرحبا</Components.Title>
                  <Components.Paragraph>Let Your Organization Join Us</Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(false)}>
                    انشاء حساب
                  </Components.GhostButton>
                </Components.RightOverlayPanel>
              </Components.Overlay>
            </Components.OverlayContainer>

            {loginStatus && <p>{loginStatus}</p>}
          </Components.Container>
          )}
        </body>
      </div></>
  );
}

export default Sign;