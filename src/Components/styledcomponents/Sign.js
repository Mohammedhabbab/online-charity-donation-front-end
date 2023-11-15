import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-left: 12.5%;
  margin-top: 2%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 1356px;
  max-width: 100%;
  min-height: 800px;
  max-height: 1000px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;

  ${props =>
    props.signIn  !== true &&
    css`
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    `}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;

  ${props =>
    props.signIn  !== true &&
    css`
      transform: translateX(100%);
    `}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;




export const SwitchButton = styled.button`
width:20rem;
  background-color: black;
  border: 3px solid black;
  margin-left:40%;
  color:white;
  cursor: pointer;
  font-size: 24px;

  margin-top: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;


export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  position: relative;
  margin-bottom:2rem;
 
`;

export const RadioInput = styled.input`
  display: none;

  &:checked + label::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: #000;
  }
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  left: -22rem; /* Adjust the left position to move it slightly to the left */

  &:before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 5px;
  }

  ${RadioInput}:checked + &::before {
    background-color: #000;
  }

  &:hover::before {
    background-color: #ddd;
  }
`;





export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid black;
  background-color: black;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${props =>
    props.signIn  !== true &&
    css`
      transform: translateX(-100%);
    `}
`;

export const Overlay = styled.div`
  background: beige;
  background: -webkit-linear-gradient(to right, #f5f5dc, #f5f5dc);
  background: linear-gradient(to right, #000000, #f5f5dc);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${props =>
    props.signIn  !== true &&
    css`
      transform: translateX(50%);
    `}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);

  ${props =>
    props.signIn !== true &&
    css`
      transform: translateX(0);
    `}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);

  ${props =>
    props.signIn !== true &&
    css`
      transform: translateX(20%);
    `}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
