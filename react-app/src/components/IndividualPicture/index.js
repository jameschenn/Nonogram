import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images';

const IndividualPicture = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(imageActions.loadOneImageThunk(id))
  }, [dispatch, id])


  return (
    <h1>Individual Page</h1>
  )
}


export default IndividualPicture
