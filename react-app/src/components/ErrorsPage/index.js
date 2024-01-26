import { NavLink } from 'react-router-dom';
import './ErrorsPage.css'

const ErrorPage = () => {
  return (
    <>
      <div className='div-404'>
        <div className='image-404'>
          <img src="https://res.cloudinary.com/jameschenn/image/upload/v1653173518/Nonogram/ok-bye-dog-ok-bye_esgzva.gif" alt='Stop trying to break my site'/>
        </div>
        <h1>404 The page you are looking for does not exist.</h1>
        {/* <h2>Go back to your <a href={'/'}>main feed</a></h2> */}
        <h2>Go back to your <NavLink to={'/'}>main feed</NavLink></h2>
      </div>
    </>
  )
}

export default ErrorPage
