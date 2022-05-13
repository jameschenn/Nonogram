import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as commentActions from "../../store/comments";

function PostComment() {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const sessionUser = useSelector(state => state.session.user)


  const [comment, setComment] = useState('')


  const handlesubmit = async e => {
    e.preventDefault()

    const comment = {
      userId: sessionUser.id,
      imageId,
      comment,
    }

    await dispatch(commentActions.addCommentThunk(comment))
  }


}
