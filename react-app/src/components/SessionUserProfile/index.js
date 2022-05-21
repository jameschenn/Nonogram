import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import '../UserProfile/UserProfile.css'

const SessionUserProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); //user Id

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)

  useEffect(async () => {
    await dispatch(imageActions.loadSessionUserImagesThunk(sessionUser.id))
  }, [dispatch, id])


  return (
    <>
      <div className='profile-header'>
        <img src={sessionUser?.profilePictureUrl} alt={sessionUser?.username} className='user-profile-icon' />
        <div className="username">
          <h1>{sessionUser?.username}</h1>
          <p>{sessionUser?.firstName} {sessionUser?.lastName}</p>
        </div>
        <div className='profile-info'>
          <h4>{imageData.length} Posts</h4>
          {/* <h4>{sessionUser?.followers?.length} Followers</h4> */}
          {/* <h4>{sessionUser?.following?.length} Followers</h4> */}
        </div>
        <div className='bio'>{sessionUser.bio}</div>
      </div>
      <div className='profile-img-container'>
        {imageData.reverse().map((image, idx) => (
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
