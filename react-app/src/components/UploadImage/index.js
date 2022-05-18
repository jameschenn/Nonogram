import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images'

function UploadImage() {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    const errors = [];
    if(!image) errors.push('Please choose an image first before uploading')
    setErrors(errors)
  }, [image])

  const handleSubmit = async e => {
    e.preventDefault()

    setHasSubmitted(true);

    if(errors.length > 0) return;

    const new_image = {
      userId: sessionUser.id,
      image,
      caption,
    }

    await dispatch(imageActions.createImageThunk(new_image))
    history.push("/");
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/`);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {hasSubmitted && errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
        <div>
          <input
            type='file'
            onChange={updateImage}
          />
        </div>
        <div>
          <input
            type='text'
            value={caption}
            onChange={e => setCaption(e.target.value)}
          />
        </div>
        <button type='submit'>Upload Image</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  )
}

export default UploadImage
