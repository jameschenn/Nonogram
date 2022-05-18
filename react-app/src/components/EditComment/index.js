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

  const [comment, setComment] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      comment,
    }
    dispatch(commentActions.editCommentThunk(commentId.id, payload))
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={comment}
            onChange={(e => setComment(e.target.value))}
            />
        </div>
        <button type="Submit" disabled={comment < 1}>Edit Comment</button>
      </form>
    </section>
  )
}

export default EditCommentForm
