import React, { useState } from 'react';
import LoginPage from './login_page';
import TodoListPage from './todoListPage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { MyContext } from "./MyContext";
import users_profiles from './users_profile'

interface User {
  id: string;
  username: string;
}

interface LoginResponse {
  token: string;
}
const serverUrl = "https://5000-puneetsikka-todolist-b686ge0wyv7.ws-us99.gitpod.io/api/login";
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async  () => {
    try {
      const response = await axios.post<LoginResponse>(`${serverUrl}`, { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode<{ sub: string }>(token);
      const user = { id: decodedToken.sub, username };
      setIsLoggedIn(true);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('Login failed', error);
      alert('Invalid username or password')
      // Handle login failure, e.g., show error message
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };
  return (
    <div>
      {isLoggedIn ? (
        <MyContext.Provider value={{ users_profiles }}>
        <TodoListPage handleLogout={handleLogout} />
        </MyContext.Provider>
      ) : (
        
        <LoginPage
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
