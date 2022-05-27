import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
    return me.id === user.id
  })

  // const handleFollow = e => {
  //   e.preventDefault()
  //   if(followed) {
  //     dispatch(unfollowUserThunk(id))
  //   } else if (myself) {
  //     return null;
  //   } else {
  //     dispatch(followUserThunk(id))
  //   }
  // }

  useEffect(async() => {
    await dispatch(imageActions.clearStoreThunk())
    await dispatch(imageActions.loadUserImagesThunk(id))
    await dispatch(followActions.loadFollowingThunk(id))
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
        <h4>{followersArr.length} Followers</h4>
        <h4>{followingArr.length} Following</h4>

      </div>
      <div className='bio'>{user.bio}</div>
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

export default UserProfile
