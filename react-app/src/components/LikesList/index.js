import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images'
import { loadLikesThunk } from "../../store/likes";

import './LikesList.css'

const LikesList = () => {

  const { id } = useParams(); //image ID
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)
  const likes = useSelector(state => state.likes)
  const likesData = Object.values(likes)

  const imageLikes = likesData.filter(likes => {
    return likes?.imageId === imageData[0]?.id
  })

  useEffect(async () => {
    await dispatch(imageActions.loadOneImageThunk(id))
    await dispatch(loadLikesThunk())
  }, [dispatch])


  return (
    <>
    <div className='likes-list'>
    {imageLikes.map(like => (
      <ul>
        {/* <a href={`/users/${like?.user?.id}`}><li><img src={like?.user?.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ fontWeight: 'bold', marginLeft: '15px' }}>{like?.user?.username}</span></li></a> */}
        <NavLink to={`/users/${like?.user?.id}`}><li><img src={like?.user?.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ fontWeight: 'bold', marginLeft: '15px' }}>{like?.user?.username}</span></li></NavLink>
     </ul>
    ))}
    </div>
    </>
  )
}

export default LikesList
