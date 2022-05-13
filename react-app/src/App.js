import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import AllImages from './components/AllImages';
import UserProfile from './components/UserProfile'
import IndividualImage from './components/IndividualImage'
import SessionUserProfile from './components/SessionUserProfile';
import UploadImage from './components/UploadImage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:id' exact={true} >
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/me' exact={true} >
          <SessionUserProfile />
        </ProtectedRoute>
        <ProtectedRoute path ='/images' exact={true} >
          <AllImages />
        </ProtectedRoute>
        <ProtectedRoute path='/images/upload' exact={true} >
          <UploadImage />
        </ProtectedRoute>
        <ProtectedRoute path ='/images/:id' exact={true} >
          <IndividualImage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
