import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as imageActions from '../../store/images';

const AllImages = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);
  const images = useSelector(state => state.images);
  const imageData = Object.values(images)
  console.log('1', images)
  console.log('2',imageData)

  useEffect(async () => {
    await dispatch(imageActions.loadAllImagesThunk())
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
