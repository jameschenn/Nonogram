import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import EditImageForm from "../EditImage/index";

const UserProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); //user Id

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)
  console.log('imageData', imageData)

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
          <button type="button" onClick={() => {
            dispatch(imageActions.deleteImageThunk(image?.id))
            // history.push('/images')
          }}>Delete</button>
        </ul>
      ))}
    </>
  )
}

export default UserProfile
