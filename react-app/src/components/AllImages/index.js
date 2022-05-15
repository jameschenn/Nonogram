import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import * as commentActions from '../../store/comments'
import './AllImages.css'

const AllImages = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const sessionUser = useSelector(state => state.session.user);
  const images = useSelector(state => state.images);
  const imageData = Object.values(images)
  const comments = useSelector(state => state.comments)
  console.log('IMAGE DATA', imageData)

  useEffect(async () => {
    await dispatch(imageActions.loadAllImagesThunk())
    await dispatch(commentActions.loadCommentsThunk(id))
  }, [dispatch])



  return (
    <>
    {imageData.map((image, idx) => (
      <div className='img-feed-card'>
        <ul>
          <li><a href={`/users/${image.userId}`}><img src={image?.user?.profilePictureUrl} alt='profile-icon' className='profile-icon' style={{ marginLeft: '25px' }} /></a> <span style={{fontWeight:'bold', marginLeft: '15px'}}>{image?.user?.username}</span></li>
          <li><a href={`/images/${image.id}`}><img src={image?.imageUrl} alt={image?.id}/></a></li>
          <li> <span style={{ fontWeight: 'bold', marginLeft:'25px', marginRight: '15px' }}>{image?.user?.username}</span> {image?.caption}</li>
        </ul>
      </div>
    ))}
    </>
  )
}

export default AllImages
