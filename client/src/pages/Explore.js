import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "./Explore.css";
export const Explore = () => {
  return (
    <>
      <div className="explore">
        <Navbar />
        <body>
          <section class="parallax">
            <h1 id="title">Time Capsule</h1>
            {/* <img
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/22735710-8cec-41c3-856a-32fb20242e99"
            id="bottom"
            alt="vacation"
          /> */}
            <img
              src="https://static.wixstatic.com/media/nsplsh_80152de0ead3418880733ca1b3a8b0e0~mv2.jpg/v1/fill/w_640,h_480,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/nsplsh_80152de0ead3418880733ca1b3a8b0e0~mv2.jpg"
              id="woman"
              alt="bg"
            />
          </section>

          <section class="blog">
            <h2>Creating a nice nostalgic surprise</h2>

            <p>
              Virtual Time Capsule is the ability to send your life stories to
              anyone at a later date in the future. Simply upload the memory,
              enter the recipient's information, and pick a date in the future.
              These files are then safely stored and then sent back until the
              desired date;
            </p>
            <div class="cards">
              <div class="card">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/db0b1567-8d28-49c1-8687-7a982c594140"
                  alt=""
                />
                <div class="overlay">
                  <h3>Our Mission</h3>
                  <p>
                    Virtual Time Capsule is committed to preserving and sharing
                    your thoughts, memories, and ideas with anyone in the
                    future.
                  </p>
                </div>
              </div>

              <div class="card">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmPKTP9H1SGNZsMqyVO-kGUoI07x_FHgOYyA&usqp=CAU"
                  alt=""
                />
                <div class="overlay">
                  <h3>Endless Adventures</h3>
                  <p>
                    To create an easy to use system for preserving life's
                    memories throughout the years.
                  </p>
                </div>
              </div>

              <div class="card">
                <img src="https://st2.depositphotos.com/4140623/6005/v/600/depositphotos_60056561-stock-illustration-photoalbum-with-photoes.jpg" />
                <div class="overlay">
                  <h3>Capture the moment</h3>
                  <p>
                    Life goes by so fast. Sometimes you will never know the
                    value of a moment until it becomes a memory. It's the
                    everyday moments that become the ones we cherish the most.
                    Preserve and share those memories with Virtual Time Capsule.
                    The experience and emotions of opening a Time Capsule and
                    reliving a special memory, or seeing a loved one long after
                    they're gone will be something you'll never forget.
                  </p>
                </div>
              </div>
            </div>

            <p>Join us and experience virtual time capsule ! </p>
          </section>
        </body>
      </div>
      <Footer />
    </>
  );
};
