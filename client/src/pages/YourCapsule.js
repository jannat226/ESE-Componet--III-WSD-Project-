import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "./card.css";
export const YourCapsule = () => {
  //   const [data, setData] = useState({}); // State to store fetched data

  //   useEffect(() => {
  //     // Fetch data from your database using the API endpoint
  //     fetch("YOUR_API_ENDPOINT")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data); // Update the state with the fetched data
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

  return (
    <>
      <Navbar />

      <div id="cardHead">
        <center>
          <h1>Your Stories Stored In Our Capsules</h1>
        </center>
        <div className="card">
          <div id="cardHeading">
            <h2>Capsule Number</h2>
          </div>
          <div id="cardBody" className="flex-ContainerD">
            <div>
              <p>Email: jannat</p>
              <p>Time: 10-10-2023</p>
              <a href="#" target="_blank" rel="noopener noreferrer">
                View File
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};