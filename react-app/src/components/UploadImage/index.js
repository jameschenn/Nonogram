import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images'

function UploadImage() {

  const dispatch = useDispatch()
  const history = useHistory
  const { id } = useParams()

  const sessionUser = useSelector(state => state.session.user)
  const images = useSelector(state => state.images)

  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const new_image = {
      userId: sessionUser.id,
      image,
      caption,
    }

    await dispatch(imageActions.createImageThunk(new_image))
    history.push('/images')
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
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
      </form>
    </section>
  )
}

export default UploadImage
