import "./contact.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
export const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="contact">
        <div className="cwrapper">
          <div className="cheader">
            <h1 id="ch1">Contact us</h1>
            <p id="cp">
              Do you have a question? Send us a message and we will respond as
              soon as possible.
            </p>
          </div>
          <div className="cbody">
            <form id="cform">
              <h4 id="ch4">Name</h4>
              <input id="cinput" type="text" name="name" />
              <h4 id="ch4">Email</h4>
              <input id="cinput" type="email" name="email" />
              <h4 id="ch4">Message</h4>
              <textarea id="ctextarea"></textarea>
              <center>
                <button>Send</button>
              </center>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
