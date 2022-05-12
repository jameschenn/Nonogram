import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
// import EditImageForm from "../EditImage/index";
import './UserProfile.css'

const UserProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); //user Id

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)
  console.log('image info', imageData)

  useEffect(async() => {
    await dispatch(imageActions.loadUserImagesThunk(id))
  }, [dispatch, id])


  return (
    <>
    <div className='profile-img-container'>
      {imageData.map((image, idx) => (
        <ul>
          <div className='profile-img-cards'>
            <a href={`/images/${image.id}`}><img src={image?.imageUrl} alt={image?.id} /></a>
          <li>{image?.caption}</li>
          </div>
          {/* <EditImageForm imageId={image.id} /> */}
          <button type="button" onClick={() => {
            dispatch(imageActions.deleteImageThunk(image?.id))
            // history.push('/images')
          }}>Delete</button>
        </ul>
      ))}
    </div>
    </>
  )
}

export default UserProfile
