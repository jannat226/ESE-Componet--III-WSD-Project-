import "./footer.css";
import logo from "../images/logo.png";
import "font-awesome/css/font-awesome.min.css";
export const Footer = () => {
  return (
    <>
      <footer class="footer">
        <center>
          <div class="footer-left col-md-4 col-sm-6">
            <p class="about">
              <span>
                {" "}
                Simply upload the memory & get the nostalgic experience
              </span>
            </p>

            <div>
              <center>
                <span id="creator">
                  Designed by Jannat `2347226` & Suraj `2347259`
                </span>
              </center>

              <div class="icons">
                <a href="#">
                  <i class="fa fa-facebook"></i>
                </a>

                <a href="#">
                  <i class="fa fa-linkedin"></i>
                </a>
                <a href="#">
                  <i class="fa fa-google-plus"></i>
                </a>
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>{" "}
        </center>
      </footer>
    </>
  );
};
