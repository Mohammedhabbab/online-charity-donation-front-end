import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar'
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
  const [signUpGender, setSignUpGender] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

const handleModeSwitch = () => {
    setMode((prevMode) => (prevMode === 'user' ? 'organization' : 'user'));
  };
  
 
  
  
 const handleSignIn = (e) => {
  e.preventDefault();
 console.log('Sign in button clicked');
  // Check if the email or password field is empty
  if (!signInEmail || !signInPassword) {
   console.log('Please fill in both email and password.');
    return;
   }
   
    const signInApi = mode === 'user'
      ? 'https://user-signin-api-url' 
    : 'https://org-signin-api-url';

  fetch(signInApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: signInEmail, password: signInPassword }),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('Login successful');
        navigate('/', { replace: true });
      } else if (response.status === 401) {
        console.log('Invalid login');
        setLoginStatus('Invalid login. Please try again.');
      } else {
        console.log('An error occurred');
        setLoginStatus('An error occurred. Please try again.');
      }
    })
    .catch((error) => {
      setLoginStatus('An error occurred. Please try again.');
    });
  };




 const handleSignUp = (e) => {
  e.preventDefault();
  console.log('Sign up button clicked');

  // Define the API endpoint based on the mode
  const signUpApi = mode === 'user'
    ? 'https://user-signup-api-url'
    : 'https://org-signup-api-url';

  // Common checks for both user and organization sign-up
  if (!signUpName || !signUpEmail || !signUpPassword || !signUpPhone || !signUpAddress) {
    console.log('Please fill in all required fields.');
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
    body: JSON.stringify({
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      phone: signUpPhone,
      address: signUpAddress,
      gender: signUpGender,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        console.log('Sign Up successful');
        setFormSubmitted(true);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 10000);
      } else {
        console.log('Sign Up failed');
        setLoginStatus('Sign Up failed. Please try again.');
      }
    })
    .catch((error) => {
      console.error('An error occurred', error);
      setLoginStatus('An error occurred. Please try again.');
    });
};


 


  return (
  
<>
<Navbar />
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
                  <Components.Title>Create Account</Components.Title>
                  <Components.Input
                    type='text'
                    placeholder='Name'
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                  />
                  <Components.Input
                    type='email'
                    placeholder='Email'
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                  />
                  <Components.Input
                    type='password'
                    placeholder='Password'
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                  />
                  <Components.Input
                    type='text'
                    placeholder='Phone Number'
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                  />

                  <Components.Input
                    type='text'
                    placeholder='Address'
                    value={signUpAddress}
                    onChange={(e) => setSignUpAddress(e.target.value)}
                  />
                  <Components.RadioContainer>
                    <label style={{ marginRight: '22.5rem' }}>Gender:</label>
                    <Components.RadioInput
                      type="radio"
                      name="gender"
                      value="male"
                      checked={signUpGender === "male"}
                      onChange={() => setSignUpGender("male")}
                      onClick={() => setSignUpGender("male")}
                    />
                    <Components.RadioLabel onClick={() => setSignUpGender("male")}>Male</Components.RadioLabel>

                    <Components.RadioInput
                      type="radio"
                      name="gender"
                      value="female"
                      checked={signUpGender === "female"}
                      onChange={() => setSignUpGender("female")}
                      onClick={() => setSignUpGender("female")}
                    />
                    <Components.RadioLabel onClick={() => setSignUpGender("female")}>Female</Components.RadioLabel>
                  </Components.RadioContainer>
                  <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
                </>
              )}
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signIn={signIn}>
            <Components.Form>
              <Components.Title>Sign in</Components.Title>
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
              <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signIn={signIn}>
            <Components.Overlay signIn={signIn}>
              <Components.LeftOverlayPanel signIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  Login from here
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signIn={signIn}>
                <Components.Title>Hello</Components.Title>
                <Components.Paragraph>Enter Your personal details</Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
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
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input
                      type='text'
                      placeholder='Name'
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                    />
                    <Components.Input
                      type='email'
                      placeholder='Email'
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                    />
                    <Components.Input
                      type='password'
                      placeholder='Password'
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                    />
                    <Components.Input
                      type='text'
                      placeholder='Phone Number'
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                    />

                    <Components.Input
                      type='text'
                      placeholder='Address'
                      value={signUpAddress}
                      onChange={(e) => setSignUpAddress(e.target.value)}
                    />
                    <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
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
                <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
              </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signIn={signIn}>
              <Components.Overlay signIn={signIn}>
                <Components.LeftOverlayPanel signIn={signIn}>
                  <Components.Title>Welcome Back!</Components.Title>
                  <Components.Paragraph>
                    Login to Your Organization From Here
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(true)}>
                    Sign In
                  </Components.GhostButton>
                </Components.LeftOverlayPanel>

                <Components.RightOverlayPanel signIn={signIn}>
                  <Components.Title>Hello</Components.Title>
                  <Components.Paragraph>Let Your Organization Join Us</Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(false)}>
                    Sign Up
                  </Components.GhostButton>
                </Components.RightOverlayPanel>
              </Components.Overlay>
            </Components.OverlayContainer>

            {loginStatus && <p>{loginStatus}</p>}
          </Components.Container>
        )}
      </>
  );
}

export default Sign;