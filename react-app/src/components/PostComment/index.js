import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as commentActions from "../../store/comments";

function PostComment() {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams() //Image ID

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)


  const [comment, setComment] = useState('')


  const handleSubmit = async e => {
    e.preventDefault()

    const new_comment = {
      userId: sessionUser.id,
      imageId: images[id].id,
      comment,
    }

    await dispatch(commentActions.addCommentThunk(new_comment, images[id].id))
    setComment('')
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button type="submit" disabled={comment < 1}>Submit Comment</button>
      </form>
    </section>
  )

}

export default PostComment
