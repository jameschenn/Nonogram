import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import EditImageForm from "../EditImage/index";

const UserProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)

  console.log('REACT', images)
  console.log('id', id)
  useEffect(async() => {
    await dispatch(imageActions.loadUserImagesThunk(id))
  }, [dispatch, id])


  return (
    <>
      {imageData.map((image, idx) => (
        <ul>
          <li><img src={image?.imageUrl} alt={image?.id} /></li>
          <li>{image?.caption}</li>
          <EditImageForm />
        </ul>
      ))}
    </>
  )
}

export default UserProfile
