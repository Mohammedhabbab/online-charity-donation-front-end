import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [notification, setNotification] = useState({ show: false, message: '' });
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
  const [ShowSU, setShowSU] = useState(false);
  const [ShowIU, setShowIU] = useState(false);
  const [ShowSC, setShowSC] = useState(false);
  const [ShowIC, setShowIC] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');

  const validatePassword = (password) => {
    return password.length >= 8;
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
    setMode(newMode);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
  

    

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
    setLoginStatus('');

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
        types_of_existing_donations: "",
        telephone_number: ''
      }
      : {
        full_name: orgsignUpName,
        mobile_number: orgsignUpPhone,
        email: orgsignUpEmail,
        password: orgsignUpPassword,
        address: orgsignUpAddress,
        telephone_number: orgsignUpTelephoneNumber,
        type_of_user: mode,
        types_of_existing_donations: orgsignUpTypesOfExistingDonations,
        status: orgsignUpStatus,
        gender: ''
      };

    if ((mode === 'user') && (!signUpName || !signUpEmail || !signUpPassword || !signUpPhone || !signUpAddress)) {
      setLoginStatus('Please fill in all required fields.');
      return;
    }
    if ((mode === 'charity') && (!orgsignUpName || !orgsignUpEmail || !orgsignUpPassword || !orgsignUpPhone || !orgsignUpAddress)) {
      setLoginStatus('Please fill in all required fields.');
      return;
    }
    if (!validatePassword(mode === 'user' ? signUpPassword : orgsignUpPassword)) {
      setLoginStatus('Password should have at least 8 characters.');
      return;
    }

    if (!validateMobileNumber(mode === 'user' ? signUpPhone : orgsignUpPhone)) {
      setLoginStatus('Please enter a valid mobile number.');
      return;
    }

    if (!validateEmail(mode === 'user' ? signUpEmail : orgsignUpEmail)) {
      setLoginStatus('Please enter a valid email address.');
      return;
    }
    if (mode === 'user' || mode === 'charity') {
      if (!signUpAddress || !orgsignUpAddress) {
        setLoginStatus('Please enter an Address.');
        return;
      }
    }
    if (mode === 'user' || mode === 'charity') {
      if (!signUpName || !orgsignUpName) {
        setLoginStatus('Please enter an Address.');
        return;
      }
    }

    if (mode === 'user') {
      if (!signUpGender) {
        setLoginStatus('Please select a gender.');
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
          setIsUserSignedIn(true);
          setMode(data.mode);
          setFormSubmitted(true);

          // Clear form fields
          setSignUpName('');
          setSignUpEmail('');
          setSignUpPassword('');
          setSignUpPhone('');
          setSignUpAddress('');
          setSignUpGender('');
          setOrgSignUpName('');
          setOrgSignUpEmail('');
          setOrgSignUpPassword('');
          setOrgSignUpPhone('');
          setOrgSignUpAddress('');
          setOrgSignUpTelephoneNumber('');
          setOrgSignUpTypesOfExistingDonations('');

          // Show notification if signed up as charity
          if (mode === 'charity') {
            setNotification({ show: true, message: 'Form submitted' });
            setTimeout(() => {
              setNotification({ show: false, message: '' });
            }, 6000);
          }

          // Redirect after sign up
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

  const handleNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 6500);
  };

  return (
    <>
      <div style={{ height: '60rem', backgroundColor: '#c7b492', marginBottom: '10rem' }}>
        <body style={{ backgroundColor: '#c7b492' }}>
          <Components.SwitchButton onClick={handleModeSwitch}>
            سجل دخول {mode === 'user' ? 'كجمعية' : 'كمستخدم'}
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
                        placeholder='الاسم'
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        />
                        {ShowSU === true ? (!signUpName && <Components.ErrorMessage>الرجاء إدخال الاسم بالكامل</Components.ErrorMessage>) : ''}

                      <Components.Input
                        type='email'
                        id='email'
                        placeholder='الحساب'
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        />
                        { ShowSU === true ?( !validateEmail(signUpEmail) && <Components.ErrorMessage>الرجاء إدخال بريد إلكتروني صالح</Components.ErrorMessage>) :''}

                      <Components.Input
                        type='password'
                        id='password'
                        placeholder='كلمة المرور'
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        />
                        {ShowSU === true ? (!validatePassword(signUpPassword) && <Components.ErrorMessage>يجب أن تحتوي كلمة المرور على ما لا يقل عن 8 أحرف</Components.ErrorMessage>) : ''}

                      <Components.Input
                        type='text'
                        id='mobile_number'
                        placeholder='رقم الهاتف'
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        />
                        {ShowSU === true ? (!validateMobileNumber(signUpPhone) && <Components.ErrorMessage>الرجاء إدخال رقم هاتف محمول صالح</Components.ErrorMessage>) : ''}

                      <Components.Input
                        type='text'
                        id='address'
                        placeholder='العنوان'
                        value={signUpAddress}
                        onChange={(e) => setSignUpAddress(e.target.value)}
                        />
                        {ShowSU === true ? (!signUpAddress && <Components.ErrorMessage>الرجاء العنوان</Components.ErrorMessage>) : ''}

                      <Components.RadioContainer>
                        <label style={{ marginRight: '11rem', direction: 'rtl' }}>الجنس:</label>
                        <Components.RadioInput
                          type="radio"
                          id='gender'
                          value="ذكر"
                          checked={signUpGender === "ذكر"}
                          onChange={() => setSignUpGender("ذكر")}
                          onClick={() => setSignUpGender("ذكر")}
                        />
                        <Components.RadioLabel onClick={() => setSignUpGender("ذكر")}>ذكر</Components.RadioLabel>
                        <Components.RadioInput
                          type="radio"
                          id='gender'
                          value="انثى"
                          checked={signUpGender === "انثى"}
                          onChange={() => setSignUpGender("انثى")}
                          onClick={() => setSignUpGender("انثى")}
                        />

                          <Components.RadioLabel onClick={() => setSignUpGender("انثى")}>انثى</Components.RadioLabel>

                        </Components.RadioContainer>
                        
                     { ShowSU === true ? (!signUpGender && <Components.RErrorMessage>الرجاء تحديد الجنس</Components.RErrorMessage>) : ''}
                      <Components.Button onClick={(e) => {
  handleSignUp(e);
  setShowSU(true);
}}
>انشاء الحساب</Components.Button>
                    </>
                  )}
                </Components.Form>
              </Components.SignUpContainer>
              <Components.SignInContainer signIn={signIn}>
                <Components.Form>
                  <Components.Title>تسجيل الدخول</Components.Title>
                  <Components.Input
                    type='email'
                    placeholder='الحساب'
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                  />
                  {ShowIU === true ? (!validateEmail(signInEmail) && <Components.SErrorMessage>الرجاء إدخال بريد إلكتروني صالح</Components.SErrorMessage>):''}

                  <Components.Input
                    type='password'
                    placeholder='كلمة المرور'
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                  />
                  {ShowIU === true ? (!validatePassword(signInPassword) && <Components.SErrorMessage>يجب أن تحتوي كلمة المرور على ما لا يقل عن 8 أحرف</Components.SErrorMessage>) : ''}

                  <Components.Button onClick={(e) => {
                    handleSignIn(e);
                    setShowIU(true);
                  }}
                  >تسجيل الدخول</Components.Button>
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
                    <Components.Paragraph>أدخل معلوماتك الشخصية</Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(false)}>انشاء حساب</Components.GhostButton>
                  </Components.RightOverlayPanel>
                </Components.Overlay>
              </Components.OverlayContainer>
            </Components.Container>
          ) : (
            //orgamiazation
            <Components.Container>
              <Components.SignUpContainer signIn={signIn}>
                <Components.Form>
                  {formSubmitted ? (
                    <p>تم إرسال النموذج. يرجى الانتظار للموافقة.</p>
                  ) : (
                    <>
                      <Components.Title>انشاء حساب</Components.Title>
                      <Components.Input
                        type='text'
                        id='full_name'
                        placeholder='الاسم'
                        value={orgsignUpName}
                        onChange={(e) => setOrgSignUpName(e.target.value)}
                          />
                          {ShowSC === true ? (!signUpName && <Components.ErrorMessage>الرجاء إدخال الاسم بالكامل</Components.ErrorMessage>) : ''}

                      <Components.Input
                        type='email'
                        id='email'
                        placeholder='الحساب'
                        value={orgsignUpEmail}
                        onChange={(e) => setOrgSignUpEmail(e.target.value)}
                          />
                          {ShowSC === true ? (!validateEmail(orgsignUpEmail) && <Components.ErrorMessage>الرجاء إدخال بريد إلكتروني صالح</Components.ErrorMessage>) : ''}


                      <Components.Input
                        type='password'
                        id='password'
                        placeholder='كلمة المرور'
                        value={orgsignUpPassword}
                        onChange={(e) => setOrgSignUpPassword(e.target.value)}
                          />
                          {ShowSC === true ? (!validatePassword(orgsignUpPassword) && <Components.ErrorMessage>يجب أن تحتوي كلمة المرور على ما لا يقل عن 8 أحرف</Components.ErrorMessage>) : ''}


                      <Components.Input
                        type='text'
                        id='mobile_number'
                        placeholder='رقم الهاتف'
                        value={orgsignUpPhone}
                        onChange={(e) => setOrgSignUpPhone(e.target.value)}
                          />
                          {ShowSC === true ? (!validateMobileNumber(orgsignUpPhone) && <Components.ErrorMessage>الرجاء إدخال رقم هاتف محمول صالح</Components.ErrorMessage>) : ''}

                      <Components.Input
                        type='text'
                        id='address'
                        placeholder='العنوان'
                        value={orgsignUpAddress}
                        onChange={(e) => setOrgSignUpAddress(e.target.value)}
                          />
                          {ShowSC === true ? (!orgsignUpAddress && <Components.ErrorMessage>الرجاء العنوان</Components.ErrorMessage>) : ''}

                      <Components.Input
                        type='text'
                        id='telephone_number'
                        placeholder='رقم الهاتف'
                        value={orgsignUpTelephoneNumber}
                        onChange={(e) => setOrgSignUpTelephoneNumber(e.target.value)}
                          />
                          {ShowSC === true ? (!orgsignUpTelephoneNumber && <Components.ErrorMessage>الرجاء إدخال رقم الأرضي</Components.ErrorMessage>) : ''}

                      <Components.Input
                        type='text'
                        id='types_of_existing_donations'
                        placeholder='التبرعات الحالية'
                        value={orgsignUpTypesOfExistingDonations}
                        onChange={(e) => setOrgSignUpTypesOfExistingDonations(e.target.value)}
                          />
                          
                   
                    
                          <Components.Button onClick={(e) => {
                            handleSignUp(e);
                            setShowSC(true);
                          }}>انشاء الحساب</Components.Button>
                    </>
                  )}
                </Components.Form>
              </Components.SignUpContainer>
              <Components.SignInContainer signIn={signIn}>
                <Components.Form>
                  <Components.Title>تسجيل الدخول</Components.Title>
                  <Components.Input
                    type='email'
                    placeholder='الحساب'
                    value={orgsignInEmail}
                    onChange={(e) => setOrgSignInEmail(e.target.value)}
                    />
                    {ShowIC === true ? (!validateEmail(orgsignInEmail) && <Components.SErrorMessage>الرجاء إدخال بريد إلكتروني صالح</Components.SErrorMessage>) : ''}

                  <Components.Input
                    type='password'
                    placeholder='كلمة المرور'
                    value={orgsignInPassword}
                    onChange={(e) => setOrgSignInPassword(e.target.value)}
                    />
                    {ShowIC === true ? (!validatePassword(orgsignInPassword) && <Components.SErrorMessage>الرجاء إدخال بريد إلكتروني صالح</Components.SErrorMessage>) : ''}


                    <Components.Button onClick={(e) => {
                      handleSignIn(e);
                      setShowIC(true);
                    }}>تسجيل الدخول</Components.Button>
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
                    <Components.Paragraph>أدخل معلوماتك الشخصية</Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(false)}>انشاء حساب</Components.GhostButton>
                  </Components.RightOverlayPanel>
                </Components.Overlay>
              </Components.OverlayContainer>
            </Components.Container>
          )}
        </body>
      </div>
      {notification.show && (
        <Components.NotificationContainer>{notification.message}</Components.NotificationContainer>
      )}
    </>
  );
}

export default Sign;
