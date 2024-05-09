import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav id="nav-wrap">
      <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
        Show navigation
      </a>
      <a className="mobile-btn" href="#home" title="Hide navigation">
        Hide navigation
      </a>

      <ul id="nav" className="nav">
        <li>
          <Link className="smoothscroll" to="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="smoothscroll" to="/chart">
            Chart
          </Link>
        </li>

        {/* <li>
          <Link className="smoothscroll" to="/game">
            Game
          </Link>
        </li> */}
      </ul>
    </nav>
  )
}