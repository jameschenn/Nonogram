import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demo = async e => {
    e.preventDefault();
    const data = await dispatch(login('demo@nonogram.com', 'password'));
    if(data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='loginForm'>
      <div className='login-container'>
        <img src='https://res.cloudinary.com/jameschenn/image/upload/v1652757406/Nonogram/Shih-Tzu-PNG-File_g8j0db.png' alt='nono-logo' className='nono-logo'/>
        <h2>Nonogram</h2>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className='errors'>{error}</div>
          ))}
        </div>
        <div>
          <input
            name='email'
            type='text'
            placeholder='Email (required)'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <input
            name='password'
            type='password'
            placeholder='Password (required)'
            value={password}
            onChange={updatePassword}
          />
        </div>
          <div className='login-buttons'>
            <button type='submit'>Login</button>
            <button type="submit" onClick={demo}>Demo Login</button>
          </div>
      </form>
      </div>
    </div>
      <div className='new-container'>
        <div className='login-new'>
          <p style={{marginRight: '7px'}}>New User?</p>
          <a href={`/sign-up`}>Sign up!</a>
        </div>
    </div>
    </>
  );
};

export default LoginForm;
