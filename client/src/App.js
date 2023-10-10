// import logo from "./logo.svg";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Contact } from "./pages/Contact";
import { Explore } from "./pages/Explore";
import { Signup } from "./pages/Signup";
import { YourCapsule } from "./pages/YourCapsule";
// import ProfileDropdown from './ProfileDropdown';
// import { UserProvider } from './UserContext';
import { UserDashboard } from "./pages/UserDashboard";

export const App = () => {
  // Create a style object with the backgroundColor property

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/explore" exact Component={Explore} />
          <Route path="/contactus" exact Component={Contact} />
          <Route path="/login" exact Component={Login} />
          <Route path="/signup" exact Component={Signup} />
          <Route path="/userdashboard" exact Component={UserDashboard} />
          <Route path="/yourcapsules" exact Component={YourCapsule} />

          {/* <Route path="/timeCapsules" exact Component={TimeCapsules} /> */}
        </Routes>
      </Router>
    </>
  );
};
