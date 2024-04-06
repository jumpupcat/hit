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
          <a className="smoothscroll" href="/">
            Home
          </a>
        </li>

        <li>
          <a className="smoothscroll" href="/chart">
            Chart
          </a>
        </li>

        {/* <li>
          <a className="smoothscroll" href="/game">
            Game
          </a>
        </li> */}

        <li>
          <a className="smoothscroll" href="https://twitter.com/godhavah" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </li>
      </ul>
    </nav>
  )
}