import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';
import * as commentActions from '../../store/comments'

const AllImages = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const sessionUser = useSelector(state => state.session.user);
  const images = useSelector(state => state.images);
  const imageData = Object.values(images)
  const comments = useSelector(state => state.comments)
  console.log('--------------------', comments)

  useEffect(async () => {
    await dispatch(imageActions.loadAllImagesThunk())
    await dispatch(commentActions.loadCommentsThunk(id))
  }, [dispatch])



  return (
    <>
    {imageData.map((image, idx) => (
      <ul>
        <li><img src={image?.imageUrl} alt={image?.id}/></li>
        <li>{image?.caption}</li>
      </ul>
    ))}
    </>
  )
}

export default AllImages
