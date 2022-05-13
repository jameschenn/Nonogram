import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import '../UserProfile/UserProfile.css'

const SessionUserProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); //user Id
  console.log(id)

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)

  useEffect(async () => {
    await dispatch(imageActions.loadSessionUserImagesThunk(sessionUser.id))
  }, [dispatch, id])


  return (
    <>
      <div className='profile-img-container'>
        {imageData.map((image, idx) => (
          <ul>
            <div className='profile-img-cards'>
              <a href={`/images/${image.id}`}><img src={image?.imageUrl} alt={image?.id} /></a>
            </div>
          </ul>
        ))}
      </div>
    </>
  )
}

export default SessionUserProfile
