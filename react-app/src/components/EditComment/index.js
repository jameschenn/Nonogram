import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from "../../store/images";
import * as commentActions from "../../store/comments";

const EditCommentForm = ({commentId}) => {

  const { id } = useParams(); // image id
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const comments = useSelector(state => state.comments)

  useEffect(async () => {
    await dispatch(imageActions.loadUserImagesThunk(id))
  }, [dispatch])

  const [comment, setComment] = useState(commentId?.comment || "");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if(comment.length > 500 || comment.length < 1) errors.push('Please provide a comment that is between 1 - 500 characters')
    setErrors(errors)
  }, [comment])

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    if(errors.length > 0) return;

    const payload = {
      comment,
    }
    dispatch(commentActions.editCommentThunk(commentId.id, payload))
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
            type="text"
            value={comment}
            onChange={(e => setComment(e.target.value))}
            />
        </div>
        <button type="Submit">Edit Comment</button>
      </form>
    </section>
  )
}

export default EditCommentForm
