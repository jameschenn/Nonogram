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

  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const image = {
      userId: sessionUser.id,
      imageUrl,
      caption,
    }

    await dispatch(imageActions.createImageThunk(image))
    // history.push('/images')
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={imageUrl}
            placeholder='TODO: Change to AWS after CRUD'
            onChange={e => setImageUrl(e.target.value)}
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
