import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from '../../store/images'
import './UploadImage.css';

function UploadImage() {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const sessionUser = useSelector(state => state.session.user);
  const images = useSelector(state => state.images);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [invalidImg, setInvalidImg] = useState(false);

  useEffect(() => {
    const errors = [];
    if(!image) errors.push('Please choose an image first before uploading')
    if(caption.length > 500) errors.push('Please provide a caption that is less than 500 characters')
    setErrors(errors)
  }, [image, caption])

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
    setDisabled(false)
    setImage(file);
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/`);
  };


  return (
    <section>
      <div className='preview-div'>
        {image ? <img src={URL.createObjectURL(image)} alt='upload-preview' className='upload-preview' onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src ="https://res.cloudinary.com/jameschenn/image/upload/v1653283037/Nonogram/1040967-1538804962594-19eb4a35bc75_ggetnh.jpg"
          setDisabled(true)
        }} /> : <h1 id='upload-file'>Upload a file...</h1>}
      </div>
      <div className="upload-form">
        <form onSubmit={handleSubmit}>
          <div className="error-div">
          {hasSubmitted && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
          </div>
          <div className='image-upload-div'>
            <label for='image-upload'>
              Upload Image <br/> (required) <br/> <i class="fa-solid fa-camera"></i>
            <input
              id='image-upload'
              type='file'
              onChange={updateImage}
              accept='image/jpeg, image/jpg, image/png'
            />
            </label>
          </div>
          <div className='caption-upload'>
            <input
              type='text'
              placeholder='Add a caption'
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
          </div>
          <div className='upload-buttons'>
            {console.log('DISABLED', disabled)}
          <button type='submit' disabled={disabled}>Post image</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UploadImage
