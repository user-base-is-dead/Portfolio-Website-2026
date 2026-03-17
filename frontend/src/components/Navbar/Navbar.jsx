import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar" id="navbar">
      <Link to="/" className="navbar__logo">Mishra</Link>

      <ul className="navbar__links">
        <li><Link to="/" className="navbar__link">Home</Link></li>
        <li><Link to="/about" className="navbar__link">About</Link></li>
        <li><Link to="/contact" className="navbar__link">Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
