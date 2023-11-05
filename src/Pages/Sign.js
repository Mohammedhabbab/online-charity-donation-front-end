import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as Components from '../Components/styledcomponents/Sign';

function Sign() {
  const [signIn, toggle] = useState('true');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [loginStatus, setLoginStatus] = useState(''); 


  const navigate = useNavigate();

const handleSignIn = () => {
  
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log('Login response:', response);
      if (response.status === 200) {
      
        navigate('/', { replace: true }); 
      } else if (response.status === 401) {
     
        setLoginStatus('Invalid login. Please try again.');
      } else {
      
        setLoginStatus('An error occurred. Please try again.');
      }
    })
    .catch((error) => {
     
      setLoginStatus('An error occurred. Please try again.');
    });
};

  const handleSignUp = () => {
    
    fetch('/api/signup', {
    
    })
      .then((response) => {
        console.log('Sign up response:', response);
        if (response.status === 201) {
         
          setFormSubmitted(true); 
          setTimeout(() => {
            navigate('/', { replace: true }); 
          }, 10000);
        } else {
      
        }
      })
      .catch((error) => {
    
      });
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signin ={signIn}>
        <Components.Form>
          {formSubmitted ? (
            <p>Your form was added. Please wait for approval.</p>
          ) : (
            <>
              <Components.Title>Create Account</Components.Title>
       <Components.Input
  type='text'
  placeholder='Name'
  value={name}
  onChange={(e) => setName(e.target.value)}
  // name='name' 
/>
<Components.Input
  type='email'
  placeholder='Email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  // name='email'  
/>
<Components.Input
  type='password'
  placeholder='Password'
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  // name='password' 
/>

              <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
            </>
          )}
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signin ={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
      <Components.Input
  type='email'
  placeholder='Email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  // name='signin-email'  
/>
<Components.Input
  type='password'
  placeholder='Password'
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  // name='signin-password'  
/>

          <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
    
<Components.OverlayContainer signin ={signIn}>
                  <Components.Overlay signin ={signIn}>

                  <Components.LeftOverlayPanel signin ={signIn}>
                      <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                           please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signin ={signIn}>
                        <Components.Title>Hello</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sigin Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>

                  </Components.Overlay>
              </Components.OverlayContainer>
  {loginStatus && <p>{loginStatus}</p>}
    </Components.Container>
  );
}

export default Sign;
