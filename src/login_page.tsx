import React, { useState } from 'react';
import './LoginPage.css'; 
interface LoginPageProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form className="login-page__form">
        <label className="login-page__label">
          Username:
          <input
            type="text"
            className="login-page__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="login-page__label">
          Password:
          <input
            type="password"
            className="login-page__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" className="login-page__button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
