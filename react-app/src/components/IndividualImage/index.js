import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Popup from 'reactjs-popup';
import * as imageActions from '../../store/images';
import * as commentActions from '../../store/comments';
import * as likeActions from '../../store/likes';
import PostComment from "../PostComment";
import EditImageForm from "../EditImage/index";
import EditCommentForm from '../EditComment/index';
import './IndividualImage.css';

const IndividualImage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); //image ID



  const user = useSelector(state => state.session.user)
  const images = useSelector(state => state?.images)
  const imageData = images[id]
  const comments = useSelector(state => state?.comments)
  const commentsData = Object.values(comments)
  // const allLikes = useSelector(state => state.likes)
  // const allLikesArr = Object.values(allLikes)
  // const likes = allLikesArr.filter((like) => {
  //   return like?.imageId === imageData?.id
  // })

  const [likeId, setLikeId] = useState(0)


  useEffect(() => {
    dispatch(imageActions.loadOneImageThunk(id))
    dispatch(commentActions.loadCommentsThunk(id))
    dispatch(likeActions.loadLikesThunk())
  }, [dispatch, id])

  const allLikes = useSelector(state => state.likes)
  const allLikesArr = Object.values(allLikes)
  const likes = allLikesArr.filter((like) => {
    return like?.imageId === imageData?.id
  })
  let like = likes?.find((like) => {
    return user.id === like.userId
  })



  console.log('LIKESSSSSSSSSSSSSSSSSSSSSSSSS', likes)
  console.log('filtered like', like)


  // useEffect(() => {

    // let like = imageData?.likes?.find((like) => {
    //   return user.id === like.userId
    // })

  //   console.log('HIT-------', like)

  //   setLikeId(like?.id)
  //   console.log('STATE HAS CHANGED. SECOND IF')
  //   console.log('STATE HAS CHANGED like', like)
  //   console.log('STATE HAS CHANGED likeId', likeId)
  // }, [dispatch])

  const handleLike =  e => {
    e.preventDefault()
    if(like) {
      dispatch(likeActions.deleteLikeThunk(like?.id))
    } else {
      dispatch(likeActions.postLikeThunk(imageData?.id))
    }
  }

  console.log('likeId', likeId)
  console.log('imageData', imageData?.id)
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
        <p>{likes?.length} likes</p>

        {like ? (
            <button onClick={handleLike}>❤️</button>
        ): (
              <button onClick={handleLike}>🤍</button>
        )}
          {/* <button type='button' onClick={() => {
            dispatch(likeActions.postLikeThunk(imageData?.id))
          }}>Like</button>

        <button type='button' onClick={() => {
            dispatch(likeActions.deleteLikeThunk(like?.id))
        }}>Remove like</button> */}
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
