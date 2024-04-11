import React, { FC, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/background.jpg';
import { Button } from '../../components/Buttons/Button/Button';
import doodlingBackground from '../../assets/doodling.webp';


const LoginPageContainer = styled.div`
  color: #6a6f8c;
  background: url(${doodlingBackground}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: rgba(40, 57, 101, 0.9);
  border-radius: 15px;
  max-width: 525px;
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 90px 70px 50px 70px;
  border-radius: 10px;
  background: rgba(40, 57, 101, 0.9);
`;

const LoginForm = styled.form`
  min-height: 345px;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const FormHeader = styled.h1`
  margin: 30px 100px;
  padding: 0;
  text-align: center;
  font-size: 30px;
  color: #fff;
  cursor: default;
`;

const FormInput = styled.input`
  width: 100%;
  font-weight: 600;
  display: block;
  border: none;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  color: #fff;

  &::placeholder {
    color: #fff;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transition: all 0.3s;
  }
`;

const LoginError = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  border-radius: 10px;
  opacity: 0.3;
  max-height: 100%;
  width: 100%;
`;

export const LoginPage: FC = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const hideError = () => setError(false);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    navigate('/contacts');
  };

  return (
    <LoginPageContainer>
      <LoginWrapper>
        <BackgroundImage src={background} alt="Login form background" />
        <FormWrapper>
          <LoginForm onSubmit={handleSubmit}>
            <FormHeader>Welcome</FormHeader>
            <div>
              <FormInput className="login" type="email" placeholder="Email" required onFocus={hideError} />
            </div>
            <div>
              <FormInput className="password" type="password" placeholder="Password" required onFocus={hideError} />
            </div>
            <div>
              <Button type="submit" value="Login" isIcon={false}>Login</Button>
              {error && <LoginError>Login failed. Invalid email or password.</LoginError>}
            </div>
          </LoginForm>
        </FormWrapper>
      </LoginWrapper>
    </LoginPageContainer>
  );
};
