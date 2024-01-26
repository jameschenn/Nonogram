import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Popup from 'reactjs-popup';
import * as imageActions from '../../store/images';
import * as followActions from '../../store/follows';
import { loadFollowersThunk, followUserThunk, unfollowUserThunk } from '../../store/followers'
// import EditImageForm from "../EditImage/index";
import './UserProfile.css'

const UserProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  const { id } = useParams(); //user Id


  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)

  const following = useSelector(state => state.follows)
  const followingArr = Object.values(following)
  const followers = useSelector(state => state.followers)
  const followersArr = Object.values(followers)

  useEffect(() => {
    if (!id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [id]);

  // can't follow yourself
  const myself = sessionUser?.username === imageData[id]?.user?.username
  let followed = followersArr.find(me => {
    return me.id === sessionUser.id
  })


  useEffect(async() => {
    await dispatch(imageActions.clearStoreThunk())
    await dispatch(imageActions.loadUserImagesThunk(id))
    await dispatch(loadFollowersThunk(id))
  }, [dispatch, id])


  return (
    <>
    <div className='profile-header'>
    <img src={user?.profilePictureUrl} alt={user?.username} className='user-profile-icon'/>
      <div className="username">
        <h1>{user?.username} </h1>
        <div className="follow-button">
            {myself ? (
              <div></div>
            ) : (

              followed ? (
                <button onClick={() => {
                  dispatch(unfollowUserThunk(id))
                  }} style={{ color: 'black', backgroundColor: 'lightgray' }}>Unfollow</button>
              ) : (
                <button onClick={() => {
                  dispatch(followUserThunk(id))
                    }} style={{ color: 'white', backgroundColor:'cadetblue'}}>Follow</button>
              )
            )}
        </div>
        <p>{user?.firstName} {user?.lastName}</p>
      </div>
      <div className='profile-info'>
        <h4>{imageData.length} Posts</h4>
          <Popup trigger={<p style={{fontWeight: 'bold'}}>{followersArr.length} Followers</p>} position='bottom center'>
            {close => (
              <>
                <p style={{ fontWeight: 'bold', borderBottom: 'solid 1px lightgray', marginRight: '5px' }}>Followers</p>
                {followersArr.map(follower => (
                  <ul className='follows-list'>
                    {/* <a href={`/users/${follower.id}`}><li><img src={follower?.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{color: 'black', fontWeight: 'bold', marginLeft: '15px' }}>{follower.username}</span></li></a> */}
                    <NavLink to={`/users/${follower.id}`}><li><img src={follower?.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{color: 'black', fontWeight: 'bold', marginLeft: '15px' }}>{follower.username}</span></li></NavLink>
                  </ul>
                ))}
              </>
            )}
          </Popup>

          <Popup trigger={<p style={{ fontWeight: 'bold' }}>{imageData[0]?.user?.following?.length} Following</p>} position='bottom center'>
            {close => (
              <>
                <p style={{ fontWeight: 'bold', borderBottom: 'solid 1px lightgray', marginRight: '5px' }}>Following</p>
                {imageData[0]?.user?.following.map(follower => (
                  <ul className='follows-list'>
                    {/* <a href={`/users/${follower.id}`}><li><img src={follower?.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ color: 'black', fontWeight: 'bold', marginLeft: '15px' }}>{follower.username}</span></li></a> */}
                    <NavLink to={`/users/${follower.id}`}><li><img src={follower?.profilePictureUrl} alt='profile-icon' className='profile-icon' /> <span style={{ color: 'black', fontWeight: 'bold', marginLeft: '15px' }}>{follower.username}</span></li></NavLink>
                  </ul>
                ))}
              </>
            )}
          </Popup>

      </div>
      <div className='bio'>{user.bio}</div>
    </div>
    <div className='profile-img-container'>
      {imageData.reverse().map((image, idx) => (
        <ul>
          <div className='profile-img-cards'>
            {/* <a href={`/images/${image.id}`}><img src={image?.imageUrl} alt={image?.id} /></a> */}
            <NavLink to={`/images/${image.id}`}><img src={image?.imageUrl} alt={image?.id} /></NavLink>
          </div>
        </ul>
      ))}
    </div>
    </>
  )
}

export default UserProfile
