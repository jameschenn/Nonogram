import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from "../../store/images";
import * as sessionActions from "../../store/session";
import './EditProfileForm.css'

const EditProfileForm = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [firstName, setFirstName] = useState(sessionUser.firstName);
  const [lastName, setLastName] = useState(sessionUser.lastName);
  const [bio, setBio] = useState(sessionUser.bio);
  const [image, setImage] = useState('');

  useEffect(() => {
    const errors = [];
    if(!firstName) errors.push('Please provide a valid name')
    if(!lastName) errors.push('Please provide a valid last name')

    setErrors(errors)
  }, [firstName, lastName])


  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    if(errors.length >0) return

    const payload = {
      userId: sessionUser.id,
      firstName,
      lastName,
      bio,
      image,
    }
    const data = await dispatch(sessionActions.editUserThunk(payload));
    history.push("/me");
  }

    const updateImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
    }


  return (
    <section>
    <div className="edit-profile-form">
      <form onSubmit={handleSubmit}>
        <div className="error-div">
          {hasSubmitted && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e => setFirstName(e.target.value))}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e => setLastName(e.target.value))}
          />
        </div>
        <div>
          <label>Bio</label>
          <input
            type="text"
            value={bio}
            onChange={(e => setBio(e.target.value))}
          />
        </div>
        <div className="edit-image-upload-div">
            <label for='image-upload'>Edit Profile Picture   <i class="fa-solid fa-camera" style={{marginLeft: "15px"}}></i></label>
          <input
            id='image-upload'
            type="file"
            onChange={updateImage}
            accept='image/jpeg, image/jpg, image/png'
          />
        </div>
        <div className='upload-buttons'>
          <button type="Submit">Confirm Edit</button>
        </div>
      </form>
  </div >
    </section>
  )
}

export default EditProfileForm
