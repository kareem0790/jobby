import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-bg-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="sm-website-logo"
        />
      </Link>
      <ul className="sm-icon-container">
        <Link to="/" className="nav-link">
          <li className="list-item-icon">
            <AiFillHome className="icon" />
          </li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="list-item-icon">
            <BsBriefcaseFill className="icon" />
          </li>
        </Link>
        <li className="list-item-icon">
          <FiLogOut className="icon" onClick={onLogout} />
        </li>
      </ul>
      <ul className="icon-container">
        <Link to="/" className="home-icon">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="home-icon">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
