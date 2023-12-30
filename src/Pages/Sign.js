import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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

    const [orgsignInEmail, setOrgSignInEmail] = useState('');
  const [orgsignInPassword, setOrgSignInPassword] = useState('');
  const [orgsignUpName, setOrgSignUpName] = useState('');
  const [orgsignUpEmail, setOrgSignUpEmail] = useState('');
  const [orgsignUpPassword, setOrgSignUpPassword] = useState('');
  const [orgsignUpPhone, setOrgSignUpPhone] = useState('');
  const [orgsignUpAddress, setOrgSignUpAddress] = useState('');

  const [signUpGender, setSignUpGender] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
 const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');

const validatePassword = (password) => {
  // Password should have at least 8 characters
  return password.length >= 8;
};
const validateMobileNumber = (mobileNumber) => {
  // Simple check for a valid numeric mobile number
  return /^\d+$/.test(mobileNumber);
};

const validateEmail = (email) => {
  // Simple email format check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

  useEffect(() => {
    // Update the token state when the localStorage changes
    setToken(localStorage.getItem('authToken') || '');
  }, [token]);

  const navigate = useNavigate();

const handleModeSwitch = () => {
  const newMode = mode === 'user' ? 'organization' : 'user';
  console.log('Switching Mode:', newMode);
  setMode(newMode);
};

  
 
  
  
 const handleSignIn = (e) => {
  e.preventDefault();
   console.log('Sign in button clicked');
   if (!validatePassword(mode === 'user' ? signInPassword : orgsignInPassword)) {
    console.log('Password should have at least 8 characters.');
    return;
  }

  // Email validation
  if (!validateEmail(mode === 'user' ? signInEmail : orgsignInEmail)) {
    console.log('Please enter a valid email address.');
    return;
  }
  // Check if the email or password field is empty
  if (!signInEmail || !signInPassword) {
   console.log('Please fill in both email and password.');
    return;
   }
   
    const signInApi = mode === 'user'
      ? 'http://localhost:8000/api/login' 
     : 'https://org-signin-api-url';
   
   const signInBody = mode === 'user'
     ? { email: signInEmail, password: signInPassword }
     : { email: orgsignInEmail, password: orgsignInPassword };
   
   
  fetch(signInApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      signInBody
    ),
  })
         .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          // Store the token in localStorage
          localStorage.setItem('authToken', data.access_token);

          // Update state and navigate
          setToken(data.access_token);
          setIsUserSignedIn(true);
          setMode(data.mode);
      navigate('/', { replace: true, state: { mode, isUserSignedIn } });
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

  // Define the API endpoint based on the mode
  const signUpApi = mode === 'user'
    ? 'http://localhost:8000/api/register'
     : 'http://localhost:8000/api/org-register';
   
   const signUpBody = mode === 'user'
     ? {
       full_name: signUpName,
       mobile_number: signUpPhone,
       email: signUpEmail,
       password: signUpPassword,
       address: signUpAddress,
       gender: signUpGender,
     }
     : {
       full_name: orgsignUpName,
       mobile_number: orgsignUpPhone,
       email: orgsignUpEmail,
       password: orgsignUpPassword,
       address: orgsignUpAddress,
       
     };
  // Common checks for both user and organization sign-up
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

  // Mobile number validation
  if (!validateMobileNumber(mode === 'user' ? signUpPhone : orgsignUpPhone)) {
    console.log('Please enter a valid mobile number.');
    return;
  }

  // Email validation
  if (!validateEmail(mode === 'user' ? signUpEmail : orgsignUpEmail)) {
    console.log('Please enter a valid email address.');
    return;
  }
  if (mode === 'user') {
    // Additional checks and API call for user sign-up
    if (!signUpGender) {
      console.log('Please select a gender.');
      return;
    }
  }

  // Make the API call with the defined API endpoint and data
  fetch(signUpApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
     signUpBody
    ),
  })
  .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          // Store the token in localStorage
          localStorage.setItem('authToken', data.access_token);

          // Update state and navigate
          setToken(data.access_token);
          setIsUserSignedIn(true);
            setMode(data.mode); 
          setFormSubmitted(true);

          setTimeout(() => {
          navigate('/', { replace: true, state: { mode, isUserSignedIn } });
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
      <div style={{ backgroundColor:'#c7b492'}} >
 <Components.SwitchButton onClick={handleModeSwitch}>
        Switch to {mode === 'user' ? 'Organization' : 'User'}
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
                    <label style={{ marginRight: '22.5rem' }}>Gender:</label>
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
                      placeholder='Address'
                      value={orgsignUpAddress}
                      onChange={(e) => setOrgSignUpAddress(e.target.value)}
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
      </div></>
  );
}

export default Sign;