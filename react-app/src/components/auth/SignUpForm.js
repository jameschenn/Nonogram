import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const emailValidator = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  // useEffect(() => {
  //   const errors = [];

  //   if (username.length < 1) errors.push('Please enter a valid username')
  //   if (firstName.length < 1) errors.push('Please provide a valid first name')
  //   if (lastName.length < 1) errors.push('Please provide a valid last name')
  //   if (!(email.match(emailValidator))) errors.push('Please provide a valid e-mail')
  //   if () errors.push()
  //   if () errors.push()
  //   if () errors.push()
  //   if () errors.push()
  //   if () errors.push()
  //   setErrors(errors)
  // }, [])

  const onSignUp = async (e) => {
    e.preventDefault();

    const new_user = {
      username,
      firstName,
      lastName,
      email,
      password,
      bio,
      image
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(new_user));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    console.log('FILE', file)
    setImage(file);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signUpForm'>
      <div className='signUp-container'>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <h2>Nonogram</h2>
          <h4>Sign up to see photos from your friends.</h4>
          <div>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              onChange={updateFirstName}
              value={firstName}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='lastName'placeholder='Last Name'
              onChange={updateLastName}
              value={lastName}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='bio'
              placeholder='Bio'
              onChange={updateBio}
              value={bio}
            ></input>
          </div>
          <div>
            <label>Upload a Profile Picture</label>
            <input
              type='file'
              name='image'
              onChange={updateImage}
              accept='image/jpeg, image/jpg, image/png'
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              placeholder='E-mail'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
    </div>
  </div>
  );
};

export default SignUpForm;
