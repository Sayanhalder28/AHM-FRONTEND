import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link component for internal navigation
import IEMALogo from '../../assets/iemathree.png';

import './signup.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    const user = {
      firstName,
      lastName,
      username,
      phoneNumber,
      address,
      employeeId,
      password,
    };

    fetch('http://sail-backend-env.eba-pmepw6q2.ap-south-1.elasticbeanstalk.com/v1/sign-up', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => {
        navigate('/sign-in');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='signup-container flex-col lg:flex-row'>
      <div>
        <img src={IEMALogo} alt='logo' className='w-60 lg:w-auto lg:mr-36' />
      </div>
      <div className='signup-form h-full sm:w-2/3 lg:w-1/3 rounded flex flex-col justify-center'>
        <h2 className='mt-9 mb-8'>Create Account</h2>
        <div className='form-part-1 gap-3'>
          <input
            type='text'
            id='firstName'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            id='lastName'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='form-part-2'>
          <input
            type='text'
            id='employeeId'
            placeholder='Employee ID'
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <input
            type='email'
            id='username'
            placeholder='Email'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type='text'
            id='phoneNumber'
            placeholder='Phone'
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type='text'
            id='address'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='form-part-3 gap-3'>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='btn-center mt-4'>
          <button onClick={handleSignUp} className='bg-blue-700' id='button'>
            Signup
          </button>
        </div>
        <div className='text-white mb-2 btn-center mt-7'>
          <p>
            Already have an account?{' '}
            <Link to='/' className='text-blue-700'>
              Sign In!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
