import React, { useState } from 'react';
import './Signin.scss';
import facebook from '../../assets/images/facebook.svg';
import google from '../../assets/images/google.svg';
import linkedin from '../../assets/images/linkedin.svg';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type LoginData = {
  email: string;
  password: string;
};

const Auth = () => {
  const [isLogin, setLogin] = useState(true);
  const { register, handleSubmit } = useForm<SignupData>();
  const { register: login, handleSubmit: handleLogin } = useForm<LoginData>();

  const signupSumbit = handleSubmit((data) => console.log(data));
  const loginSubmit = handleLogin((data) => console.log(data));

  return (
    <div className="login">
      <div
        className={`login__colored-container ${
          isLogin ? 'login__colored-container--left' : 'login__colored-container--right'
        }`}></div>
      <div
        className={`login__welcome-back ${
          isLogin ? 'login__welcome-back--active' : 'login__welcome-back--inactive'
        }`}>
        <div className="login__welcome-back__main-container">
          <div className="login__welcome-back__main-container__text-container">
            <span className="login__welcome-back__main-container__text-container--title">
              Hello, stranger!
            </span>
            <span className="login__welcome-back__main-container__text-container--secondary">
              To purchase and see you personal info, please log in.
            </span>
          </div>
          <div
            onClick={() => {
              setLogin(false);
            }}
            className="login__welcome-back__main-container__button-container">
            Sign In
          </div>
        </div>
      </div>
      <div
        className={`login__create-container ${
          isLogin ? 'login__create-container--active' : 'login__create-container--inactive'
        }`}>
        Create Account
        <div className="login__create-container__social-container">
          <img
            className="login__create-container__social-container--facebook-icon"
            src={facebook}
            alt=""
          />
          <img
            className="login__create-container__social-container--google-icon"
            src={google}
            alt=""
          />
          <img
            className="login__create-container__social-container--linkedin-icon"
            src={linkedin}
            alt=""
          />
        </div>
        <span className="login__create-container--info-text">
          or use email for your registration
        </span>
        <div className="login__create-container__form-container">
          <form className="login__create-container__form-container__form" onSubmit={signupSumbit}>
            <input
              {...register('firstName', { required: true })}
              className="login__create-container__form-container__form--name"
              placeholder="First Name"
            />
            <input
              {...register('lastName', { required: true })}
              className="login__create-container__form-container__form--name"
              placeholder="Last Name"
            />
            <input
              className="login__create-container__form-container__form--email"
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            <input
              className="login__create-container__form-container__form--password"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            <button className="login__create-container__form-container__form--submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div
        className={`login__login-container ${
          !isLogin ? 'login__login-container--active' : 'login__login-container--inactive'
        }`}>
        <div className="login__login-container__main-container">
          <div className="login__login-container__main-container__social-container">
            <img
              className="login__login-container__main-container__social-container--facebook-icon"
              src={facebook}
              alt=""
            />
            <img
              className="login__login-container__main-container__social-container--google-icon"
              src={google}
              alt=""
            />
            <img
              className="login__login-container__main-container__social-container--linkedin-icon"
              src={linkedin}
              alt=""
            />
          </div>
          <span className="login__login-container__main-container--info-text">
            or use email for your login
          </span>
          <div className="login__login-container__main-container__form-container">
            <form
              className="login__login-container__main-container__form-container__form"
              onSubmit={loginSubmit}>
              <input
                className="login__login-container__main-container__form-container__form--email"
                type="email"
                {...login('email', { required: true })}
                placeholder="Email"
              />
              <input
                className="login__login-container__main-container__form-container__form--password"
                type="password"
                placeholder="Password"
                {...login('password', { required: true })}
              />
              <button className="login__login-container__main-container__form-container__form--submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`login__hello-container ${
          !isLogin ? 'login__hello-container--active' : 'login__hello-container--inactive'
        }`}>
        <div className="login__welcome-back__main-container__text-container">
          <span className="login__welcome-back__main-container__text-container--title">
            Welcome Back!
          </span>
          <span className="login__welcome-back__main-container__text-container--secondary">
            Enter your personal details and start!
          </span>
        </div>
        <div
          onClick={() => {
            setLogin(true);
          }}
          className="login__welcome-back__main-container__button-container">
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default Auth;
