import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt,FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout,reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const logoutFn = ()=>{
      dispatch(logout())
      dispatch(reset())
      navigate('/')
  }
  return (
    <header className='header'>
      <div className='logo'>
        {/* Using the `Link` component for the homepage */}
        <Link to='/'>Task Creator</Link>
      </div>
      <ul>
        {user ?(
          <li>
            <button className='btn' onClick={logoutFn}>
              <FaSignOutAlt />Logout
            </button>
          </li>
        ):(
        <>
         <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          {/* Use the capitalized `Link` component, not `<link>` */}
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li></>)}
      </ul>
    </header>
  )
}

export default Header
