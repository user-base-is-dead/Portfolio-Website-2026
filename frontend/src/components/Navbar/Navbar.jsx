import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar" id="navbar">
      <span className="navbar__logo">Mishra</span>

      <ul className="navbar__links">
        <li><a href="#" className="navbar__link">Home</a></li>
        <li><a href="#" className="navbar__link">About</a></li>
        <li><a href="#" className="navbar__link">Projects</a></li>
        <li><a href="#" className="navbar__link">Contact</a></li>
        <li><a href="#" className="navbar__link">Game</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
