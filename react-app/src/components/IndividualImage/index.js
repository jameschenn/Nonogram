import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Popup from 'reactjs-popup';
import * as imageActions from '../../store/images';
import * as commentActions from '../../store/comments';
import PostComment from "../PostComment";
import EditImageForm from "../EditImage/index";
import EditCommentForm from '../EditComment/index';
import './IndividualImage.css';

const IndividualImage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); //image ID

  useEffect(() => {
    dispatch(imageActions.loadOneImageThunk(id))
    dispatch(commentActions.loadCommentsThunk(id))
  }, [dispatch, id])

  const user = useSelector(state => state.session.user)
  const images = useSelector(state => state?.images)
  const imageData = images[id]
  const comments = useSelector(state => state?.comments)
  const commentsData = Object.values(comments)

  console.log('USER', user.id, commentsData.userId)
  console.log('imageData', imageData)
  console.log('comment', commentsData)

  return (
    <>
    <div className='post-container'>
      <div className='post-image'>
        <img src={imageData?.imageUrl} alt='post'/>
      </div>
      <div className='post-info'>
          <p><img src={imageData?.user?.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ fontWeight: 'bold' }}>{imageData?.user?.username}</span> {imageData?.caption}</p>
        {commentsData.map((comment, idx) => (
          <ul>
            <li> <img src={comment.user.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ fontWeight: 'bold' }}>{comment.user.username}</span> {comment.comment} {user?.id === comment?.userId && (
              <>
                <Popup trigger={<i class="fa-solid fa-ellipsis"></i>} position="right center">
                  <p>Edit Your Caption</p>
                  <EditCommentForm commentId={comment} />
                  <button type='button' onClick={() => { dispatch(commentActions.deleteCommentThunk(comment.id)) }}> Delete Comment</button>
                </Popup>
              </>
            )}</li>
            {/* {user?.id === comment?.userId && (
              <>
              <Popup trigger={<i class="fa-solid fa-ellipsis"></i>} position="right center">
                <p>Edit Your Caption</p>
                <EditCommentForm commentId={comment} />
                <button type='button' onClick={() => {dispatch(commentActions.deleteCommentThunk(comment.id))}}> Delete Comment</button>
              </Popup>
            </>
            )} */}
          </ul>
        ))}
        <PostComment />
      </div>
      <div>
        {user?.id === imageData?.userId && (
          <>
              <Popup trigger={<i class="fa-solid fa-ellipsis"></i>} position="right center">
            <p>Edit Your Caption</p>
                <EditImageForm imageId={imageData?.id} />
                <p>Delete Your Image</p>
                <button type='button' onClick={() => {
                  dispatch(imageActions.deleteImageThunk(imageData?.id)).then(() => history.push(`/me`))
                }}>Delete</button>
          </Popup>
            </>
          )}
      </div>
    </div>
    </>
  )
}


export default IndividualImage
