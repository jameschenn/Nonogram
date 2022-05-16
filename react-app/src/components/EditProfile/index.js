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
  // const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState(sessionUser.bio);
  const [image, setImage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      firstName,
      lastName,
      // password,
      bio,
      image,
    }
    const data = await dispatch(sessionActions.editUserThunk(payload));
    // if(password === repeatPassword) {
    //   if (data) {
    //     setErrors(data)
    //   }
    // }
  }
    // const updateFirstName = (e) => {
    //   setFirstName(e.target.value);
    // };

    // const updateLastName = (e) => {
    //   setLastName(e.target.value);
    // };

    // const updatePassword = (e) => {
    //   setPassword(e.target.value);
    // };

    // const updateRepeatPassword = (e) => {
    //   setRepeatPassword(e.target.value);
    // };

    // const updateBio = (e) => {
    //   setBio(e.target.value);
    // };

    const updateImage = (e) => {
      const file = e.target.files[0];
      console.log('FILE', file)
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
        {/* <div>
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={(e => setPassword(e.target.value))}
          />
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type="text"
            value={repeatPassword}
            onChange={(e => setRepeatPassword(e.target.value))}
          />
        </div> */}
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
