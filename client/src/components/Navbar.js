import "./navbar.css";
import logo from "../images/logo.png";
export const Navbar = () => {
  return (
    <>
      <nav>
        <img class="logo" src={logo} width="70px" height="70px" />
        <input type="checkbox" id="checkbox" />
        <label for="checkbox" id="icon">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/explore">Explore </a>
          </li>
          <li>
            <a href="/contactus">Contact</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </>
  );
};
