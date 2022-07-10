import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  // const [frontEndErrors, setFrontEndErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
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

  const onSignUp = async (e) => {
    e.preventDefault();

    // const validateErrors = [];

    // if (!username) validateErrors.push('Please enter a valid username')
    // if (!firstName) validateErrors.push('Please provide a valid first name')
    // if (!lastName) validateErrors.push('Please provide a valid last name')
    // if (!(email.match(emailValidator))) validateErrors.push('Please provide a valid e-mail')
    // if (!password) validateErrors.push('Please Provide a valid password')
    // if (!repeatPassword) validateErrors.push('Please confirm your password')
    // if (password !== repeatPassword) validateErrors.push('Passwords must match. Please try again')
    // if(!image) validateErrors.push('Please provide a valid image for your profile picture')
    // if(validateErrors.length > 0) {
    //   setFrontEndErrors(validateErrors)
    //   setHasSubmitted(true);
    //   return
    // }


    // if (frontEndErrors.length > 0) return;

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
    } else {
      return setErrors(['Passwords don\'t match. Please try again.'])
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
    <>
    <div className='signUpForm'>
      <div className='signUp-container'>
        <form onSubmit={onSignUp}>
          <h2>Nonogram</h2>
          <h4>Sign up to see photos from your friends.</h4>
          <div className='error-div'>
            {errors.map((error, ind) => (
              <div key={ind} className='errors'>{error}</div>

            ))}
          </div>
          {/* <div className='error-div'>
            {hasSubmitted && frontEndErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> */}
          <div>
            <input
              type='text'
              name='username'
              placeholder='Username (required)'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='firstName'
              placeholder='First Name (required)'
              onChange={updateFirstName}
              value={firstName}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='lastName'placeholder='Last Name (required)'
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
            <label>Upload a Profile Picture (required)</label>
            <input
              type='file'
              className='file-selector-button'
              name='image'
              onChange={updateImage}
              accept='image/jpeg, image/jpg, image/png'
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              placeholder='E-mail (required)'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password (required)'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm Password (required again)'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
    </div>
  </div>
  <div className='new-container'>
    <div className='login-new'>
      <p style={{marginRight:'10px', marginLeft:'-5px'}}>Already had an account?</p>
          <a href={`/login`}>Log in!</a>
    </div>
  </div>
  </>
  );
};

export default SignUpForm;
