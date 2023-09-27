import "./login.css";
// import "font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div class="container">
        <form class="form-1">
          <h1>Login</h1>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={handleEmail}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePassword}
            required
          />
          <span>Forgot Password</span>
          <button>Login</button>

          <p>
            <a href="/signUp" id="signUp">
              SignUp{" "}
            </a>
            Or SignUp Using
          </p>
          <div class="icons">
            <a href="https://www.facebook.com/" target="blank">
              <i class="fa fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/" target="blank">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="https://mail.google.com/" target="blank">
              <i class="fa fa-google"></i>
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div class="container">
        <form class="form-1">
          <h1>SignUp</h1>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={handleEmail}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePassword}
            required
          />
          <label for="confirmPassword"> Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleConfirmPassword}
            required
          />

          <button>SignUp</button>

          <p>Or SignUp Using</p>
          <div class="icons">
            <a href="https://www.facebook.com/" target="blank">
              <i class="fa fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/" target="blank">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="https://mail.google.com/" target="blank">
              <i class="fa fa-google"></i>
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
