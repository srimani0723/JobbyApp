import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>

        <ul className="header-options">
          <Link to="/" className="nav-link">
            <li className="header-op">Home</li>
          </Link>

          <Link to="/jobs" className="nav-link">
            <li className="header-op">Jobs</li>
          </Link>
        </ul>

        <button type="button" className="logout-btn" onClick={logout}>
          Logout
        </button>

        <ul className="header-icon-options">
          <Link to="/" className="nav-link">
            <li className="header-op icon">
              <AiFillHome />
            </li>
          </Link>

          <Link to="/jobs" className="nav-link">
            <li className="header-op icon">
              <BsFillBriefcaseFill />
            </li>
          </Link>

          <button type="button" className="icon-logout-btn" onClick={logout}>
            .<FiLogOut />
          </button>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
