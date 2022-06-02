import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import * as commentActions from '../../store/comments'
import * as likeActions from '../../store/likes';

import './AllImages.css'

const AllImages = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const sessionUser = useSelector(state => state.session.user);
  const images = useSelector(state => state.images);
  const imageData = Object.values(images)
  const comments = useSelector(state => state.comments)
  const allLikes = useSelector(state => state.likes);
  const allLikesArr = Object.values(allLikes)

  useEffect(async () => {
    await dispatch(imageActions.loadAllImagesThunk())
    await dispatch(commentActions.loadCommentsThunk(id))
    await dispatch(likeActions.loadLikesThunk())
  }, [dispatch, id])



  return (
    <>
    {imageData.reverse().map((image, idx) => (
      <div className='img-feed-card'>
        <ul>
          <li><a href={`/users/${image.userId}`}><img src={image?.user?.profilePictureUrl} alt='profile-icon' className='profile-icon' style={{ marginLeft: '25px' }} /> <span style={{ fontWeight: 'bold', marginLeft: '15px' }}>{image?.user?.username}</span></a></li>
        <div className="all-image-container">
          <li><a href={`/images/${image.id}`}><img src={image?.imageUrl} alt={image?.id}/></a></li>
        </div>
        <div className="all-images-comments">
          <li> <a href={`/users/${image.userId}`}><span style={{ fontWeight: 'bold', marginLeft: '10px', marginRight: '5px' }}>{image?.user?.username}</span></a> {image?.caption}</li>
        </div>
          {/* <li>{image?.likes.length} likes</li> */}
        </ul>
      </div>
    ))}
    </>
  )
}

export default AllImages
