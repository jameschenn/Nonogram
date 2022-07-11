import React, { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (comment.length > 500) errors.push('Please provide a comment that is between 1 - 500 characters')
    setErrors(errors)
  }, [comment])


  const handleSubmit = async e => {
    e.preventDefault()

    setHasSubmitted(true);

    if(errors.length > 0) return;

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
        <div className="error-div">
          {hasSubmitted && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div>
          <input
            type='text'
            placeholder="Add a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button type="submit" disabled={comment.length < 1}>Submit Comment</button>
      </form>
    </section>
  )

}

export default PostComment
