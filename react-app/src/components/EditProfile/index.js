import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as imageActions from "../../store/images";
import * as sessionActions from "../../store/session";

const EditProfileForm = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)

  const [errors, setErrors] = ([]);
  const [firstName, setFirstName] = useState(sessionUser.firstName);
  const [lastName, setLastName] = useState(sessionUser.lastName);
  const [bio, setBio] = useState(sessionUser.bio);
  const [image, setImage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      firstName,
      lastName,
      bio,
      image,
    }
    const data = await dispatch(sessionActions.editUserThunk(payload));

  }

    const updateImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
    }


  return (
    <section>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>Profile Picture</label>
          <input
            type="file"
            onChange={updateImage}
            accept='image/jpeg, image/jpg, image/png'
          />
        </div>
        <button type="Submit">Edit</button>
      </form>
    </section>
  )
}

export default EditProfileForm
