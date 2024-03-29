import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Popup from 'reactjs-popup';
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import * as imageActions from '../../store/images';
import * as commentActions from '../../store/comments';
import * as likeActions from '../../store/likes';
import PostComment from "../PostComment";
import EditImageForm from "../EditImage/index";
import EditCommentForm from '../EditComment/index';
import ErrorPage from "../ErrorsPage";
import LikesList from "../LikesList";
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

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }, [])


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

  const handleLike =  e => {
    e.preventDefault()
    if(like) {
      dispatch(likeActions.deleteLikeThunk(like))
    } else {
      dispatch(likeActions.postLikeThunk(imageData?.id))
    }
  }

  return (
    <>
      {loading ? (

        <div className="loading">
          <ClipLoader color={'#50E3C2'} loading={loading} size={150} />
        </div>

      ) : (

        imageData ? (
          <div className='post-container'>
            <div className='post-image'>
              <img src={imageData?.imageUrl} alt='post' />
            </div>
            <div className='post-info'>
              {/* <p><a href={`/users/${imageData?.userId}`}><img src={imageData?.user?.profilePictureUrl} alt='profile-icon' className='profile-icon' style={{marginRight: '10px'}} /> <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{imageData?.user?.username}</span></a> */}
              <p><NavLink to={`/users/${imageData?.userId}`}><img src={imageData?.user?.profilePictureUrl} alt='profile-icon' className='profile-icon' style={{marginRight: '10px'}} /> <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{imageData?.user?.username}</span></NavLink>
                {user?.id === imageData?.userId && (
                  <>
                    <Popup trigger={<i class="fa-solid fa-ellipsis"></i>} position="right center">
                      {close => (
                        <>
                          <p style={{ marginRight: '100px' }}>Edit Your Caption</p>
                          <EditImageForm imageId={imageData?.id} close={close} />
                          <p style={{ marginRight: '100px' }}>Delete Your Image</p>
                          <button type='button' onClick={() => {
                            dispatch(imageActions.deleteImageThunk(imageData?.id)).then(() => history.push(`/me`))
                          }}>Delete</button>
                        </>
                      )}
                    </Popup>
                  </>
                )}
              </p>
              <div className='individual-post-caption'>
                <p style={{ marginTop: '10px' }}>{imageData?.caption}</p>
              </div>
              <div className='individual-comments'>
                {commentsData.map((comment, idx) => (
                  <ul>
                    {/* <li> <a href={`/users/${comment?.userId}`}><img src={comment.user.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{comment.user.username}</span></a> <span>{comment.comment}</span> {user?.id === comment?.userId && ( */}
                    <li> <NavLink to={`/users/${comment?.userId}`}><img src={comment.user.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{comment.user.username}</span></NavLink> <span>{comment.comment}</span> {user?.id === comment?.userId && (
                      <>
                        <Popup trigger={<i class="fa-solid fa-ellipsis"></i>} position="right center">
                          {close => (
                            <>
                              <p style={{ marginRight: '60px' }}>Edit Your Comment</p>

                              <EditCommentForm commentId={comment} close={close} />
                              <button type='button' onClick={() => { dispatch(commentActions.deleteCommentThunk(comment.id)) }}> Delete Comment</button>
                            </>
                          )}
                        </Popup>
                      </>
                    )}</li>
                  </ul>
                ))}
              </div>
              <div className="individual-likes-and-comment">
                {like ? (
                  <button onClick={handleLike}>❤️</button>
                ) : (
                  <button onClick={handleLike}>🤍</button>
                )}

                  <Popup trigger={<p>{likes?.length} likes</p>} position="left bottom">
                    {close => (
                      <>
                        <p style={{ fontWeight: 'bold', borderBottom: 'solid 1px lightgray', marginRight: '50px' }}>Likes</p>
                        <LikesList />
                      </>
                    )}
                  </Popup>
                  <div>
                    <li style={{ marginTop: '10px', listStyleType: 'none' }}>{moment(imageData?.createdAt).fromNow()}</li>
                  </div>
                <div className="individual-post-comment">
                  <PostComment />
                </div>
              </div>
            </div>
          </div>
        ) :
          (
            <ErrorPage />
          )
      )}
    </>
  )
}


export default IndividualImage
