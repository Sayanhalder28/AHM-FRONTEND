import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import IEMALogo from '../../assets/iemathree.png';
import './login.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // Perform authentication logic here (e.g., validate credentials)
    // For simplicity, we'll just redirect to another page after 2 seconds
    e.preventDefault();

    const user = {
      username,
      password,
    };

    // use fetch to send user data to backend and get response back from backend to frontend to check if user exists or not and if user exists then redirect to home page
    fetch('http://sail-backend-env.eba-pmepw6q2.ap-south-1.elasticbeanstalk.com/v1/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          navigate('/home');
        } else {
          alert('Invalid Credentials');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Server is down');
      });

    // if no response from backend then display alert message to user that server is down

    // setTimeout(() => {
    //   navigate("/");
    // }, 2000);
  };

  return (
    <div className='login-container flex-col lg:flex-row'>
      <div>
        <img src={IEMALogo} alt='logo' className='w-60 lg:w-auto lg:mr-36' />
      </div>
      <div className='login-form w-96 h-full sm:w-2/3 lg:w-1/3 rounded'>
        <h2 className='login-heading'>Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className=' mt-5 bg-blue-900' id='button'>
          Login
        </button>
        <div className=' mt-5 text-center text-blue-700 mb-5'>
          <div className=' text-white'>
            <a href='/forgot-password'>Forgot Password?</a>
            <br />
            or
          </div>
          <Link to='/sign-up'>Sign Up!</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
