import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from "../../store/images";

const EditImageForm =({imageId, close}) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const imageData = Object.values(images)

  useEffect(async () => {
    await dispatch(imageActions.loadUserImagesThunk(id))
  }, [dispatch])

  const [caption, setCaption] = useState(imageData[0]?.caption || "");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (caption.length > 500) errors.push('Please provide a caption that is less than 500 characters')
    setErrors(errors)
  }, [caption])

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    if(errors.length > 0) return;

    const payload = {
      caption,
    }
    dispatch(imageActions.editImageThunk(imageId, payload));
    close();
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
            value={caption}
            onChange={(e => setCaption(e.target.value))}
            />
        </div>
        <button type="Submit">Edit</button>
      </form>
    </section>
  )
}

export default EditImageForm
