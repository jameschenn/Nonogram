import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';

const UserProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)

  console.log('REACT', images)
  console.log('id', id)
  useEffect(async() => {
    await dispatch(imageActions.loadUserImagesThunk(id))
  }, [dispatch, id])


  return (
    <h1>Hi</h1>
  )
}

export default UserProfile
