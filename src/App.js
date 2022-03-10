import logo from "./logo.svg";
import "./App.css";
import Rows from "./Components/Rows";
import requst from "./api/endPoints";

function App() {
  return (
    <div className="App">
      <Rows title="NetFlix Originals" fetchUrl={requst.fetchNetflixOriginals} />
      <Rows title="Trending Now" fetchUrl={requst.fetchTrending} />
      <Rows title="Top Rated" fetchUrl={requst.fetchTopRated} />
      <Rows title="Action Movies " fetchUrl={requst.fetchActionMovies} />
      <Rows title="Comedy Movies " fetchUrl={requst.fetchComedyMovies} />
      <Rows title="Horror Movies" fetchUrl={requst.fetchHorrorMovies} />
      <Rows title="Romance Movies" fetchUrl={requst.fetchRomanceMovies} />
      <Rows title="Documentry" fetchUrl={requst.fetchDocumentries} />
    </div>
  );
}

export default App;
