import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from "../../store/images";

const EditImageForm =({imageId}) => {

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

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      caption,
    }
    dispatch(imageActions.editImageThunk(imageId, payload));
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
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
