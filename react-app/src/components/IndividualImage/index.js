import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import * as commentActions from '../../store/comments';
import EditImageForm from "../EditImage/index";
import './IndividualImage.css';

const IndividualImage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(imageActions.loadOneImageThunk(id))
    dispatch(commentActions.loadCommentsThunk(id))
  }, [dispatch, id])

  const images = useSelector(state => state?.images)
  const imageData = images[id]
  const comments = useSelector(state => state?.comments)
  const commentsData = Object.values(comments)
  console.log('image', imageData)
  console.log('comments', commentsData)


  return (
    <>
    <div className='post-container'>
      <div className='post-image'>
        <img src={imageData?.imageUrl} alt='post'/>
      </div>
      <div className='post-info'>
        <p>{imageData?.caption}</p>
        {commentsData.map((comment, idx) => (
          <ul>
            <li> <img src={comment.user.profilePictureUrl} alt='profile-icon' className="profile-icon" /> {comment.user.username} {comment.comment}</li>
            {/* <li>{comment.comment}</li> */}
          </ul>
        ))}
      </div>
      <div>
        <EditImageForm imageId={imageData?.id} />
      </div>
    </div>
    </>
  )
}


export default IndividualImage
